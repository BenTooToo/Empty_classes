const thread = document.querySelector('#thread');
const sentinel = document.querySelector('#ritualInfiniteSentinel');
const pad = (value) => String(value).padStart(2, '0');
let nextFloor = 9;
let loading = false;

function formatReplyTime() {
  const now = new Date();
  return `2016-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

function appendReplies(amount = 10) {
  if (loading) return;
  loading = true;
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < amount; index += 1) {
    const floor = nextFloor++;
    const label = formatReplyTime();
    const post = document.createElement('article');
    post.className = 'forum-post ritual-confirmed-post ritual-generated-post';
    post.innerHTML = `
      <div class="post-user"><strong>${floor}楼</strong><span>游客</span></div>
      <div class="post-body"><time datetime="${label.replace(' ', 'T')}">${label}</time><p>已经灵验，谢谢楼主。</p></div>
    `;
    fragment.appendChild(post);
  }

  thread.insertBefore(fragment, sentinel);
  loading = false;
}

appendReplies(12);

const replyObserver = new IntersectionObserver((entries) => {
  if (entries.some((entry) => entry.isIntersecting)) {
    appendReplies(12);
  }
}, { rootMargin: '500px 0px' });

replyObserver.observe(sentinel);
