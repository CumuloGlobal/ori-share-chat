import React from "react";
import { useCurrentFrame } from "remotion";
import { Avatar } from "./Avatar";
import { ParticipantConfig } from "../types/participant";
import { useThemeColors } from "../data/ThemeContext";

interface TypingIndicatorProps {
  participant: ParticipantConfig;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  participant,
}) => {
  const frame = useCurrentFrame();
  const tc = useThemeColors();
  const bubble = participant.bubble;
  const hasGlow = !!bubble.glowColor;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 8,
        marginBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
      }}
    >
      <Avatar
        config={participant.avatar}
        name={participant.displayName}
        size={28}
      />
      <div
        style={{
          backgroundColor: bubble.backgroundColor,
          borderRadius: 18,
          padding: "10px 14px",
          borderLeft: bubble.borderLeft ?? "none",
          boxShadow: hasGlow ? `0 0 15px ${bubble.glowColor}` : "none",
          display: "flex",
          gap: 4,
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map((i) => {
          const delay = i * 5;
          const pulse = Math.sin(((frame + delay) / 10) * Math.PI);
          const opacity = 0.4 + pulse * 0.4;
          const scale = 0.8 + pulse * 0.2;

          return (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: bubble.nameColor ?? tc.typingDotFallback,
                opacity,
                transform: `scale(${scale})`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
