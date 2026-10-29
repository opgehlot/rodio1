import React, { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, Megaphone, Pause, Play, ChevronUp, ChevronDown } from "lucide-react";
import { useFeaturedAds } from "../context/FeaturedAdsContext";

export default function FeaturedAds({
  placement = "directory",
  title = "Featured Ads",
  className = "",
  autoScroll = true,
  scrollSpeed = 0.45,
}) {
  const { loading, error, getAdsByPlacement } = useFeaturedAds();
  const ads = getAdsByPlacement(placement) || [];

  // Each FeaturedAds instance has its own scroll container and controls.
  // Therefore Directory and Transport Search scroll independently.
  const scrollRef = useRef(null);
  const frameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const resumeTimerRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(autoScroll);
  const [isHovered, setIsHovered] = useState(false);

  const stopAnimationFrame = useCallback(() => {
    if (frameRef.current != null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    lastTimeRef.current = 0;
  }, []);

  const pauseForManualScroll = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    // Manual scroll takes priority. Resume auto-scroll after a short idle period.
    setIsHovered(true);
    resumeTimerRef.current = setTimeout(() => setIsHovered(false), 3500);
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element || !isAutoScrolling || isHovered || loading || ads.length < 2) {
      stopAnimationFrame();
      return undefined;
    }

    const step = (time) => {
      if (!scrollRef.current) return;
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = Math.min(time - lastTimeRef.current, 40);
      lastTimeRef.current = time;

      const node = scrollRef.current;
      const maxScroll = node.scrollHeight - node.clientHeight;
      if (maxScroll > 0) {
        node.scrollTop += (scrollSpeed * delta) / 16;
        if (node.scrollTop >= maxScroll - 1) {
          node.scrollTop = 0;
        }
      }
      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return stopAnimationFrame;
  }, [ads.length, isAutoScrolling, isHovered, loading, scrollSpeed, stopAnimationFrame]);

  useEffect(() => () => {
    stopAnimationFrame();
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, [stopAnimationFrame]);

  const scrollByAmount = (direction) => {
    const element = scrollRef.current;
    if (!element) return;
    pauseForManualScroll();
    element.scrollBy({ top: direction * Math.max(180, element.clientHeight * 0.65), behavior: "smooth" });
  };

  const toggleAutoScroll = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setIsHovered(false);
    setIsAutoScrolling((current) => !current);
  };

  return (
    <section
      className={`flex min-h-[2650px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
      aria-label={title}
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-100 px-3 py-3 sm:px-4">
        <Megaphone size={19} className="shrink-0 text-orange-500" />
        <h3 className="min-w-0 truncate text-sm font-bold text-slate-800">{title}</h3>
        <span className="ml-auto rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
          {ads.length}
        </span>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/80 px-3 py-2">
        <span className="text-[11px] font-medium text-slate-500">
          {ads.length > 1 ? (isAutoScrolling ? "Auto-scroll on · Scroll manually anytime" : "Manual scroll mode") : "Featured advertisements"}
        </span>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Scroll ads up"
            title="Scroll up"
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
          >
            <ChevronUp size={15} />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            aria-label="Scroll ads down"
            title="Scroll down"
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
          >
            <ChevronDown size={15} />
          </button>
          <button
            type="button"
            onClick={toggleAutoScroll}
            aria-label={isAutoScrolling ? "Pause automatic scrolling" : "Start automatic scrolling"}
            title={isAutoScrolling ? "Pause auto-scroll" : "Start auto-scroll"}
            className="inline-flex h-7 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-2 text-[11px] font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
          >
            {isAutoScrolling ? <Pause size={13} /> : <Play size={13} />}
            {isAutoScrolling ? "Pause" : "Play"}
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onWheel={pauseForManualScroll}
        onTouchStart={pauseForManualScroll}
        onPointerDown={pauseForManualScroll}
        onKeyDown={pauseForManualScroll}
        tabIndex={0}
        role="region"
        aria-label={`${title} list; scroll independently`}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400"
        style={{ scrollbarGutter: "stable" }}
      >
        {loading && ads.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-500">Loading ads...</p>
        )}

        {!loading && error && ads.length === 0 && (
          <p className="break-words py-8 text-center text-sm text-red-500">{error}</p>
        )}

        {!loading && !error && ads.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center">
            <Megaphone className="mx-auto mb-2 text-slate-400" size={26} />
            <p className="text-sm font-semibold text-slate-600">No Featured Ads</p>
            <p className="mt-1 text-xs text-slate-400">Ads will appear here when available.</p>
          </div>
        )}

        {ads.map((ad, index) => {
          const image = ad.image || ad.imageUrl || ad.banner || ad.bannerUrl;
          const href = ad.link || ad.targetUrl || "";
          const key = ad._id || ad.id || `${placement}-${image || ad.title || index}`;
          const card = (
            <>
              {image ? (
                <img
                  src={image}
                  alt={ad.title || "Featured advertisement"}
                  loading={index < 2 ? "eager" : "lazy"}
                  className="block max-h-80 w-full object-contain"
                />
              ) : (
                <div className="flex h-36 items-center justify-center bg-slate-50 text-sm text-slate-400">
                  Image unavailable
                </div>
              )}
              {(ad.title || href) && (
                <div className="flex items-center justify-between gap-2 border-t border-slate-100 p-3">
                  {ad.title && (
                    <span className="line-clamp-2 min-w-0 text-sm font-semibold text-slate-800">
                      {ad.title}
                    </span>
                  )}
                  {href && <ExternalLink size={16} className="shrink-0 text-blue-600" />}
                </div>
              )}
            </>
          );

          return href ? (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-blue-300 hover:shadow-md"
            >
              {card}
            </a>
          ) : (
            <article key={key} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              {card}
            </article>
          );
        })}
      </div>
    </section>
  );
}
