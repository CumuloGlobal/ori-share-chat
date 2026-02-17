import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";
import { useThemeColors } from "../data/ThemeContext";

interface MultiEmojiReactionProps {
  emojis: Array<{ emoji: string; appearFrame: number }>;
}

export const MultiEmojiReaction: React.FC<MultiEmojiReactionProps> = ({
  emojis,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tc = useThemeColors();

  // Find the first emoji that should appear
  const firstAppearFrame = Math.min(...emojis.map((e) => e.appearFrame));

  if (frame < firstAppearFrame) {
    return null;
  }

  // Filter to only visible emojis
  const visibleEmojis = emojis.filter((e) => frame >= e.appearFrame);

  // Initial container pop-in
  const containerProgress = spring({
    frame: frame - firstAppearFrame,
    fps,
    config: {
      damping: 10,
      stiffness: 200,
      mass: 0.5,
    },
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: tc.reactionBackground,
        borderRadius: 10,
        padding: "3px 6px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
        transform: `scale(${containerProgress})`,
        opacity: containerProgress,
        gap: 2,
      }}
    >
      {visibleEmojis.map((emojiItem, index) => {
        const emojiProgress = spring({
          frame: frame - emojiItem.appearFrame,
          fps,
          config: {
            damping: 12,
            stiffness: 250,
            mass: 0.4,
          },
        });

        return (
          <span
            key={index}
            style={{
              fontSize: 13,
              lineHeight: 1,
              transform: `scale(${emojiProgress})`,
              opacity: emojiProgress,
            }}
          >
            {emojiItem.emoji}
          </span>
        );
      })}
    </div>
  );
};
