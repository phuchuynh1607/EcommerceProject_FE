import React, { useState } from "react";

const ProfileForm = ({ profile, onSubmit }) => {
  // 1. SỬA LỖI: Khai báo state formData mà bạn đang thiếu
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    phone_number: profile?.phone_number || "",
    gender: profile?.gender || "Other",
    date_of_birth: profile?.date_of_birth || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      alert(" Save Information Successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to update information. Please try again.");
    } finally {
      setIsSubmitting(false);
    } // Tắt loading dù thành công hay thất bại
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-sm">
      {/* Tên đăng nhập - Read-only */}
      <div className="flex items-center">
        <label className="w-1/4 text-right pr-6 text-gray-500">
          Tên đăng nhập
        </label>
        <input
          type="text"
          className="
      w-3/4 border border-gray-300 p-2 rounded-sm
      bg-gray-100 text-gray-500 cursor-not-allowed
      focus:outline-none
    "
          value={profile?.username || ""}
          readOnly
        />
      </div>

      {/* Họ & Tên */}
      <div className="flex items-center">
        <label className="w-1/4 text-right pr-6 text-gray-500">Họ</label>
        <input
          type="text"
          className="w-3/4 border border-gray-300 p-2 rounded-sm focus:border-orange-500 outline-none"
          value={formData.first_name}
          onChange={(e) =>
            setFormData({ ...formData, first_name: e.target.value })
          }
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="flex items-center">
        <label className="w-1/4 text-right pr-6 text-gray-500">Tên</label>
        <input
          type="text"
          className="w-3/4 border border-gray-300 p-2 rounded-sm focus:border-orange-500 outline-none"
          value={formData.last_name}
          onChange={(e) =>
            setFormData({ ...formData, last_name: e.target.value })
          }
          disabled={isSubmitting}
          required
        />
      </div>

      {/* Email - Read-only */}
      <div className="flex items-center">
        <label className="w-1/4 text-right pr-6 text-gray-500">Email</label>
        <input
          type="text"
          className="
      w-3/4 border border-gray-300 p-2 rounded-sm
      bg-gray-100 text-gray-500 cursor-not-allowed
      focus:outline-none
    "
          value={profile?.email || ""}
          readOnly
        />
      </div>

      {/* Số điện thoại */}
      <div className="flex items-center">
        <label className="w-1/4 text-right pr-6 text-gray-500">
          Số điện thoại
        </label>
        <input
          type="text"
          className="w-3/4 border border-gray-300 p-2 rounded-sm focus:border-orange-500 outline-none"
          value={formData.phone_number}
          onChange={(e) =>
            setFormData({ ...formData, phone_number: e.target.value })
          }
          disabled={isSubmitting}
        />
      </div>

      {/* Giới tính - Radio buttons */}
      <div className="flex items-center">
        <label className="w-1/4 text-right pr-6 text-gray-500">Giới tính</label>
        <div className="w-3/4 flex gap-4">
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
                disabled={isSubmitting}
                className="accent-orange-500"
              />
              {g}
            </label>
          ))}
        </div>
      </div>

      {/* Nút lưu */}

      <div className="flex items-center pt-4">
        <div className="w-1/4"></div>
        <button
          type="submit"
          disabled={isSubmitting} // Vô hiệu hóa khi đang gửi dữ liệu
          className={`min-w-[100px] flex items-center justify-center bg-indigo-600 text-white px-8 py-2 rounded-sm shadow-sm font-medium transition-all
            ${isSubmitting ? "bg-indigo-400 cursor-not-allowed" : "hover:bg-indigo-700 active:scale-95"}`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Saving...
            </>
          ) : (
            "Lưu"
          )}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
