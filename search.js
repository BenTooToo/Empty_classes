const searchRecords = [
  {
    title: "黑箱同城论坛",
    type: "黑箱百科",
    href: "pages/38-heixiang-forum-intro.html",
    keys: ["黑箱", "黑箱同城", "黑箱同城论坛"],
    text: "全球最知名的论坛网站，以都市传说、奇闻轶事闻名，不少故事至今仍有网友讨论。"
  },
  {
    title: "赫伊希尔委员会",
    type: "Extra",
    href: "pages/32-heysir-committee.html",
    keys: ["赫伊希尔委员会", "赫伊希尔", "托尔法典"]
  },
  {
    title: "请同学赶紧发送照片以便网站保存",
    type: "公告",
    href: "pages/03-photo-submit-notice.html",
    keys: ["公告", "本站公告"]
  },
  {
    title: "请勿散播谣言",
    type: "公告",
    href: "pages/04-stop-maintenance-notice.html",
    keys: ["公告", "本站公告"]
  },
  {
    title: "福安饭心理咨询服务推荐",
    type: "公告",
    href: "pages/26-fuanfan-counseling-notice.html",
    keys: ["福安饭", "福安家常饭馆"]
  },
  {
    title: "班级相册",
    type: "相册",
    href: "pages/05-class-album.html",
    keys: ["班级相册", "相册","2015春游_湖边合照"]
  },
  {
    title: "折棠市第六中学",
    type: "黑箱百科",
    href: "pages/06-zhetang-six-intro.html",
    keys: ["折棠6中", "折棠六中", "折棠市", "折棠市第六中学"]
  },
  {
    title: "管理员登录",
    type: "站点入口",
    href: "admin.html",
    keys: ["管理员"]
  },
  {
    title: "错误",
    type: "权限错误",
    href: "pages/08-absence-correction.html",
    keys: ["缺席", "缺席名单"]
  },
  {
    title: "学生名单",
    type: "名单",
    href: "pages/09-student-roster.html",
    keys: ["学生名单", "信息委员", "美术委员","班长"]
  },
  {
    title: "截图",
    type: "照片",
    href: "pages/28-zhang-yuhang-call-record.html",
    keys: ["张宇航"]
  },
  {
    title: "林若萱",
    type: "黑箱百科",
    href: "pages/24-lin-ruoxuan-profile.html",
    keys: ["林若萱"]
  },
  {
    title: "本2兔",
    type: "黑箱百科",
    href: "pages/27-ben2tu-profile.html",
    keys: ["本2兔", "本二兔", "ben2tu", "bilibili", "折棠6中同窗录作者"]
  },
  {
    title: "哈希函数",
    type: "黑箱百科",
    href: "pages/30-hash-function-intro.html",
    keys: ["哈希", "哈希函数", "hash","哈希加密","哈希值"]
  },
  {
    title: "煎饼控制系统有限公司官方网站",
    type: "官网",
    href: "pages/35-pancake-control.html",
    keys: ["煎饼", "煎饼控制系统", "煎饼控制有限公司", "煎饼控制系统有限公司"]
  },
  {
    title: "突发",
    type: "娱乐新闻",
    href: "pages/25-lin-ruoxuan-news.html",
    keys: ["林若萱"]
  },
  {
    title: "班长和我的密码",
    type: "日记",
    href: "pages/10-info-diary-01.html",
    keys: ["许知夏"]
  },
  {
    title: "悬案：学校网站惊现幽灵少女",
    type: "娱乐新闻",
    href: "pages/29-ghost-girl-news.html",
    keys: ["幽灵","幽灵少女", "悬案"]
  },
 
  {
    title: "奥摩耶他降魂仪式，真的可以实现愿望",
    type: "黑箱论坛",
    href: "pages/31-omoyeta-ritual-thread.html",
    keys: ["奥摩耶他降魂仪式", "奥摩耶他", "降魂仪式"]
  },
  
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

const guestbookSubmit = document.querySelector("#guestbookSubmit");
const guestbookForm = document.querySelector("#guestbookCompose");
const guestbookToast = document.querySelector("#guestbookToast");
const guestbookToastMessage = guestbookToast?.querySelector("p");
const guestbookName = document.querySelector("#guestbookName");
const guestbookMessage = document.querySelector("#guestbookMessage");
const guestbookMessageList = document.querySelector("#guestbook .message-list");
const guestbookStorageKey = "zhetang6_guestbook_guest2094_v1";
let guestbookToastTimer;
let cachedGuestbookEntry = readCachedGuestbookEntry();

function showGuestbookToast(message) {
  if (!guestbookToast || !guestbookToastMessage) {
    return;
  }

  window.clearTimeout(guestbookToastTimer);
  guestbookToastMessage.textContent = message;
  guestbookToast.classList.add("is-visible");

  guestbookToastTimer = window.setTimeout(() => {
    guestbookToast.classList.remove("is-visible");
  }, 2800);
}

function readCachedGuestbookEntry() {
  try {
    const entry = JSON.parse(window.localStorage.getItem(guestbookStorageKey));
    if (!entry || typeof entry.message !== "string" || !entry.message.trim()) {
      return null;
    }
    return entry;
  } catch {
    return null;
  }
}

function formatGuestbookTime(timestamp) {
  const date = new Date(timestamp);
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;
  const pad = (value) => String(value).padStart(2, "0");
  return `${safeDate.getFullYear()}-${pad(safeDate.getMonth() + 1)}-${pad(safeDate.getDate())} ${pad(safeDate.getHours())}:${pad(safeDate.getMinutes())}`;
}

function renderGuestbookEntry(entry) {
  if (!guestbookMessageList || guestbookMessageList.querySelector("[data-player-guestbook-entry]")) {
    return;
  }

  const article = document.createElement("article");
  const head = document.createElement("div");
  const author = document.createElement("strong");
  const guestId = document.createElement("span");
  const time = document.createElement("time");
  const message = document.createElement("p");

  article.className = "message";
  article.dataset.playerGuestbookEntry = "true";
  head.className = "message-head";
  author.className = "message-author";
  guestId.className = "message-id";

  author.textContent = String(entry.nickname || "匿名").trim() || "匿名";
  guestId.textContent = "guest2094";
  time.textContent = formatGuestbookTime(entry.createdAt);
  time.dateTime = entry.createdAt;
  message.textContent = entry.message;

  head.append(author, guestId, time);
  article.append(head, message);
  guestbookMessageList.appendChild(article);
}

function publishGuestbookEntry() {
  if (cachedGuestbookEntry) {
    showGuestbookToast("你已经发表一次观点了，请给其他同学留点位置奥");
    return;
  }

  const message = guestbookMessage?.value.trim() || "";
  if (!message) {
    showGuestbookToast("请输入留言内容。");
    guestbookMessage?.focus();
    return;
  }

  cachedGuestbookEntry = {
    nickname: guestbookName?.value.trim() || "匿名",
    message,
    createdAt: new Date().toISOString()
  };

  try {
    window.localStorage.setItem(guestbookStorageKey, JSON.stringify(cachedGuestbookEntry));
  } catch {
    // 即使浏览器禁用了本地存储，本次会话仍保持只能发表一次。
  }

  renderGuestbookEntry(cachedGuestbookEntry);
  if (guestbookMessage) guestbookMessage.value = "";
  showGuestbookToast("留言发表成功。");
}

if (cachedGuestbookEntry) {
  renderGuestbookEntry(cachedGuestbookEntry);
}

if (guestbookSubmit) {
  guestbookSubmit.addEventListener("click", publishGuestbookEntry);
}

if (guestbookForm) {
  guestbookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    publishGuestbookEntry();
  });
}

