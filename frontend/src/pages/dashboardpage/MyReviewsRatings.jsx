import { useNavigate } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

export default function MyReviewsRatings() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col self-stretch">
<details className="group block w-full rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">        <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 transition hover:bg-white [&::-webkit-details-marker]:hidden">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Star size={23} />
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-bold text-slate-900">
                My Reviews &amp; Ratings
              </h3>
              <p className="mt-0.5 text-sm text-slate-500">
                View customer feedback and your business rating
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
              Reviews
            </span>
            <span className="text-base text-slate-500 transition-transform group-open:rotate-180">
              ▼
            </span>
          </div>
        </summary>

        <div className="w-full rounded-b-2xl border-t border-slate-200 bg-white px-5 py-5">
          <p className="text-base leading-7 text-slate-600">
            Customer reviews and ratings will appear here when available.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard/reviews")}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-base font-semibold text-white transition hover:bg-blue-700"
          >
            View My Reviews
            <ArrowRight size={18} />
          </button>
        </div>
      </details>
    </div>
  );
}