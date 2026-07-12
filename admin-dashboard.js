const fileLinks = document.querySelectorAll(".role-file-list a");
const exitLinks = document.querySelectorAll(".role-admin-exit");
const loadingOverlay = document.createElement("div");
const logoutOverlay = document.createElement("div");

loadingOverlay.className = "role-file-loading-overlay";
loadingOverlay.hidden = true;
loadingOverlay.innerHTML = `
  <div class="role-file-loading-box" role="status" aria-live="polite">
    <div class="role-file-loading-ring" id="roleFileLoadingRing"></div>
    <p id="roleFileLoadingText">正在读取文件...</p>
  </div>
  <form class="role-file-interrupt-dialog" id="roleFileInterruptDialog" autocomplete="off" hidden>
    <strong>读取故障</strong>
    <p>该网站已经被<span class="encrypted-redaction" aria-label="加密内容">██████</span>加密，请输入密匙进入。</p>
    <label for="roleFileSecret">密匙</label>
    <input id="roleFileSecret" type="password" autocomplete="off" required>
    <button type="submit">继续读取</button>
    <output id="roleFileSecretMessage" aria-live="polite"></output>
  </form>
`;

logoutOverlay.className = "role-logout-loading-overlay";
logoutOverlay.hidden = true;
logoutOverlay.innerHTML = `
  <div class="role-logout-loading-box" role="status" aria-live="polite">
    <p>正在退出登录...</p>
    <div class="role-logout-loading-track">
      <span id="roleLogoutLoadingBar"></span>
    </div>
  </div>
`;

document.body.appendChild(loadingOverlay);
document.body.appendChild(logoutOverlay);

const loadingRing = document.querySelector("#roleFileLoadingRing");
const loadingText = document.querySelector("#roleFileLoadingText");
const interruptDialog = document.querySelector("#roleFileInterruptDialog");
const secretInput = document.querySelector("#roleFileSecret");
const secretMessage = document.querySelector("#roleFileSecretMessage");
const logoutLoadingBar = document.querySelector("#roleLogoutLoadingBar");
let loadingStarted = false;
let logoutStarted = false;

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
    const isSoulReturnLog = new URL(href).pathname.endsWith("/admin-soul-return-game.html");
    const duration = 1500;
    const startedAt = performance.now();

    function updateProgress(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      loadingRing.style.setProperty("--file-progress", `${progress * 360}deg`);

      if (isSoulReturnLog && progress >= 0.5) {
        loadingRing.style.setProperty("--file-progress", "180deg");
        loadingText.textContent = "读取在 50% 处发生故障";
        interruptDialog.hidden = false;
        secretInput.focus();

        interruptDialog.onsubmit = (submitEvent) => {
          submitEvent.preventDefault();
          if (secretInput.value !== "pieux") {
            secretMessage.textContent = "密匙错误";
            secretInput.value = "";
            secretInput.focus();
            return;
          }

          sessionStorage.setItem("soulReturnUnlocked", "true");
          interruptDialog.hidden = true;
          loadingText.textContent = "密匙正确，继续读取文件...";
          const resumedAt = performance.now();

          function resumeProgress(resumeNow) {
            const resumed = Math.min((resumeNow - resumedAt) / (duration / 2), 1);
            const resumedProgress = 0.5 + resumed * 0.5;
            loadingRing.style.setProperty("--file-progress", `${resumedProgress * 360}deg`);
            if (resumed < 1) {
              window.requestAnimationFrame(resumeProgress);
              return;
            }
            window.location.assign(href);
          }

          window.requestAnimationFrame(resumeProgress);
        };
        return;
      }

      if (progress < 1) {
        window.requestAnimationFrame(updateProgress);
        return;
      }

      window.location.assign(href);
    }

    window.requestAnimationFrame(updateProgress);
  });
});

exitLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();

    if (logoutStarted) {
      return;
    }

    logoutStarted = true;
    logoutOverlay.hidden = false;
    logoutLoadingBar.style.width = "0%";

    const href = link.href;
    const duration = 520;
    const startedAt = performance.now();

    function updateProgress(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      logoutLoadingBar.style.width = `${Math.max(8, progress * 100)}%`;

      if (progress < 1) {
        window.requestAnimationFrame(updateProgress);
        return;
      }

      sessionStorage.removeItem("zt6AdminAccount");
      sessionStorage.removeItem("zt6AdminDisplayName");
      window.location.assign(href);
    }

    window.requestAnimationFrame(updateProgress);
  });
});
