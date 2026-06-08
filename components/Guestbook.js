"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import Reveal from "./Reveal";

const BUCKET = "guestbook";
const MAX_FILE_MB = 8;
const MAX_FILES = 8;

export default function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  // files: [{ file, previewUrl }]
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const fetchEntries = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (!error && data) setEntries(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  // 컴포넌트가 사라질 때 미리보기 URL 정리
  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onPickFiles(e) {
    setError("");
    const picked = Array.from(e.target.files || []);
    if (picked.length === 0) return;

    const next = [...files];
    for (const f of picked) {
      if (!f.type.startsWith("image/")) {
        setError("이미지 파일만 업로드할 수 있어요.");
        continue;
      }
      if (f.size > MAX_FILE_MB * 1024 * 1024) {
        setError(`이미지는 한 장당 ${MAX_FILE_MB}MB 이하만 가능해요.`);
        continue;
      }
      if (next.length >= MAX_FILES) {
        setError(`사진은 최대 ${MAX_FILES}장까지 올릴 수 있어요.`);
        break;
      }
      next.push({ file: f, previewUrl: URL.createObjectURL(f) });
    }
    setFiles(next);
    // 같은 파일 다시 선택할 수 있도록 input 초기화
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile(idx) {
    setFiles((prev) => {
      const target = prev[idx];
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((_, i) => i !== idx);
    });
  }

  function clearFiles() {
    files.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!message.trim()) {
      setError("문구를 입력해 주세요.");
      return;
    }
    if (!isSupabaseConfigured) {
      setError("아직 Supabase가 연결되지 않았어요.");
      return;
    }

    setSubmitting(true);
    try {
      const image_urls = [];

      for (const { file } of files) {
        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
        image_urls.push(pub.publicUrl);
      }

      const { error: insErr } = await supabase.from("guestbook").insert({
        name: name.trim() || null,
        message: message.trim(),
        image_url: image_urls[0] || null, // 호환용(옛 컬럼)
        image_urls, // 여러 장 목록
      });
      if (insErr) throw insErr;

      setName("");
      setMessage("");
      clearFiles();
      await fetchEntries();
    } catch (err) {
      console.error(err);
      setError(
        "저장 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요. (" +
          (err?.message || "unknown") +
          ")"
      );
    } finally {
      setSubmitting(false);
    }
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  }

  // 옛 글(image_url 1개)과 새 글(image_urls 배열) 모두 지원
  function imagesOf(en) {
    if (Array.isArray(en.image_urls) && en.image_urls.length > 0) {
      return en.image_urls;
    }
    return en.image_url ? [en.image_url] : [];
  }

  return (
    <>
        <Reveal delay={0.1}>
          <p className="gb-intro">
            전시에서 찍은 사진, 작품을 담은 사진, 혹은 저와 함께 찍은 사진을 올리고
            짧은 문구를 남겨주세요. 사진은 여러 장 한 번에 올릴 수 있어요. 남겨주신
            기록은 아래에 차곡차곡 쌓입니다.
          </p>
        </Reveal>

        {!isSupabaseConfigured ? (
          <div className="gb-setup">
            방명록을 사용하려면 <code>.env.local</code> 에 Supabase 주소와 anon
            키를 넣어주세요. (README 의 배포 가이드 참고) 설정이 끝나면 이 안내는
            사라지고 입력 폼이 나타납니다.
          </div>
        ) : (
          <Reveal delay={0.12}>
            <form className="gb-form" onSubmit={onSubmit}>
              <div className="gb-field">
                <label className="gb-label" htmlFor="gb-name">
                  이름 (선택)
                </label>
                <input
                  id="gb-name"
                  className="gb-input"
                  type="text"
                  value={name}
                  maxLength={40}
                  placeholder="익명도 괜찮아요"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="gb-field">
                <label className="gb-label" htmlFor="gb-msg">
                  문구 *
                </label>
                <textarea
                  id="gb-msg"
                  className="gb-textarea"
                  value={message}
                  maxLength={500}
                  placeholder="작품에 대한 감상, 응원의 한마디를 남겨주세요"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="gb-field">
                <label className="gb-label">
                  사진 (선택 · 최대 {MAX_FILES}장)
                </label>
                <div className="gb-file">
                  <button
                    type="button"
                    className="gb-file-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    📷 사진 선택
                  </button>
                  {files.length > 0 && (
                    <>
                      <span className="gb-file-name">{files.length}장 선택됨</span>
                      <button
                        type="button"
                        className="gb-file-btn"
                        onClick={clearFiles}
                        style={{ borderStyle: "solid" }}
                      >
                        전체 제거
                      </button>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onPickFiles}
                    style={{ display: "none" }}
                  />
                </div>

                {files.length > 0 && (
                  <div className="gb-previews">
                    {files.map((f, i) => (
                      <div className="gb-preview-item" key={i}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={f.previewUrl} alt={`미리보기 ${i + 1}`} />
                        <button
                          type="button"
                          className="gb-preview-remove"
                          onClick={() => removeFile(i)}
                          aria-label="이 사진 제거"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {error && <div className="gb-error">{error}</div>}

              <button className="gb-submit" type="submit" disabled={submitting}>
                {submitting ? "남기는 중…" : "방명록 남기기"}
                <span aria-hidden="true">→</span>
              </button>
              <p className="gb-note">
                * 남겨주신 내용은 모두에게 공개됩니다. 개인정보는 적지 말아주세요.
              </p>
            </form>
          </Reveal>
        )}

        {/* 방명록 벽 */}
        {isSupabaseConfigured && (
          <>
            {loading ? (
              <div className="gb-empty">불러오는 중…</div>
            ) : entries.length === 0 ? (
              <div className="gb-empty">아직 남겨진 기록이 없어요. 첫 기록을 남겨주세요.</div>
            ) : (
              <div className="gb-wall">
                {entries.map((en) => {
                  const imgs = imagesOf(en);
                  return (
                    <article className="gb-entry" key={en.id}>
                      {imgs.length > 0 && (
                        <div
                          className={
                            "gb-entry-imgs" + (imgs.length > 1 ? " multi" : "")
                          }
                        >
                          {imgs.map((url, i) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={i} src={url} alt="" loading="lazy" />
                          ))}
                        </div>
                      )}
                      <div className="gb-entry-body">
                        <p className="gb-entry-msg">{en.message}</p>
                        <div className="gb-entry-meta">
                          <span className="gb-entry-name">{en.name || "익명"}</span>
                          <span>{formatDate(en.created_at)}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
    </>
  );
}
