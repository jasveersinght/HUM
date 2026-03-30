require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); // large limit for base64 images
app.use(express.static(path.join(__dirname, 'public')));

// ─── PROXY ENDPOINT FOR GEMINI API ──────────────────────
app.post('/api/analyze', async (req, res) => {
  // Try .env key first, then browser-provided key as fallback
  const envKey = process.env.GEMINI_API_KEY;
  const browserKey = req.headers['x-browser-api-key'];
  const apiKey = (envKey && envKey !== 'your-gemini-key-here') ? envKey : browserKey;

  if (!apiKey) {
    return res.status(500).json({
      error: 'API key not configured. Please add your free Gemini API key to the .env file or enter it in the app.'
    });
  }

  try {
    const { messages, system } = req.body;
    const ai = new GoogleGenAI({ apiKey });

    // Build the content parts for Gemini
    const parts = [];
    const userMessage = messages[0];
    const contentItems = userMessage?.content || [];

    for (const item of contentItems) {
      if (item.type === 'image') {
        // Convert Anthropic image format to Gemini inline format
        parts.push({
          inlineData: {
            data: item.source.data,
            mimeType: item.source.media_type || 'image/jpeg'
          }
        });
      } else if (item.type === 'text') {
        parts.push(item.text);
      }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: parts,
      config: {
        systemInstruction: system,
        maxOutputTokens: 300,
      }
    });

    // Format response to match what the frontend expects (Anthropic-style)
    const replyText = response.text || '';
    res.json({
      content: [{ type: 'text', text: replyText }]
    });
  } catch (err) {
    console.error('Gemini API error:', err.message);
    
    if (err.message?.includes('API_KEY_INVALID') || err.message?.includes('API key')) {
      return res.status(401).json({
        error: 'Invalid API key. Get a free key at https://aistudio.google.com/apikey'
      });
    }
    
    res.status(500).json({ error: 'Failed to connect to Gemini API: ' + err.message });
  }
});

// ─── SERVE THE APP ───────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  ╔══════════════════════════════════════════╗`);
  console.log(`  ║   HUM — Vision Companion                 ║`);
  console.log(`  ║   Powered by Google Gemini (FREE)         ║`);
  console.log(`  ║   Running at http://localhost:${PORT}        ║`);
  console.log(`  ╚══════════════════════════════════════════╝\n`);

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-gemini-key-here') {
    console.log('  ⚠️  WARNING: No API key set! Edit .env file and add your GEMINI_API_KEY');
    console.log('  💡 Get a FREE key at: https://aistudio.google.com/apikey\n');
  }
});
