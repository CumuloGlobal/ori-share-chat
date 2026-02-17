import React from "react";

interface EmojiIconProps {
  size?: number;
  color?: string;
}

export const EmojiIcon: React.FC<EmojiIconProps> = ({
  size = 24,
  color = "#54656f",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm5.694 0c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zM12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-5c-2.21 0-4 1.343-4 3h8c0-1.657-1.79-3-4-3z" />
  </svg>
);
