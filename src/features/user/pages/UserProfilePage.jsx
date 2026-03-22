import React from "react";
import ProfileForm from "../components/ProfileForm";
import { useUserProfile } from "../../../hooks/useUserProfile";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const UserProfilePage = () => {
  const { profile, updateProfile } = useUserProfile();
  const { refreshUser, user, isLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);
  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading...</p>
      </div>
    );
  if (!user) return null;
  const handleUpdate = async (formData, file) => {
    await updateProfile(formData, file);
    await refreshUser();
  };

  return (
    <div className="max-w-4xl mx-auto p-8 border-indigo-500 rounded-md ">
      <ProfileForm
        key={profile?.id}
        profile={profile}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default UserProfilePage;
