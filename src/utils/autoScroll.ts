import { Message } from "../types/message";
import { ParticipantMap } from "../types/participant";

interface TypingIndicatorConfig {
  sender: string;
  senderName: string;
  startFrame: number;
  endFrame: number;
}

// Layout constants derived from ChatBubble.tsx and PhoneFrame
const CONTAINER_WIDTH = 296; // phone 320 - 2×12 padding
const ROW_PADDING = 62; // paddingLeft + paddingRight (12+50 or 50+12)
const AVATAR_SPACE = 36; // 28px avatar + 8px gap
const COLUMN_MAX_WIDTH = 0.75 * (CONTAINER_WIDTH - ROW_PADDING); // ~175.5px
const BUBBLE_H_PADDING = 24; // 12px left + 12px right
const TEXT_WIDTH = COLUMN_MAX_WIDTH - BUBBLE_H_PADDING; // ~151.5px
const CHAR_WIDTH = 7; // approximate width per char at 14px system font
const LINE_HEIGHT = 19.6; // 14px × 1.4

const VIEWPORT_HEIGHT = 425; // phone inner 626 - header ~104 - input ~73 - message padding 24
const BOTTOM_PADDING = 44; // 24px spacer div + 20px extra breathing room
const SCROLL_LEAD_FRAMES = 15;
const TYPING_INDICATOR_HEIGHT = 36;

/**
 * Estimate how many wrapped lines a text string occupies given a pixel width,
 * using word-aware wrapping.
 */
function estimateLineCount(text: string, widthPx: number): number {
  if (!text) return 1;
  const maxCharsPerLine = Math.floor(widthPx / CHAR_WIDTH);
  if (maxCharsPerLine <= 0) return 1;

  const words = text.split(/\s+/);
  let lines = 1;
  let remaining = maxCharsPerLine;

  for (const word of words) {
    if (word.length === 0) continue;
    if (word.length > remaining) {
      // Word doesn't fit on current line
      if (word.length > maxCharsPerLine) {
        // Word is longer than a full line — it will wrap across multiple lines
        const charsNeeded = remaining === maxCharsPerLine ? word.length : word.length;
        if (remaining < maxCharsPerLine) {
          // We're mid-line, move to next line first
          lines++;
          remaining = maxCharsPerLine;
        }
        const extraLines = Math.ceil(word.length / maxCharsPerLine) - 1;
        lines += extraLines;
        remaining = maxCharsPerLine - (word.length % maxCharsPerLine || maxCharsPerLine);
      } else {
        lines++;
        remaining = maxCharsPerLine - word.length;
      }
    } else {
      remaining -= word.length;
    }
    // Account for space after word
    remaining -= 1;
    if (remaining < 0) remaining = 0;
  }

  return lines;
}

/**
 * Estimate the total pixel height of a single message row,
 * including sender name, bubble padding, text, image, reaction, and margin.
 */
export function estimateBubbleHeight(
  message: Message,
  isLocalUser: boolean,
): number {
  const senderNameHeight = isLocalUser ? 0 : 15;
  const lineCount = estimateLineCount(message.text, TEXT_WIDTH);
  const textHeight = lineCount * LINE_HEIGHT;
  const imageHeight = message.image ? 168 : 0;
  const bubblePadding = 16; // 8 + 8
  const reactionMargin =
    message.reaction || message.multiReaction ? 10 : 0;
  const rowMarginBottom = 8;

  return (
    senderNameHeight +
    bubblePadding +
    textHeight +
    imageHeight +
    reactionMargin +
    rowMarginBottom
  );
}

/**
 * Compute scroll keyframes automatically from conversation timing.
 *
 * At each "interesting frame" (message appear, typing start/end), compute
 * total content height and derive a scroll target. Emit keyframe pairs
 * with a lead-in for smooth transitions.
 */
export function computeAutoScroll(
  conversation: Message[],
  typingIndicators: TypingIndicatorConfig[],
  participants: ParticipantMap,
): { frames: number[]; values: number[] } {
  // Collect all event frames
  const eventFrames = new Set<number>();
  for (const msg of conversation) {
    eventFrames.add(msg.appearFrame);
  }
  for (const ti of typingIndicators) {
    eventFrames.add(ti.startFrame);
    eventFrames.add(ti.endFrame + 1);
  }

  const sortedFrames = Array.from(eventFrames).sort((a, b) => a - b);

  if (sortedFrames.length === 0) {
    return { frames: [0], values: [0] };
  }

  const frames: number[] = [];
  const values: number[] = [];
  let prevScroll = 0;

  for (const eventFrame of sortedFrames) {
    // Sum heights of all visible messages at this frame
    let totalHeight = 0;
    for (const msg of conversation) {
      if (msg.appearFrame <= eventFrame) {
        const participant = participants[msg.sender];
        const isLocal = participant?.isLocalUser ?? false;
        totalHeight += estimateBubbleHeight(msg, isLocal);
      }
    }

    // Add typing indicator height if any is active
    const typingActive = typingIndicators.some(
      (ti) => eventFrame >= ti.startFrame && eventFrame <= ti.endFrame,
    );
    if (typingActive) {
      totalHeight += TYPING_INDICATOR_HEIGHT;
    }

    const scrollTarget = Math.max(
      0,
      totalHeight + BOTTOM_PADDING - VIEWPORT_HEIGHT,
    );

    if (scrollTarget !== prevScroll) {
      // Hold previous value at lead frame
      let leadFrame = eventFrame - SCROLL_LEAD_FRAMES;

      // Clamp so lead frame doesn't overlap or precede last emitted frame
      if (frames.length > 0) {
        const lastFrame = frames[frames.length - 1];
        if (leadFrame <= lastFrame) {
          leadFrame = lastFrame + 1;
        }
      }
      if (leadFrame < 0) leadFrame = 0;

      // Only emit hold keyframe if it's distinct from the event frame
      if (leadFrame < eventFrame) {
        frames.push(leadFrame);
        values.push(prevScroll);
      }

      frames.push(eventFrame);
      values.push(scrollTarget);
      prevScroll = scrollTarget;
    }
  }

  // Ensure at least one keyframe at frame 0
  if (frames.length === 0 || frames[0] !== 0) {
    frames.unshift(0);
    values.unshift(0);
  }

  return { frames, values };
}
