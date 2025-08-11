// backend/public/app.js — FINAL WIRED
// Buttons -> correct routes (GET /seed/do, GET /users, GET /matches/:id, POST /messages, GET /messages/:A/:B)

document.addEventListener('DOMContentLoaded', () => {
  const $ = (s) => document.querySelector(s);
  const out = $('#out');
  const usersList = $('#users');
  const btnSeed = $('#btn-seed');
  const btnUsers = $('#btn-users');
  const btnMatches = $('#btn-matches');
  const btnSend = $('#btn-send');
  const btnThread = $('#btn-thread');

  let A = null, B = null; // selected user ids

  const log = (x) => out.textContent = typeof x === 'string' ? x : JSON.stringify(x, null, 2);
  window.onerror = (m,s,l,c,e)=>log({frontendError:String(m),s,l,c,stack:e&&e.stack});

  const req = async (path, opts) => {
    const res = await fetch(path, opts);
    const t = await res.text();
    try { return JSON.parse(t); } catch { return t; }
  };

  // Seed demo users (browser-friendly)
  btnSeed.onclick = async () => { log('Seeding…'); const d = await req('/seed/do'); log(d); await loadUsers(); };

  // Load users
  btnUsers.onclick = async () => { await loadUsers(); };
  async function loadUsers(){
    const data = await req('/users');
    const users = Array.isArray(data) ? data : (data.users || []);
    usersList.innerHTML = '';
    A = B = null; updateButtons();
    users.forEach(u => {
      const li = document.createElement('li');
      li.innerHTML = `<label><input type="checkbox" data-id="${u._id}"> ${u.username||u.name||u.email} <small>${u._id}</small></label>`;
      usersList.appendChild(li);
    });
  }

  function updateButtons(){
    btnMatches.disabled = !A;
    btnSend.disabled = !(A && B);
    btnThread.disabled = !(A && B);
  }

  usersList.addEventListener('change', () => {
    const ids = [...usersList.querySelectorAll('input[type=checkbox]:checked')].map(x=>x.dataset.id);
    A = ids[0] || null; B = ids[1] || null; updateButtons();
  });

  // View matches for A
  btnMatches.onclick = async () => { if(!A) return; const d = await req(`/matches/${A}`); log(d); };

  // Send message A -> B
  btnSend.onclick = async () => {
    if(!(A&&B)) return; const content = prompt('Message text?','hey'); if(!content) return;
    const d = await req('/messages', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ senderId:A, receiverId:B, content }) });
    log(d);
  };

  // View thread A <-> B
  btnThread.onclick = async () => { if(!(A&&B)) return; const d = await req(`/messages/${A}/${B}`); log(d); };

  log('Ready.');
});

