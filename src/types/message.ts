import { ParticipantId } from "./participant";

export interface Message {
  id: number;
  sender: ParticipantId;
  senderName: string;
  text: string;
  image?: string;
  appearFrame: number;
  reaction?: { emoji: string; count: number; appearFrame: number };
  multiReaction?: { emojis: Array<{ emoji: string; appearFrame: number }> };
}
