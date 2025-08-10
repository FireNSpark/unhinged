// backend/public/app.js — FINAL
// Wires the buttons to your backend (no /api prefix)

document.addEventListener('DOMContentLoaded', () => {
  const $ = (s) => document.querySelector(s);
  const out = $('#out');
  const usersList = $('#users');
  const btnSeed = $('#btn-seed');
  const btnUsers = $('#btn-users');
  const btnMatches = $('#btn-matches');
  const btnSend = $('#btn-send');
  const btnThread = $('#btn-thread');

  let users = [];
  let A = null, B = null; // selected user ids

  function log(x){ out.textContent = (typeof x === 'string') ? x : JSON.stringify(x, null, 2); }

  // show JS errors in Output so you can see them on mobile
  window.onerror = (msg, src, line, col, err) => {
    log({ frontendError: String(msg), src, line, col, stack: err && err.stack });
  };

  async function req(path, opts){
    const res = await fetch(path, opts);
    const text = await res.text();
    try { return { ok: res.ok, data: JSON.parse(text) }; }
    catch { return { ok: res.ok, data: text }; }
  }

  // ---- Seed two demo users ----
  btnSeed.addEventListener('click', async () => {
    log('Seeding demo users…');
    const r = await req('/seed', { method: 'POST' }); // NO /api prefix
    log(r.data);
    await loadUsers();
  });

  // ---- Load users ----
  async function loadUsers(){
    const r = await req('/users'); // NO /api prefix
    const data = r.data;
    users = Array.isArray(data) ? data : (data.users || []);
    usersList.innerHTML = '';

    users.forEach(u => {
      const li = document.createElement('li');
      li.innerHTML = `<label><input type="checkbox" data-id="${u._id}"> ${u.username || u.email} <small>${u._id}</small></label>`;
      usersList.appendChild(li);
    });

    // enable Matches only after at least one user exists
    btnMatches.disabled = users.length === 0;
    // Send/Thread need exactly two selections — controlled by change handler below
    updateButtons();
  }
  btnUsers.addEventListener('click', loadUsers);

  // ---- Handle selecting two users ----
  function updateButtons(){
    const ids = [...usersList.querySelectorAll('input[type=checkbox]:checked')].map(x => x.dataset.id);
    A = ids[0] || null; B = ids[1] || null;
    btnMatches.disabled = !A;            // needs one selected
    btnSend.disabled    = !(A && B);     // needs two selected
    btnThread.disabled  = !(A && B);     // needs two selected
  }
  usersList.addEventListener('change', updateButtons);

  // ---- View matches for selected user A ----
  btnMatches.addEventListener('click', async () => {
    if (!A) return log('Pick at least one user (checkbox).');
    const r = await req(`/matches/${A}`); // NO /api prefix
    log(r.data);
  });

  // ---- Send a message A -> B ----
  btnSend.addEventListener('click', async () => {
    if (!(A && B)) return log('Pick two users (checkboxes).');
    const content = prompt('Message text?', 'hey');
    if (!content) return;
    const r = await req('/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senderId: A, receiverId: B, content })
    });
    log(r.data);
  });

  // ---- View thread A <-> B ----
  btnThread.addEventListener('click', async () => {
    if (!(A && B)) return log('Pick two users (checkboxes).');
    const r = await req(`/messages/${A}/${B}`);
    log(r.data);
  });

  // autoload on first visit
  loadUsers().catch(() => {});
  log('Ready.');
});
