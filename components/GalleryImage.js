"use client";

import { useState } from "react";

export default function GalleryImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className="g-placeholder">이미지 추가 예정</div>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
