import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import API from "../api/api";

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);

      const response = await API.get("/profile");

      const data =
        response.data?.profile ||
        response.data?.data ||
        null;

      setProfileData(data);
      return data;
    } catch (error) {
      console.error("Profile Fetch Error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = (updatedData) => {
    setProfileData((previous) => ({
      ...(previous || {}),
      ...(updatedData || {}),
    }));
  };

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        setProfileData,
        updateProfile,
        fetchProfile,
        loading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error(
      "useProfile must be used inside ProfileProvider"
    );
  }

  return context;
};