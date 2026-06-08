"use client";

import { useState } from "react";

export default function VideoCarousel({ videos }) {
  const [i, setI] = useState(0);
  if (!videos || videos.length === 0) return null;

  const v = videos[i];
  const many = videos.length > 1;

  return (
    <div className="vid">
      <div className="vid-frame">
        <iframe
          key={v.id}
          src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&mute=1&rel=0&playsinline=1`}
          title={v.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <div className="vid-bar">
        <span className="vid-title">{v.title}</span>
        {many && (
          <div className="vid-nav">
            <button
              type="button"
              aria-label="이전 영상"
              onClick={() => setI((p) => (p - 1 + videos.length) % videos.length)}
            >
              ←
            </button>
            <span className="vid-count">
              {i + 1} / {videos.length}
            </span>
            <button
              type="button"
              aria-label="다음 영상"
              onClick={() => setI((p) => (p + 1) % videos.length)}
            >
              →
            </button>
          </div>
        )}
      </div>
      <p className="vid-note">소리는 영상 위에서 음소거 아이콘을 눌러 켤 수 있어요.</p>
    </div>
  );
}
