(() => {
  const updateLight = (event) => {
    document.documentElement.style.setProperty('--committee-light-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--committee-light-y', `${event.clientY}px`);
  };

  window.addEventListener('pointermove', updateLight, { passive: true });
  window.addEventListener('pointerdown', updateLight, { passive: true });
})();
