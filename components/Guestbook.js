"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import Reveal from "./Reveal";

const BUCKET = "guestbook";
const MAX_FILE_MB = 8;

export default function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
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

  // 미리보기 URL 정리
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function onPickFile(e) {
    const f = e.target.files?.[0];
    setError("");
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("이미지 파일만 업로드할 수 있어요.");
      return;
    }
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`이미지는 ${MAX_FILE_MB}MB 이하만 가능해요.`);
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  }

  function clearFile() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl("");
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
      let image_url = null;

      if (file) {
        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
        image_url = pub.publicUrl;
      }

      const { error: insErr } = await supabase.from("guestbook").insert({
        name: name.trim() || null,
        message: message.trim(),
        image_url,
      });
      if (insErr) throw insErr;

      // 초기화 후 목록 새로고침
      setName("");
      setMessage("");
      clearFile();
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

  return (
    <section className="section" id="guestbook">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">방명록 / Guestbook</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">함께한 기록을 남겨주세요</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="gb-intro">
            전시에서 찍은 사진, 작품을 담은 사진, 혹은 저와 함께 찍은 사진을 올리고
            짧은 문구를 남겨주세요. 남겨주신 기록은 아래에 차곡차곡 쌓입니다.
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
                <label className="gb-label">사진 (선택)</label>
                <div className="gb-file">
                  <button
                    type="button"
                    className="gb-file-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    📷 사진 선택
                  </button>
                  {file && <span className="gb-file-name">{file.name}</span>}
                  {file && (
                    <button
                      type="button"
                      className="gb-file-btn"
                      onClick={clearFile}
                      style={{ borderStyle: "solid" }}
                    >
                      제거
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onPickFile}
                    style={{ display: "none" }}
                  />
                </div>
                {previewUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="gb-preview" src={previewUrl} alt="미리보기" />
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
                {entries.map((en) => (
                  <article className="gb-entry" key={en.id}>
                    {en.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={en.image_url} alt="" loading="lazy" />
                    )}
                    <div className="gb-entry-body">
                      <p className="gb-entry-msg">{en.message}</p>
                      <div className="gb-entry-meta">
                        <span className="gb-entry-name">
                          {en.name || "익명"}
                        </span>
                        <span>{formatDate(en.created_at)}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
