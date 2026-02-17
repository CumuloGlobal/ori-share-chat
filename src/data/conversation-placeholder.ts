import { Message } from "../types/message";

export const placeholderConversation: Message[] = [
  {
    id: 1,
    sender: "alice",
    senderName: "Alice",
    text: "Hey, has anyone tried asking Ori about weekend plans?",
    appearFrame: 15,
  },
  {
    id: 2,
    sender: "bob",
    senderName: "Bob",
    text: "Not yet, let's see what it comes up with",
    appearFrame: 55,
  },
  {
    id: 3,
    sender: "ori",
    senderName: "Ori",
    text: "I thought you'd never ask! How about a hike followed by tacos?",
    appearFrame: 120,
  },
  {
    id: 4,
    sender: "alice",
    senderName: "Alice",
    text: "That actually sounds perfect",
    appearFrame: 185,
  },
  {
    id: 5,
    sender: "bob",
    senderName: "Bob",
    text: "I'm in. Ori always has the best ideas",
    appearFrame: 230,
  },
  {
    id: 6,
    sender: "ori",
    senderName: "Ori",
    text: "Saturday at 10am works for everyone. I'll send the trail link!",
    appearFrame: 340,
  },
];

export const placeholderTypingIndicators = [
  {
    sender: "ori" as const,
    senderName: "Ori",
    startFrame: 80,
    endFrame: 119,
  },
  {
    sender: "ori" as const,
    senderName: "Ori",
    startFrame: 295,
    endFrame: 339,
  },
];
