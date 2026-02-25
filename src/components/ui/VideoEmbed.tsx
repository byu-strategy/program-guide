"use client";

import { useState } from "react";
import Image from "next/image";

interface VideoEmbedProps {
  videoId: string;
  thumbnail: string;
  title?: string;
}

export default function VideoEmbed({ videoId, thumbnail, title }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative mx-auto w-full max-w-[900px] overflow-hidden rounded-md shadow-md"
        style={{ paddingBottom: "56.25%" }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          title={title || "Video"}
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="group relative mx-auto block w-full max-w-[900px] overflow-hidden rounded-md shadow-md transition-shadow hover:shadow-lg"
      aria-label={`Play video: ${title || "Video"}`}
    >
      <Image
        src={thumbnail}
        alt={title || "Video thumbnail"}
        width={900}
        height={506}
        className="w-full"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
          <svg className="ml-1 h-7 w-7 text-navy" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
