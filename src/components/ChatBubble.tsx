import React from "react";
import {
  useCurrentFrame,
  spring,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { Avatar } from "./Avatar";
import { EmojiReaction } from "./EmojiReaction";
import { MultiEmojiReaction } from "./MultiEmojiReaction";
import { ParticipantConfig } from "../types/participant";
import { Message } from "../types/message";
import { useThemeColors } from "../data/ThemeContext";

interface ChatBubbleProps {
  message: Message;
  participant: ParticipantConfig;
  imageAppearFrame?: number;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  participant,
  imageAppearFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tc = useThemeColors();

  if (frame < message.appearFrame) {
    return null;
  }

  const isUser = participant.isLocalUser;
  const bubble = participant.bubble;

  const slideProgress = spring({
    frame: frame - message.appearFrame,
    fps,
    config: {
      damping: 15,
      stiffness: 150,
      mass: 0.8,
    },
  });

  const translateY = (1 - slideProgress) * 30;
  const opacity = slideProgress;

  // Image fade in
  const showImage =
    message.image && imageAppearFrame && frame >= imageAppearFrame;
  const imageProgress = showImage
    ? spring({
        frame: frame - imageAppearFrame,
        fps,
        config: {
          damping: 20,
          stiffness: 100,
        },
      })
    : 0;

  // Glow effect driven by participant config
  const hasGlow = !!bubble.glowColor;
  const glowDelayFrames = bubble.glowDelayFrames ?? 50;
  const glowIntensity =
    hasGlow && frame >= message.appearFrame + glowDelayFrames
      ? 1
      : hasGlow
        ? 0.3
        : 0;

  const hasReaction = message.reaction || message.multiReaction;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: 8,
        marginBottom: 8,
        paddingLeft: isUser ? 50 : 12,
        paddingRight: isUser ? 12 : 50,
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {!isUser && (
        <Avatar
          config={participant.avatar}
          name={participant.displayName}
          size={28}
        />
      )}
      <div
        style={{ display: "flex", flexDirection: "column", maxWidth: "75%" }}
      >
        {!isUser && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: bubble.nameColor ?? tc.senderNameFallback,
              marginBottom: 2,
              marginLeft: 4,
            }}
          >
            {message.senderName}
          </span>
        )}
        <div
          style={{
            position: "relative",
            backgroundColor: bubble.backgroundColor,
            borderRadius: isUser
              ? "18px 18px 4px 18px"
              : "18px 18px 18px 4px",
            padding: "8px 12px",
            borderLeft: bubble.borderLeft ?? "none",
            boxShadow: hasGlow
              ? `0 0 ${15 + glowIntensity * 10}px rgba(232, 101, 44, ${0.3 + glowIntensity * 0.2})`
              : tc.bubbleShadow,
            transition: "box-shadow 0.3s ease",
            marginBottom: hasReaction ? 10 : 0,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: 1.4,
              color: tc.text,
            }}
          >
            {message.text}
          </p>
          {message.image && (
            <div
              style={{
                marginTop: 8,
                borderRadius: 8,
                overflow: "hidden",
                opacity: imageProgress,
                transform: `scale(${0.95 + imageProgress * 0.05})`,
              }}
            >
              <Img
                src={staticFile(message.image)}
                style={{
                  width: "100%",
                  maxWidth: 200,
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          )}
          {message.reaction && (
            <div
              style={{
                position: "absolute",
                bottom: -8,
                right: 8,
              }}
            >
              <EmojiReaction
                emoji={message.reaction.emoji}
                count={message.reaction.count}
                appearFrame={message.reaction.appearFrame}
              />
            </div>
          )}
          {message.multiReaction && (
            <div
              style={{
                position: "absolute",
                bottom: -8,
                right: 8,
              }}
            >
              <MultiEmojiReaction emojis={message.multiReaction.emojis} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
