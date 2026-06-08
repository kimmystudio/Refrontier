"use client";

import { useRef, useState } from "react";

function SlideImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className="slide-placeholder">이미지 추가 예정</div>;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}

function GroupSlider({ group }) {
  const [i, setI] = useState(0);
  const imgs = group.images || [];
  const drag = useRef({ active: false, startX: 0, dx: 0 });

  if (imgs.length === 0) return null;
  const many = imgs.length > 1;
  const cur = imgs[i];

  const go = (dir) =>
    setI((p) => (p + dir + imgs.length) % imgs.length);

  // ── 스와이프 / 드래그 ──
  function onStart(clientX) {
    drag.current = { active: true, startX: clientX, dx: 0 };
  }
  function onMove(clientX) {
    if (!drag.current.active) return;
    drag.current.dx = clientX - drag.current.startX;
  }
  function onEnd() {
    if (!drag.current.active) return;
    const { dx } = drag.current;
    drag.current.active = false;
    const THRESHOLD = 45; // px 이상 밀면 넘김
    if (many && Math.abs(dx) > THRESHOLD) {
      go(dx < 0 ? 1 : -1);
    }
  }

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
        <div
          className="slide-media"
          // 터치 (모바일/태블릿)
          onTouchStart={(e) => onStart(e.touches[0].clientX)}
          onTouchMove={(e) => onMove(e.touches[0].clientX)}
          onTouchEnd={onEnd}
          // 마우스 드래그 (데스크탑)
          onMouseDown={(e) => onStart(e.clientX)}
          onMouseMove={(e) => drag.current.active && onMove(e.clientX)}
          onMouseUp={onEnd}
          onMouseLeave={onEnd}
          style={{ cursor: many ? "grab" : "default" }}
        >
          <SlideImage src={cur.src} alt={cur.caption || group.title} />
          {many && (
            <>
              <button
                type="button"
                className="slide-arrow left"
                aria-label="이전 이미지"
                onClick={() => go(-1)}
              >
                ←
              </button>
              <button
                type="button"
                className="slide-arrow right"
                aria-label="다음 이미지"
                onClick={() => go(1)}
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