const photoPreviewTriggers = document.querySelectorAll(".photo-preview-trigger");
const photoLightbox = document.querySelector("#photoLightbox");
const photoLightboxImage = document.querySelector("#photoLightboxImage");
let activePhotoPreviewTrigger;

function openPhotoLightbox(photo) {
  if (!photoLightbox || !photoLightboxImage) {
    return;
  }

  activePhotoPreviewTrigger = photo;
  photoLightboxImage.src = photo.currentSrc || photo.src;
  photoLightboxImage.alt = photo.alt;
  photoLightbox.classList.add("is-open");
  photoLightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("photo-lightbox-open");
  photoLightbox.focus();
}

function closePhotoLightbox() {
  if (!photoLightbox || !photoLightboxImage) {
    return;
  }

  photoLightbox.classList.remove("is-open");
  photoLightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("photo-lightbox-open");
  photoLightboxImage.removeAttribute("src");
  activePhotoPreviewTrigger?.focus();
}

photoPreviewTriggers.forEach((photo) => {
  photo.addEventListener("click", () => {
    openPhotoLightbox(photo);
  });

  photo.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPhotoLightbox(photo);
    }
  });
});

if (photoLightbox) {
  photoLightbox.addEventListener("click", (event) => {
    if (event.target === photoLightbox) {
      closePhotoLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && photoLightbox?.classList.contains("is-open")) {
    closePhotoLightbox();
  }
});
