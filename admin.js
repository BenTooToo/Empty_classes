const accounts = [
  {
    id: "monitor",
    displayName: "班长",
    aliases: ["northdoor"],
    passwords: ["silentbell"],
    href: "pages/admin-monitor-dashboard.html"
  },
  {
    id: "art",
    displayName: "美术委员",
    aliases: ["redcanvas"],
    passwords: ["shadowpaint"],
    href: "pages/admin-art-dashboard.html"
  },
  {
    id: "sports",
    displayName: "体育委员",
    aliases: ["cleartrack"],
    passwords: ["morningrun"],
    href: "pages/admin-sports-dashboard.html"
  },
  {
    id: "info",
    displayName: "信息委员",
    aliases: ["quietarchive"],
    passwords: ["paperdoor"],
    href: "pages/admin-info-dashboard.html"
  }
];

const loginForm = document.querySelector("#adminLoginForm");
const usernameInput = document.querySelector("#adminUsername");
const passwordInput = document.querySelector("#adminPassword");
const message = document.querySelector("#adminMessage");
const adminState = document.querySelector("#adminState");
const loginPanel = document.querySelector("#loginPanel");
const loadingPanel = document.querySelector("#loadingPanel");
const loadingLine = document.querySelector("#loadingLine");
const loadingBar = document.querySelector("#loadingBar");

const loadingSteps = [
  { text: "正在验证账号权限...", width: "26%" },
  { text: "正在读取后台文件列表...", width: "54%" },
  { text: "正在恢复只读镜像...", width: "78%" },
  { text: "验证通过，正在打开后台...", width: "100%" }
];

function normalize(value) {
  return value.trim().toLowerCase();
}

function findAccount(username, password) {
  const normalizedUsername = normalize(username);
  const trimmedPassword = password.trim();
  const normalizedPassword = normalize(password);

  return accounts.find((account) => {
    const aliasMatched = account.aliases.some((alias) => normalize(alias) === normalizedUsername);
    const passwordMatched = account.passwords.some((item) => {
      return item === trimmedPassword || normalize(item) === normalizedPassword;
    });

    return aliasMatched && passwordMatched;
  });
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const account = findAccount(usernameInput.value, passwordInput.value);

  if (!account) {
    adminState.textContent = "验证失败";
    message.textContent = "用户名或密码不正确。";
    passwordInput.value = "";
    passwordInput.focus();
    return;
  }

  sessionStorage.setItem("zt6AdminAccount", account.id);
  sessionStorage.setItem("zt6AdminDisplayName", account.displayName);
  adminState.textContent = "验证通过";
  message.textContent = "";
  loginPanel.hidden = true;
  loadingPanel.hidden = false;

  loadingSteps.forEach((step, index) => {
    window.setTimeout(() => {
      loadingLine.textContent = step.text;
      loadingBar.style.width = step.width;
    }, index * 420);
  });

  window.setTimeout(() => {
    window.location.assign(account.href);
  }, loadingSteps.length * 420 + 260);
});

usernameInput.focus();
