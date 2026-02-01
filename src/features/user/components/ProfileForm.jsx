import React, { useState, useEffect } from "react";

const ProfileForm = ({ profile, onSubmit }) => {
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    phone_number: profile?.phone_number || "",
    gender: profile?.gender || "Other",
    user_image: profile?.user_image || "", // Lưu URL ảnh hiện tại
  });

  // State cho việc xử lý File
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(profile?.user_image || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cập nhật preview khi profile load xong hoặc thay đổi
  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone_number: profile.phone_number || "",
        gender: profile.gender || "Other",
        user_image: profile.user_image || "",
      });

      setPreviewUrl(profile.user_image || "");
    }
  }, [profile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (JPEG/PNG)");
      e.target.value = "";
      return;
    }
    if (file.size > 1024 * 1024) {
      alert("Image size must be less than 1MB");
      e.target.value = "";
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData, selectedFile);
      alert("✅ Lưu thông tin thành công!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-10 p-4 text-sm"
    >
      {/* CỘT TRÁI: FORM THÔNG TIN */}
      <div className="flex-1 space-y-6">
        {/* Tên đăng nhập & Email (Read-only) */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-6 text-gray-500">
            Tên đăng nhập
          </label>
          <div className="w-2/3 p-2 bg-gray-50 text-gray-600 rounded-sm italic">
            {profile?.username}
          </div>
        </div>

        {/* Họ & Tên */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-6 text-gray-500">Họ</label>
          <input
            type="text"
            className="w-2/3 border border-gray-300 p-2 rounded-sm focus:border-orange-500 outline-none"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-right pr-6 text-gray-500">Tên</label>
          <input
            type="text"
            className="w-2/3 border border-gray-300 p-2 rounded-sm focus:border-orange-500 outline-none"
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Số điện thoại */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-6 text-gray-500">
            Số điện thoại
          </label>
          <input
            type="text"
            className="w-2/3 border border-gray-300 p-2 rounded-sm focus:border-orange-500 outline-none"
            value={formData.phone_number}
            onChange={(e) =>
              setFormData({ ...formData, phone_number: e.target.value })
            }
            disabled={isSubmitting}
          />
        </div>

        {/* Giới tính */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-6 text-gray-500">
            Giới tính
          </label>
          <div className="w-2/3 flex gap-4">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="accent-orange-500"
                  disabled={isSubmitting}
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center pt-4">
          <div className="w-1/3"></div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`min-w-[100px] bg-indigo-600 text-white px-8 py-2 rounded-sm shadow-sm hover:bg-indigo-700 transition-all ${isSubmitting && "opacity-70"}`}
          >
            {isSubmitting ? "Saving..." : "Saved"}
          </button>
        </div>
      </div>

      {/* CỘT PHẢI: AVATAR UPLOAD */}
      <div className="w-full md:w-1/3 flex flex-col items-center border-l border-gray-100 px-10 space-y-4">
        <div
          className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 shadow-inner
                flex items-center justify-center text-center bg-gray-50"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs text-gray-400 select-none">Avatar</span>
          )}
        </div>

        <label className="cursor-pointer bg-white border border-gray-300 px-4 py-2 rounded-sm shadow-sm hover:bg-gray-50 transition-colors">
          Select Img
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isSubmitting}
          />
        </label>

        <div className="text-gray-400 text-xs text-center leading-relaxed">
          Maximum 1MB <br /> .JPEG, .PNG
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
