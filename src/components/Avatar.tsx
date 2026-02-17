import React from "react";
import { Img, staticFile } from "remotion";
import { AvatarConfig } from "../types/participant";
import { useThemeColors } from "../data/ThemeContext";

interface AvatarProps {
  config: AvatarConfig;
  name: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ config, name, size = 32 }) => {
  const tc = useThemeColors();
  const isEmoji = config.type === "emoji";
  const isImage = config.type === "image";

  const getContent = () => {
    if (isEmoji) return config.content ?? "";
    return (config.content ?? name.charAt(0)).toUpperCase();
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: config.backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: isEmoji ? size * 0.5 : size * 0.45,
        fontWeight: 600,
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {isImage && config.content ? (
        <Img
          src={staticFile(config.content)}
          style={{
            width: size,
            height: size,
            objectFit: "cover",
          }}
        />
      ) : (
        getContent()
      )}
    </div>
  );
};
