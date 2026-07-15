const unlockCode = "6415";
const pinForm = document.querySelector("#pinForm");
const pinInputs = Array.from(document.querySelectorAll(".pin-box"));
const pinError = document.querySelector("#pinError");
const unlockPanel = document.querySelector("#hashUnlockPanel");
const loadingPanel = document.querySelector("#hashLoadingPanel");
const toolPanel = document.querySelector("#hashToolPanel");
const lockoutPanel = document.querySelector("#hashLockoutPanel");
const recoveryInput = document.querySelector("#hashRecoveryInput");
const recoverySuccess = document.querySelector("#hashRecoverySuccess");
const jumpscare = document.querySelector("#hashJumpscare");
const dateForm = document.querySelector("#hashDateForm");
const dateInput = document.querySelector("#hashDateInput");
const hashOutput = document.querySelector("#hashOutput");
const digits = ["", "", "", ""];
const diaryDatePassword = "20160304";
const fixedPassword = "6D3F8A91C4E72B0F9A5D13E8B6C0472AD9F01C35E8B64A7F2D0C93B18E5A4F6D";
const lockProgramStorageKey = "hash-lock-program-disabled";
let failedAttempts = 0;
let consoleLocked = false;
let jumpscareTriggered = false;
let lockProgramDisabled = loadLockProgramState();

function loadLockProgramState() {
  try {
    return window.localStorage.getItem(lockProgramStorageKey) === "true";
  } catch (error) {
    return false;
  }
}

function saveLockProgramState() {
  try {
    window.localStorage.setItem(lockProgramStorageKey, "true");
  } catch (error) {
    // 浏览器禁用本地存储时，本次页面内仍然保持解锁状态。
  }
}

async function sha256(value) {
  if (!crypto.subtle) {
    let hash = 2166136261;

    for (const char of value) {
      hash ^= char.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }

    return Array.from({ length: 8 }, (_, index) => {
      return ((hash >>> ((index % 4) * 8)) & 255).toString(16).padStart(2, "0");
    }).join("").repeat(4);
  }

  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function clearPin() {
  digits.fill("");
  pinInputs.forEach((input) => {
    input.value = "";
  });
  pinInputs[0].focus();
}

function showPinError() {
  pinError.hidden = false;
  window.setTimeout(() => {
    pinError.hidden = true;
  }, 1400);
  clearPin();
}

function lockPasswordConsole() {
  consoleLocked = true;
  unlockPanel.hidden = true;
  loadingPanel.hidden = true;
  toolPanel.hidden = true;
  lockoutPanel.hidden = false;
  window.setTimeout(() => recoveryInput.focus(), 80);
}

function triggerJumpscare() {
  if (jumpscareTriggered) {
    return;
  }

  jumpscareTriggered = true;
  jumpscare.hidden = false;
  jumpscare.setAttribute("aria-hidden", "false");
  document.body.classList.add("hash-jumpscare-active");

  window.setTimeout(() => {
    jumpscare.classList.add("is-ending");

    window.setTimeout(() => {
      jumpscare.hidden = true;
      jumpscare.setAttribute("aria-hidden", "true");
      jumpscare.classList.remove("is-ending");
      document.body.classList.remove("hash-jumpscare-active");

      consoleLocked = false;
      lockProgramDisabled = true;
      saveLockProgramState();
      failedAttempts = 0;
      recoveryInput.value = "";
      lockoutPanel.hidden = true;
      unlockPanel.hidden = false;
      recoverySuccess.hidden = false;
      clearPin();
    }, 360);
  }, 2000);
}

function openHashTool() {
  unlockPanel.hidden = true;
  loadingPanel.hidden = false;

  window.setTimeout(() => {
    loadingPanel.hidden = true;
    toolPanel.hidden = false;
    dateInput.focus();
  }, 2300);
}

function validatePin() {
  if (consoleLocked) {
    return;
  }

  if (digits.some((digit) => !digit)) {
    return;
  }

  if (digits.join("") === unlockCode) {
    openHashTool();
    return;
  }

  if (lockProgramDisabled) {
    showPinError();
    return;
  }

  failedAttempts += 1;

  if (failedAttempts >= 3) {
    lockPasswordConsole();
    return;
  }

  showPinError();
}

pinInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    const nextDigit = input.value.replace(/\D/g, "").slice(-1);

    if (!nextDigit) {
      input.value = "";
      digits[index] = "";
      return;
    }

    digits[index] = nextDigit;
    input.value = "*";

    if (index < pinInputs.length - 1) {
      pinInputs[index + 1].focus();
    }

    window.setTimeout(validatePin, 120);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Backspace") {
      return;
    }

    event.preventDefault();
    digits[index] = "";
    input.value = "";

    if (index > 0) {
      pinInputs[index - 1].focus();
    }
  });
});

pinForm.addEventListener("submit", (event) => {
  event.preventDefault();
  validatePin();
});

recoveryInput.addEventListener("input", () => {
  const command = recoveryInput.value.trim().toLowerCase();

  if (command.startsWith("unlo")) {
    triggerJumpscare();
  }
});

dateForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputValue = dateInput.value.trim();

  if (inputValue === diaryDatePassword) {
    hashOutput.textContent = fixedPassword;
    return;
  }

  if (!inputValue) {
    hashOutput.textContent = "";
    return;
  }

  const hash = await sha256(inputValue);
  hashOutput.textContent = hash.toUpperCase();
});

if (lockProgramDisabled) {
  recoverySuccess.hidden = false;
}

pinInputs[0].focus();
