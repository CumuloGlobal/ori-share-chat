import React, { createContext, useContext } from "react";

export interface ThemeColors {
  background: string;
  accent: string;
  secondary: string;
  chatBackground: string;
  headerBackground: string;
  otherBubble: string;
  userBubble: string;
  oriBubble: string;
  text: string;
  oriGlow: string;
  phoneFrame: string;
  statusBarText: string;
  border: string;
  subtitleText: string;
  iconDefault: string;
  inputBackground: string;
  reactionBackground: string;
  reactionText: string;
  senderNameFallback: string;
  typingDotFallback: string;
  bubbleShadow: string;
}

export const lightColors: ThemeColors = {
  background: "#f8f6f1",
  accent: "#e8652c",
  secondary: "#f5c542",
  chatBackground: "#efeae2",
  headerBackground: "#ffffff",
  otherBubble: "#ffffff",
  userBubble: "#d9fdd3",
  oriBubble: "#fff4e6",
  text: "#111b21",
  oriGlow: "rgba(232, 101, 44, 0.3)",
  phoneFrame: "#ffffff",
  statusBarText: "#000",
  border: "#e0e0e0",
  subtitleText: "#667781",
  iconDefault: "#54656f",
  inputBackground: "#fff",
  reactionBackground: "rgba(255, 255, 255, 0.98)",
  reactionText: "#666",
  senderNameFallback: "#666",
  typingDotFallback: "#999",
  bubbleShadow: "0 1px 2px rgba(0,0,0,0.1)",
};

export const darkColors: ThemeColors = {
  background: "#0b141a",
  accent: "#e8652c",
  secondary: "#f5c542",
  chatBackground: "#0b141a",
  headerBackground: "#1f2c34",
  otherBubble: "#1f2c34",
  userBubble: "#005c4b",
  oriBubble: "#2a1a0e",
  text: "#e9edef",
  oriGlow: "rgba(232, 101, 44, 0.3)",
  phoneFrame: "#000000",
  statusBarText: "#fff",
  border: "#2a3942",
  subtitleText: "#8696a0",
  iconDefault: "#aebac1",
  inputBackground: "#2a3942",
  reactionBackground: "rgba(31, 44, 52, 0.98)",
  reactionText: "#8696a0",
  senderNameFallback: "#8696a0",
  typingDotFallback: "#8696a0",
  bubbleShadow: "0 1px 2px rgba(0,0,0,0.3)",
};

const ThemeContext = createContext<ThemeColors>(lightColors);

export const ThemeProvider: React.FC<{
  dark?: boolean;
  children: React.ReactNode;
}> = ({ dark = false, children }) => (
  <ThemeContext.Provider value={dark ? darkColors : lightColors}>
    {children}
  </ThemeContext.Provider>
);

export const useThemeColors = (): ThemeColors => useContext(ThemeContext);

// Backward compatibility: static export matches old `colors` object
export const colors = lightColors;
