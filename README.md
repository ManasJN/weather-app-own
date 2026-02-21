# AI-Powered Weather Forecast Web App

Production-ready full-stack weather app with AI question answering.

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Weather API:** OpenWeatherMap
- **AI:** OpenAI API

## Folder Structure

```bash
weather-app/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   ├── config.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   └── package.json
└── .env.example
```

## Setup Instructions

### 1) Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2) Configure environment

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Add your keys:
- `OPENWEATHER_API_KEY`
- `OPENAI_API_KEY`

### 3) Run locally

Terminal 1:
```bash
cd backend
npm run dev
```

Terminal 2:
```bash
cd frontend
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## API Endpoints

- `GET /api/weather?city=Delhi`
- `GET /api/forecast?city=Delhi`
- `POST /api/ask`

`POST /api/ask` body:

```json
{
  "city": "Delhi",
  "question": "Will it rain tomorrow in Delhi?"
}
```

## Deployment

### Option A: Render (backend) + Vercel (frontend)

#### Backend on Render
1. Push repo to GitHub.
2. Create a **Web Service** on Render.
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add env vars:
   - `OPENWEATHER_API_KEY`
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL` (optional)
7. Deploy and copy backend URL (e.g. `https://weather-api.onrender.com`).

#### Frontend on Vercel
1. Import repo in Vercel.
2. Set root directory to `frontend`.
3. Add env var:
   - `VITE_API_BASE_URL=https://weather-api.onrender.com/api`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

### Option B: Single provider
You can deploy frontend/backend to the same provider if supported; keep `VITE_API_BASE_URL` pointed to deployed backend `/api`.
