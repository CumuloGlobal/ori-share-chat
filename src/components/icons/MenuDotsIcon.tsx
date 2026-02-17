import React from "react";

interface MenuDotsIconProps {
  size?: number;
  color?: string;
}

export const MenuDotsIcon: React.FC<MenuDotsIconProps> = ({
  size = 24,
  color = "#54656f",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z" />
  </svg>
);
