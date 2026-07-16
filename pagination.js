(() => {
  try {
    document.documentElement.classList.toggle(
      "reduced-stimulation",
      window.localStorage.getItem("zhetang6_reduced_stimulation_v1") === "true"
    );
  } catch {
    // 本地存储不可用时保持普通版本。
  }

  const fileName = decodeURIComponent(window.location.pathname.split("/").pop() || "");

  function setSiteIcon() {
    const icons = {
      yearbook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><radialGradient id="g" cx="35%" cy="28%"><stop stop-color="#bce5ff"/><stop offset=".35" stop-color="#378ee8"/><stop offset="1" stop-color="#064899"/></radialGradient></defs><circle cx="16" cy="16" r="13" fill="url(#g)" stroke="#043b7d" stroke-width="2"/></svg>`,
      camera: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="5" fill="#161a1d"/><path d="M5 10h15a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3Z" fill="#aeb8be"/><path d="m23 14 7-4v14l-7-4Z" fill="#77858d"/><circle cx="13" cy="17" r="5" fill="#263238"/><circle cx="13" cy="17" r="2.5" fill="#60c8ff"/></svg>`,
      entertainment: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="5" fill="#d51f32"/><text x="16" y="23" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="700" fill="white">娱</text></svg>`,
      baike: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="5" fill="#f3f6f8"/><circle cx="13" cy="13" r="8" fill="none" stroke="#263746" stroke-width="4"/><path d="m19 19 9 9" stroke="#263746" stroke-width="4" stroke-linecap="round"/></svg>`,
      pancake: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="5" fill="#fff1c8"/><ellipse cx="16" cy="22" rx="13" ry="6" fill="#b96d20"/><ellipse cx="16" cy="18" rx="13" ry="6" fill="#df9635"/><ellipse cx="16" cy="14" rx="13" ry="6" fill="#f0b553"/><rect x="13" y="9" width="7" height="6" rx="1" fill="#ffe66f"/></svg>`,
      default: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="3" y="3" width="26" height="26" rx="2" fill="#050505" stroke="#777" stroke-width="2"/></svg>`
    };
    const yearbookPages = new Set([
      "school.html",
      "03-photo-submit-notice.html",
      "04-stop-maintenance-notice.html",
      "05-class-album.html",
      "09-student-roster.html"
    ]);
    const cameraPages = new Set([
      "admin-monitor-dashboard.html",
      "admin-surveillance-console.html"
    ]);
    const body = document.body;
    let icon = icons.default;

    if (yearbookPages.has(fileName)) {
      icon = icons.yearbook;
    } else if (cameraPages.has(fileName)) {
      icon = icons.camera;
    } else if (body.classList.contains("ending-choice-page")
      || body.classList.contains("memoir-page")
      || body.classList.contains("ending-forum-page")
      || body.classList.contains("ending-minus-one-page")) {
      icon = icons.default;
    } else if (body.classList.contains("ent-news-page")) {
      icon = icons.entertainment;
    } else if (body.classList.contains("baike-page")) {
      icon = icons.baike;
    } else if (fileName === "35-pancake-control.html") {
      icon = icons.pancake;
    }

    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/svg+xml";
    link.href = `data:image/svg+xml,${encodeURIComponent(icon)}`;
  }

  setSiteIcon();

  const totalMainPages = 34;
  const totalExtraPages = 6;
  const mainPages = {
    "school.html": 1,
    "03-photo-submit-notice.html": 2,
    "04-stop-maintenance-notice.html": 3,
    "05-class-album.html": 4,
    "09-student-roster.html": 5,
    "39-liang-zhiyuan-news.html": 7,
    "28-zhang-yuhang-call-record.html": 8,
    "24-lin-ruoxuan-profile.html": 9,
    "25-lin-ruoxuan-news.html": 10,
    "29-ghost-girl-news.html": 11,
    "31-omoyeta-ritual-thread.html": 12,
    "admin.html": 13,
    "admin-monitor-dashboard.html": 14,
    "admin-soul-return-game.html": 17,
    "admin-hash-cracker.html": 18,
    "35-pancake-control.html": 19,
    "admin-art-dashboard.html": 20,
    "admin-sports-dashboard.html": 23,
    "34-author-note.html": 27,
    "admin-info-dashboard.html": 28,
    "10-info-diary-01.html": 29,
    "admin-surveillance-console.html": 31,
    "23-true-ending.html": 32,
    "36-ending-good.html": 33,
    "37-ending-desire.html": 34
  };

  const dynamicMainPages = {
    "monitor:absence-correction": 6,
    "monitor:monitor-diary": 15,
    "monitor:monitor-chat": 16,
    "art:art-diary": 21,
    "art:soul-return-ritual": 22,
    "sports:hospital-report": 24,
    "sports:sports-info-removal": 25,
    "sports:sports-familiar-self": 26,
    "info:info-diary-02": 30
  };

  const extraPages = {
    "06-zhetang-six-intro.html": 1,
    "26-fuanfan-counseling-notice.html": 2,
    "27-ben2tu-profile.html": 3,
    "30-hash-function-intro.html": 4,
    "32-heysir-committee.html": 5,
    "38-heixiang-forum-intro.html": 6
  };

  let pageNumber = mainPages[fileName];

  if (fileName === "admin-file-view.html") {
    const params = new URLSearchParams(window.location.search);
    pageNumber = dynamicMainPages[`${params.get("role")}:${params.get("file")}`];
  }

  const extraNumber = extraPages[fileName];
  if (!pageNumber && !extraNumber) {
    return;
  }

  const label = extraNumber
    ? `ex${extraNumber}/${totalExtraPages}`
    : `${pageNumber}/${totalMainPages}`;
  const accessibleLabel = extraNumber
    ? `Extra 第 ${extraNumber} 页，共 ${totalExtraPages} 页`
    : `游戏主线第 ${pageNumber} 页，共 ${totalMainPages} 页`;

  let pageNote = document.querySelector(".page-index-note");
  if (!pageNote) {
    pageNote = document.createElement("span");
    pageNote.className = "page-index-note page-index-note-fixed";
    document.body.appendChild(pageNote);
  }

  pageNote.setAttribute("aria-label", accessibleLabel);
  pageNote.textContent = label;
})();
