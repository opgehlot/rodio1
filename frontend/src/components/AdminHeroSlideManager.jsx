import React, { useEffect, useState } from "react";
import api from "../api/api"; // Path check kar lein

export  function AdminHeroSlideManager() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [desktopImage, setDesktopImage] = useState("");
  const [mobileImage, setMobileImage] = useState("");
  const [order, setOrder] = useState(0);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const res = await api.get("/hero-slides/admin/all");
      setSlides(res.data?.data || []);
    } catch (err) {
      console.error("Failed to load slides", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleAddSlide = async (e) => {
    e.preventDefault();
    if (!title || !desktopImage || !mobileImage) {
      alert("Title, Desktop Image aur Mobile Image zaroori hain!");
      return;
    }

    try {
      setSubmitting(true);
      await api.post("/hero-slides/admin/create", {
        title,
        subtitle,
        desktopImage,
        mobileImage,
        order: Number(order),
      });

      alert("Slide successfully add ho gayi!");
      setTitle("");
      setSubtitle("");
      setDesktopImage("");
      setMobileImage("");
      setOrder(0);
      fetchSlides();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating slide");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      await api.patch(`/hero-slides/admin/toggle/${id}`);
      fetchSlides();
    } catch (err) {
      console.error(err);
      alert("Status change karne mein dikkat aayi");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Kya aap is slide ko delete karna chahte hain?")) return;
    try {
      await api.delete(`/hero-slides/admin/delete/${id}`);
      fetchSlides();
    } catch (err) {
      console.error(err);
      alert("Delete karne mein dikkat aayi");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">
        Hero Carousel Control Panel
      </h1>

      {/* Add Slide Form */}
      <form
        onSubmit={handleAddSlide}
        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 space-y-4"
      >
        <h2 className="text-lg font-bold text-slate-800">Add New Slide</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Heading / Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. India's Trusted Transport Network"
              className="w-full border border-slate-300 rounded-xl p-2.5 text-sm outline-none focus:border-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Display Order (0 = First)
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-2.5 text-sm outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Subheading / Description
          </label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="e.g. Find verified transporters, brokers and contractors..."
            className="w-full border border-slate-300 rounded-xl p-2.5 text-sm outline-none focus:border-blue-600 h-20"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Desktop Image URL * (Wide Ratio)
            </label>
            <input
              type="text"
              value={desktopImage}
              onChange={(e) => setDesktopImage(e.target.value)}
              placeholder="https://... ya /uploads/desktop1.jpg"
              className="w-full border border-slate-300 rounded-xl p-2.5 text-sm outline-none focus:border-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Mobile Image URL * (Vertical / Portrait)
            </label>
            <input
              type="text"
              value={mobileImage}
              onChange={(e) => setMobileImage(e.target.value)}
              placeholder="https://... ya /uploads/mobile1.jpg"
              className="w-full border border-slate-300 rounded-xl p-2.5 text-sm outline-none focus:border-blue-600"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Adding Slide..." : "Save & Add Slide"}
        </button>
      </form>

      {/* Existing Slides List */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          All Hero Slides ({slides.length})
        </h2>

        {loading ? (
          <p className="text-sm text-slate-500">Loading slides...</p>
        ) : slides.length === 0 ? (
          <p className="text-sm text-slate-500">Abhi tak koi slide nahi hai.</p>
        ) : (
          <div className="space-y-4">
            {slides.map((s) => (
              <div
                key={s._id}
                className="flex flex-col sm:flex-row items-center justify-between p-4 border border-slate-200 rounded-xl gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={s.desktopImage}
                    alt={s.title}
                    className="w-20 h-12 object-cover rounded-lg border border-slate-200"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{s.subtitle}</p>
                    <span className="text-[10px] text-slate-400">
                      Order: {s.order} | Status:{" "}
                      <strong className={s.isActive ? "text-emerald-600" : "text-rose-600"}>
                        {s.isActive ? "Active" : "Disabled"}
                      </strong>
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => handleToggle(s._id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      s.isActive
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                        : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    }`}
                  >
                    {s.isActive ? "Disable" : "Enable"}
                  </button>

                  <button
                    onClick={() => handleDelete(s._id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-100 text-rose-700 hover:bg-rose-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default AdminHeroSlideManager;