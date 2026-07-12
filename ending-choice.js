const storyText = document.querySelector("#endingChoiceText");
const options = document.querySelector("#endingChoiceOptions");
const hint = document.querySelector("#endingChoiceHint");
const intro = ["你，是肖青。", "你是仪式的参与者，是被抛弃者。", "你决定复活林媛，你的朋友。"];
const afterCompanionChoice = [
  "你来到了信息委员的家中。",
  "信息委员跟你说：“这样啊，我了解了。根据我对你的监视，我也确实了解你没有恶意。”",
  "“我认为，以你现在的状态，可能比我更适合作为仪式的启动者，因为你自从失忆后少了很多的杂念。”",
  "信息委员向你交代了注意事项。很快，就又到了月圆之夜。",
  "也正因为你的愿望没有被实现，才使得你今天有机会再一次站在这里，启动逆转仪式。",
  "你的愿望是——"
];
const brutalWishes = [["报仇", "报仇"], ["干掉所有知情者", "干掉所有知情者"], ["让他们被献祭，包括自己", "让所有知情者被献祭，包括自己"], ["让他们被献祭，不包括自己", "让所有知情者被献祭，不包括自己"], ["世界末日", "让世界迎来末日"], ["召唤旧日守护者", "召唤旧日守护者"]];
const greedyWishes = [["不老不死", "获得不老不死"], ["有钱", "拥有数不尽的财富"], ["后宫佳丽", "拥有后宫佳丽"], ["创造新的世界", "创造一个新的世界"], ["成为吸血鬼", "成为吸血鬼"], ["吃不完的美食", "拥有吃不完的美食"], ["更多的愿望", "获得更多的愿望"], ["穿越回到过去", "穿越回到过去"]];
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

function acceptCompanionChoice() {
  options.hidden = true;
  typeLine("很好。", () => playSequence(afterCompanionChoice, showWishRoot));
}

function askCompanion() {
  showChoices("你是否想让信息委员参与其中？", [
    { label: "是", action: acceptCompanionChoice },
    { label: "不是", action: acceptCompanionChoice }
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
    { label: "残暴", action: () => showWishList("残暴", brutalWishes) },
    { label: "贪欲", action: () => showWishList("贪欲", greedyWishes) }
  ]);
}

function showWishList(category, wishes) {
  const choices = [{ label: "回到上一步", action: showWishCategories, className: "choice-back" }];
  wishes.forEach(([label, result]) => choices.push({ label, action: () => confirmWish(result, false, () => showWishList(category, wishes)) }));
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
