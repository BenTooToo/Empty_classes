const addressQuery = document.querySelector("#addressQuery");
const queryModal = document.querySelector("#pancakeQueryModal");
const confirmStep = document.querySelector("#queryConfirmStep");
const loadingStep = document.querySelector("#queryLoadingStep");
const resultStep = document.querySelector("#queryResultStep");
const loadingBar = document.querySelector("#surveillanceLoadingBar");
const loadingNumber = document.querySelector("#surveillanceLoadingNumber");
const closeQueryModal = document.querySelector("#closeQueryModal");
const officeSurveillanceVideo = document.querySelector("#officeSurveillanceVideo");
const confirmButtons = document.querySelectorAll("[data-query-confirm]");
const installationInvite = document.querySelector("#installationInvite");
const closeInstallationInvite = document.querySelector("#closeInstallationInvite");
const installationTimeButtons = document.querySelectorAll("[data-installation-time]");
let installationInviteTimer;

function normalizeAddressPart(value) {
  return value.trim().replace(/\s+/g, "").replace(/[７]/g, "7").replace(/[８]/g, "8");
}

function showQueryModal() {
  window.clearTimeout(installationInviteTimer);
  installationInvite.classList.remove("is-visible");
  installationInvite.setAttribute("aria-hidden", "true");
  confirmStep.hidden = false;
  loadingStep.hidden = true;
  resultStep.hidden = true;
  loadingBar.style.width = "0%";
  loadingNumber.textContent = "0%";
  queryModal.classList.add("is-open");
  queryModal.setAttribute("aria-hidden", "false");
  confirmButtons[0].focus();
}

function loadSurveillance() {
  confirmStep.hidden = true;
  loadingStep.hidden = false;
  let progress = 0;

  const timer = window.setInterval(() => {
    progress += Math.floor(Math.random() * 9) + 3;
    progress = Math.min(progress, 100);
    loadingBar.style.width = `${progress}%`;
    loadingNumber.textContent = `${progress}%`;

    if (progress === 100) {
      window.clearInterval(timer);
      window.setTimeout(() => {
        loadingStep.hidden = true;
        resultStep.hidden = false;
        officeSurveillanceVideo.currentTime = 0;
        officeSurveillanceVideo.play().catch(() => {});
        closeQueryModal.focus();
        installationInviteTimer = window.setTimeout(() => {
          installationInvite.classList.add("is-visible");
          installationInvite.setAttribute("aria-hidden", "false");
        }, 5000);
      }, 350);
    }
  }, 130);
}

addressQuery.addEventListener("submit", (event) => {
  event.preventDefault();
  const road = normalizeAddressPart(addressQuery.elements.road.value);
  const houseNumber = normalizeAddressPart(addressQuery.elements["house-number"].value);

  if (road === "苍松7路" && ["78", "78号"].includes(houseNumber)) {
    showQueryModal();
    return;
  }

  window.alert("查询完成：该位置不存在本公司服务。什么也不会发生。");
});

confirmButtons.forEach((button) => button.addEventListener("click", loadSurveillance));

closeQueryModal.addEventListener("click", () => {
  officeSurveillanceVideo.pause();
  officeSurveillanceVideo.currentTime = 0;
  queryModal.classList.remove("is-open");
  queryModal.setAttribute("aria-hidden", "true");
});

closeInstallationInvite.addEventListener("click", () => {
  installationInvite.classList.remove("is-visible");
  installationInvite.setAttribute("aria-hidden", "true");
});

function getLocalInstallationDate(time) {
  const [hours, minutes] = time.split(":").map(Number);
  const now = new Date();
  const installationDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );

  if (installationDate <= now) {
    installationDate.setDate(installationDate.getDate() + 1);
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(installationDate);
}

installationTimeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const installationTime = button.dataset.installationTime;
    const installationDate = getLocalInstallationDate(installationTime);
    window.alert(`已预约 ${installationDate} ${installationTime}。安装地点：你的卧室。`);
    installationInvite.classList.remove("is-visible");
    installationInvite.setAttribute("aria-hidden", "true");
  });
});
