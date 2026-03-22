import React, { useState, useEffect, useCallback } from "react";
import { UserContext } from "@/context/UserContext";
import {
  fetchUserInfo,
  updateUserInfo,
  uploadAvatarApi,
} from "@/services/user/user.service";
import { useAuth } from "@/context/AuthContext";

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const getProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      return;
    }
    setLoading(true);
    try {
      const data = await fetchUserInfo();
      setProfile(data);
    } catch (err) {
      console.error("Error ocurr while trying to fetch data!:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Đảm bảo nhận đúng (profileData, selectedFile)
  const handleUpdateProfile = async (profileData, selectedFile) => {
    setLoading(true);
    try {
      let finalImageUrl = profile?.user_image || "";
      if (selectedFile) {
        const uploadResponse = await uploadAvatarApi(selectedFile);
        if (uploadResponse && uploadResponse.url) {
          finalImageUrl = uploadResponse.url; // Lấy URL từ server trả về
        }
      }
      const payload = {
        ...profileData,
        user_image: finalImageUrl,
      };
      const updatedUser = await updateUserInfo(payload);
      setProfile(updatedUser);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <UserContext.Provider
      value={{
        profile,
        loading,
        updateProfile: handleUpdateProfile,
        refreshProfile: getProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
