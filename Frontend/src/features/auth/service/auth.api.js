import axios from "axios";

const authApiInstance = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function register(userData) {
  const response = await authApiInstance.post("/register", {
    fullname: userData.fullname,
    contact: userData.contact,
    email: userData.email,
    password: userData.password,
    isSeller: userData.role === "seller" ? true : false
  });

  return response.data;
}

export async function login({email, password}) {
  const response = await authApiInstance.post("/login", {
    email,
    password,
  });

  return response.data;
}

export default authApiInstance;