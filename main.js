/* Main JS: routing, i18n, socials, profile image hook, and upgraded Canvas games
   - Replace profile-placeholder.jpg with your real photo filename in the same folder
   - Replace social links (ig, yt, tg) in index.html or modify via DOM selectors below
*/

const TRANSLATIONS = {
  uz: {
    home: "Bosh sahifa", about: "Men haqimda", games: "O'yinlarim", contact: "Aloqa",
    hero_title: "Salom! Menimcha bu juda ajoyib sayt",
    hero_sub: "O‘yinlar, loyihalar va kontaktlar — hammasi shu yerda.",
    play: "O'ynash", learn: "Ko'proq",
    f1_title: "O‘yinlar", f1_desc:"Top o‘yinlar va yangi loyihalar — doimiy yangilanadi.",
    f2_title:"Portfolio", f2_desc:"Eng yaxshi ishlarimni ko‘ring.",
    f3_title:"Kontakt", f3_desc:"Bog‘lanish uchun ijtimoiy tarmoqlar va forma.",
    about_title:"Men haqimda", about_text:"Bu yerga qisqacha bio: kimligingiz, qiziqishlaringiz, texnologiyalaringiz va boshqa ma'lumotlar.",
    skills:"Ko'nikmalar",
    games_title:"O‘yinlarim", g_catch:"Bloklarni tut", g_dodge:"Dodge — qoch", g_asteroid:"Kosmik urush", launch:"O'ynash",
    back:"Orqaga", score:"Ball", pause:"To'xtatish", game_hint:"Sichqoncha bilan boshqaring yoki klaviatura: ← →",
    contact_title:"Aloqa", send:"Yuborish",
    footer_about:"MeningSaytim", footer_sub:"Ijod, o'yin va texnologiyalar."
  },
  en: {
    home: "Home", about: "About", games: "Games", contact: "Contact",
    hero_title: "Hi! Welcome to my awesome site",
    hero_sub: "Games, projects and contacts — all in one place.",
    play: "Play", learn: "Learn more",
    f1_title: "Games", f1_desc:"Top games and new projects—updated regularly.",
    f2_title:"Portfolio", f2_desc:"See my best works.",
    f3_title:"Contact", f3_desc:"Reach me via socials or message form.",
    about_title:"About me", about_text:"Short bio: who you are, interests, tech stack and more.",
    skills:"Skills",
    games_title:"My Games", g_catch:"Block Catch", g_dodge:"Dodge", g_asteroid:"Space Rush", launch:"Play",
    back:"Back", score:"Score", pause:"Pause", game_hint:"Use mouse or keyboard: ← →",
    contact_title:"Contact", send:"Send",
    footer_about:"MySite", footer_sub:"Creativity, games and tech."
  },
  ru: {
    home: "Главная", about: "Обо мне", games: "Игры", contact: "Контакт",
    hero_title: "Привет! Это мой классный сайт",
    hero_sub: "Игры, проекты и контакты — всё в одном месте.",
    play: "Играть", learn: "Подробнее",
    f1_title: "Игры", f1_desc:"Лучшие игры и новые проекты — регулярно обновляются.",
    f2_title:"Портфолио", f2_desc:"Смотрите мои лучшие работы.",
    f3_title:"Контакт", f3_desc:"Связаться через соцсети или форму.",
    about_title:"Обо мне", about_text:"Краткая биография: кто вы, интересы, технологии и т.д.",
    skills:"Навыки",
    games_title:"Мои игры", g_catch:"Поймай блок", g_dodge:"Уклоняйся", g_asteroid:"Космическая битва", launch:"Играть",
    back:"Назад", score:"Счёт", pause:"Пауза", game_hint:"Управляйте мышью или клавиатурой: ← →",
    contact_title:"Контакт", send:"Отправить",
    footer_about:"MySite", footer_sub:"Креатив, игры и технологии."
  }
};

let LANG = localStorage.getItem('lang') || 'uz';
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

/* ---------- Routing ---------- */
function router(){
  const hash = location.hash || '#/';
  const root = $('#view');
  root.innerHTML = '';
  if(hash.startsWith('#/about')) renderAbout(root);
  else if(hash.startsWith('#/games')) renderGames(root);
  else if(hash.startsWith('#/game')) renderGame(root);
  else if(hash.startsWith('#/contact')) renderContact(root);
  else renderHome(root);
}

/* ---------- i18n ---------- */
function t(key){
  return (TRANSLATIONS[LANG] && TRANSLATIONS[LANG][key]) ? TRANSLATIONS[LANG][key] : key;
}
function translatePage(){
  // Update text nodes by data-key attributes
  $$('[data-key]').forEach(el=>{
    const k = el.getAttribute('data-key');
    if(k) el.textContent = t(k);
  });
  // update nav links titles (optional)
  $('#year').textContent = new Date().getFullYear();
  // mark active lang button
  $$('.lang').forEach(b=>b.classList.toggle('active', b.dataset.lang === LANG));
}

