const searchRecords = [
  {
    title: "本站公告：十周年资料整理说明",
    type: "公告",
    href: "#notice",
    keys: ["公告", "十周年", "关闭", "网站", "维护", "资料组"],
    text: "免费空间即将到期，旧相册、留言和改名记录正在转为静态存档。"
  },
  {
    title: "班级相册：2013 春游合照",
    type: "相册",
    href: "#album",
    keys: ["照片", "相册", "合照", "春游", "2013", "缺席"],
    text: "相册备注显示名单按旧班册整理，缺席人数待复核。"
  },
  {
    title: "维护记录：缺席名单说明",
    type: "维护",
    href: "#updates",
    keys: ["缺席名单", "缺席", "修正", "记录", "维护", "复核"],
    text: "2024-06-03 更新缺席名单说明，早期页面可能存在缺页或重复记录。"
  },
  {
    title: "留言簿摘录：旧留言恢复",
    type: "留言",
    href: "#guestbook",
    keys: ["留言", "留言簿", "匿名", "备份", "恢复"],
    text: "旧留言正在从备份里恢复，重复、乱码和空白楼层会统一清理。"
  },
  {
    title: "班委资料：班长上传记录",
    type: "资料",
    href: "#album",
    keys: ["班长", "班委", "上传", "维护员", "毕业教室"],
    text: "毕业教室相册由班长上传，维护员于 2024 年重新编号。"
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
      <a href="${item.href}">${item.title}</a>
      <span>${item.type} · 静态存档</span>
      <p>${item.text}</p>
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

resultBox.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});
