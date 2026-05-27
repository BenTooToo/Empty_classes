const searchRecords = [
  {
    title: "本站公告：请同学赶紧发送照片以便网站保存",
    type: "公告",
    href: "pages/03-photo-submit-notice.html",
    keys: ["公告", "本站公告"]
  },
  {
    title: "本站公告：停止维护说明",
    type: "公告",
    href: "pages/04-stop-maintenance-notice.html",
    keys: ["公告", "本站公告","维护", "停止维护"]
  },
  {
    title: "班级相册",
    type: "相册",
    href: "pages/05-class-album.html",
    keys: ["班级相册", "相册","2015春游_湖边合照"]
  },
  {
    title: "黑箱百科：折棠市第六中学",
    type: "黑箱百科",
    href: "pages/06-zhetang-six-intro.html",
    keys: ["折棠6中", "折棠六中", "折棠市", "折棠市第六中学", "学校介绍", "黑箱百科"]
  },
  {
    title: "管理员账户登录：信息委员",
    type: "管理员",
    href: "pages/07-admin-info-login.html",
    keys: ["管理员/信息委员", "管理员账号 信息委员", "七月重大事件", "罪孽校舍"]
  },
  {
    title: "访问受限",
    type: "权限限制",
    href: "pages/08-absence-correction.html",
    keys: ["缺席", "缺席名单", "缺席名单修正记录", "访问受限", "admin-07"]
  },
  {
    title: "学生名单",
    type: "名单",
    href: "pages/09-student-roster.html",
    keys: ["学生名单", "信息委员", "美术委员", "林若萱"]
  },
  {
    title: "黑箱百科：林若萱",
    type: "黑箱百科",
    href: "pages/24-lin-ruoxuan-profile.html",
    keys: ["林若萱", "林若萱个人简介", "个人简介", "美术委员", "黑箱百科"]
  },
  {
    title: "突发，知名画家林若萱成为植物人",
    type: "娱乐新闻",
    href: "pages/25-lin-ruoxuan-news.html",
    keys: ["林若萱", "娱乐新闻", "颜料污染", "植物人"]
  },
  {
    title: "我的日记1：信息委员",
    type: "日记",
    href: "pages/10-info-diary-01.html",
    keys: ["我的日记1", "信息委员日记1", "好的归宿"]
  },
  {
    title: "我的日记2：信息委员",
    type: "日记",
    href: "pages/11-info-diary-02.html",
    keys: ["我的日记2", "信息委员日记2", "同学出去"]
  },
  {
    title: "我的日记3：信息委员",
    type: "日记",
    href: "pages/12-info-diary-03.html",
    keys: ["我的日记3", "小青", "目击者", "换了名字"]
  },
  {
    title: "返魂录",
    type: "隐藏索引",
    href: "pages/13-soul-return-log.html",
    keys: ["返魂录", "暗网返魂录", "招魂成功", "自己"]
  },
  {
    title: "新闻报道：女高三生失踪",
    type: "新闻报道",
    href: "pages/14-news-missing-girl.html",
    keys: ["新闻报道", "女高三生", "媛媛失踪", "某区十大悬案"]
  },
  {
    title: "新闻报道：学生离奇自杀",
    type: "新闻报道",
    href: "pages/15-news-monitor-suicide.html",
    keys: ["新冠疫情", "学生离奇自杀", "班长真名", "班长疯了"]
  },
  {
    title: "医院报告单",
    type: "报告",
    href: "pages/16-hospital-report.html",
    keys: ["医院报告单", "玩家真名", "失忆症状", "药物治疗"]
  },
  {
    title: "熟悉的字迹",
    type: "草稿",
    href: "pages/17-familiar-handwriting.html",
    keys: ["熟悉的字迹", "坦白真相", "21"]
  },
  {
    title: "奥窟耶他仪式",
    type: "仪式",
    href: "pages/18-ritual-note.html",
    keys: ["奥窟耶他仪式", "仪式详解", "符咒代码"]
  },
  {
    title: "管理员账号登录：班长",
    type: "管理员",
    href: "pages/19-admin-monitor-account.html",
    keys: ["管理员账号 班长", "班长账号", "大毛", "愿奥窟耶他保佑我"]
  },
  {
    title: "班长日记",
    type: "日记",
    href: "pages/20-monitor-diary.html",
    keys: ["班长日记", "聊天记录", "仪式是真的"]
  },
  {
    title: "管理员账号登录：体育委员",
    type: "管理员",
    href: "pages/21-admin-sports-account.html",
    keys: ["管理员账号 体育委员", "体育委员", "我", "真相大白"]
  },
  {
    title: "恢复登录",
    type: "最终页面",
    href: "pages/22-recovery-login.html",
    keys: ["恢复登录", "真相", "仪式选择", "使用自己的愿望"]
  },
  {
    title: "真结局",
    type: "结局",
    href: "pages/23-true-ending.html",
    keys: ["真结局", "结局", "林媛归来", "班长失踪"]
  }
];

const form = document.querySelector("#siteSearch");
const input = document.querySelector("#searchInput");
const resultBox = document.querySelector("#searchResults");
const modal = document.querySelector("#searchModal");
const closeButton = document.querySelector("#closeSearchModal");

function normalize(value) {
  return value.trim().toLowerCase();
}

function renderEmpty(message) {
  resultBox.innerHTML = `
    <p class="empty-result">${message}</p>
  `;
}

function renderResults(query, matches) {
  const items = matches.map((item) => `
    <li>
      <a href="${item.href}" target="_blank" rel="noopener">${item.title}</a>
      <span>${item.type}</span>
      ${item.text ? `<p>${item.text}</p>` : ""}
    </li>
  `).join("");

  resultBox.innerHTML = `
    <p class="result-summary">关键词：${query}，找到 ${matches.length} 条旧记录。</p>
    <ul class="result-list">${items}</ul>
  `;
}

function openModal() {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  closeButton.focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  input.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = normalize(input.value);
  if (!query) {
    renderEmpty("请输入关键词。支持姓名、相册名、旧记录编号。");
    openModal();
    return;
  }

  const matches = searchRecords.filter((record) => {
    return record.keys.some((key) => normalize(key) === query);
  });

  if (!matches.length) {
    renderEmpty(`没有找到“${query}”的公开记录。请尝试更早的姓名、编号或维护记录关键词。`);
    openModal();
    return;
  }

  renderResults(query, matches);
  openModal();
});

closeButton.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});
