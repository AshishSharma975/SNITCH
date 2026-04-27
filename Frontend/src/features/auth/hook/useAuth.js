import { setUser, setLoading, setError } from "../state/auth.slice";
import { register, login,getMe } from "../service/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleregister({ email, password, fullname, contact, role }) {
    try {
      dispatch(setLoading(true));

      const data = await register({
        email,
        password,
        fullname,
        contact,
        role,
      });

      dispatch(setUser(data.user));

      return data.user;
    } catch (err) {
      dispatch(setError(err?.response?.data?.message || "Registration Error"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await login({
        email,
        password,
      });

      dispatch(setUser(data.user));
      return data.user;
    } catch (err) {
      dispatch(setError(err?.response?.data?.message || "Login Error"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogout() {
    dispatch(setUser(null));
    // Optionally: call an API to clear the backend cookie if not using HTTP-only cookies that clear on session or having a logout route. (Assuming logout route or just clearing state)
    return true;
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
      return data;
    } catch (err) {
      dispatch(setError(err?.response?.data?.message || "Get Me Error"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }

  
  

  return { handleregister, handleLogin, handleLogout,handleGetMe };
};