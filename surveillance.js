const clock = document.querySelector('#surveillanceClock');

function updateClock() {
  clock.textContent = new Date().toLocaleTimeString('zh-CN', { hour12: false });
}
updateClock();
setInterval(updateClock, 1000);
