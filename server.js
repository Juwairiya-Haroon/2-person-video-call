import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const supportedLanguages = ["ur", "ar", "fr", "zh"];

// Alternative translation service as fallback
const translateWithService = async (text, targetLang) => {
  try {
    // Try LibreTranslate first
    const response = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "en",
        target: targetLang,
        format: "text"
      }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    
    if (data.translatedText) {
      return data.translatedText;
    }
    
    // Fallback: Mock translation for demo (remove in production)
    console.log("Using mock translation for:", text);
    return `[${targetLang.toUpperCase()}] ${text}`;
    
  } catch (error) {
    console.error("Translation service error:", error);
    // Mock translation as fallback
    return `[${targetLang.toUpperCase()}] ${text}`;
  }
};

app.post("/translate", async (req, res) => {
  try {
    let { text, targetLang } = req.body;

    if (!supportedLanguages.includes(targetLang)) {
      targetLang = "ur";
    }

    const translatedText = await translateWithService(text, targetLang);
    
    console.log("Translation result:", { original: text, translated: translatedText });
    res.json({ translated: translatedText });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(5000, () => console.log("🚀 Node server running on http://localhost:5000"));