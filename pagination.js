(() => {
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

  const fileName = decodeURIComponent(window.location.pathname.split("/").pop() || "");
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
