import axios from "@/lib/axios";
import { fetchUserProfile } from "@/features/auth/api/auth.api";
// Lấy thông tin user hiện tại
export const fetchUserInfo = fetchUserProfile;

// Cập nhật thông tin cơ bản
export const updateUserInfo = async (updateData) => {
  const response = await axios.put("/users/change_information", updateData);
  return response.data;
};

// Đổi mật khẩu
export const changePasswordApi = async (passwordData) => {
  await axios.put("/users/password", passwordData);
};
