import { useContext } from "react";
import { AuthContext } from "../store/auth.store";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth phải được sử dụng bên trong AuthProvider (trong file providers.jsx)"
    );
  }

  return context;
};
