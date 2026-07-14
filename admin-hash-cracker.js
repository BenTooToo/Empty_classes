const unlockCode = "6415";
const pinForm = document.querySelector("#pinForm");
const pinInputs = Array.from(document.querySelectorAll(".pin-box"));
const pinError = document.querySelector("#pinError");
const unlockPanel = document.querySelector("#hashUnlockPanel");
const loadingPanel = document.querySelector("#hashLoadingPanel");
const toolPanel = document.querySelector("#hashToolPanel");
const dateForm = document.querySelector("#hashDateForm");
const dateInput = document.querySelector("#hashDateInput");
const hashOutput = document.querySelector("#hashOutput");
const digits = ["", "", "", ""];
const diaryDatePassword = "20160304";
const fixedPassword = "6D3F8A91C4E72B0F9A5D13E8B6C0472AD9F01C35E8B64A7F2D0C93B18E5A4F6D";

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
  if (digits.some((digit) => !digit)) {
    return;
  }

  if (digits.join("") === unlockCode) {
    openHashTool();
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

pinInputs[0].focus();
