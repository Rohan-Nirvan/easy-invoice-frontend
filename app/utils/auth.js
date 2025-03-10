import api from "./api";
import Cookies from "js-cookie";

// ✅ Login API
export const loginUser = async (email, password) => {
  const { data } = await api.post("/login", { email, password });

  if (data.token) {
    Cookies.set("token", data.token, { expires: 1 }); // Store token in cookies
  }

  return data;
};

// ✅ Logout
export const logoutUser = () => {
  Cookies.remove("token");
};

// ✅ Get Current User (Protected Route)
export const getCurrentUser = async () => {
  const { data } = await api.get("/user");
  return data;
};
