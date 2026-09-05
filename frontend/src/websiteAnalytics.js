const API_URL = "https://rodiotradelink.com/api/website-analytics";

const getId = (key) => {
  let id = localStorage.getItem(key);

  if (!id) {
    id =
      crypto.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    localStorage.setItem(key, id);
  }

  return id;
};

const visitorId = getId("rodio_visitor_id");

const getSessionId = () => {
  let sessionId = sessionStorage.getItem("rodio_session_id");

  if (!sessionId) {
    sessionId =
      crypto.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    sessionStorage.setItem("rodio_session_id", sessionId);
  }

  return sessionId;
};

const sessionId = getSessionId();

const getDevice = () => {
  const width = window.innerWidth;

  if (width <= 767) return "mobile";
  if (width <= 1024) return "tablet";
  return "desktop";
};

const getBrowser = () => {
  const ua = navigator.userAgent;

  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari")) return "Safari";

  return "Other";
};

const getOperatingSystem = () => {
  const ua = navigator.userAgent;

  if (/Windows/i.test(ua)) return "Windows";
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Mac/i.test(ua)) return "MacOS";
  if (/Linux/i.test(ua)) return "Linux";

  return "Other";
};

const getTrafficSource = () => {
  const params = new URLSearchParams(window.location.search);

  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");

  if (utmSource) {
    return {
      source: utmSource,
      medium: utmMedium || "",
      campaign: utmCampaign || "",
    };
  }

  const referrer = document.referrer;

  if (!referrer) {
    return {
      source: "direct",
      medium: "",
      campaign: "",
    };
  }

  try {
    const host = new URL(referrer).hostname.toLowerCase();

    if (host.includes("google")) return { source: "google", medium: "organic", campaign: "" };
    if (host.includes("instagram")) return { source: "instagram", medium: "social", campaign: "" };
    if (host.includes("facebook")) return { source: "facebook", medium: "social", campaign: "" };
    if (host.includes("youtube")) return { source: "youtube", medium: "social", campaign: "" };
    if (host.includes("whatsapp")) return { source: "whatsapp", medium: "social", campaign: "" };

    return {
      source: host,
      medium: "referral",
      campaign: "",
    };
  } catch {
    return {
      source: "direct",
      medium: "",
      campaign: "",
    };
  }
};

export const trackEvent = async (eventType, extra = {}) => {
  try {
    const traffic = getTrafficSource();

    await fetch(`${API_URL}/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorId,
        sessionId,

        eventType,

        page: window.location.pathname,
        pageTitle: document.title,

        referrer: document.referrer,

        source: traffic.source,
        medium: traffic.medium,
        campaign: traffic.campaign,

        device: getDevice(),
        browser: getBrowser(),
        operatingSystem: getOperatingSystem(),

        ...extra,
      }),
      keepalive: true,
    });
  } catch (error) {
    console.error("Analytics tracking failed:", error);
  }
};