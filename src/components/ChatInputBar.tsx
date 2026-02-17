import React from "react";
import { useThemeColors } from "../data/ThemeContext";
import { EmojiIcon, MicIcon } from "./icons";

interface ChatInputBarProps {
  placeholder?: string;
  accentColor?: string;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  placeholder = "Type a message",
  accentColor,
}) => {
  const tc = useThemeColors();
  const resolvedAccent = accentColor ?? tc.accent;

  return (
    <div
      style={{
        backgroundColor: tc.headerBackground,
        padding: "8px 12px 24px 12px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        borderTop: `1px solid ${tc.border}`,
      }}
    >
      <EmojiIcon color={tc.iconDefault} />

      <div
        style={{
          flex: 1,
          backgroundColor: tc.inputBackground,
          borderRadius: 20,
          padding: "8px 16px",
          fontSize: 14,
          color: tc.subtitleText,
          border: `1px solid ${tc.border}`,
        }}
      >
        {placeholder}
      </div>

      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: resolvedAccent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MicIcon />
      </div>
    </div>
  );
};
