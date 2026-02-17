# Ori Share Chat — Agent Documentation

This is a [Remotion](https://www.remotion.dev/) template for generating animated chat conversation videos. Each animation tells a story of **Ori** (an AI agent) interacting with a group of friends inside a phone chat UI.

## Quick Reference

```
pnpm dev              # Launch Remotion Studio for preview
pnpm build            # Production bundle
pnpm download-music   # Download MP3s from Google Drive (optional)
```

All compositions render at **750x750 @ 30fps**.

---

## Architecture Overview

```
Composition File (e.g. PlaceholderComposition.tsx)
  ├─ Base component (transparent background, phone only)
  │   └─ PhoneFrame (iOS mockup with slide-in animation)
  │       └─ ChatContainer (messages, header, scroll, typing)
  │           ├─ ChatHeader (title + avatar stack)
  │           ├─ ChatBubble[] (each message with reactions)
  │           ├─ TypingIndicator (animated dots)
  │           └─ ChatInputBar
  ├─ Screen component (static phone, no animations, transparent BG)
  │   └─ PhoneFrame (no slide-in/out)
  │       └─ ChatContainer (same props)
  └─ Social component (branded background + music + base component)
      ├─ OptionalAudio (background music, graceful if missing)
      ├─ Rotating background rectangle
      └─ <Base /> component
```

### Three Composition Variants

Every story exports three variants:

| Variant | Purpose | Background | Animation |
|---------|---------|------------|-----------|
| **Base** (`Placeholder`) | Phone with slide-in | Transparent | Phone slides in from bottom |
| **Screen** (`PlaceholderScreen`) | Static frame for web embedding | Transparent | No slide animation |
| **Social** (`PlaceholderSocial`) | Social media post | Colored background + music | Rotating accent rect + phone slide-in |

### Key Files

| File | Purpose |
|------|---------|
| `src/Root.tsx` | Registers all compositions for Remotion Studio |
| `src/compositions.ts` | Exports components + metadata for `@remotion/player` |
| `src/components/ChatContainer.tsx` | Core chat rendering with auto-scroll |
| `src/components/PhoneFrame.tsx` | iOS phone mockup with light/dark themes |
| `src/components/OptionalAudio.tsx` | Conditional audio (HEAD-probes file existence) |
| `src/utils/autoScroll.ts` | Computes scroll keyframes from message timing |
| `src/data/ThemeContext.tsx` | Light/dark theme color system |

---

## How to Create a New Story

### 1. Write a conversation data file

Create `src/data/conversation-<name>.ts`. Export two things:

```typescript
import { Message } from "../types/message";

export const myStoryConversation: Message[] = [
  {
    id: 1,
    sender: "alice",         // Must match a key in the participant map
    senderName: "Alice",     // Display name shown above bubble
    text: "Message text here",
    appearFrame: 15,          // Frame when this message appears (30fps)
  },
  {
    id: 2,
    sender: "ori",
    senderName: "Ori",
    text: "Reply with emoji \uD83D\uDE3C",
    appearFrame: 80,
    reaction: {               // Optional single reaction
      emoji: "\uD83D\uDD25",
      count: 3,
      appearFrame: 110,
    },
  },
  {
    id: 3,
    sender: "bob",
    senderName: "Bob",
    text: "Another message",
    appearFrame: 140,
    multiReaction: {          // Optional multiple reactions
      emojis: [
        { emoji: "\uD83D\uDE02", appearFrame: 165 },
        { emoji: "\uD83D\uDC80", appearFrame: 177 },
      ],
    },
  },
];

// Add typing indicators before Ori's messages
export const myStoryTypingIndicators = [
  {
    sender: "ori" as const,
    senderName: "Ori",
    startFrame: 45,   // Show typing dots starting here
    endFrame: 79,     // Hide dots just before message appears
  },
];
```

**Timing guidelines:**
- First message at frame ~15
- Space messages 30-50 frames apart for quick exchanges, 50-80 for longer gaps
- Typing indicators should start ~35 frames before Ori's message and end 1 frame before `appearFrame`
- Reactions appear 25-35 frames after the message they're on
- Last reaction should finish ~40 frames before the composition ends

### 2. Create or reuse a participant file

Create `src/data/participants-<name>.ts` or reuse an existing one (e.g. `participants-placeholder.ts`, `participants-interns.ts`). Each participant needs an entry:

```typescript
import { ParticipantMap } from "../types/participant";
import { colors } from "./theme";

export const myParticipants: ParticipantMap = {
  alice: {
    id: "alice",
    displayName: "Alice",
    isLocalUser: false,
    avatar: { type: "initial", backgroundColor: "#1976d2" },
    bubble: { backgroundColor: colors.otherBubble },
  },
  ori: {
    id: "ori",
    displayName: "Ori",
    isLocalUser: false,
    avatar: { type: "image", content: "ori-icon.png", backgroundColor: colors.secondary },
    bubble: {
      backgroundColor: colors.oriBubble,
      borderLeft: `3px solid ${colors.accent}`,
      glowColor: colors.oriGlow,
      glowDelayFrames: 50,
      nameColor: colors.accent,
    },
  },
};
```

### 3. Create the composition file

Create `src/<Name>Composition.tsx` with three exported components following the pattern in `src/PlaceholderComposition.tsx`:

- **Base** — `PhoneFrame` with `slideIn="bottom"`, transparent background
- **Screen** — `PhoneFrame` with `slideIn={null}`, transparent background
- **Social** — Colored background + `OptionalAudio` + rotating rect + `<Base />`

Use the `dark` prop on `PhoneFrame` for dark mode compositions.

### 4. Register the composition

**`src/Root.tsx`** — Add `<Composition>` entries for all three variants:

```tsx
<Composition
  id="MyStory"
  component={MyStory}
  durationInFrames={900}
  fps={30}
  width={750}
  height={750}
/>
```

**`src/compositions.ts`** — Add component exports and metadata objects.

### 5. Calculate duration

Set `durationInFrames` to the last reaction's `appearFrame` + ~40 frames of buffer. The duration must match in:
1. `src/Root.tsx` (all `<Composition>` entries)
2. `src/compositions.ts` (all metadata objects)

### 6. Verify

Run `pnpm dev` and preview all variants in Remotion Studio. Check that:
- Messages appear and scroll correctly (auto-scroll handles this)
- Typing indicators show before Ori's messages
- Reactions animate in at the right time
- Music fades out cleanly at the end (Social variant)
- No messages get clipped at the bottom

---

## Message Type Reference

```typescript
interface Message {
  id: number;                  // Sequential, starting at 1
  sender: string;              // Key in participant map (e.g. "ori", "alice")
  senderName: string;          // Display name above bubble
  text: string;                // Message content (supports unicode emoji)
  appearFrame: number;         // Frame when message appears
  image?: string;              // Optional image path (relative to public/)
  reaction?: {                 // Single emoji reaction
    emoji: string;
    count: number;
    appearFrame: number;
  };
  multiReaction?: {            // Multiple emoji reactions
    emojis: Array<{
      emoji: string;
      appearFrame: number;
    }>;
  };
}
```

## Auto-Scroll

Scroll is computed automatically from message content and timing (`src/utils/autoScroll.ts`). No manual scroll keyframes needed. The system estimates bubble heights based on text length, images, and reactions, then generates smooth scroll transitions.

## Music

MP3 files are not committed to git. Download them via `pnpm download-music` (requires Python `gdown`) or place MP3s manually in `public/music/`. Compositions work fine without music — `OptionalAudio` silently returns null when files are missing.

## Theme System

The `PhoneFrame` component accepts a `dark` prop. When `dark` is true, chat bubbles, backgrounds, and text colors switch to dark theme variants via `ThemeContext`.

## Social Variant Color Palettes

When creating a Social variant, pick a background + accent color pair:

| Palette | Background | Accent | Music |
|---------|-----------|--------|-------|
| Green (Interns) | `#E8F5E9` | `#C8E6C9` | `Soft Static Sundays.mp3` |
| Dark (The Boys) | `#1a1a2e` | `#16213e` | `Pocket Full of Left Turns.mp3` |
| Lavender (Girl Squad) | `#FFF0F5` | `#CDC7FF` | `Slow-Motion Sunshine.mp3` |
