if (sessionStorage.getItem('soulReturnUnlocked') !== 'true') {
  window.location.replace('admin-monitor-dashboard.html');
}

const canvas = document.querySelector('#soulDungeonCanvas');
const context = canvas.getContext('2d', { alpha: false });
const stage = document.querySelector('#soul3dStage');
const nearbyRecord = document.querySelector('#soulNearbyRecord');
const nearbyName = document.querySelector('#soulNearbyName');
const nearbyRole = document.querySelector('#soulNearbyRole');
const nearbyStatus = document.querySelector('#soulNearbyStatus');
const mouseGuide = document.querySelector('#soulMouseGuide');
const mirrorNote = document.querySelector('#soulMirrorNote');
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const FOV = Math.PI / 3;
const keys = new Set();

const map = [
  '11111111111111',
  '10000000000001',
  '10000000000001',
  '10000000000001',
  '10000000000001',
  '10000000000001',
  '10000000000001',
  '10000000000001',
  '10000000000001',
  '10000000000001',
  '10000000000001',
  '10000000000001',
  '12222200222221',
  '12222200222221',
  '12222200222221',
  '12222200222221',
  '12222200222221',
  '12222200222221',
  '12222200222221',
  '12222200222221',
  '12222200222221',
  '12222200222221',
  '12222200222221',
  '12222200222221',
  '12222000022221',
  '12222000022221',
  '11111111111111'
];

const camera = { x: 6.7, y: 25.5, angle: -Math.PI / 2 };
const portraits = [
  { x:2.1, y:1.16, width:.86, letter:'O', name:'肖青', role:'体育委员', status:'灵魂完好', image:'../pics/broken-mirror-portrait.svg' },
  { x:4.55, y:1.16, width:.86, letter:'H', name:'魏兆', role:'班长的朋友之一', status:'失去灵魂', image:'../pics/friend1.png' },
  { x:7, y:1.16, width:.86, letter:'X', name:'方砚', role:'班长的朋友之二', status:'失去灵魂', image:'../pics/friend2.png' },
  { x:9.45, y:1.16, width:.86, letter:'A', name:'林若萱', role:'美术委员', status:'失去灵魂', image:'../lin-ruoxuan.png' },
  { x:11.9, y:1.16, width:.86, letter:'S', name:'梁致远', role:'班长', status:'失去灵魂', image:'../pics/admin.png' }
];

const correctPortraitSequence = 'SHXAO';
let sequenceIndex = 0;
let nearbyPortrait = null;
let puzzleLocked = false;
let solvedAt = 0;
let viewActivated = false;

portraits.forEach((portrait) => {
  portrait.asset = new Image();
  portrait.asset.src = portrait.image;
});

/* 五个字从加载开始就是北墙纹理的一部分，画框只负责在其前方遮挡。 */
['看','看','你','身','后'].forEach((character, index) => {
  const mark = document.createElement('canvas');
  mark.width = 256; mark.height = 256;
  const markContext = mark.getContext('2d');
  markContext.font = '900 202px SimSun, "Microsoft YaHei", serif';
  markContext.textAlign = 'center';
  markContext.textBaseline = 'middle';
  markContext.lineWidth = 10;
  markContext.strokeStyle = '#360303';
  markContext.fillStyle = '#b71919';
  markContext.strokeText(character, 128, 136);
  markContext.fillText(character, 128, 136);
  portraits[index].wallMark = mark;
});

function buildMarkedPortrait(portrait) {
  if (!portrait.asset.naturalWidth) return;
  const marked = document.createElement('canvas');
  marked.width = portrait.asset.naturalWidth;
  marked.height = portrait.asset.naturalHeight;
  const markedContext = marked.getContext('2d');
  markedContext.drawImage(portrait.asset, 0, 0);
  const size = Math.max(34, Math.floor(marked.height * .34));
  markedContext.fillStyle = 'rgba(5, 3, 2, .62)';
  markedContext.fillRect(0, marked.height * .31, marked.width, marked.height * .38);
  markedContext.font = `900 ${size}px Georgia, serif`;
  markedContext.textAlign = 'center';
  markedContext.textBaseline = 'middle';
  markedContext.lineWidth = Math.max(2, Math.floor(size * .08));
  markedContext.strokeStyle = '#2a0807';
  markedContext.fillStyle = '#f0d17b';
  markedContext.strokeText(portrait.letter, marked.width / 2, marked.height / 2);
  markedContext.fillText(portrait.letter, marked.width / 2, marked.height / 2);
  portrait.markedAsset = marked;
}

