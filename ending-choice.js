const storyText = document.querySelector("#endingChoiceText");
const options = document.querySelector("#endingChoiceOptions");
const hint = document.querySelector("#endingChoiceHint");

const intro = [
  "你，是肖青。",
  "你是仪式的参与者，是被抛弃者，是失忆者，更是探索者。",
  "你决定复活林媛，你的朋友。"
];

const companionStories = {
  yes: [
    "你来到了信息委员的家中。",
    "信息委员跟你说：“这样啊，我了解了。根据我对你的监视，我也确实了解你没有恶意。”",
    "“我认为，以你现在的状态，可能比我更适合作为仪式的启动者，因为你自从失忆后少了很多的杂念。”",
    "信息委员向你交代了注意事项。很快，就又到了月圆之夜。"
  ],
  no: [
    "你偷偷地来到了信息委员的家中。",
    "你花了一点时间来了解许知夏的日程安排。",
    "一个月后，你趁着她出门的时候，偷走了她电脑里面所有的数据。",
    "很快，就又到了月圆之夜。"
  ]
};

const commonRitualEnding = [
  "也正因为你的愿望没有被实现，才使得你今天有机会再一次站在这里，启动逆转仪式。",
  "你的愿望是——"
];

const brutalWishes = [
  ["报仇", "报仇"],
  ["干掉所有知情者", "干掉所有知情者"],
  ["让他们被献祭，包括自己", "让所有知情者被献祭，包括自己"],
  ["让他们被献祭，不包括自己", "让所有知情者被献祭，不包括自己"],
  ["世界末日", "让世界迎来末日"],
  ["召唤旧日守护者", "召唤旧日守护者"]
];

const greedyWishes = [
  ["不老不死", "获得不老不死"],
  ["有钱", "拥有数不尽的财富"],
  ["后宫佳丽", "拥有后宫佳丽"],
  ["创造新的世界", "创造一个新的世界"],
  ["吃不完的美食", "拥有吃不完的美食"],
  ["更多的愿望", "获得更多的愿望"],
  ["获得超能力", "获得超能力"],
  ["全知全能", "成为全知全能的存在"]
];

const selfKindWishes = [
  ["让自己的身体重新变得健康", "让自己的身体重新变得健康"],
  ["戒掉成瘾品", "戒掉所有令自己成瘾的东西"]
];

const animals = ["狗", "猫", "牛", "羊", "猪", "马", "鸡", "鸭", "兔", "老鼠"];
const plants = ["水稻", "小麦", "玉米", "土豆", "番茄", "苹果树", "松树", "竹子", "玫瑰", "向日葵"];
const fantasyCreatures = ["龙", "凤凰", "独角兽", "精灵", "人鱼", "天使", "恶魔", "史莱姆", "巨人", "妖狐"];

let typingTimer = 0;
let typing = false;
let fullText = "";
let nextAction = null;

function finishTyping() {
  window.clearInterval(typingTimer);
  storyText.textContent = fullText;
  typing = false;
}

function typeLine(text, after) {
  window.clearInterval(typingTimer);
  fullText = text;
  nextAction = after;
  storyText.textContent = "";
  options.hidden = true;
  hint.hidden = false;
  typing = true;
  let index = 0;
  typingTimer = window.setInterval(() => {
    storyText.textContent = text.slice(0, ++index);
    if (index >= text.length) finishTyping();
  }, 52);
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
    button.addEventListener("click", (event) => { event.stopPropagation(); action(); });
    options.appendChild(button);
  });
  options.hidden = false;
}

function chooseCompanion(choice) {
  options.hidden = true;
  typeLine("很好。", () => playSequence([...companionStories[choice], ...commonRitualEnding], showWishRoot));
}

function askCompanion() {
  showChoices("你是否想让信息委员参与其中？", [
    { label: "是", action: () => chooseCompanion("yes") },
    { label: "不是", action: () => chooseCompanion("no") }
  ]);
}

function showWishRoot() {
  showChoices("你的愿望是？", [
    { label: "救同学", action: () => confirmWish("救回林媛", true) },
    { label: "不救同学", action: showWishCategories }
  ]);
}

function showWishCategories() {
  showChoices("选择欲望的种类。", [
    { label: "回到上一步", action: showWishRoot, className: "choice-back" },
    { label: "善念", action: showKindCategories },
    { label: "残暴", action: () => showWishList("残暴", brutalWishes) },
    { label: "贪欲", action: () => showWishList("贪欲", greedyWishes) },
    { label: "穿越", action: showTravelCategories },
    { label: "变身", action: showTransformationCategories }
  ]);
}

