const storyText = document.querySelector("#summaryText");
const options = document.querySelector("#summaryOptions");
const hint = document.querySelector("#summaryHint");
const jumpscare = document.querySelector("#summaryJumpscare");
const redScreen = document.querySelector("#summaryRedScreen");
const reducedStimulation = (() => {
  try { return localStorage.getItem("zhetang6_reduced_stimulation_v1") === "true"; }
  catch { return false; }
})();

const storageKeys = {
  guestbook: "zhetang6_guestbook_guest2094_v1",
  secondGuestbookAttempt: "zhetang6_guestbook_second_attempt_v1",
  searchedZhangYaqi: "zhetang6_searched_zhang_yaqi_v1",
  committee: "zhetang6_visited_heysir_committee_v1",
  rebellious: "zhetang6_choice_rebellious_v1",
  quickReaction: "zhetang6_choice_quick_reaction_v1"
};

function hasStoredValue(key) {
  try {
    return window.localStorage.getItem(key) !== null;
  } catch {
    return false;
  }
}

function readStoredJson(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch {
    return null;
  }
}

const guestbookEntry = readStoredJson(storageKeys.guestbook) || {};

const playerHistory = {
  leftMessage: hasStoredValue(storageKeys.guestbook),
  triedSecondMessage: hasStoredValue(storageKeys.secondGuestbookAttempt),
  searchedZhangYaqi: hasStoredValue(storageKeys.searchedZhangYaqi),
  foundCommittee: hasStoredValue(storageKeys.committee),
  rebellious: hasStoredValue(storageKeys.rebellious),
  quickReaction: hasStoredValue(storageKeys.quickReaction)
};

let typingTimer = 0;
let automaticTimer = 0;
let typing = false;
let fullText = "";
let nextAction = null;
let automaticDelay = null;
let summaryIndex = 0;
let pHoldTimer = 0;
let pHoldTriggered = false;
let forceNoAchievementMode = false;

function finishTyping() {
  window.clearInterval(typingTimer);
  storyText.textContent = fullText;
  typing = false;
  if (automaticDelay !== null && nextAction) {
    const action = nextAction;
    const delay = automaticDelay;
    nextAction = null;
    automaticDelay = null;
    window.clearTimeout(automaticTimer);
    automaticTimer = window.setTimeout(action, delay);
  }
}