function interactWithPortrait() {
  if (!nearbyPortrait || puzzleLocked) return;
  const portrait = nearbyPortrait;
  portrait.revealed = true;
  portrait.lit = true;

  if (portrait.letter === correctPortraitSequence[sequenceIndex]) {
    sequenceIndex += 1;
    if (sequenceIndex === correctPortraitSequence.length) {
      portraits.forEach((item) => { item.lit = true; item.solved = true; });
      puzzleLocked = true;
      solvedAt = performance.now();
    }
    return;
  }

  portrait.error = true;
  puzzleLocked = true;
  window.setTimeout(() => {
    portraits.forEach((item) => { item.lit = false; item.error = false; });
    sequenceIndex = 0;
    puzzleLocked = false;
  }, 520);
}

function isWall(x, y) {
  const gridX = Math.floor(x);
  const gridY = Math.floor(y);
  return !map[gridY] || map[gridY][gridX] === '1';
}

function mapCell(x, y) {
  const row = map[Math.floor(y)];
  return row?.[Math.floor(x)] || '1';
}

function isBlocked(x, y) {
  return mapCell(x, y) !== '0';
}

function normalizeAngle(angle) {
  while (angle > Math.PI) angle -= Math.PI * 2;
  while (angle < -Math.PI) angle += Math.PI * 2;
  return angle;
}

function castRay(angle) {
  const step = 0.025;
  let distance = 0;
  while (distance < 40) {
    distance += step;
    const x = camera.x + Math.cos(angle) * distance;
    const y = camera.y + Math.sin(angle) * distance;
    if (isWall(x, y)) return { distance, x, y };
  }
  return { distance:40, x:camera.x, y:camera.y };
}

function portraitAtWallX(worldX) {
  return portraits.find((portrait) => Math.abs(worldX - portrait.x) <= portrait.width / 2);
}

/* 镜面、桌子和纸张在首帧前一次性画入缓存纹理。 */
const mirrorTexture = document.createElement('canvas');
mirrorTexture.width = 360; mirrorTexture.height = 300;
const mirrorContext = mirrorTexture.getContext('2d');
mirrorContext.fillStyle = '#4e432e'; mirrorContext.fillRect(65, 5, 230, 205);
mirrorContext.fillStyle = '#1a1e1f'; mirrorContext.fillRect(74, 14, 212, 187);
mirrorContext.fillStyle = '#020202';
mirrorContext.beginPath(); mirrorContext.arc(180, 70, 25, 0, Math.PI*2); mirrorContext.fill();
mirrorContext.fillRect(143, 94, 74, 112);
mirrorContext.beginPath(); mirrorContext.moveTo(146,101); mirrorContext.lineTo(103,180); mirrorContext.lineTo(126,188); mirrorContext.lineTo(165,124); mirrorContext.fill();
mirrorContext.beginPath(); mirrorContext.moveTo(214,101); mirrorContext.lineTo(257,180); mirrorContext.lineTo(234,188); mirrorContext.lineTo(195,124); mirrorContext.fill();
mirrorContext.fillStyle = 'rgba(190,200,193,.09)';
for (let x=82;x<282;x+=24) mirrorContext.fillRect(x,16,2,182);
mirrorContext.fillStyle = '#29170e'; mirrorContext.fillRect(30,215,300,32); mirrorContext.fillRect(48,247,22,53); mirrorContext.fillRect(290,247,22,53);
mirrorContext.fillStyle = '#d2c59b'; mirrorContext.fillRect(129,205,102,39);
mirrorContext.strokeStyle = '#8d805d'; mirrorContext.strokeRect(129.5,205.5,101,38);

function drawSouthWallFeature(column, rayAngle, wallDepth) {
  if (!solvedAt || Math.sin(rayAngle) <= .001) return;
  const distance = (10.85 - camera.y) / Math.sin(rayAngle);
  if (distance <= 0) return;
  const worldX = camera.x + Math.cos(rayAngle) * distance;
  if (worldX < 5.2 || worldX > 8.8) return;
  const corrected = distance * Math.cos(rayAngle - camera.angle);
  if (corrected >= wallDepth) return;
  const unitHeight = HEIGHT / Math.max(corrected, .01);
  const featureHeight = Math.min(HEIGHT * 3.4, unitHeight * 3);
  const featureBottom = HEIGHT / 2 + unitHeight * .5;
  const featureTop = featureBottom - featureHeight;
  const sourceX = Math.min(mirrorTexture.width-1, Math.floor(((worldX-5.2)/3.6)*mirrorTexture.width));
  context.drawImage(mirrorTexture, sourceX, 0, 1, mirrorTexture.height, column, featureTop, 1, featureHeight);
}

