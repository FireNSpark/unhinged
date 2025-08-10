// Unhinged frontend — wires buttons to your backend at same origin
const API_BASE = '';
const $ = (s) => document.querySelector(s);
const out = $('#out');
const usersList = $('#users');
let users = [];
let A = null, B = null;

function log(x){ out.textContent = (typeof x === 'string') ? x : JSON.stringify(x, null, 2); }

// surface errors in the Output panel (helps on mobile)
window.onerror = (msg, src, line, col, err) => {
  log({ frontendError: String(msg), src, line, col, stack: err && err.stack });
};

async function req(path, opts){
  const res = await fetch(API_BASE + path, opts);
  const text = await res.text();
  try { return { ok: res.ok, data: JSON.parse(text) }; }
  catch { return { ok: res.ok, data: text }; }
}

// Seed two demo users
$('#btn-seed').onclick = async () => {
  const r = await req('/seed', { method: 'POST' });
  log(r.data);
  await loadUsers();
};

// Load users
async function loadUsers(){
  const r = await req('/users');
  const data = r.data;
  users = Array.isArray(data) ? data : (data.users || []);
  usersList.innerHTML = '';
  users.forEach(u => {
    const li = document.createElement('li');
    li.innerHTML = `
      <label>
        <input type="checkbox" data-id="${u._id}"/>
        ${u.username || u.name || u.email}
        <small>${u._id}</small>
      </label>`;
    usersList.appendChild(li);
  });
  $('#btn-matches').disabled = users.length === 0;
}
$('#btn-users').onclick = loadUsers;

// track two selections
usersList.addEventListener('change', () => {
  const ids = [...usersList.querySelectorAll('input[type=checkbox]:checked')].map(x => x.dataset.id);
  A = ids[0] || null; B = ids[1] || null;
  $('#btn-matches').disabled = !A;
  $('#btn-send').disabled = !(A && B);
  $('#btn-thread').disabled = !(A && B);
});

// View matches for A
$('#btn-matches').onclick = async () => {
  if (!A) return;
  const r = await req(`/matches/${A}`);
  log(r.data);
};

// Send message A -> B
$('#btn-send').onclick = async () => {
  if (!(A && B)) return;
  const content = prompt('Message text?', 'hey');
  if (!content) return;
  const r = await req('/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ senderId: A, receiverId: B, content })
  });
  log(r.data);
};

// View thread A <-> B
$('#btn-thread').onclick = async () => {
  if (!(A && B)) return;
  const r = await req(`/messages/${A}/${B}`);
  log(r.data);
};

// boot
log('Ready.');
loadUsers().catch(() => {});
