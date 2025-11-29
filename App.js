import { useState, useEffect, useCallback } from "react";
import useCaptionListener from "./hooks/useCaptionListener";
import { translateText } from "./hooks/useTranslator";
import CaptionBox from "./components/CaptionBox";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  const [captions, setCaptions] = useState([]);
  const [lang, setLang] = useState("ur");

  // Callback to handle new captions
  const handleNewCaption = useCallback(async ({ text }) => {
    const translated = await translateText(text, lang);
    setCaptions(prev => [...prev, { original: text, translated }]);
  }, [lang]);

  // Start listening to captions
  useCaptionListener(handleNewCaption);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h2>Live Translated Captions</h2>

      <div style={{ marginBottom: 20 }}>
        <LanguageSelector selectedLang={lang} onChange={setLang} />
      </div>

      <div>
        {captions.slice(-5).map((c, i) => (
          <CaptionBox key={i} original={c.original} translated={c.translated} />
        ))}
      </div>
    </div>
  );
}

export default App;
