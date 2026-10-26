
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const plans = [
  {
    key: "6months",
    name: "6 Months",
    originalPrice: 1350,
    price: 999,
    duration: "6 months",
    features: [
      "Unlimited Booking",
      "Priority Support 24/7",
      "Top Directory Listing",
      "Verified Badge on Profile",
      "Add & Manage Vehicles",
      "Add & Manage Routes",
    ],
  },
  {
    key: "1year",
    name: "1 Year",
    originalPrice: 2700,
    price: 1599,
    duration: "1 year",
    features: [
      "Unlimited Booking",
      "Priority Support 24/7",
      "Top Directory Listing",
      "Verified Badge on Profile",
      "Direct Client Connect",
      "Complete Business Profile",
    ],
  },
];

export function HomePlans() {
  const navigate = useNavigate();

  const handlePlanClick = (planKey) => {
    const token = localStorage.getItem("token");

    const returnTo = `/plans?plan=${encodeURIComponent(planKey)}`;

    if (!token) {
      navigate("/login", {
        state: { returnTo },
      });
      return;
    }

    navigate(returnTo);
  };

  return (
    <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Choose Your Subscription Plan
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Select a plan and continue to secure payment.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-orange-400 hover:shadow-lg"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {plan.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Access duration: {plan.duration}
                </p>

                <div className="my-5 flex items-baseline gap-2">
                  <span className="text-lg text-slate-400 line-through">
                    ₹{plan.originalPrice}
                  </span>
                  <span className="text-4xl font-extrabold text-slate-900">
                    ₹{plan.price}
                  </span>
                </div>

                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <Check
                        size={18}
                        className="mt-0.5 shrink-0 text-emerald-600"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handlePlanClick(plan.key)}
                className="w-full rounded-xl bg-slate-900 px-4 py-3 font-bold text-white transition hover:bg-orange-600"
              >
                Subscribe for ₹{plan.price}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 export default HomePlans;