function showKindCategories() {
  showChoices("善念。你希望将幸福与健康给予谁？", [
    { label: "回到上一步", action: showWishCategories, className: "choice-back" },
    { label: "自己", action: () => showWishList("给予自己", selfKindWishes, showKindCategories) },
    { label: "所爱之人", action: () => confirmWish("让所爱之人永远幸福健康", false, showKindCategories) },
    { label: "自己和所爱之人", action: () => confirmWish("让所爱之人与自己永远幸福健康", false, showKindCategories) },
    { label: "所有人", action: () => confirmWish("让所有人永远幸福健康", false, showKindCategories) }
  ]);
}

function showTravelCategories() {
  showChoices("穿越。你想去哪里？", [
    { label: "回到上一步", action: showWishCategories, className: "choice-back" },
    { label: "回到过去", action: showPastDestinations },
    { label: "穿越到异世界", action: () => confirmWish("穿越到异世界", false, showTravelCategories) },
    { label: "穿越到二次元", action: () => confirmWish("穿越到二次元", false, showTravelCategories) }
  ]);
}

function showPastDestinations() {
  showChoices("你想回到哪个过去？", [
    { label: "回到上一步", action: showTravelCategories, className: "choice-back" },
    { label: "古代", action: () => askKeepMemory("古代") },
    { label: "近代", action: () => askKeepMemory("近代") },
    { label: "自己小时候", action: () => askKeepMemory("自己小时候") }
  ]);
}

function askKeepMemory(destination) {
  showChoices("你是否想要保留自己的记忆？", [
    { label: "回到上一步", action: showPastDestinations, className: "choice-back" },
    { label: "保留记忆", action: () => confirmWish(`保留记忆回到${destination}`, false, () => askKeepMemory(destination)) },
    { label: "抛弃记忆", action: () => confirmWish(`抛弃记忆回到${destination}`, false, () => askKeepMemory(destination)) }
  ]);
}

function showTransformationCategories() {
  showChoices("变身。你想成为什么？", [
    { label: "回到上一步", action: showWishCategories, className: "choice-back" },
    { label: "成为吸血鬼", action: () => confirmWish("成为吸血鬼", false, showTransformationCategories) },
    { label: "成为动物", action: () => showNamedTransformations("动物", animals) },
    { label: "成为植物", action: () => showNamedTransformations("植物", plants) },
    { label: "成为幻想生物", action: () => showNamedTransformations("幻想生物", fantasyCreatures) },
    { label: "成为真菌", action: () => confirmWish("成为真菌", false, showTransformationCategories) },
    { label: "成为细菌", action: () => confirmWish("成为细菌", false, showTransformationCategories) },
    { label: "成为病毒", action: () => confirmWish("成为病毒", false, showTransformationCategories) }
  ]);
}

function showNamedTransformations(category, names) {
  const wishes = names.map((name) => [name, `成为${name}`]);
  showWishList(`成为${category}`, wishes, showTransformationCategories);
}

function showWishList(category, wishes, categoryBack = showWishCategories) {
  const choices = [{ label: "回到上一步", action: categoryBack, className: "choice-back" }];
  wishes.forEach(([label, result]) => choices.push({
    label,
    action: () => confirmWish(result, false, () => showWishList(category, wishes, categoryBack))
  }));
  showChoices(`${category}。你想要的是？`, choices);
}

function confirmWish(wish, savesFriend, back = showWishRoot) {
  showChoices(`你确定么？这就是你最后的决定：${wish}。`, [
    { label: "回到上一步", action: back, className: "choice-back" },
    { label: "确定，这是我最后的决定", action: () => finishChoice(wish, savesFriend) }
  ]);
}

function finishChoice(wish, savesFriend) {
  options.hidden = true;
  hint.hidden = true;
  storyText.textContent = "";
  try {
    if (localStorage.getItem("zhetang6_reduced_stimulation_v1") === "true") {
      window.location.assign(savesFriend ? "36-ending-good.html" : `37-ending-desire.html?wish=${encodeURIComponent(wish)}`);
      return;
    }
  } catch {
    // 本地存储不可用时保持普通转场。
  }
  document.body.classList.add("ending-fade-white");
  window.setTimeout(() => window.location.assign(savesFriend ? "36-ending-good.html" : `37-ending-desire.html?wish=${encodeURIComponent(wish)}`), 1800);
}

function advanceStory() {
  if (!options.hidden) return;
  if (typing) { finishTyping(); return; }
  if (nextAction) { const action = nextAction; nextAction = null; action(); }
}

document.addEventListener("click", advanceStory);
document.addEventListener("keydown", (event) => {
  if (["Shift", "Control", "Alt", "Meta"].includes(event.key)) return;
  event.preventDefault();
  advanceStory();
});

playSequence(intro, askCompanion);
