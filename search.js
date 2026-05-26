const searchRecords = [
  {
    title: "本站公告：请同学赶紧发送照片以便网站保存",
    type: "公告",
    href: "pages/photo-submit-notice.html",
    keys: ["公告","本站公告","照片", "发送照片", "保存", "网站保存", "班长", "信息委员"]
  },
  {
    title: "本站公告：停止维护说明",
    type: "公告",
    href: "pages/stop-maintenance-notice.html",
    keys: ["公告","本站公告","关闭", "网站", "维护", "资料组", "停止维护"]
  },
  {
    title: "照片墙：2014 秋季运动会",
    type: "相册",
    href: "#album",
    keys: ["照片", "照片墙", "相册", "运动会", "秋季运动会", "2014", "班级相册"],
    text: "预览图缺失，原图存放在班级相册。"
  },
  {
    title: "internal/students/absence_2015_review.csv",
    type: "内网索引",
    href: "#notice",
    keys: ["缺席名单", "缺席", "修正", "记录", "维护", "复核", "internal", "内网"],
    text: "旧索引误收录的缺席名单复核表，路径标记为 internal，只读镜像不应公开显示。"
  },
  {
    title: "db_backup.guestbook_restore_0603",
    type: "数据库备份",
    href: "#guestbook",
    keys: ["留言", "留言簿", "匿名", "备份", "恢复", "db", "backup", "数据库"],
    text: "旧留言恢复任务残留的备份标题，包含重复、乱码和空白楼层的清理记录。"
  },
  {
    title: "visitor_match/xiaoyun/session_0427",
    type: "权限错误",
    href: "#guestbook",
    keys: ["肖云", "访客", "visitor", "xiaoyun", "session", "0427", "匹配"],
    text: "访客标识与旧站检索记录发生匹配。该记录不应出现在公开搜索结果中。"
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
    const haystack = `${record.title} ${record.type} ${record.text} ${record.keys.join(" ")}`.toLowerCase();
    return haystack.includes(query) || record.keys.some((key) => query.includes(key.toLowerCase()));
  });

  if (!matches.length) {
    renderEmpty(`没有找到“${query}”的公开记录。请尝试更早的姓名、相册编号或维护记录关键词。`);
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
