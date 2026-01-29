import React, { useState, useEffect, useCallback } from "react";
import { UserContext } from "@/features/user/Context/UserContext";
import { fetchUserInfo, updateUserInfo } from "@/features/user/api/user.api";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Lấy thông tin từ AuthProvider (thẻ ra vào)

  // Bọc trong useCallback để hàm không bị tạo lại sau mỗi lần render
  const getProfile = useCallback(async () => {
    // Nếu chưa đăng nhập (user null), xóa profile hiện tại và dừng lại
    if (!user) {
      setProfile(null);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchUserInfo();
      setProfile(data);
    } catch (err) {
      console.error("Lỗi khi fetch profile:", err);
    } finally {
      setLoading(false);
    }
  }, [user]); // Chỉ tạo lại khi trạng thái login thay đổi

  const updateProfile = async (formData) => {
    try {
      setLoading(true);
      const updated = await updateUserInfo(formData);
      setProfile(updated); // Cập nhật lại cache global ngay sau khi sửa thành công
      return updated;
    } catch (err) {
      console.error("Lỗi khi cập nhật profile:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Tự động load profile khi 'getProfile' thay đổi (do user thay đổi)
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <UserContext.Provider
      value={{
        profile,
        loading,
        updateProfile,
        refreshProfile: getProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