function renderRoom() {
  const ceiling = context.createLinearGradient(0, 0, 0, HEIGHT / 2);
  ceiling.addColorStop(0, '#050505'); ceiling.addColorStop(1, '#18140f');
  context.fillStyle = ceiling; context.fillRect(0, 0, WIDTH, HEIGHT / 2);
  context.fillStyle = '#020202'; context.fillRect(0, HEIGHT / 2, WIDTH, HEIGHT / 2);
  for (let row = HEIGHT / 2 + 1; row < HEIGHT; row += 2) {
    const rowDistance = (HEIGHT * .53) / (row - HEIGHT / 2);
    for (let column = 0; column < WIDTH; column += 2) {
      const rayAngle = camera.angle - FOV / 2 + (column / WIDTH) * FOV;
      const distance = rowDistance / Math.max(.25, Math.cos(rayAngle - camera.angle));
      const worldX = camera.x + Math.cos(rayAngle) * distance;
      const worldY = camera.y + Math.sin(rayAngle) * distance;
      const cell = mapCell(worldX, worldY);
      const checker = (Math.floor(worldX * 2) + Math.floor(worldY * 2)) % 2;
      if (cell === '2') {
        const abyssGlow = Math.max(0, 20 - distance);
        context.fillStyle = `rgb(${7 + abyssGlow},1,2)`;
      } else if (cell === '0' && worldY > 10.8) {
        const edge = Math.min(Math.abs(worldX - 6), Math.abs(worldX - 8));
        if (edge < .1) context.fillStyle = '#a32a20';
        else context.fillStyle = checker ? '#5e1814' : '#42100f';
      } else if (cell === '0') {
        context.fillStyle = checker ? '#31271b' : '#251e16';
      } else {
        context.fillStyle = '#090807';
      }
      context.fillRect(column, row, 2, 2);
    }
  }

  const depths = new Float32Array(WIDTH);
  for (let column = 0; column < WIDTH; column += 1) {
    const rayAngle = camera.angle - FOV / 2 + (column / WIDTH) * FOV;
    const hit = castRay(rayAngle);
    const corrected = hit.distance * Math.cos(rayAngle - camera.angle);
    depths[column] = corrected;
    const wallHeight = Math.min(HEIGHT * 1.8, HEIGHT / Math.max(corrected, 0.01));
    const top = (HEIGHT - wallHeight) / 2;
    const edge = Math.min(hit.x % 1, hit.y % 1);
    const mortar = edge < 0.035 || edge > 0.965;
    const light = Math.max(22, 104 - corrected * 9 + Math.sin(column * .35) * 4);
    context.fillStyle = mortar ? '#17130f' : `rgb(${light},${Math.floor(light*.78)},${Math.floor(light*.52)})`;
    context.fillRect(column, top, 1, wallHeight);
    if (column % 16 === 0) {
      context.fillStyle = 'rgba(0,0,0,.16)';
      context.fillRect(column, top, 1, wallHeight);
    }

    /* 画像不是精灵，而是北墙本身的固定纹理。距离再远也至少参与一列墙面渲染。 */
    if (hit.y < 1.01) {
      const portrait = portraitAtWallX(hit.x);
      if (portrait) {
        const ratio = Math.max(0, Math.min(1, (hit.x - (portrait.x - portrait.width / 2)) / portrait.width));
        const markSourceX = Math.min(portrait.wallMark.width-1, Math.floor(ratio*portrait.wallMark.width));
        const markTop = top + wallHeight * .28;
        const markHeight = wallHeight * .9;
        context.drawImage(
          portrait.wallMark,
          markSourceX, 0, 1, portrait.wallMark.height,
          column, markTop, 1, markHeight
        );
        const riseProgress = portrait.solved ? Math.min(1, Math.max(0, (performance.now() - solvedAt) / 1300)) : 0;
        const frameTop = top + wallHeight * (-.34 - riseProgress * 1.45);
        const frameHeight = wallHeight * 1.62;
        const frameEdge = ratio < .045 || ratio > .955;
        const frameColor = portrait.error ? '#d02b25' : portrait.lit ? '#f0c85d' : '#8b7540';
        context.fillStyle = frameEdge ? frameColor : '#100d09';
        context.fillRect(column, frameTop, 1, frameHeight);
        const portraitTexture = portrait.revealed && portrait.markedAsset ? portrait.markedAsset : portrait.asset;
        if (!frameEdge && portraitTexture.complete !== false && portraitTexture.width) {
          const sourceWidth = portraitTexture.naturalWidth || portraitTexture.width;
          const sourceHeight = portraitTexture.naturalHeight || portraitTexture.height;
          const sourceX = Math.min(sourceWidth - 1, Math.floor(ratio * sourceWidth));
          context.save();
          context.filter = portrait.lit
            ? 'grayscale(.75) sepia(.2) contrast(1.3) brightness(1.22)'
            : 'grayscale(1) sepia(.25) contrast(1.35) brightness(.62)';
          context.drawImage(
            portraitTexture,
            sourceX, 0, 1, sourceHeight,
            column, frameTop + wallHeight * .035, 1, frameHeight - wallHeight * .1
          );
          context.restore();
        }
        context.fillStyle = frameColor;
        context.fillRect(column, frameTop, 1, Math.max(1, wallHeight * .025));
        context.fillRect(column, frameTop + frameHeight, 1, Math.max(1, wallHeight * .025));
      }
    }
    drawSouthWallFeature(column, rayAngle, corrected);
  }

  const visible = portraits.map((portrait) => {
    const dx = portrait.x - camera.x;
    const dy = portrait.y - camera.y;
    return { portrait, distance:Math.hypot(dx,dy), relative:normalizeAngle(Math.atan2(dy,dx)-camera.angle) };
  }).sort((a,b) => b.distance-a.distance);

  context.fillStyle = 'rgba(93,17,13,.08)';
  for (let i=0;i<90;i+=1) context.fillRect((i*47)%WIDTH,(i*83)%HEIGHT,1,1);
  updatePuzzleOverlays();
  updateNearby(visible);
}

