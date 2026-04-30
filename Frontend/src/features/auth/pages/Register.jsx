// Register.jsx
import React, { useState } from "react";
import { Eye, EyeOff, Check, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import ContinuewithGoogle from "../components/ContinuewithGoogle";

const Register = () => {
  const navigate = useNavigate();
  const { handleregister } = useAuth();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    password: "",
    isSeller: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.email || !formData.contact || !formData.password) {
      setError("All fields are required");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await handleregister({
        email: formData.email.trim(),
        password: formData.password,
        fullname: formData.fullname.trim(),
        contact: formData.contact.trim(),
        role: formData.isSeller ? "seller" : "buyer",
      });
      if (res) navigate("/");
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].msg);
      } else {
        setError(err.response?.data?.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white/60 backdrop-blur-xl  border border-[#ede9e3]/60  shadow-xl border border-[#e5e2dd] text-[#0a0a0a] placeholder-[#ccc] rounded-xl px-4 py-3.5 text-[13px] outline-none focus:border-[#0a0a0a] transition-colors duration-300";

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Left Image Panel ── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-[#0a0a0a]">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=90&w=2000&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

        <div className="absolute top-10 left-10 right-10 flex items-center justify-between">
          <span
            className="text-white/90 text-[11px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            Snitch
          </span>
          <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">
            SS '25
          </span>
        </div>

        <div className="absolute bottom-12 left-10 right-10">
          <h2
            className="text-white leading-[1.05] mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 5vw, 60px)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            Dress for
            <br />
            <em>the moment.</em>
          </h2>
          <div className="w-8 h-px bg-white/60 backdrop-blur-xl  border border-[#ede9e3]/30 mb-4" />
          <p className="text-white/40 text-[11px] tracking-[0.12em] leading-relaxed max-w-xs uppercase">
            Curated streetwear for the modern aesthetic
          </p>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 bg-transparent flex items-center justify-center p-8 md:p-14 relative overflow-y-auto">
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative w-full max-w-[400px] py-8">
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
                fontSize: "clamp(36px, 5vw, 48px)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              Create Account
            </h1>
            <p className="text-[#999] text-[13px] tracking-[0.03em]" style={{ fontWeight: 300 }}>
              Join the Snitch community
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
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-[#888] tracking-[0.25em] uppercase font-medium">
                Full Name
              </label>
              <input
                name="fullname"
                type="text"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-[#888] tracking-[0.25em] uppercase font-medium">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-[#888] tracking-[0.25em] uppercase font-medium">
                Contact
              </label>
              <input
                name="contact"
                type="tel"
                value={formData.contact}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-[#888] tracking-[0.25em] uppercase font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="min. 6 characters"
                  required
                  minLength={6}
                  className={`${inputClass} pr-12`}
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

            {/* Seller toggle */}
            <label className="flex items-center gap-3.5 cursor-pointer group w-fit select-none mt-1 p-3 rounded-xl hover:bg-black/[0.02] transition-colors">
              <input
                name="isSeller"
                type="checkbox"
                checked={formData.isSeller}
                onChange={handleChange}
                className="sr-only"
              />
              <div
                className={`w-[18px] h-[18px] rounded-md border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${formData.isSeller
                    ? "bg-[#0a0a0a] border-[#0a0a0a]"
                    : "bg-white/60 backdrop-blur-xl  border border-[#ede9e3]/60  shadow-xl border-[#d5d2cd] group-hover:border-[#999]"
                  }`}
              >
                {formData.isSeller && (
                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                )}
              </div>
              <div>
                <p className="text-[12px] text-[#333] font-medium tracking-wide">
                  Register as Seller
                </p>
                {formData.isSeller && (
                  <p className="text-[11px] text-[#aaa] mt-0.5">
                    Seller tools available after verification
                  </p>
                )}
              </div>
            </label>

            {/* divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-[#ece9e4]" />
              <span className="text-[10px] text-[#ccc] tracking-[0.15em] uppercase">or</span>
              <div className="flex-1 h-px bg-[#ece9e4]" />
            </div>

            <ContinuewithGoogle />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0a0a0a] hover:bg-[#1c1c1c] text-white py-4 rounded-xl text-[12px] tracking-[0.2em] uppercase font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Creating Account
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#ece9e4] flex items-center justify-between">
            <p className="text-[12px] text-[#aaa]">Have an account?</p>
            <Link
              to="/login"
              className="text-[11px] text-[#0a0a0a] tracking-[0.2em] uppercase font-medium hover:text-[#555] transition-colors underline underline-offset-4 decoration-[#ccc]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;