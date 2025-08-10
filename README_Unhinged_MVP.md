# Unhinged – MVP Setup

## Quick Start
1. **Backend**
   - Set env vars:
     - `MONGO_URI` = your MongoDB Atlas connection string
     - `JWT_SECRET` = any strong random string
     - `PORT` = 5000 (optional)
   - Install & run:
     ```bash
     cd backend
     npm install
     npm run dev
     ```
   - Deploy to Render/Railway and copy the live URL.

2. **Frontend (Expo)**
   - Set backend URL in `frontend/utils/api.js`:
     ```js
     const API = axios.create({ baseURL: 'https://YOUR_BACKEND_URL' });
     ```
   - Install & run:
     ```bash
     cd frontend
     npm install
     npm start
     ```

## Stack
- **Frontend:** React Native (Expo)
- **Backend:** Node.js (Express), Socket.io
- **DB:** MongoDB Atlas
- **Auth:** JWT
- **Uploads:** Multer (local); swap to S3 later

## API Routes (MVP)
- `POST /auth/register` – name, email, password
- `POST /auth/login` – returns `{ token }`
- `GET /profile` – current user (auth)
- `PUT /profile` – update (auth)
- `POST /profile/upload` – photo (auth, multipart)
- `GET /matches` – list with compatibility (auth)
- `GET /messages/:roomId` – chat history
- WebSocket events: `joinRoom`, `sendMessage`
- Confessions:
  - `POST /confessions` – create (auth)
  - `GET /confessions` – list
  - `POST /confessions/:id/react` – { type: "fire" | "flag" | "laugh" }

## Env Example
Create `backend/.env`:
```
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/unhinged?retryWrites=true&w=majority
JWT_SECRET=change_this_now
PORT=5000
```

## Notes
- Expo uses device storage; token is saved via `localStorage` in this MVP. Swap to `AsyncStorage` for production.
- For production image storage, replace Multer local with S3/Firebase Storage.
- For match rooms, replace the hardcoded room id with a deterministic pair id.

## Project Structure
```
unhinged/
  backend/
    server.js, routes/, models/, utils/, config/
  frontend/
    App.js, screens/, utils/api.js
```

---

© Unhinged MVP