function typeLine(text, after, autoDelay = null) {
  window.clearInterval(typingTimer);
  window.clearTimeout(automaticTimer);
  storyText.classList.remove("summary-text-fade");
  fullText = text;
  nextAction = after;
  automaticDelay = autoDelay;
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
  options.replaceChildren();
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

const summaries = [];
if (playerHistory.leftMessage) summaries.push(showGuestbookSummary);
if (playerHistory.searchedZhangYaqi) summaries.push(showZhangYaqiSummary);
if (playerHistory.foundCommittee) summaries.push(showCommitteeSummary);
if (playerHistory.rebellious) summaries.push(showRebelliousSummary);

function nextSummary() {
  if (summaryIndex < summaries.length) {
    summaries[summaryIndex++]();
    return;
  }
  showFinalWords();
}

function startSummary() {
  playSequence([
    "游戏结束了，但是你还没有满足",
    "没有关系",
    "这里，",
    "记录了你的几个奇奇怪怪的行为"
  ], () => {
    if (forceNoAchievementMode || summaries.length === 0) {
      showNoAchievementSummary();
      return;
    }
    nextSummary();
  });
}

function showNoAchievementSummary() {
  playSequence([
    "遗憾的是，你似乎并没有在游戏里做出任何出格的举动",
    "但这并不代表你没有优点",
    "正相反",
    "你是一个追求效率的人",
    "一个简单的人",
    "一个直接的人",
    "一个纯粹的人",
    "这很好",
    "希望你能够保持自己的优势，快速的解决从今往后的难题和困境",
    "又或者，你的浏览器清空了自己的缓存，导致我检测不到你的行为历史了",
    "如果是这种情况下的话，属实是很可惜",
    "毕竟，是记忆造就了我们",
    "但是要接受遗忘",
    "接受自然"
  ], showFinalWords);
}

function showGuestbookSummary() {
  const nickname = String(guestbookEntry.nickname || "匿名").trim() || "匿名";
  const message = String(guestbookEntry.message || "（留言内容已无法读取）").trim() || "（空白留言）";
  playSequence([
    "你在留言面板留下了你的痕迹。",
    `你写道：\n“${message}”`,
    "为什么要这么做",
    "你难道觉得自己很有创意么，"
  ], () => {
    if (playerHistory.triedSecondMessage) {
      showSecondGuestbookAttempt(nickname);
      return;
    }
    showChoices("", [
    {
      label: "我喜欢留下痕迹",
      action: () => playSequence([
        "希望你能继续努力，通过自己的方式在这个世界留下自己的痕迹。"
      ], nextSummary)
    },
    {
      label: "我随便填的",
      action: () => playSequence([
        "好吧，最起码，你的好奇心很重。"
      ], nextSummary)
    }
    ]);
  });
}

function showSecondGuestbookAttempt(nickname) {
  playSequence([
    "不仅如此",
    "你在污染了游戏的留言板以后，竟然还想发送第二次留言？",
    "那么",
    "恭喜你",
    "自大狂",
    "你成功的让我意识到了人性的贪婪",
    "不如我把游戏的作者位子也让给你？"
  ], () => showChoices("", [
    { label: "求之不得", action: () => acceptGameAuthorship(nickname) },
    { label: "不好意思，我不是故意的", action: apologizeForSecondMessage }
  ]));
}

function acceptGameAuthorship(nickname) {
  playSequence([
    `好的，这里是${nickname}创作的游戏，游戏的名称叫做`
  ], () => typeLine(
    "论一个自大狂的自我修养",
    () => playSequence([
      "自信并不是什么坏事，",
      "但是过度的自信一定会引火上身"
    ], finishSecondGuestbookAttempt),
    2000
  ));
}

function apologizeForSecondMessage() {
  playSequence([
    "知错就好",
    "你自信，且自知，这是一件好事"
  ], finishSecondGuestbookAttempt);
}

function finishSecondGuestbookAttempt() {
  playSequence([
    "希望你能保持住自己的信念感，舍弃掉那份毫无意义的虚荣"
  ], () => showChoices("", [
    { label: "好的", action: nextSummary }
  ]));
}

function showZhangYaqiSummary() {
  playSequence([
    "你在学生名册里面，搜索了，资助了网站5毛钱的张雅琪",
    "讲真的，你为什么要搜索她的名字？",
    "她捐的那么少，你为什么要搜索她？",
    "你是在歧视穷人么，还是说你把这个学生名册所有带有备注的人都搜索了一遍？",
    "总之",
    "你的脑洞很大",
    "又或者你没有脑子"
  ], () => showChoices("", [
    { label: "啊吧啊吧？", action: answerZhangYaqiNonsense },
    { label: "这不是作者有病？你反过来说我？", action: answerZhangYaqiAuthor }
  ]));
}

function answerZhangYaqiNonsense() {
  playSequence([
    "你开始胡言乱语",
    "自己的嘴角不争气的流出了口水",
    "哎，你是幸运的",
    "希望你能够自知，保持住自己的幸运"
  ], nextSummary);
}

function answerZhangYaqiAuthor() {
  playSequence([
    "作者固然有病",
    "但你和作者依然达成了和谐的共鸣",
    "恭喜你，成功的解锁了本2兔的私人联系方式"
  ], () => showChoices("", [
    { label: "我不要", action: denyPrivateContact },
    { label: "欣然接受", action: denyPrivateContact }
  ]));
}

function denyPrivateContact() {
  playSequence([
    "开玩笑的\n你根本没有和我达成共鸣"
  ], nextSummary);
}

function showCommitteeSummary() {
  playSequence([
    "你找到了赫伊希尔委员会的主页，这不仅仅是结束，而是开始。。。"
  ], () => showChoices("", [
    { label: "什么意思", action: explainCommitteeDiscovery },
    { label: "现在我应该干什么", action: explainCommitteeDiscovery }
  ]));
}

function explainCommitteeDiscovery() {
  playSequence([
    "你应该保持自己的耐心，保持自己敏锐的观察力。",
    "黑箱的世界仍在继续拓展，如果感兴趣，不妨关注本2兔的B站频道，获得更多的可能性。"
  ], () => showChoices("", [
    { label: "前往本2兔的B站主页", action: visitAuthorChannel }
  ]));
}

function visitAuthorChannel() {
  window.open("https://space.bilibili.com/224155770", "_blank", "noopener,noreferrer");
  playSequence([
    "真是个好孩子",
    "你的前途一片光明"
  ], nextSummary);
}

function showRebelliousSummary() {
  const lines = ["你在游戏尚未开始之前，就已经自寻思路。"];
  if (playerHistory.quickReaction) lines.push("竟然还尿裤子了。");
  lines.push(
    "希望你能够遵纪守法，将叛逆的种子埋藏在心底，",
    "让它开花结果，",
    "让它找到异类的价值",
    "或者远离人世，不要祸害他人的心情"
  );

  playSequence(lines, () => showChoices("", [
    { label: "朝着漆黑的背景吐口水", action: punishRebellion },
    { label: "好的老师，我会尽力的", action: nextSummary }
  ]));
}

function punishRebellion() {
  playSequence([
    "真是愚蠢啊",
    "有着叛逆的精神，却如此的愚昧，",
    "你胆敢在我的世界里面叫嚣"
  ], () => typeLine(
    "[只见那令人心安的声音逐渐离去，步伐中带着一丝的心碎]",
    fadeDirectionBeforeScare,
    1100
  ));
}

function fadeDirectionBeforeScare() {
  hint.hidden = true;
  storyText.classList.add("summary-text-fade");
  window.setTimeout(() => {
    storyText.textContent = "";
    window.setTimeout(() => triggerJumpscare(false, afterRebellionScare), 3000);
  }, 900);
}

function triggerJumpscare(keepRed, after) {
  options.hidden = true;
  hint.hidden = true;
  storyText.textContent = "";
  jumpscare.hidden = false;
  jumpscare.classList.remove("is-rushing");
  redScreen.classList.remove("is-visible", "to-black", "is-final");

  if (reducedStimulation) {
    jumpscare.classList.add("is-safe");
    if (keepRed) return;
    window.setTimeout(() => {
      jumpscare.hidden = true;
      jumpscare.classList.remove("is-safe");
      after?.();
    }, 1400);
    return;
  }

  void jumpscare.offsetWidth;
  jumpscare.classList.add("is-rushing");

  window.setTimeout(() => redScreen.classList.add("is-visible"), 720);
  window.setTimeout(() => {
    jumpscare.hidden = true;
    jumpscare.classList.remove("is-rushing");
  }, 1050);

  if (keepRed) {
    window.setTimeout(() => redScreen.classList.add("is-final"), 1150);
    return;
  }

  window.setTimeout(() => redScreen.classList.add("to-black"), 1450);
  window.setTimeout(() => {
    redScreen.classList.remove("is-visible", "to-black");
    after();
  }, 2700);
}

function afterRebellionScare() {
  playSequence([
    "傻福",
    "你可真是个大傻福",
    "现在知道我的厉害了么",
    "顺带一提，刚刚的中括号也是我"
  ], () => showChoices("", [
    { label: "好的，我听懂了，还有别的事情要跟我说么", action: nextSummary }
  ]));
}

function showFinalWords() {
  playSequence([
    "这",
    "便是结尾",
    "即使已经表达过我的感激之情，但是",
    "在这万千世界中，能够陪伴我，陪伴其他人，走到这个游戏真正意义上的最后一刻",
    "希望你保持这颗，乐于探索的心",
    "谢谢你"
  ], () => showChoices("", [
    { label: "朝着自己的屏幕亲吻", action: () => triggerJumpscare(true) },
    { label: "退出游戏，思考人生", action: closeGame }
  ]));
}

function closeGame() {
  window.close();
  window.setTimeout(() => window.location.replace("about:blank"), 180);
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

function activateNoAchievementTestMode() {
  if (pHoldTriggered) return;
  pHoldTriggered = true;
  forceNoAchievementMode = true;
  summaryIndex = 0;
  window.clearInterval(typingTimer);
  window.clearTimeout(automaticTimer);
  typing = false;
  nextAction = null;
  automaticDelay = null;
  options.hidden = true;
  hint.hidden = true;
  storyText.textContent = "";
  storyText.classList.remove("summary-text-fade");
  jumpscare.hidden = true;
  jumpscare.classList.remove("is-rushing");
  redScreen.classList.remove("is-visible", "to-black", "is-final");
  startSummary();
}

document.addEventListener("click", advanceStory);
document.addEventListener("keydown", (event) => {
  if (["Shift", "Control", "Alt", "Meta"].includes(event.key)) return;
  if (event.key.toLowerCase() === "p") {
    event.preventDefault();
    if (!pHoldTimer && !pHoldTriggered) {
      pHoldTimer = window.setTimeout(() => {
        pHoldTimer = 0;
        activateNoAchievementTestMode();
      }, 3000);
    }
    return;
  }
  event.preventDefault();
  advanceStory();
});
document.addEventListener("keyup", (event) => {
  if (event.key.toLowerCase() !== "p") return;
  window.clearTimeout(pHoldTimer);
  pHoldTimer = 0;
  pHoldTriggered = false;
});

startSummary();
