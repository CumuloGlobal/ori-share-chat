import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";
import { useThemeColors } from "../data/ThemeContext";

interface EmojiReactionProps {
  emoji: string;
  count: number;
  appearFrame: number;
}

export const EmojiReaction: React.FC<EmojiReactionProps> = ({
  emoji,
  count,
  appearFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tc = useThemeColors();

  if (frame < appearFrame) {
    return null;
  }

  // Timing for each reaction pop-in (frames apart)
  const frameGap = 12;
  const secondReactionFrame = appearFrame + frameGap;
  const thirdReactionFrame = appearFrame + frameGap * 2;

  // Calculate current visible count based on frame
  let visibleCount = 1;
  if (frame >= thirdReactionFrame && count >= 3) {
    visibleCount = 3;
  } else if (frame >= secondReactionFrame && count >= 2) {
    visibleCount = 2;
  }

  // Initial emoji pop-in
  const emojiProgress = spring({
    frame: frame - appearFrame,
    fps,
    config: {
      damping: 10,
      stiffness: 200,
      mass: 0.5,
    },
  });

  // Second reaction pop
  const secondProgress =
    frame >= secondReactionFrame
      ? spring({
          frame: frame - secondReactionFrame,
          fps,
          config: {
            damping: 12,
            stiffness: 250,
            mass: 0.4,
          },
        })
      : 0;

  // Third reaction pop
  const thirdProgress =
    frame >= thirdReactionFrame
      ? spring({
          frame: frame - thirdReactionFrame,
          fps,
          config: {
            damping: 12,
            stiffness: 250,
            mass: 0.4,
          },
        })
      : 0;

  // Scale bump when new reactions come in
  const scaleBump =
    visibleCount === 3
      ? 1 + (1 - thirdProgress) * 0.15
      : visibleCount === 2
        ? 1 + (1 - secondProgress) * 0.15
        : 1;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: tc.reactionBackground,
        borderRadius: 10,
        padding: "3px 6px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
        transform: `scale(${emojiProgress * scaleBump})`,
        opacity: emojiProgress,
        gap: 2,
      }}
    >
      <span style={{ fontSize: 13, lineHeight: 1 }}>{emoji}</span>
      {visibleCount > 1 && (
        <span
          style={{
            fontSize: 11,
            color: tc.reactionText,
            fontWeight: 600,
            transform: `scale(${visibleCount === 2 ? secondProgress : thirdProgress})`,
            opacity: visibleCount === 2 ? secondProgress : thirdProgress,
            minWidth: 8,
          }}
        >
          {visibleCount}
        </span>
      )}
    </div>
  );
};
