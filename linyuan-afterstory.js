const storyText = document.querySelector("#afterstoryText");
const options = document.querySelector("#afterstoryOptions");
const hint = document.querySelector("#afterstoryHint");

const intro = [
  "你找回了自己的记忆，\n但还是有一些东西想不明白，\n你决定去问一下林媛。",
  "你凭借备忘录，找到了林媛家的地址。",
  "她打开了房门。",
  "熟悉的面孔出现了。",
  "空气变得温暖了起来。",
  "她似乎没有什么变化，还是和记忆里一样年轻，\n一样温柔，\n一样……甜蜜。",
  "林媛：谢谢你，肖青，还是应该叫你肖云？",
  "林媛：不管怎么说，你有什么问题要问我么，还是说，你只是想我了？"
];

const memoryAnswer = [
  "林媛：哈哈，我也不知道呢。",
  "林媛：我记得当年我被献祭的时候，冥冥之中感觉自己能够许下一个愿望。",
  "林媛: 我便希望我爱的人能够永远记住我存在的痕迹。",
  "林媛：话说回来，我明天约好了和许知夏一起出去玩，你要跟我们两个一起么？"
];

const sacrificeAnswer = [
  "林媛：当我被献祭之后，我感受到自己的灵魂被什么东西所感染。\n一种安详的躁动。",
  "林媛：我记不大清自己的状态，但是自己当时仿佛被一种粘膜所包裹。倘若自己让心灵与粘膜融为一体，便能够感受到世间万物的状态和变化。",
  "林媛：大概就是这个样子。",
  "林媛: 一种飘渺的幽灵状态吧。",
  "林媛：或许班长他们现在是这个样子？",
  "林媛：我希望他们在那里找到属于自己的位置。"
];

const rescueAnswer = [
  "林媛：嗯，我知道。",
  "林媛：我能感受得到，当我被囚禁在那一片虚无之中时，我能感受到一抹微弱的光。",
  "思考。",
  "犹豫。",
  "闪烁。",
  "充满希望。",
  "林媛：谢谢你。"
];

const youthAnswer = [
  "林媛：嗯，我也不知道为什么，在我被他们献祭了之后，灵魂便被囚禁，而灵魂的栖身之所则消失在了无穷之中。",
  "林媛：你的愿望是把我带回来。",
  "林媛：我便回来了，和离开时一样。"
];

const futureAnswer = [
  "林媛：现在啊。",
  "林媛：我现在继续过好我的生活。",
  "林媛：许知夏那天找我，说要把班长他们的钱财和资产全部给我，我拒绝了。",
  "林媛：毕竟，我知道那些东西不属于我。",
  "林媛：如果真的属于我，总有一天，它们会回到我的手里。"
];

const apologyAnswer = [
  "林媛：这不是你的错。",
  "林媛：你在当时做出了，你自己所能做到的，最好的选择。",
  "林媛：去除掉记忆，回到过去，你还是会做出同样的选择。",
  "林媛：我不怪你。",
  "林媛：我希望你能够好好的活下去。"
];

let typingTimer = 0;
let autoAdvanceTimer = 0;
let typing = false;
let fullText = "";
let nextAction = null;
let autoAdvanceDelay = null;

function finishTyping() {
  window.clearInterval(typingTimer);
  storyText.textContent = fullText;
  typing = false;
  if (autoAdvanceDelay !== null && nextAction) {
    const action = nextAction;
    const delay = autoAdvanceDelay;
    nextAction = null;
    autoAdvanceDelay = null;
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = window.setTimeout(action, delay);
  }
}

function typeLine(text, after, automaticDelay = null) {
  window.clearInterval(typingTimer);
  window.clearTimeout(autoAdvanceTimer);
  fullText = text;
  nextAction = after;
  autoAdvanceDelay = automaticDelay;
  storyText.textContent = "";
  options.hidden = true;
  hint.hidden = false;
  typing = true;
  let index = 0;
  typingTimer = window.setInterval(() => {
    storyText.textContent = text.slice(0, ++index);
    if (index >= text.length) finishTyping();
  }, 45);
}

function playSequence(lines, after) {
  let index = 0;
  const advance = () => index < lines.length ? typeLine(lines[index++], advance) : after();
  advance();
}

