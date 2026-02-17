import React, { useMemo } from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { ChatBubble } from "./ChatBubble";
import { ChatHeader } from "./ChatHeader";
import { ChatInputBar } from "./ChatInputBar";
import { TypingIndicator } from "./TypingIndicator";
import { ParticipantId, ParticipantMap } from "../types/participant";
import { Message } from "../types/message";
import { useThemeColors } from "../data/ThemeContext";
import { computeAutoScroll } from "../utils/autoScroll";

interface TypingIndicatorConfig {
  sender: ParticipantId;
  senderName: string;
  startFrame: number;
  endFrame: number;
}

interface ChatContainerProps {
  conversation: Message[];
  typingIndicators: TypingIndicatorConfig[];
  scrollKeyframes?: { frames: number[]; values: number[] };
  participants: ParticipantMap;
  headerTitle?: string;
  headerMembers?: string;
  headerAvatars?: Array<{ id: ParticipantId; name: string }>;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  conversation,
  typingIndicators,
  scrollKeyframes,
  participants,
  headerTitle = "Group Chat",
  headerMembers = "Alice, Bob, Ori",
  headerAvatars = [],
}) => {
  const frame = useCurrentFrame();
  const tc = useThemeColors();

  // Theme-aware participants: overlay bubble colors based on role
  const themedParticipants = useMemo<ParticipantMap>(() => {
    const result: ParticipantMap = {};
    for (const [key, p] of Object.entries(participants)) {
      const isOri = !!p.bubble.glowColor;
      const bubbleBg = p.isLocalUser
        ? tc.userBubble
        : isOri
          ? tc.oriBubble
          : tc.otherBubble;
      result[key] = {
        ...p,
        bubble: {
          ...p.bubble,
          backgroundColor: bubbleBg,
        },
      };
    }
    return result;
  }, [participants, tc]);

  // Resolve scroll keyframes: use manual if provided, otherwise auto-compute
  const effectiveScrollKeyframes = useMemo(
    () =>
      scrollKeyframes ??
      computeAutoScroll(conversation, typingIndicators, participants),
    [scrollKeyframes, conversation, typingIndicators, participants],
  );

  // Find active typing indicator
  const activeTyping = typingIndicators.find(
    (t) => frame >= t.startFrame && frame <= t.endFrame
  );

  // Calculate scroll offset
  const scrollOffset = interpolate(
    frame,
    effectiveScrollKeyframes.frames,
    effectiveScrollKeyframes.values,
    { extrapolateRight: "clamp" }
  );

  // Build avatar configs for header
  const headerAvatarConfigs = headerAvatars.map((a) => ({
    config: themedParticipants[a.id]?.avatar ?? {
      type: "initial" as const,
      backgroundColor: "#888",
    },
    name: a.name,
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: tc.chatBackground,
      }}
    >
      <ChatHeader
        title={headerTitle}
        subtitle={headerMembers}
        avatars={headerAvatarConfigs}
      />

      {/* Messages area */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          padding: "12px 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            transform: `translateY(-${scrollOffset}px)`,
          }}
        >
          {conversation.map((message) => {
            const participant = themedParticipants[message.sender];
            if (!participant) return null;

            return (
              <ChatBubble
                key={message.id}
                message={message}
                participant={participant}
                imageAppearFrame={
                  message.image ? message.appearFrame + 20 : undefined
                }
              />
            );
          })}

          {/* Typing indicator */}
          {activeTyping && themedParticipants[activeTyping.sender] && (
            <TypingIndicator
              participant={themedParticipants[activeTyping.sender]}
            />
          )}

          {/* Bottom padding to prevent messages hugging the input bar */}
          <div style={{ minHeight: 24, flexShrink: 0 }} />
        </div>
      </div>

      <ChatInputBar />
    </div>
  );
};
