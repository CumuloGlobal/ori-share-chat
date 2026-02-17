import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { OptionalAudio } from "./components/OptionalAudio";
import { PhoneFrame } from "./components/PhoneFrame";
import { ChatContainer } from "./components/ChatContainer";
import { placeholderParticipants } from "./data/participants-placeholder";
import {
  placeholderConversation,
  placeholderTypingIndicators,
} from "./data/conversation-placeholder";

// Base component — phone with slide-in animation, transparent background (light mode)
export const Placeholder: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <PhoneFrame slideIn="bottom" slideOut={null} enterFrame={0}>
        <ChatContainer
          conversation={placeholderConversation}
          typingIndicators={placeholderTypingIndicators}
          participants={placeholderParticipants}
          headerTitle="Group Chat"
          headerMembers="Alice, Bob, Ori"
          headerAvatars={[
            { id: "alice", name: "Alice" },
            { id: "bob", name: "Bob" },
            { id: "ori", name: "Ori" },
          ]}
        />
      </PhoneFrame>
    </AbsoluteFill>
  );
};

// Screen variant — static phone frame, no animations, transparent background
export const PlaceholderScreen: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <PhoneFrame slideIn={null} slideOut={null} enterFrame={0}>
        <ChatContainer
          conversation={placeholderConversation}
          typingIndicators={placeholderTypingIndicators}
          participants={placeholderParticipants}
          headerTitle="Group Chat"
          headerMembers="Alice, Bob, Ori"
          headerAvatars={[
            { id: "alice", name: "Alice" },
            { id: "bob", name: "Bob" },
            { id: "ori", name: "Ori" },
          ]}
        />
      </PhoneFrame>
    </AbsoluteFill>
  );
};

// Social variant — Interns green palette background, rotating rect, optional audio
const BG_ROTATIONS = [-10, 5, -3, 7, -2, 8, -6, 4, -9, 3];

export const PlaceholderSocial: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const rotation = BG_ROTATIONS[Math.floor(frame / 30) % BG_ROTATIONS.length];

  return (
    <AbsoluteFill style={{ backgroundColor: "#E8F5E9", overflow: "hidden" }}>
      <OptionalAudio
        src="music/Soft Static Sundays.mp3"
        volume={0.4}
        fadeOutAt={durationInFrames - 30}
      />
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -100,
          right: -100,
          height: "60%",
          backgroundColor: "#C8E6C9",
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "center center",
        }}
      />
      <Placeholder />
    </AbsoluteFill>
  );
};
