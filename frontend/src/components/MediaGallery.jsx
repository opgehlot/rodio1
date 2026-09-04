import React, { useEffect, useState, useRef } from "react";
import API from "../api/api";

export function MediaGallery() {
  const [mediaList, setMediaList] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  // ==========================================
  // FETCH MEDIA POSTS
  // ==========================================
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const res = await API.get("/media-posts");

        const posts = Array.isArray(res.data?.posts) ? res.data.posts : [];

        const flattenedMedia = posts.flatMap((post) =>
          (post.media || []).map((media) => ({
            ...media,
            postId: post._id,
            title: post.title || "",
            caption: post.caption || "",
          }))
        );

        setMediaList(flattenedMedia);
      } catch (error) {
        console.error("Error fetching media:", error);
        setMediaList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  // ==========================================
  // SLIDER CONTROLS (2 Cards at a time)
  // ==========================================
  const slide = (direction) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth / 2;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // ==========================================
  // FILTER
  // ==========================================
  const filteredMedia = mediaList.filter((item) => {
    if (activeFilter === "image") return item.resourceType === "image";
    if (activeFilter === "video") return item.resourceType === "video";
    return true;
  });

  return (
    <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* HEADER & FILTER */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3">
          Rodio Gallery
        </h2>

        {/* Minimal Pill Filter */}
        <div className="inline-flex p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/60 mt-4 shadow-inner">
          {["all", "image", "video"].map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 capitalize ${
                activeFilter === type
                  ? "bg-white text-slate-900 shadow-md shadow-slate-200/50 scale-[1.02]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {type === "all" ? "All Media" : `${type}s`}
            </button>
          ))}
        </div>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="flex justify-center items-center py-24 text-slate-400 font-medium">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce"></span>
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredMedia.length === 0 && (
        <div className="text-center py-20 text-slate-400 font-medium">
          No media available right now.
        </div>
      )}

      {/* ======================================
          2-CARD HORIZONTAL CAROUSEL (PURE WHITE)
      ====================================== */}
      {!loading && filteredMedia.length > 0 && (
        <div className="relative">
          {/* Left Arrow Button */}
          <button
            onClick={() => slide("left")}
            aria-label="Previous"
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-30 bg-white text-slate-800 w-12 h-12 rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-100 hidden md:flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
          >
            <span className="text-xl font-bold group-hover:-translate-x-0.5 transition-transform">&#10094;</span>
          </button>

          {/* Slider Track */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-4 px-1 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredMedia.map((item, index) => {
              const isVideo =
                String(item.resourceType).toLowerCase() === "video";

              return (
                <div
                  key={
                    item._id ||
                    item.publicId ||
                    `${item.postId}-${index}`
                  }
                  onClick={() => setSelectedMedia(item)}
                  /*
                    Pure White Card
                    Desktop par exact 2 cards: md:w-[calc(50%-12px)]
                  */
                  className="flex-shrink-0 w-[90%] md:w-[calc(50%-12px)] h-[460px] sm:h-[500px] snap-start bg-white rounded-3xl p-4 flex flex-col justify-between border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                >
                  {/* MEDIA DISPLAY CONTAINER */}
                  <div className="relative w-full h-[76%] rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-100/70">
                    {/* TYPE PILL */}
                    <div className="absolute top-3 right-3 z-20">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-slate-700 shadow-sm border border-slate-200/50 uppercase tracking-wider">
                        <span className={`w-1.5 h-1.5 rounded-full ${isVideo ? "bg-red-500" : "bg-emerald-500"}`}></span>
                        {isVideo ? "Video" : "Photo"}
                      </span>
                    </div>

                    {/* MEDIA CONTENT (Puri image/video bina kate dikhegi) */}
                    {isVideo ? (
                      <video
                        src={item.url}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        preload="metadata"
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.title || "Gallery Item"}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    )}

                    {/* Center Modern Play Icon for Videos */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 rounded-2xl bg-white/95 text-blue-600 shadow-xl flex items-center justify-center pl-1 group-hover:scale-110 transition-all duration-300">
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* BOTTOM ACTION & TITLE PANEL */}
                  <div className="pt-3 px-2 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-slate-900 font-bold text-base sm:text-lg truncate group-hover:text-blue-600 transition-colors">
                        {item.title || (isVideo ? "Featured Video" : "Featured Photo")}
                      </h4>
                      <p className="text-slate-400 text-xs truncate mt-0.5">
                        {item.caption || (isVideo ? "Click to play full video" : "Click to view full image")}
                      </p>
                    </div>

                    {/* MODERN "SEE VIDEO / PHOTO" BUTTON */}
                    <button
                      type="button"
                      className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                    >
                      {isVideo ? "See Video" : "See Photo"}
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => slide("right")}
            aria-label="Next"
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-30 bg-white text-slate-800 w-12 h-12 rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-100 hidden md:flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
          >
            <span className="text-xl font-bold group-hover:translate-x-0.5 transition-transform">&#10095;</span>
          </button>
        </div>
      )}

      {/* ======================================
          CLEAN FULLSCREEN MODAL PREVIEW
      ====================================== */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] bg-black rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl z-20 backdrop-blur-md transition-all"
            >
              &times;
            </button>

            {String(selectedMedia.resourceType).toLowerCase() === "video" ? (
              <video
                src={selectedMedia.url}
                controls
                autoPlay
                playsInline
                className="max-h-[85vh] max-w-full object-contain"
              />
            ) : (
              <img
                src={selectedMedia.url}
                alt={selectedMedia.title || "Gallery Preview"}
                className="max-h-[85vh] max-w-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default MediaGallery;