/* ---------- Renderers ---------- */
function renderHome(root){
  const tpl = $('#homeTpl').content.cloneNode(true);
  root.appendChild(tpl);
  translatePage();
}

function renderAbout(root){
  const tpl = $('#aboutTpl').content.cloneNode(true);
  root.appendChild(tpl);
  // set social links (replace these with your actual ones)
  $('#aboutIg').href = $('#ig').href;
  $('#aboutYt').href = $('#yt').href;
  $('#aboutTg').href = $('#tg').href;
  translatePage();
}

function renderGames(root){
  const tpl = $('#gamesTpl').content.cloneNode(true);
  root.appendChild(tpl);
  // populate games list
  const list = root.querySelector('#gamesList');
  const games = [
    {id:'catch', title: t('g_catch'), desc: t('f1_desc')},
    {id:'dodge', title: t('g_dodge'), desc: 'Move to avoid obstacles and collect points.'},
    {id:'asteroid', title: t('g_asteroid'), desc: 'Classic space shooter with simple controls.'}
  ];
  list.innerHTML = '';
  games.forEach(g=>{
    const card = document.createElement('div'); card.className = 'game-card';
    card.innerHTML = `<h3>${g.title}</h3><p>${g.desc}</p><div style="display:flex;gap:8px;margin-top:8px"><button class="btn playNow" data-game="${g.id}">${t('launch')}</button><button class="btn ghost" onclick="location.hash='#/game?mode=${g.id}'">${t('learn')}</button></div>`;
    list.appendChild(card);
  });
  // attach handlers
  list.querySelectorAll('.playNow').forEach(b=>b.addEventListener('click', e=>{
    const g = e.currentTarget.dataset.game;
    location.hash = '#/game?mode=' + g;
  }));
  translatePage();
}

function renderContact(root){
  const tpl = $('#contactTpl').content.cloneNode(true);
  root.appendChild(tpl);
  const form = root.querySelector('#contactForm');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    alert(t('send') + ' — OK');
    form.reset();
  });
  translatePage();
}

/* ---------- Game Engine (upgraded) ---------- */
/* Three modes:
   - catch: catch falling blocks (mouse)
   - dodge: avoid obstacles (keyboard)
   - asteroid: simple shooter (mouse to aim, click to fire)
*/
function parseHashParams(){
  if(!location.hash.includes('?')) return {};
  const qs = location.hash.split('?')[1];
  return Object.fromEntries(new URLSearchParams(qs));
}

function renderGame(root){
  const tpl = $('#gameTpl').content.cloneNode(true);
  root.appendChild(tpl);
  translatePage();
  const params = parseHashParams();
  const mode = params.mode || 'catch';
  setupCanvasGame(mode);
}

