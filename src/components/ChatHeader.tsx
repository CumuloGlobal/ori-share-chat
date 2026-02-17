import React from "react";
import { Avatar } from "./Avatar";
import { AvatarConfig } from "../types/participant";
import { useThemeColors } from "../data/ThemeContext";
import { BackArrowIcon, SearchIcon, MenuDotsIcon } from "./icons";

interface ChatHeaderProps {
  title: string;
  subtitle: string;
  avatars: Array<{ config: AvatarConfig; name: string }>;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  subtitle,
  avatars,
}) => {
  const tc = useThemeColors();

  return (
    <div
      style={{
        backgroundColor: tc.headerBackground,
        padding: "55px 12px 12px 12px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderBottom: `1px solid ${tc.border}`,
      }}
    >
      {/* Group avatar stack */}
      <div
        style={{
          position: "relative",
          width: (avatars.length - 1) * 14 + 26,
          height: 36,
          flexShrink: 0,
        }}
      >
        {avatars.map((avatar, index) => (
          <div
            key={index}
            style={{ position: "absolute", left: index * 14, top: 0 }}
          >
            <Avatar config={avatar.config} name={avatar.name} size={26} />
          </div>
        ))}
      </div>

      {/* Group info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: tc.text,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 12,
            color: tc.subtitleText,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Action icons (hidden for now) */}
    </div>
  );
};
