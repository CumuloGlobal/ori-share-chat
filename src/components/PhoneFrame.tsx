import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { ThemeProvider, useThemeColors } from "../data/ThemeContext";

interface PhoneFrameProps {
  children: React.ReactNode;
  dark?: boolean;
  slideIn?: "left" | "right" | "bottom" | null;
  slideOut?: "left" | "right" | null;
  exitFrame?: number;
  enterFrame?: number;
}

const PhoneFrameInner: React.FC<Omit<PhoneFrameProps, "dark">> = ({
  children,
  slideIn = "bottom",
  slideOut = null,
  exitFrame,
  enterFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tc = useThemeColors();

  // Phone slides in
  const effectiveFrame = Math.max(0, frame - enterFrame);
  const slideInProgress = spring({
    frame: effectiveFrame,
    fps,
    config: {
      damping: 15,
      stiffness: 80,
      mass: 1,
    },
  });

  // Calculate entry translation based on slideIn direction
  let entryTranslateX = 0;
  let entryTranslateY = 0;

  if (slideIn === "bottom") {
    entryTranslateY = (1 - slideInProgress) * 400;
  } else if (slideIn === "left") {
    entryTranslateX = (1 - slideInProgress) * -400;
  } else if (slideIn === "right") {
    entryTranslateX = (1 - slideInProgress) * 400;
  }

  // Phone slides out (if configured)
  let exitTranslateX = 0;
  let exitTranslateY = 0;
  let exitOpacity = 1;

  if (slideOut && exitFrame && frame >= exitFrame) {
    const exitProgress = spring({
      frame: frame - exitFrame,
      fps,
      config: {
        damping: 15,
        stiffness: 80,
        mass: 1,
      },
    });

    if (slideOut === "left") {
      exitTranslateX = exitProgress * -400;
    } else if (slideOut === "right") {
      exitTranslateX = exitProgress * 400;
    }

    exitOpacity = interpolate(exitProgress, [0, 0.5, 1], [1, 0.8, 0]);
  }

  // Don't render if not yet time to enter
  if (frame < enterFrame) {
    return null;
  }

  // Don't render if fully exited
  if (slideOut && exitFrame && frame > exitFrame + 30) {
    return null;
  }

  const translateX = entryTranslateX + exitTranslateX;
  const translateY = entryTranslateY + exitTranslateY;

  return (
    <div
      style={{
        width: 320,
        height: 650,
        backgroundColor: tc.phoneFrame,
        borderRadius: 35,
        padding: 12,
        boxShadow: "0 8px 20px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.06)",
        transform: `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px))`,
        opacity: exitOpacity,
        position: "absolute",
        left: "50%",
        top: "50%",
      }}
    >
      {/* Dynamic Island */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: "50%",
          transform: "translateX(-50%)",
          width: 100,
          height: 30,
          backgroundColor: "#000",
          borderRadius: 20,
          zIndex: 10,
        }}
      />

      {/* Status Bar */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 32,
          right: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 5,
        }}
      >
        {/* Time */}
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: tc.statusBarText,
          }}
        >
          9:41
        </span>

        {/* Right icons */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {/* Signal bars */}
          <svg width="18" height="12" viewBox="0 0 18 12">
            <rect x="0" y="8" width="3" height="4" fill={tc.statusBarText} rx="0.5" />
            <rect x="4" y="5" width="3" height="7" fill={tc.statusBarText} rx="0.5" />
            <rect x="8" y="2" width="3" height="10" fill={tc.statusBarText} rx="0.5" />
            <rect x="12" y="0" width="3" height="12" fill={tc.statusBarText} rx="0.5" />
          </svg>
          {/* WiFi */}
          <svg width="16" height="12" viewBox="0 0 16 12">
            <path
              d="M8 10.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              fill={tc.statusBarText}
            />
            <path
              d="M5.5 7.5a4 4 0 015 0"
              stroke={tc.statusBarText}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M3 5a7 7 0 0110 0"
              stroke={tc.statusBarText}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          {/* Battery */}
          <svg width="25" height="12" viewBox="0 0 25 12">
            <rect
              x="0"
              y="1"
              width="22"
              height="10"
              rx="3"
              stroke={tc.statusBarText}
              strokeWidth="1"
              fill="none"
            />
            <rect x="2" y="3" width="18" height="6" rx="1" fill={tc.statusBarText} />
            <rect x="23" y="4" width="2" height="4" rx="0.5" fill={tc.statusBarText} />
          </svg>
        </div>
      </div>

      {/* Screen content */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 25,
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ dark = false, ...rest }) => (
  <ThemeProvider dark={dark}>
    <PhoneFrameInner {...rest} />
  </ThemeProvider>
);
