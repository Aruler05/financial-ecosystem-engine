
import { useState, useEffect } from "react";

const FONT_SIZE_KEY = 'preferred_font_size';
const DEFAULT_FONT_SIZE = 16;

export function useFontSize() {
  const [fontSize, setFontSizeState] = useState<number>(() => {
    try {
      const savedFontSize = localStorage.getItem(FONT_SIZE_KEY);
      return savedFontSize ? parseInt(savedFontSize, 10) : DEFAULT_FONT_SIZE;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return DEFAULT_FONT_SIZE;
    }
  });

  const setFontSize = (size: number) => {
    try {
      localStorage.setItem(FONT_SIZE_KEY, size.toString());
      setFontSizeState(size);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  // Apply font size to html element to make it accessible globally
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize / 16}rem`;
  }, [fontSize]);

  return { fontSize, setFontSize };
}
