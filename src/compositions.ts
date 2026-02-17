// Composition components for use with @remotion/player
export {
  Placeholder,
  PlaceholderScreen,
  PlaceholderSocial,
} from "./PlaceholderComposition";

// Composition metadata for @remotion/player props
export const placeholder = {
  component: "Placeholder",
  durationInFrames: 600,
  fps: 30,
  width: 750,
  height: 750,
} as const;

export const placeholderScreen = {
  component: "PlaceholderScreen",
  durationInFrames: 600,
  fps: 30,
  width: 750,
  height: 750,
} as const;

export const placeholderSocial = {
  component: "PlaceholderSocial",
  durationInFrames: 600,
  fps: 30,
  width: 750,
  height: 750,
} as const;

// Re-export types and data for customization
export type {
  ParticipantId,
  AvatarConfig,
  BubbleStyle,
  ParticipantConfig,
  ParticipantMap,
} from "./types/participant";
export type { Message } from "./types/message";
export { colors } from "./data/theme";
export { placeholderParticipants } from "./data/participants-placeholder";
export { internParticipants } from "./data/participants-interns";
