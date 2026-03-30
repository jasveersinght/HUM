# HUM — Vision Companion 👁️

**AI-powered vision companion for visually impaired and blind users.**

HUM uses your device camera and Google's Gemini AI to describe scenes, read text, identify people, and detect obstacles — all in real-time with voice output.

![HUM Vision Companion](https://img.shields.io/badge/Powered%20by-Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Features

- 📷 **Real-time Camera Analysis** — Point your camera and get instant scene descriptions
- 🎙️ **Voice Input** — Ask questions hands-free using speech recognition
- 🔊 **Voice Output** — Responses are spoken aloud automatically
- ⚡ **Quick Commands** — One-tap buttons for common queries:
  - *"What's in front of me?"*
  - *"Read any text"*
  - *"Any people nearby?"*
  - *"Any obstacles?"*
- 🌐 **Works in Browser** — No app install needed, runs on any device with a camera
- 🆓 **Free AI** — Powered by Google Gemini's free API tier

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/jasveersinght/HUM.git
cd HUM
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get a FREE Gemini API Key

Visit [aistudio.google.com/apikey](https://aistudio.google.com/apikey) and create a free API key.

### 4. Configure your key

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your-api-key-here
PORT=3000
```

Or just enter the key in the app's modal when it launches.

### 5. Start the app

```bash
npm start
```

Open **http://localhost:3000** in your browser.

---

## 🎮 How to Use

1. **Start Camera** — Click the `📷 START CAM` button
2. **Analyze** — Click `🔍 ANALYZE SCENE` for a full description
3. **Quick Commands** — Use preset buttons for common tasks
4. **Voice** — Click `🎙️ TAP TO SPEAK` or press `Space` to ask anything
5. **Keyboard Shortcuts:**
   - `Space` — Start voice input
   - `A` — Analyze scene
   - `C` — Toggle camera

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | Node.js + Express |
| **AI Model** | Google Gemini 2.5 Flash |
| **Frontend** | Vanilla HTML/CSS/JS |
| **Voice** | Web Speech API |
| **Camera** | MediaDevices API |

---

## 📁 Project Structure

```
HUM/
├── server.js          # Express backend (API proxy)
├── public/
│   └── index.html     # Full frontend app
├── .env.example       # Environment template
├── .gitignore
├── package.json
└── README.md
```

---

## 🔒 Security

- API keys are stored server-side in `.env` (never exposed to the browser)
- `.env` is excluded from git via `.gitignore`
- All API calls go through the backend proxy

---

## 📄 License

MIT License — feel free to use, modify, and share.

---

**Made with ❤️ for accessibility**
