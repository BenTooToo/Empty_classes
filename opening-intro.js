(() => {
  const intro = document.querySelector("#openingIntro");
  const storyText = document.querySelector("#openingIntroText");
  const options = document.querySelector("#openingIntroOptions");
  const hint = document.querySelector("#openingIntroHint");

  if (!intro || !storyText || !options || !hint) return;

  let typingTimer = 0;
  let typing = false;
  let currentLine = [];
  let nextAction = null;
  let choiceDeadlineTimer = 0;
  let truckChoiceLocked = false;

  const normalizeLine = (line) => (Array.isArray(line) ? line : [line]).map((part) =>
    typeof part === "string"
      ? { text: part, strong: false, redacted: false }
      : { text: part.text, strong: Boolean(part.strong), redacted: Boolean(part.redacted) }
  );

  const lineLength = (line) => line.reduce((total, part) => total + part.text.length, 0);

  function renderLine(line, visibleCharacters = Infinity) {
    storyText.replaceChildren();
    let remaining = visibleCharacters;

    line.forEach((part) => {
      if (remaining <= 0) return;
      const text = part.text.slice(0, remaining);
      const node = part.redacted
        ? document.createElement("span")
        : part.strong
          ? document.createElement("strong")
          : document.createTextNode(text);
      if (part.redacted) node.className = "opening-redaction";
      if (part.strong || part.redacted) node.textContent = text;
      storyText.appendChild(node);
      remaining -= text.length;
    });
  }

  function finishTyping() {
    window.clearInterval(typingTimer);
    renderLine(currentLine);
    typing = false;
  }

  function typeLine(line, after) {
    window.clearInterval(typingTimer);
    currentLine = normalizeLine(line);
    nextAction = after;
    options.hidden = true;
    hint.hidden = false;
    typing = true;
    let visibleCharacters = 0;
    const totalCharacters = lineLength(currentLine);

    renderLine(currentLine, 0);
    typingTimer = window.setInterval(() => {
      visibleCharacters += 1;
      renderLine(currentLine, visibleCharacters);
      if (visibleCharacters >= totalCharacters) finishTyping();
    }, 48);
  }

  function playSequence(lines, after) {
    let index = 0;
    const advance = () => index < lines.length ? typeLine(lines[index++], advance) : after();
    advance();
  }

  function appendLabel(button, label) {
    normalizeLine(label).forEach((part) => {
      const node = part.redacted
        ? document.createElement("span")
        : part.strong
          ? document.createElement("strong")
          : document.createTextNode(part.text);
      if (part.redacted) node.className = "opening-redaction";
      if (part.strong || part.redacted) node.textContent = part.text;
      button.appendChild(node);
    });
  }

  function showChoices(prompt, choices) {
    window.clearTimeout(choiceDeadlineTimer);
    options.classList.remove("opening-urgent-options");
    currentLine = normalizeLine(prompt);
    renderLine(currentLine);
    typing = false;
    nextAction = null;
    hint.hidden = true;
    options.replaceChildren();

    const renderedButtons = [];
    choices.forEach(({ label, action }) => {
      const button = document.createElement("button");
      button.type = "button";
      appendLabel(button, label);
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        action();
      });
      options.appendChild(button);
      renderedButtons.push(button);
    });

    options.hidden = false;
    options.querySelector("button")?.focus({ preventScroll: true });
    return renderedButtons;
  }

  function askPhotosensitiveAcknowledgement() {
    showChoices("游戏目前存在闪烁，不推荐你游玩这个游戏。", [
      { label: "谢谢你，好心人", action: askFirstTime },
      {
        label: ["我真是", { text: "██", redacted: true }, "了狗了"],
        action: askFirstTime
      }
    ]);
  }

  function askFirstTime() {
    showChoices("你是否是第一次游玩这个游戏？", [
      { label: "是的", action: startIntroduction },
      { label: "不是", action: confirmIntroductionSkip }
    ]);
  }

  function confirmIntroductionSkip() {
    showChoices([
      "你确定？不要撒谎，你会错过很多",
      { text: "重要的信息", strong: true },
      "。"
    ], [
      {
        label: ["不好意思，我是卑鄙的骗子，请你给我讲述", { text: "重要信息", strong: true }],
        action: startIntroduction
      },
      { label: "我已经看过介绍了", action: enterForum }
    ]);
  }

  function startIntroduction() {
    playSequence([
      "你是肖云，你是一名历史系的大学生。",
      "请和我一起说出来。"
    ], askIdentity);
  }

  function askIdentity() {
    showChoices("请和我一起说出来。", [
      { label: "说什么？", action: explainIdentity },
      { label: "我是肖云", action: confirmIdentity }
    ]);
  }

  function explainIdentity() {
    playSequence(["跟我一起说，我是肖云。"], () => {
      showChoices("现在，和我一起说。", [
        { label: "我是肖云", action: confirmIdentity }
      ]);
    });
  }

  function confirmIdentity() {
    playSequence([
      "没错，你是肖云。",
      "你很喜欢在网上冲浪，你喜欢探索未知的东西。",
      "就在今天，你找到了一个新的帖子。"
    ], askAboutFirstPost);
  }

  function askAboutFirstPost() {
    showChoices("一个从未见过的帖子出现在屏幕上。", [
      { label: "我不感兴趣", action: rejectFirstPost },
      { label: "是什么帖子？", action: revealPost }
    ]);
  }

  function rejectFirstPost() {
    playSequence([
      "好吧。",
      "肖云离开了电脑。"
    ], () => playDayTransition("第二天", () => {
      playSequence([
        "就在今天，你找到了一个新的帖子，和之前那个不一样，你很感兴趣。"
      ], askAboutSecondPost);
    }));
  }

  function playDayTransition(dayTitle, after) {
    window.clearInterval(typingTimer);
    typing = false;
    nextAction = null;
    options.hidden = true;
    hint.hidden = true;
    storyText.textContent = "";
    storyText.classList.add("opening-day-title");

    window.setTimeout(() => {
      storyText.textContent = dayTitle;
      storyText.classList.add("is-visible");

      window.setTimeout(() => {
        storyText.classList.remove("is-visible");

        window.setTimeout(() => {
          storyText.textContent = "";
          storyText.classList.remove("opening-day-title");
          after();
        }, 1200);
      }, 2100);
    }, 3000);
  }

  function askAboutSecondPost() {
    showChoices("那个帖子正等着你点开。", [
      { label: "什么帖子？", action: revealPost },
      { label: "我有拖延症，不想看", action: rejectSecondPost }
    ]);
  }

  function rejectSecondPost() {
    playDayTransition("第三天", () => {
      playSequence([
        "肖云是个反社会精神病。",
        "他总是在拒绝现实的邀请，寻找自以为是的孤傲。",
        "一天，他像往常一样在街上散步。",
        "一辆卡车朝他冲了过来。"
      ], askTruckReaction);
    });
  }

  function askTruckReaction() {
    truckChoiceLocked = false;
    const truckButtons = showChoices("卡车已经近在眼前。", [
      { label: "什么？", action: chooseTruckDeath },
      { label: "卧槽", action: chooseTruckDeath },
      { label: "[躲开]", action: dodgeTruck }
    ]);
    options.classList.add("opening-urgent-options");

    choiceDeadlineTimer = window.setTimeout(() => {
      if (truckChoiceLocked) return;
      truckChoiceLocked = true;
      const automaticChoice = Math.random() < 0.5 ? 0 : 1;
      truckButtons.forEach((button) => { button.disabled = true; });
      truckButtons[automaticChoice].classList.add("is-auto-selected");
      choiceDeadlineTimer = window.setTimeout(() => triggerDeath(false, 0), 90);
    }, 500);
  }

  function chooseTruckDeath() {
    if (truckChoiceLocked) return;
    truckChoiceLocked = true;
    window.clearTimeout(choiceDeadlineTimer);
    triggerDeath(false, 500);
  }

  function dodgeTruck() {
    if (truckChoiceLocked) return;
    truckChoiceLocked = true;
    window.clearTimeout(choiceDeadlineTimer);
    playLockedMessage("你凭借自己惊人的反应力，脱开了大货车", () => {
      playSequence([
        "你感觉到冥冥之中有一股力量在帮助你。",
        "你看到大卡车进行了一个180度的漂移。",
        "卡车的驾驶座上有一个熟悉的身影。"
      ], askEscape);
    });
  }

  function playLockedMessage(message, after) {
    window.clearInterval(typingTimer);
    typing = false;
    nextAction = null;
    options.hidden = true;
    hint.hidden = true;
    storyText.textContent = message;
    storyText.classList.add("opening-locked-message");

    window.setTimeout(() => {
      storyText.classList.add("is-fading");

      window.setTimeout(() => {
        storyText.textContent = "";
        storyText.classList.remove("opening-locked-message", "is-fading");
        after();
      }, 1200);
    }, 3000);
  }

  function askEscape() {
    showChoices("你本能地想要逃离这里。", [
      { label: "逃跑", action: failToEscape },
      { label: "逃跑", action: failToEscape },
      { label: "逃跑", action: failToEscape }
    ]);
  }

  function failToEscape() {
    playSequence([
      "你想要逃跑，但是你的腿脚已经麻木地定在原地。",
      "你尿裤子了。",
      "这就是你的宿命。"
    ], () => triggerDeath(true, 500));
  }

  function triggerDeath(lateReaction = false, delayBeforeRed = 500) {
    window.clearTimeout(choiceDeadlineTimer);
    options.hidden = true;
    hint.hidden = true;
    storyText.textContent = "";
    window.setTimeout(() => {
      intro.classList.add("opening-fade-red");
      const endingUrl = lateReaction
        ? "pages/ending-minus-one.html?lateReaction=1"
        : "pages/ending-minus-one.html";
      window.setTimeout(() => window.location.assign(endingUrl), 1650);
    }, delayBeforeRed);
  }

  function revealPost() {
    playSequence([
      "这个帖子是关于一个校友网站的诡异传说，你对此很感兴趣，无法自拔。",
      [
        "并且，通过",
        { text: "校友网站内置的搜索引擎", strong: true },
        "，你可以",
        { text: "搜索", strong: true },
        "到正常搜索不到的内容。"
      ],
      "所以你拿出了一支笔和一张纸，又或者是一个你可以记录线索的设备。",
      "记住，记录下有用的信息，收藏重要的网页，你之后会感谢我的。"
    ], playForumPrelude);
  }

  function playForumPrelude() {
    playUnskippableFadeSequence([
      "游戏在某个阶段会需要耳机，请提前准备好",
      "游戏有一定的强光闪烁，光敏性癫痫患者请勿游玩",
      "本2兔出品",
      "你是肖云",
      "你想要找到故事的真相",
      "伴随着这个想法，你进入了论坛"
    ], enterForum);
  }

  function playUnskippableFadeSequence(lines, after) {
    window.clearInterval(typingTimer);
    typing = false;
    nextAction = null;
    options.hidden = true;
    hint.hidden = true;
    storyText.textContent = "";
    storyText.classList.add("opening-cinematic-message");
    let lineIndex = 0;

    const showNextLine = () => {
      if (lineIndex >= lines.length) {
        storyText.classList.remove("opening-cinematic-message", "is-visible");
        storyText.textContent = "";
        after();
        return;
      }

      storyText.textContent = lines[lineIndex++];
      window.setTimeout(() => {
        storyText.classList.add("is-visible");

        window.setTimeout(() => {
          storyText.classList.remove("is-visible");

          window.setTimeout(() => {
            storyText.textContent = "";
            showNextLine();
          }, 850);
        }, 1850);
      }, 40);
    };

    showNextLine();
  }

  function enterForum() {
    options.hidden = true;
    hint.hidden = true;
    storyText.textContent = "";
    intro.classList.add("opening-fade-white");

    window.setTimeout(() => {
      document.body.classList.remove("opening-active");
      intro.hidden = true;
      intro.setAttribute("aria-hidden", "true");
      document.title = "黑箱同城 - 盘点那些bug特别多的网站";
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 1700);
  }

  function advanceStory(event) {
    if (event.type === "click" && event.button !== 0) return;
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

  intro.addEventListener("click", advanceStory);
  document.addEventListener("keydown", (event) => {
    if (!document.body.classList.contains("opening-active")) return;
    if (!["Enter", " "].includes(event.key)) return;
    event.preventDefault();
    advanceStory(event);
  });

  showChoices("你是否有光敏性癫痫？", [
    {
      label: "是的",
      action: () => playSequence(["游戏目前存在闪烁，不推荐你游玩这个游戏。"], askPhotosensitiveAcknowledgement)
    },
    {
      label: "没有",
      action: () => playSequence(["很好。"], askFirstTime)
    }
  ]);
})();