/* Canvas game: unified runner with mode switch */
function setupCanvasGame(mode){
  const canvas = $('#gameCanvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = Math.min(900, window.innerWidth - 80);
  let height = canvas.height = Math.min(500, Math.round(width * 9/16));
  let running = true, score = 0;
  $('#gscore').textContent = score;
  $('#pauseBtn').textContent = t('pause');

  // player object
  const player = {x: width/2, y: height - 60, w: 60, h: 14, speed: 8};
  const bullets = [];
  const enemies = [];
  const items = [];

  // spawn timers
  let spawnTimer = 0;
  let enemyTimer = 0;

  // controls
  let mouseX = player.x;
  let left = false, right = false;

  window.addEventListener('resize', ()=> {
    width = canvas.width = Math.min(900, window.innerWidth - 80);
    height = canvas.height = Math.min(500, Math.round(width * 9/16));
  });

  canvas.addEventListener('mousemove', e=>{
    const r = canvas.getBoundingClientRect();
    mouseX = e.clientX - r.left;
  });

  window.addEventListener('keydown', e=>{
    if(e.key === 'ArrowLeft' || e.key === 'a') left = true;
    if(e.key === 'ArrowRight' || e.key === 'd') right = true;
    if(e.key === ' ' || e.key === 'Spacebar') { if(mode === 'asteroid') fire(); }
  });
  window.addEventListener('keyup', e=>{
    if(e.key === 'ArrowLeft' || e.key === 'a') left = false;
    if(e.key === 'ArrowRight' || e.key === 'd') right = false;
  });
  canvas.addEventListener('click', ()=>{ if(mode === 'asteroid') fire(); });

  $('#pauseBtn').onclick = ()=>{ running = !running; $('#pauseBtn').textContent = running ? t('pause') : '▶'; if(running) requestAnimationFrame(loop); };

  $('#backBtn').onclick = ()=>{ location.hash = '#/games'; };

  function fire(){
    bullets.push({x: player.x + player.w/2 - 4, y: player.y - 10, w:8, h:12, vy:-10});
  }

  function spawn(){
    if(mode === 'catch'){
      // spawn falling blocks
      if(Math.random() < 0.06) items.push({x: Math.random()*(width-20), y:-20, w:18, h:18, vy: 3 + Math.random()*2, points: 10 + Math.round(Math.random()*20)});
    } else if(mode === 'dodge'){
      // spawn obstacles
      if(Math.random() < 0.06) enemies.push({x: Math.random()*(width-40), y:-30, w:30, h:30, vy: 2 + Math.random()*3});
    } else if(mode === 'asteroid'){
      if(Math.random() < 0.03) enemies.push({x: Math.random()*(width-40), y:-30, w:28 + Math.random()*20, h:28 + Math.random()*20, vy: 1 + Math.random()*2, hp: 1 + Math.floor(Math.random()*2)});
    }
  }

  function rectColl(a,b){
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function loop(){
    if(!running) return;
    ctx.clearRect(0,0,width,height);
    // background stars
    ctx.fillStyle = '#031021';
    ctx.fillRect(0,0,width,height);

    // draw player (paddle / ship)
    if(mode === 'catch' || mode === 'dodge'){
      // player follows mouse smoothly or keyboard
      if(Math.abs(mouseX - (player.x + player.w/2)) > 4){
        player.x += (mouseX - (player.x + player.w/2)) * 0.1;
      }
      if(left) player.x -= player.speed;
      if(right) player.x += player.speed;
      player.x = Math.max(0, Math.min(width - player.w, player.x));
      ctx.fillStyle = '#6ee7b7';
      roundRect(ctx, player.x, player.y, player.w, player.h, 6);
    } else if(mode === 'asteroid'){
      // ship
      if(left) player.x -= player.speed;
      if(right) player.x += player.speed;
      player.x = Math.max(0, Math.min(width - player.w, player.x));
      ctx.fillStyle = '#60a5fa';
      triangle(ctx, player.x + player.w/2, player.y, 18);
    }

    // spawn and update entities
    spawnTimer += 1;
    if(spawnTimer > 6) { spawn(); spawnTimer = 0; }

    // items (catch)
    for(let i = items.length -1; i>=0; i--){
      const it = items[i];
      it.y += it.vy;
      ctx.fillStyle = '#ffd166';
      roundRect(ctx, it.x, it.y, it.w, it.h,4);
      if(rectColl(it, player) && mode === 'catch'){
        score += it.points;
        items.splice(i,1);
      } else if(it.y > height) items.splice(i,1);
    }

    // enemies
    for(let i = enemies.length -1; i>=0; i--){
      const en = enemies[i];
      en.y += en.vy;
      ctx.fillStyle = '#fb7185';
      ctx.fillRect(en.x, en.y, en.w, en.h);
      if(mode === 'dodge' && rectColl(en, player)){
        // lose condition
        running = false;
        alert('O`yin tugadi. Ball: ' + score);
        location.hash = '#/games';
        return;
      }
      if(mode === 'asteroid'){
        // check bullets collision
        for(let b = bullets.length -1; b>=0; b--){
          if(rectColl(bullets[b], en)){
            bullets.splice(b,1);
            en.hp = (en.hp || 1) - 1;
            if(en.hp <= 0){
              score += 10;
              enemies.splice(i,1);
              break;
            }
          }
        }
      }
      if(en.y > height) enemies.splice(i,1);
    }

    // bullets
    for(let i = bullets.length -1; i>=0; i--){
      const b = bullets[i];
      b.y += b.vy;
      ctx.fillStyle = '#fff';
      ctx.fillRect(b.x, b.y, b.w, b.h);
      if(b.y < -20) bullets.splice(i,1);
    }

    // HUD
    ctx.fillStyle = '#fff';
    ctx.font = '16px Inter, Arial';
    ctx.fillText(t('score') + ': ' + score, 12, 22);
    $('#gscore').textContent = score;

    requestAnimationFrame(loop);
  }

  // start loop
  requestAnimationFrame(loop);
}

/* helpers */
function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
}
function triangle(ctx, cx, cy, size){
  ctx.beginPath();
  ctx.moveTo(cx, cy - size);
  ctx.lineTo(cx - size, cy + size);
  ctx.lineTo(cx + size, cy + size);
  ctx.closePath();
  ctx.fill();
}

/* ---------- Boot ---------- */
window.addEventListener('load', ()=>{
  // set year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // setup social placeholders (replace these with real links if needed)
  // If you want to programmatically set them: document.getElementById('ig').href = 'https://instagram.com/yourname';
  // profile images: replace profile-placeholder.jpg file with your own.

  // lang buttons
  $$('.lang').forEach(b=>{
    b.addEventListener('click', ()=>{
      LANG = b.dataset.lang;
      localStorage.setItem('lang', LANG);
      translatePage();
      router();
    });
  });

  // init translations
  translatePage();

  // nav links intercept to allow SPA nav
  document.body.addEventListener('click', e=>{
    if(e.target.matches('[data-link]')){
      e.preventDefault();
      const href = e.target.getAttribute('href');
      location.hash = href;
    }
  });

  // init routing
  window.addEventListener('hashchange', router);
  if(!location.hash) location.hash = '#/';
  router();
});
