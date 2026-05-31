const fileLinks = document.querySelectorAll(".role-file-list a");
const loadingOverlay = document.createElement("div");

loadingOverlay.className = "role-file-loading-overlay";
loadingOverlay.hidden = true;
loadingOverlay.innerHTML = `
  <div class="role-file-loading-box" role="status" aria-live="polite">
    <div class="role-file-loading-ring" id="roleFileLoadingRing"></div>
    <p>正在读取文件...</p>
  </div>
`;

document.body.appendChild(loadingOverlay);

const loadingRing = document.querySelector("#roleFileLoadingRing");
let loadingStarted = false;

fileLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();

    if (loadingStarted) {
      return;
    }

    loadingStarted = true;
    loadingOverlay.hidden = false;

    const href = link.href;
    const duration = 1500;
    const startedAt = performance.now();

    function updateProgress(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      loadingRing.style.setProperty("--file-progress", `${progress * 360}deg`);

      if (progress < 1) {
        window.requestAnimationFrame(updateProgress);
        return;
      }

      window.location.assign(href);
    }

    window.requestAnimationFrame(updateProgress);
  });
});
