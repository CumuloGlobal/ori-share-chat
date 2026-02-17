export type ParticipantId = string;

export interface AvatarConfig {
  type: "initial" | "emoji" | "image";
  content?: string;
  backgroundColor: string;
}

export interface BubbleStyle {
  backgroundColor: string;
  borderLeft?: string;
  glowColor?: string;
  glowDelayFrames?: number;
  nameColor?: string;
}

export interface ParticipantConfig {
  id: ParticipantId;
  displayName: string;
  isLocalUser: boolean;
  avatar: AvatarConfig;
  bubble: BubbleStyle;
}

export type ParticipantMap = Record<ParticipantId, ParticipantConfig>;
