import React, { useState } from "react";
import {
  Sparkles,
  Rocket,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Mail,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
  Cpu,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";

export function FinanceComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email or mobile number.");
      return;
    }
    setSubmitted(true);
    toast.success("You'll be notified when we launch!");
    setEmail("");
  };

  const upcomingHighlights = [
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Advanced Automation Tools",
      desc: "Streamline your daily workflow with next-gen automated modules designed to save time and boost efficiency.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: "Enhanced Security & Control",
      desc: "Enterprise-grade safety features giving you complete ownership, tracking, and compliance management.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-indigo-600" />,
      title: "Smart Analytics Dashboard",
      desc: "Gain deep, data-driven insights with real-time tracking metrics and comprehensive performance reports.",
    },
    {
      icon: <Layers className="w-6 h-6 text-amber-600" />,
      title: "Seamless Ecosystem Integration",
      desc: "Connect and sync smoothly across all your existing operations without any manual friction or delays.",
    },
  ];

  const preparationChecklist = [
    "Preparing robust infrastructure for high performance and zero downtime",
    "Integrating secure API standards for smooth cross-platform accessibility",
    "Optimizing user interfaces for lightning-fast speeds on all devices",
    "Conducting rigorous security audits and internal beta testing",
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fadeIn">
      {/* 1. Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-8 md:p-12 shadow-xl">
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-semibold tracking-wide uppercase backdrop-blur-md">
            <Sparkles size={14} className="text-yellow-400 animate-pulse" />
            Exciting Updates Ahead
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Something Powerful Is Under Development
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            We are working behind the scenes to build something extraordinary for your platform experience. Stay tuned for a smarter, faster, and feature-rich upgrade.
          </p>
          
          {/* Notify Me Box */}
          <div className="pt-2">
            {!submitted ? (
              <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email or mobile number"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm backdrop-blur-md"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition shadow-md flex items-center justify-center gap-2 shrink-0"
                >
                  Notify Me
                  <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-4 py-3 rounded-xl text-emerald-200 text-sm font-medium">
                <CheckCircle2 size={18} className="text-emerald-400" />
                You're on the list! We'll notify you upon launch.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. What's Coming (Grid Cards) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">What to Expect</h2>
          <p className="text-sm text-slate-500">Core capabilities currently being built into the system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {upcomingHighlights.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Development Status & Support Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Progress Checklist */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
              <Rocket size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Development Milestones</h3>
              <p className="text-xs text-slate-500">Current progress status across our engineering pipelines</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {preparationChecklist.map((text, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-700">{text}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-900 text-xs flex items-center gap-3">
            <Clock size={20} className="shrink-0 text-blue-600" />
            <span>Updates roll out automatically once testing phases successfully conclude.</span>
          </div>
        </div>

        {/* Right: Support Card */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-6 md:p-8 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-blue-300">
              <HelpCircle size={26} />
            </div>
            <h3 className="text-lg font-bold">Have Feedback?</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Have suggestions or want to share feature requests for upcoming releases? Our support team would love to hear from you.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-blue-800">
            <div className="text-xs text-blue-200">Connect with our team</div>
            <a
              href="mailto:support@rodiotradelink.com"
              className="block w-full py-3 px-4 rounded-xl bg-white hover:bg-blue-50 text-blue-900 text-center text-sm font-bold transition shadow-md"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FinanceComingSoon;