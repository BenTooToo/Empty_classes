const darkness = document.querySelector('.committee-darkness');
const loginForm = document.querySelector('#committeeLoginForm');
const loginMessage = document.querySelector('#committeeLoginMessage');

function moveLight(event) {
  document.documentElement.style.setProperty('--committee-light-x', `${event.clientX}px`);
  document.documentElement.style.setProperty('--committee-light-y', `${event.clientY}px`);
}

window.addEventListener('pointermove', moveLight, { passive: true });

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const realName = document.querySelector('#committeeRealName').value.trim();
  const password = document.querySelector('#committeePassword').value;

  if (realName === '梁致远' && password === 'pieux') {
    sessionStorage.setItem('heysirAuthorized', 'true');
    loginMessage.textContent = '姓名已被旧档案承认。';
    document.body.classList.add('committee-access-granted');
    window.setTimeout(() => location.assign('33-heysir-roster.html'), 700);
    return;
  }

  loginMessage.textContent = '该姓名未被长桌记住，或密语有误。';
  loginForm.classList.remove('committee-login-error');
  void loginForm.offsetWidth;
  loginForm.classList.add('committee-login-error');
});
