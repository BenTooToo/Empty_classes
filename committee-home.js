(() => {
  try {
    window.localStorage.setItem('zhetang6_visited_heysir_committee_v1', 'true');
  } catch {
    // 本地存储不可用时，页面本身仍可正常浏览。
  }

  const updateLight = (event) => {
    document.documentElement.style.setProperty('--committee-light-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--committee-light-y', `${event.clientY}px`);
  };

  window.addEventListener('pointermove', updateLight, { passive: true });
  window.addEventListener('pointerdown', updateLight, { passive: true });
})();
