(() => {
  const totalMainPages = 33;
  const totalExtraPages = 6;
  const mainPages = {
    "school.html": 1,
    "03-photo-submit-notice.html": 2,
    "04-stop-maintenance-notice.html": 3,
    "05-class-album.html": 4,
    "09-student-roster.html": 5,
    "10-info-diary-01.html": 28,
    "28-zhang-yuhang-call-record.html": 7,
    "24-lin-ruoxuan-profile.html": 8,
    "25-lin-ruoxuan-news.html": 9,
    "29-ghost-girl-news.html": 10,
    "31-omoyeta-ritual-thread.html": 11,
    "admin.html": 12,
    "admin-monitor-dashboard.html": 13,
    "admin-soul-return-game.html": 16,
    "admin-hash-cracker.html": 17,
    "35-pancake-control.html": 18,
    "admin-art-dashboard.html": 19,
    "admin-sports-dashboard.html": 22,
    "34-author-note.html": 26,
    "admin-info-dashboard.html": 27,
    "admin-surveillance-console.html": 30,
    "23-true-ending.html": 31,
    "36-ending-good.html": 32,
    "37-ending-desire.html": 33
  };

  const dynamicMainPages = {
    "monitor:absence-correction": 6,
    "monitor:monitor-diary": 14,
    "monitor:monitor-chat": 15,
    "art:art-diary": 20,
    "art:soul-return-ritual": 21,
    "sports:hospital-report": 23,
    "sports:sports-info-removal": 24,
    "sports:sports-familiar-self": 25,
    "info:info-diary-02": 29
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
