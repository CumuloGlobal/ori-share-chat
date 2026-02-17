import { ParticipantMap } from "../types/participant";
import { colors } from "./theme";

export const internParticipants: ParticipantMap = {
  mandy: {
    id: "mandy",
    displayName: "Mandy",
    isLocalUser: false,
    avatar: {
      type: "initial",
      backgroundColor: "#d32f2f",
    },
    bubble: {
      backgroundColor: colors.otherBubble,
    },
  },
  tom: {
    id: "tom",
    displayName: "Tom",
    isLocalUser: false,
    avatar: {
      type: "initial",
      backgroundColor: "#1976d2",
    },
    bubble: {
      backgroundColor: colors.otherBubble,
    },
  },
  blake: {
    id: "blake",
    displayName: "Blake",
    isLocalUser: false,
    avatar: {
      type: "initial",
      backgroundColor: "#388e3c",
    },
    bubble: {
      backgroundColor: colors.otherBubble,
    },
  },
  alissa: {
    id: "alissa",
    displayName: "Alissa",
    isLocalUser: false,
    avatar: {
      type: "initial",
      backgroundColor: "#8e24aa",
    },
    bubble: {
      backgroundColor: colors.otherBubble,
    },
  },
  sam: {
    id: "sam",
    displayName: "Sam",
    isLocalUser: false,
    avatar: {
      type: "initial",
      backgroundColor: "#f9a825",
    },
    bubble: {
      backgroundColor: colors.otherBubble,
    },
  },
  randy: {
    id: "randy",
    displayName: "Randy",
    isLocalUser: false,
    avatar: {
      type: "initial",
      backgroundColor: "#00acc1",
    },
    bubble: {
      backgroundColor: colors.otherBubble,
    },
  },
  anette: {
    id: "anette",
    displayName: "Anette",
    isLocalUser: false,
    avatar: {
      type: "initial",
      backgroundColor: "#5d4037",
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
