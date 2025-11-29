// hooks/useTranslator.js
export const translateText = async (text, lang) => {
  try {
    const res = await fetch("http://localhost:5000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLang: lang })
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    return data.translated || text;
  } catch (err) {
    console.error("Translation error:", err);
    return text; // fallback to original text
  }
};