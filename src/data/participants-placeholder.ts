import { ParticipantMap } from "../types/participant";
import { colors } from "./theme";

export const placeholderParticipants: ParticipantMap = {
  alice: {
    id: "alice",
    displayName: "Alice",
    isLocalUser: false,
    avatar: {
      type: "initial",
      backgroundColor: "#1976d2",
    },
    bubble: {
      backgroundColor: colors.otherBubble,
    },
  },
  bob: {
    id: "bob",
    displayName: "Bob",
    isLocalUser: false,
    avatar: {
      type: "initial",
      backgroundColor: "#388e3c",
    },
    bubble: {
      backgroundColor: colors.otherBubble,
    },
  },
  ori: {
    id: "ori",
    displayName: "Ori",
    isLocalUser: false,
    avatar: {
      type: "image",
      content: "ori-icon.png",
      backgroundColor: colors.secondary,
    },
    bubble: {
      backgroundColor: colors.oriBubble,
      borderLeft: `3px solid ${colors.accent}`,
      glowColor: colors.oriGlow,
      glowDelayFrames: 50,
      nameColor: colors.accent,
    },
  },
};
