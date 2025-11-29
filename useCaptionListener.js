import { useEffect, useRef } from "react";

export default function useCaptionListener(handleCaption) {
  useEffect(() => {
    const samples = [
      "Hello everyone",
      "How are you?",
      "This is a test caption",
      "Welcome to the demo"
    ];

    const interval = setInterval(() => {
      const text = samples[Math.floor(Math.random() * samples.length)];
      handleCaption({ text });
    }, 2000); // every 2 seconds

    return () => clearInterval(interval);
  }, [handleCaption]);
}
