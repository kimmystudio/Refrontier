"use client";

import { useState } from "react";

function SlideImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className="slide-placeholder">이미지 추가 예정</div>;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
  );
}

function GroupSlider({ group }) {
  const [i, setI] = useState(0);
  const imgs = group.images || [];
  if (imgs.length === 0) return null;
  const many = imgs.length > 1;
  const cur = imgs[i];

  return (
    <div className="group">
      <div className="group-head">
        <h3 className="group-title">{group.title}</h3>
        {many && (
          <span className="group-count">
            {i + 1} / {imgs.length}
          </span>
        )}
      </div>

      <div className="slide">
        <div className="slide-media">
          <SlideImage src={cur.src} alt={cur.caption || group.title} />
          {many && (
            <>
              <button
                type="button"
                className="slide-arrow left"
                aria-label="이전 이미지"
                onClick={() => setI((p) => (p - 1 + imgs.length) % imgs.length)}
              >
                ←
              </button>
              <button
                type="button"
                className="slide-arrow right"
                aria-label="다음 이미지"
                onClick={() => setI((p) => (p + 1) % imgs.length)}
              >
                →
              </button>
            </>
          )}
        </div>

        {cur.caption && <p className="slide-caption">{cur.caption}</p>}

        {many && (
          <div className="slide-dots">
            {imgs.map((_, d) => (
              <button
                key={d}
                type="button"
                className={"dot" + (d === i ? " on" : "")}
                aria-label={`${d + 1}번째 이미지`}
                onClick={() => setI(d)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function GalleryGroups({ groups }) {
  if (!groups || groups.length === 0) return null;
  return (
    <div className="groups">
      {groups.map((g, idx) => (
        <GroupSlider key={idx} group={g} />
      ))}
    </div>
  );
}
