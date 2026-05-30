(() => {
  const inputs = Array.from(document.querySelectorAll("[data-history-key]"));
  const maxItems = 5;
  const storagePrefix = "zt6InputHistory:";
  let activeInput = null;

  if (!inputs.length || !window.localStorage) {
    return;
  }

  const menu = document.createElement("div");
  menu.className = "input-history-menu";
  menu.hidden = true;
  document.body.appendChild(menu);

  function storageKey(input) {
    return `${storagePrefix}${input.dataset.historyKey}`;
  }

  function readHistory(input) {
    try {
      const value = window.localStorage.getItem(storageKey(input));
      const items = value ? JSON.parse(value) : [];
      return Array.isArray(items) ? items.filter((item) => typeof item === "string") : [];
    } catch {
      return [];
    }
  }

  function writeHistory(input, items) {
    window.localStorage.setItem(storageKey(input), JSON.stringify(items.slice(0, maxItems)));
  }

  function remember(input) {
    const value = input.value.trim();

    if (!value) {
      return;
    }

    const nextItems = [
      value,
      ...readHistory(input).filter((item) => item !== value)
    ].slice(0, maxItems);

    writeHistory(input, nextItems);
  }

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function hideMenu() {
    menu.hidden = true;
    activeInput = null;
  }

  function positionMenu(input) {
    const rect = input.getBoundingClientRect();

    menu.style.left = `${window.scrollX + rect.left}px`;
    menu.style.top = `${window.scrollY + rect.bottom + 2}px`;
    menu.style.width = `${rect.width}px`;
  }

  function renderMenu(input) {
    const history = readHistory(input);

    if (!history.length) {
      hideMenu();
      return;
    }

    activeInput = input;
    menu.innerHTML = history.map((item) => (
      `<button type="button" class="input-history-item">${escapeHtml(item)}</button>`
    )).join("");
    positionMenu(input);
    menu.hidden = false;
  }

  inputs.forEach((input) => {
    input.setAttribute("autocomplete", "off");

    input.addEventListener("focus", () => renderMenu(input));
    input.addEventListener("input", () => renderMenu(input));
    input.addEventListener("blur", () => {
      remember(input);
      window.setTimeout(() => {
        if (!menu.matches(":hover")) {
          hideMenu();
        }
      }, 120);
    });
  });

  document.addEventListener("submit", (event) => {
    event.target.querySelectorAll?.("[data-history-key]").forEach(remember);
  }, true);

  document.addEventListener("click", (event) => {
    if (event.target.closest(".input-history-menu")) {
      return;
    }

    const formButton = event.target.closest("button");
    if (formButton?.form) {
      formButton.form.querySelectorAll("[data-history-key]").forEach(remember);
      return;
    }

    if (!event.target.closest("[data-history-key]")) {
      hideMenu();
    }
  });

  menu.addEventListener("mousedown", (event) => {
    event.preventDefault();

    const button = event.target.closest(".input-history-item");
    if (!button || !activeInput) {
      return;
    }

    activeInput.value = button.textContent;
    activeInput.dispatchEvent(new Event("input", { bubbles: true }));
    activeInput.focus();
    hideMenu();
  });

  window.addEventListener("resize", () => {
    if (activeInput && !menu.hidden) {
      positionMenu(activeInput);
    }
  });

  window.addEventListener("scroll", () => {
    if (activeInput && !menu.hidden) {
      positionMenu(activeInput);
    }
  }, true);

  if (document.activeElement?.matches("[data-history-key]")) {
    renderMenu(document.activeElement);
  }
})();