function showChoices(prompt, choices) {
  typeLine(prompt, null);
  finishTyping();
  hint.hidden = true;
  options.innerHTML = "";
  choices.forEach(({ label, action, className = "" }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.className = className;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      action();
    });
    options.appendChild(button);
  });
  options.hidden = false;
}

function showQuestionMenu() {
  showChoices("你想问林媛什么？", [
    { label: "你看起来，好年轻，和10年前一摸一样", action: () => playSequence(youthAnswer, showQuestionMenu) },
    { label: "你现在想要做什么", action: askAboutFuture },
    { label: "信息委员，许知夏，为什么她还记得你", action: askAboutMemory },
    { label: "班长他们，真的被永远的献祭了么", action: () => playSequence(sacrificeAnswer, showQuestionMenu) },
    { label: "嗯，我想你了", action: askForDate },
    { label: "是我把你救出来的", action: () => playSequence(rescueAnswer, showQuestionMenu) },
    { label: "对不起，这一切都是我的错", action: apologizeToLinyuan },
    { label: "我没有别的问题了", action: finishAfterstory, className: "choice-back" }
  ]);
}

function askAboutFuture() {
  playSequence(futureAnswer, () => showChoices("", [
    {
      label: "可以给我么",
      action: () => playSequence([
        "林媛：额。。。。。。",
        "林媛：去问问许知夏吧，既然你帮助了我，我相信她也会相信你。"
      ], showQuestionMenu)
    },
    {
      label: "我尊重你的选择",
      action: () => playSequence(["林媛：谢谢，我就知道你能理解我。"], showQuestionMenu)
    }
  ]));
}

function apologizeToLinyuan() {
  playSequence(apologyAnswer, () => showChoices("", [
    { label: "。。。", action: showQuestionMenu },
    { label: "。。。", action: showQuestionMenu }
  ]));
}

function askAboutMemory() {
  playSequence(memoryAnswer, () => showChoices("你要怎么回答？", [
    { label: "好呀好呀，我最喜欢当电灯泡了", action: () => playSequence(["林媛：好呀，那就说定了。"], showQuestionMenu) },
    { label: "算了，我有点事儿，先让你们叙叙旧吧", action: () => playSequence(["林媛：好吧，那下次再一起出去。"], showQuestionMenu) }
  ]));
}

function askForDate() {
  playSequence(["林媛：奥？"], () => showChoices("你想对她说什么？", [
    { label: "可以和我约会么", action: friendshipPromise },
    { label: "我们要做一辈子的好朋友", action: friendshipPromise }
  ]));
}

function friendshipPromise() {
  playSequence([
    "林媛：嘿嘿，你是我最好的朋友，我们要做一辈子好朋友。",
    "林媛：如果40岁我还没有结婚，我们就结婚吧。"
  ], showQuestionMenu);
}

function finishAfterstory() {
  playSequence(["林媛：好。"], () => {
    typeLine("林媛：以后想起什么，随时都可以来找我。", playEndingAnimation, 1200);
  });
}

function playEndingAnimation() {
  window.clearInterval(typingTimer);
  window.clearTimeout(autoAdvanceTimer);
  typing = false;
  nextAction = null;
  autoAdvanceDelay = null;
  options.hidden = true;
  hint.hidden = true;
  storyText.textContent = "";

  const ending = document.createElement("div");
  ending.className = "afterstory-ending-animation";
  try {
    if (localStorage.getItem("zhetang6_reduced_stimulation_v1") === "true") {
      ending.classList.add("is-safe");
    }
  } catch {
    // 本地存储不可用时保持普通结尾动画。
  }
  ending.setAttribute("aria-label", "日后谈结束动画");
  ending.innerHTML = `
    <p class="afterstory-ending-producer">本2兔出品</p>
    <p class="afterstory-ending-thanks">感谢游玩</p>
  `;
  document.body.appendChild(ending);
  document.body.classList.add("afterstory-ending-active");

  window.setTimeout(() => {
    window.location.assign("41-special-thanks.html");
  }, 8400);
}

function advanceStory() {
  if (!options.hidden) return;
  if (typing) {
    finishTyping();
    return;
  }
  if (nextAction) {
    const action = nextAction;
    nextAction = null;
    action();
  }
}

document.addEventListener("click", advanceStory);
document.addEventListener("keydown", (event) => {
  if (["Shift", "Control", "Alt", "Meta"].includes(event.key)) return;
  event.preventDefault();
  advanceStory();
});

playSequence(intro, showQuestionMenu);
