import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  FileText,
  MessageSquare,
  Megaphone,
  TrendingUp,
  Users,
  Eye,
  Target,
  ArrowRight,
  CheckCircle2,
  Building2,
  Send,
} from "lucide-react";
import API from "../api/api";
import toast from "react-hot-toast";

export function AddYourAds() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post("/contact/create", formData);

      toast.success(data.message || "Query Submitted Successfully!");

      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: Eye,
      title: "Increase Visibility",
      description:
        "Make your business more visible to people searching for transport services.",
    },
    {
      icon: Users,
      title: "Reach the Right Audience",
      description:
        "Promote your services to businesses and professionals in the transport industry.",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description:
        "Build brand awareness and create opportunities to connect with potential customers.",
    },
  ];

  return (
    <main className="w-full overflow-x-hidden bg-white text-gray-800">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#102B55] via-[#173B75] to-[#2455A4] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-300/10 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              <Megaphone size={17} className="text-orange-400" />
              <span>RODIO TRADELINK ADVERTISING</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ready to Grow
              <span className="block text-orange-400">
                Your Business?
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-blue-100 sm:text-lg lg:mx-0">
              Put your business in the spotlight with Rodio Tradelink.
              Promote your services, increase brand visibility, and
              connect with businesses across the transportation industry.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#advertisement-query"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-950/20 transition hover:bg-orange-600"
              >
                Advertise With Us
                <ArrowRight size={19} />
              </a>

              <a
                href="#advertising-benefits"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Benefits
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-blue-100 lg:justify-start">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-orange-400" />
                Business Promotion
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-orange-400" />
                Industry-Focused Reach
              </span>
            </div>
          </div>

          {/* RIGHT ADVERTISEMENT VISUAL */}
          {/* <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-3 rounded-[2rem] bg-orange-400/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/30 bg-gradient-to-br from-white/10 to-white/5 px-6 py-12 text-center sm:min-h-[390px]">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-950/20">
                  <Building2 size={38} />
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
                  Your Brand Here
                </p>

                <h2 className="mt-4 max-w-sm text-2xl font-extrabold text-white sm:text-3xl">
                  Make Your Business Stand Out
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-7 text-blue-100">
                  Add your advertisement image, promotional banner, or
                  business creative here.
                </p>

                <div className="mt-7 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
                  <Megaphone size={17} className="text-orange-400" />
                  Advertise on Rodio Tradelink
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-xl sm:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                <TrendingUp size={22} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">
                  Grow Your Reach
                </p>
                <p className="text-xs text-gray-500">
                  Promote your business
                </p>
              </div>
            </div>
          </div> */}

          {/* RIGHT SIDE: RODIO PNG IMAGE */}
<div className="relative mx-auto flex w-full max-w-xl items-center justify-center">
  <img
    src="/src/assets/ADDS.png"
    alt="Rodio Tradelink Business Directory"
    className="h-auto w-full max-w-[620px] object-contain"
  />
</div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section
        id="advertising-benefits"
        className="scroll-mt-20 bg-[#F5F8FC] px-4 py-16 sm:px-6 lg:px-10 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
              Why Advertise With Us?
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#173B75] sm:text-4xl">
              Give Your Business the Visibility It Deserves
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Connect your brand with the transport business ecosystem
              through a professional advertising presence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#173B75] transition group-hover:bg-orange-500 group-hover:text-white">
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ADVERTISEMENT QUERY INTRO */}
      <section className="px-4 pb-5 pt-16 sm:px-6 lg:px-10 lg:pt-20">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700">
            <MessageSquare size={16} />
            LET'S DISCUSS YOUR ADVERTISEMENT
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-[#173B75] sm:text-4xl lg:text-5xl">
            Tell Us About Your Business
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
            Share your advertising requirements with our team. Tell us
            about your business, your goals, and the type of promotion
            you are interested in.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section
        id="advertisement-query"
        className="scroll-mt-20 px-4 pb-16 pt-8 sm:px-6 lg:px-10 lg:pb-24"
      >
        <div className="mx-auto grid w-full max-w-7xl items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* LEFT INFORMATION */}
          <div className="lg:sticky lg:top-8">
            <div className="rounded-3xl bg-[#173B75] p-7 text-white sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500">
                <Megaphone size={28} />
              </div>

              <h3 className="mt-6 text-2xl font-extrabold sm:text-3xl">
                Let's Make Your Brand More Visible
              </h3>

              <p className="mt-4 leading-7 text-blue-100">
                Whether you want to promote your company, highlight
                your services, or discuss advertising placements, send
                us your query. Our team can review your requirements
                and discuss the next steps.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  "Tell us about your business",
                  "Share your advertising goals",
                  "Discuss suitable promotional options",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-orange-400"
                    />
                    <span className="text-sm leading-6 text-blue-50">
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-9 rounded-2xl border border-white/15 bg-white/10 p-5">
                <p className="text-sm font-semibold text-orange-300">
                  HAVE A QUESTION?
                </p>
                <p className="mt-2 text-sm leading-6 text-blue-50">
                  Include your preferred advertising format, target
                  audience, or any specific requirements in your message.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="min-w-0 rounded-3xl border border-gray-100 bg-white p-5 shadow-[0_15px_60px_rgba(23,59,117,0.09)] sm:p-8 lg:p-10">
            <div className="mb-8 border-b border-gray-100 pb-6">
              <h3 className="text-2xl font-extrabold text-gray-800">
                Advertisement Inquiry Form
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Fill in the details below so we can understand your requirements.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAME AND PHONE */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="advertiser-name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      id="advertiser-name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      maxLength={100}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#2455A4] focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="advertiser-phone"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Mobile Number <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      id="advertiser-phone"
                      type="tel"
                      name="phone"
                      placeholder="Enter mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      maxLength={20}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#2455A4] focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="advertiser-email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Business Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="advertiser-email"
                    type="email"
                    name="email"
                    placeholder="Enter your business email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    maxLength={150}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#2455A4] focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* SUBJECT */}
              <div>
                <label
                  htmlFor="advertiser-subject"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Subject <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="advertiser-subject"
                    type="text"
                    name="subject"
                    placeholder="e.g. Website Advertisement / Business Promotion"
                    value={formData.subject}
                    onChange={handleChange}
                    maxLength={150}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#2455A4] focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    required
                  />
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label
                  htmlFor="advertiser-message"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Advertisement Requirements{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <MessageSquare
                    size={18}
                    className="absolute left-4 top-4 text-gray-400"
                  />
                  <textarea
                    id="advertiser-message"
                    rows={6}
                    name="message"
                    placeholder="Tell us about your business, preferred ad placement, target audience, budget, or other requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={3000}
                    className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#2455A4] focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    required
                  />
                </div>

                <p className="mt-2 text-right text-xs text-gray-400">
                  {formData.message.length}/3000 characters
                </p>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 text-sm font-extrabold uppercase tracking-wider text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  "Submitting Your Query..."
                ) : (
                  <>
                    Submit Advertisement Inquiry
                    <Send size={18} />
                  </>
                )}
              </button>

              <p className="text-center text-xs leading-6 text-gray-500">
                By submitting this form, you are requesting information
                about advertising opportunities with Rodio Tradelink.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AddYourAds;
