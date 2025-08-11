// backend/public/app.js

document.addEventListener('DOMContentLoaded', () => {
  const seedBtn = document.getElementById('seedBtn');
  const loadBtn = document.getElementById('loadBtn');
  const matchBtn = document.getElementById('matchBtn');
  const messageBtn = document.getElementById('messageBtn');

  // POST /seed
  if (seedBtn) {
    seedBtn.addEventListener('click', async () => {
      try {
        const res = await fetch('/seed', { method: 'POST' });
        const data = await res.json();
        console.log('Seed response:', data);
        alert(data.success ? 'Seeded demo users!' : 'Seeding failed');
      } catch (err) {
        console.error('Seed error:', err);
        alert('Error seeding users');
      }
    });
  }

  // GET /users
  if (loadBtn) {
    loadBtn.addEventListener('click', async () => {
      try {
        const res = await fetch('/users');
        const data = await res.json();
        console.log('Users:', data);
        alert(`Loaded ${data.length} users`);
      } catch (err) {
        console.error('Load users error:', err);
        alert('Error loading users');
      }
    });
  }

  // POST /matches
  if (matchBtn) {
    matchBtn.addEventListener('click', async () => {
      try {
        const res = await fetch('/matches', { method: 'POST' });
        const data = await res.json();
        console.log('Match response:', data);
        alert(data.success ? 'Match created!' : 'Match failed');
      } catch (err) {
        console.error('Match error:', err);
        alert('Error creating match');
      }
    });
  }

  // POST /messages
  if (messageBtn) {
    messageBtn.addEventListener('click', async () => {
      try {
        const res = await fetch('/messages', { method: 'POST' });
        const data = await res.json();
        console.log('Message response:', data);
        alert(data.success ? 'Message sent!' : 'Message failed');
      } catch (err) {
        console.error('Message error:', err);
        alert('Error sending message');
      }
    });
  }
});
