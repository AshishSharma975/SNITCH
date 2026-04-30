// Login.jsx
import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import ContinuewithGoogle from "../components/ContinuewithGoogle";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const user = await handleLogin({
        email: formData.email.trim(),
        password: formData.password,
      });
      if (user.role === "buyer") {
        navigate("/");
      } else if (user.role === "seller") {
        navigate("/seller/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].msg);
      } else {
        setError(err.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Left Image Panel ── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-[#0a0a0a]">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=90&w=2000&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        {/* rich dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/70 via-transparent to-[#0a0a0a]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

        {/* top brand */}
        <div className="absolute top-10 left-10 right-10 flex items-center justify-between">
          <span
            className="text-white/90 text-[11px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            Snitch
          </span>
          <span className="text-white/30 text-[11px] tracking-[0.2em] uppercase">
            SS '25
          </span>
        </div>

        {/* bottom copy */}
        <div className="absolute bottom-12 left-10 right-10">
          <h2
            className="text-white leading-[1.05] mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(42px, 5vw, 62px)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            Welcome
            <br />
            <em>Back.</em>
          </h2>
          <div className="w-8 h-px bg-white/60 backdrop-blur-xl  border border-[#ede9e3]/30 mb-4" />
          <p className="text-white/40 text-[12px] tracking-[0.1em] leading-relaxed max-w-xs uppercase">
            Your curated wardrobe awaits
          </p>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 bg-transparent flex items-center justify-center p-8 md:p-14 relative">
        {/* subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative w-full max-w-[400px]">
          {/* mobile brand */}
          <div className="lg:hidden flex items-center justify-between mb-12">
            <span
              className="text-[#0a0a0a] text-[11px] tracking-[0.4em] uppercase"
              style={{ fontWeight: 300 }}
            >
              Snitch
            </span>
            <span className="text-[#aaa] text-[10px] tracking-[0.2em] uppercase">
              SS '25
            </span>
          </div>

          {/* heading */}
          <div className="mb-10">
            <h1
              className="text-[#0a0a0a] mb-2 leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(38px, 5vw, 50px)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              Sign In
            </h1>
            <p className="text-[#999] text-[13px] tracking-[0.05em]" style={{ fontWeight: 300 }}>
              Access your exclusive account
            </p>
          </div>

          {/* error */}
          {error && (
            <div className="mb-6 text-[#9b2335] text-[12px] bg-[#fdf2f3] border border-[#f0d0d4] px-4 py-3 rounded-lg tracking-wide">
              {error}
            </div>
          )}

          {/* form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                className="text-[10px] text-[#888] tracking-[0.25em] uppercase"
                style={{ fontWeight: 500 }}
              >
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full bg-white/60 backdrop-blur-xl  border border-[#ede9e3]/60  shadow-xl border border-[#e5e2dd] text-[#0a0a0a] placeholder-[#ccc] rounded-xl px-4 py-3.5 text-[13px] outline-none focus:border-[#0a0a0a] transition-colors duration-300"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label
                className="text-[10px] text-[#888] tracking-[0.25em] uppercase"
                style={{ fontWeight: 500 }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/60 backdrop-blur-xl  border border-[#ede9e3]/60  shadow-xl border border-[#e5e2dd] text-[#0a0a0a] placeholder-[#ccc] rounded-xl px-4 py-3.5 pr-12 text-[13px] outline-none focus:border-[#0a0a0a] transition-colors duration-300"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#ccc] hover:text-[#666] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-[#ece9e4]" />
              <span className="text-[10px] text-[#ccc] tracking-[0.15em] uppercase">
                or
              </span>
              <div className="flex-1 h-px bg-[#ece9e4]" />
            </div>

            <ContinuewithGoogle />

            {/* submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0a0a0a] hover:bg-[#1c1c1c] text-white py-4 rounded-xl text-[12px] tracking-[0.2em] uppercase font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed mt-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Authenticating
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* footer */}
          <div className="mt-8 pt-6 border-t border-[#ece9e4] flex items-center justify-between">
            <p className="text-[12px] text-[#aaa]">No account?</p>
            <Link
              to="/register"
              className="text-[11px] text-[#0a0a0a] tracking-[0.2em] uppercase font-medium hover:text-[#555] transition-colors underline underline-offset-4 decoration-[#ccc]"
            >
              Create One
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;