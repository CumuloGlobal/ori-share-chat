import React, { useEffect, useState } from "react";
import { Audio, staticFile, interpolate, useCurrentFrame } from "remotion";

interface OptionalAudioProps {
  /** Path relative to public/, e.g. "music/track.mp3" */
  src: string;
  /** Target volume 0-1. Default: 0.5 */
  volume?: number;
  /** Frame to start playback. Default: 0 */
  startFrom?: number;
  /** Frame to begin fade-out. If omitted, no fade-out. */
  fadeOutAt?: number;
  /** Fade-out length in frames. Default: 30 */
  fadeOutDuration?: number;
}

/**
 * Renders Remotion <Audio> only if the static file exists.
 * Probes via HEAD request on mount — returns null if file is missing.
 * Includes fade-in (30 frames) and optional fade-out.
 */
export const OptionalAudio: React.FC<OptionalAudioProps> = ({
  src,
  volume = 0.5,
  startFrom = 0,
  fadeOutAt,
  fadeOutDuration = 30,
}) => {
  const [exists, setExists] = useState(false);
  const frame = useCurrentFrame();

  useEffect(() => {
    let cancelled = false;
    const url = staticFile(src);

    fetch(url, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setExists(res.ok);
      })
      .catch(() => {
        if (!cancelled) setExists(false);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!exists) return null;

  const fadeInVolume = interpolate(
    frame,
    [startFrom, startFrom + 30],
    [0, volume],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const fadeOutVolume =
    fadeOutAt !== undefined
      ? interpolate(
          frame,
          [fadeOutAt, fadeOutAt + fadeOutDuration],
          [volume, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      : volume;

  const effectiveVolume = Math.min(fadeInVolume, fadeOutVolume);

  return (
    <Audio
      src={staticFile(src)}
      volume={effectiveVolume}
      startFrom={startFrom}
    />
  );
};
