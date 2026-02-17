import React from "react";

interface BackArrowIconProps {
  size?: number;
  color?: string;
}

export const BackArrowIcon: React.FC<BackArrowIconProps> = ({
  size = 24,
  color = "#54656f",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
);
