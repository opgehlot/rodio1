import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import API from "../api/api";

const FeaturedAdsContext = createContext(null);

export function FeaturedAdsProvider({ children }) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAds = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await API.get("/ads", {
        params: { active: true },
      });

      const result = response.data?.data ?? response.data?.ads ?? response.data;

      setAds(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Featured ads fetch error:", err);
      setError("Featured ads load nahi ho paye.");
      setAds([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const getAdsByPlacement = useCallback(
    (placement) =>
      ads.filter(
        (ad) =>
          ad.isActive !== false &&
          ad.active !== false &&
          (Array.isArray(ad.placements)
            ? ad.placements.includes(placement)
            : ad.placement === placement)
      ),
    [ads]
  );

  return (
    <FeaturedAdsContext.Provider
      value={{ ads, loading, error, fetchAds, getAdsByPlacement }}
    >
      {children}
    </FeaturedAdsContext.Provider>
  );
}

export function useFeaturedAds() {
  const context = useContext(FeaturedAdsContext);

  if (!context) {
    throw new Error(
      "useFeaturedAds must be used inside FeaturedAdsProvider"
    );
  }

  return context;
}