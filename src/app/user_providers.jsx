import React, { useState, useEffect, useCallback } from "react";
import { UserContext } from "@/features/user/Context/UserContext";
import {
  fetchUserInfo,
  updateUserInfo,
  uploadAvatarApi,
} from "@/features/user/api/user.api";
import { useAuth } from "@/features/auth/hooks/useAuth";

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
      // Nếu selectedFile tồn tại và không phải undefined
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
