const requestedWish = new URLSearchParams(window.location.search).get("wish") || "";
const stories = {
  "报仇": "所有伤害过你的人都付出了代价。名单上的名字一个接一个消失，直到你发现，仇恨并不会因为无人可恨而结束。",
  "干掉所有知情者": "所有知情者都从世界上消失了。再也没有人能说出那一夜的真相，也再也没有人能够证明，你曾经拥有过那些朋友。",
  "让所有知情者被献祭，包括自己": "符咒收走了所有知情者，也包括你。秘密终于安全了，因为世上已经没有任何一个能够记住它的人。",
  "让所有知情者被献祭，不包括自己": "所有知情者都成为了祭品，只有你被留在原地。你守住了秘密，也成为了这世上唯一还会被秘密折磨的人。",
  "让世界迎来末日": "月光熄灭后，天再也没有亮起。你得到了一个没有明天的世界，而末日余下的每一秒，都将由你亲眼见证。",
  "召唤旧日守护者": "沉睡在旧日中的守护者回应了你。它们越过门槛来到这个世界，而人类是否值得被守护，将由它们重新判断。",
  "获得不老不死": "时间从你的身体上绕开。故人、城市与时代不断离去，而你永远停在启动仪式的这一夜。",
  "拥有数不尽的财富": "你坐拥在财富之上，再也没有任何东西是你买不起的。可是接下来，你又会怎样利用这些永远花不完的财富？",
  "拥有后宫佳丽": "无数人如你所愿来到身边。你得到了所有人的爱慕，却再也无法确认其中是否有任何一份感情出自真心。",
  "创造一个新的世界": "一个崭新的世界在你面前展开。它没有旧日的罪与遗憾，但它会变成乐园还是另一个深渊，将由你亲手书写。",
  "成为吸血鬼": "你听见血液在每一个活人身体中流动。接下来的千年故事，将会由永不衰老的你亲自书写。",
  "拥有吃不完的美食": "餐桌永远丰盛，空盘会在眨眼间再次盛满。你再也不会饥饿，却渐渐忘记了满足究竟是什么滋味。",
  "获得更多的愿望": "一个愿望变成了无数个愿望。每一次满足都会带来新的欲望，而奥摩耶他始终耐心地等待你支付下一份代价。",
  "穿越回到过去": "你回到了故事开始以前。熟悉的教室、熟悉的同学和还没有发生的仪式都在眼前——这一次，你会改变过去，还是再次走向同一个夜晚？"
};
const wish = Object.prototype.hasOwnProperty.call(stories, requestedWish) ? requestedWish : "实现自己的愿望";
const story = stories[wish] || "你的愿望已经实现。至于从今天开始的故事会通向哪里，只有你自己能够回答。";
const copy = document.querySelector("#desireEndingCopy");
const resultLine = document.createElement("p");
const resultWish = document.createElement("strong");
const storyLine = document.createElement("p");
resultLine.append("你成功地");
resultWish.textContent = wish;
resultLine.append(resultWish, "。");
storyLine.textContent = story;
copy.append(resultLine, storyLine);
document.title = `结局3 · ${wish}`;