function updatePuzzleOverlays() {
  if (!solvedAt) {
    mirrorNote.hidden = true;
    return;
  }
  const facingMirror = Math.abs(normalizeAngle(camera.angle - Math.PI / 2)) < .48;
  const insideHall = camera.y < 11;
  const closeToNote = camera.y > 8.8 && camera.y < 10.75 && Math.abs(camera.x-7) < 1.7;
  mirrorNote.hidden = !(facingMirror && insideHall && closeToNote);
}

function updateNearby(visible) {
  const target = visible
    .filter((item) => Math.abs(item.relative) < .24 && item.distance < 9)
    .sort((a,b) => (Math.abs(a.relative) * 7 + a.distance * .035) - (Math.abs(b.relative) * 7 + b.distance * .035))[0];
  nearbyPortrait = target?.portrait || null;
  nearbyRecord.hidden = !target;
  if (target) {
    nearbyName.textContent = target.portrait.name;
    nearbyRole.textContent = target.portrait.role;
    nearbyStatus.textContent = target.portrait.status;
  }
}

function tryMove(dx, dy) {
  const radius = .22;
  if (!isBlocked(camera.x + dx + Math.sign(dx) * radius, camera.y)) camera.x += dx;
  if (!isBlocked(camera.x, camera.y + dy + Math.sign(dy) * radius)) camera.y += dy;
}

let previousTime = performance.now();
function frame(now) {
  const delta = Math.min((now - previousTime) / 1000, .05); previousTime = now;
  const speed = 2.2 * delta;
  let forward = 0, strafe = 0;
  if (keys.has('KeyW') || keys.has('ArrowUp')) forward += speed;
  if (keys.has('KeyS') || keys.has('ArrowDown')) forward -= speed;
  if (keys.has('KeyA')) strafe -= speed;
  if (keys.has('KeyD')) strafe += speed;
  if (keys.has('ArrowLeft')) camera.angle -= 1.6 * delta;
  if (keys.has('ArrowRight')) camera.angle += 1.6 * delta;
  tryMove(Math.cos(camera.angle)*forward + Math.cos(camera.angle+Math.PI/2)*strafe, Math.sin(camera.angle)*forward + Math.sin(camera.angle+Math.PI/2)*strafe);
  renderRoom(); requestAnimationFrame(frame);
}

window.addEventListener('keydown', (event) => {
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(event.code)) event.preventDefault();
  keys.add(event.code);
});
window.addEventListener('keyup', (event) => keys.delete(event.code));
canvas.addEventListener('click', () => {
  if (!viewActivated) {
    viewActivated = true;
    mouseGuide?.classList.add('dismissed');
    window.setTimeout(() => mouseGuide?.remove(), 320);
    canvas.requestPointerLock?.();
    return;
  }
  if (document.pointerLockElement !== canvas) canvas.requestPointerLock?.();
  interactWithPortrait();
});
document.addEventListener('mousemove', (event) => {
  if (document.pointerLockElement === canvas) camera.angle += event.movementX * .0025;
});

context.imageSmoothingEnabled = false;
Promise.all(portraits.map((portrait) => {
  if (portrait.asset.complete && portrait.asset.naturalWidth) return Promise.resolve();
  return new Promise((resolve) => {
    portrait.asset.addEventListener('load', resolve, { once:true });
    portrait.asset.addEventListener('error', resolve, { once:true });
  });
})).then(() => {
  portraits.forEach(buildMarkedPortrait);
  requestAnimationFrame(frame);
});
