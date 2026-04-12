import React, { useState } from "react";
import { Eye, EyeOff, Check, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

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

    if (res) {
      navigate("/"); 
    }
  } catch (err) {
    if (err.response?.data?.errors) {
      setError(err.response.data.errors[0].message);
    } else {
      setError(err.response?.data?.message || "Registration failed");
    }
  } finally {
    setLoading(false);
  }
};

  const inputClass =
    "w-full bg-[#20201f] text-[#ffffff] placeholder-[#adaaaa] rounded-3xl px-6 py-4 text-[15px] outline-none transition-all duration-300 focus:bg-[#262626] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.4)]";

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex font-['Inter']">
      {/* Left Column - Imagery (Hidden on mobile/tablet, Half-width on Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#131313] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        {/* Gradient Overlay for blending into the dark theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0e0e0e]/60 to-[#0e0e0e]" />

        {/* Branding Overlay */}
        <div className="relative z-10 w-full p-12 xl:p-20 flex flex-col justify-between">
          <div>
            <p className="text-[#3bbffa] text-sm font-semibold tracking-[0.2em] uppercase">
              Snitch
            </p>
            <h1 className="text-5xl xl:text-6xl font-bold text-[#ffffff] tracking-[-0.02em] font-['Manrope'] leading-tight mt-6">
              Embrace
              <br />
              The Nocturnal
              <br />
              Luminance.
            </h1>
          </div>
          <div>
            <p className="text-[#adaaaa] text-[17px] leading-relaxed max-w-md">
              Discover the latest in high-fashion editorial streetwear. Curated
              collections for the modern aesthetic.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Registration Form (Full width on Mobile/Tablet, Half-width on Desktop) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-12 relative overflow-hidden">
        {/* Ambient Lighting for Form */}
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] lg:w-[400px] lg:h-[400px] bg-[#3bbffa]/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] lg:w-[500px] lg:h-[500px] bg-[#a88cfb]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50" />

        <div className="relative w-full max-w-[480px] bg-[#1a1a1a]/80 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-[rgba(118,117,117,0.15)] flex flex-col gap-10 z-10">
          {/* Header */}
          <div className="flex flex-col gap-3">
            <p className="text-[#3bbffa] text-sm md:text-[15px] font-semibold tracking-[0.15em] uppercase lg:hidden">
              Snitch
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-4xl font-bold text-[#ffffff] tracking-[-0.02em] font-['Manrope'] leading-tight">
              Create Account
            </h1>
            <p className="text-[#adaaaa] text-sm sm:text-base md:text-[17px] leading-relaxed mt-1">
              Join the exclusive Snitch community.
            </p>
          </div>

          {error && (
            <div className="bg-[#9f0519]/20 text-[#ffa8a3] text-sm px-6 py-4 rounded-2xl border border-[rgba(159,5,25,0.3)]">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fullname"
                className="text-[13px] font-semibold text-[#ffffff] tracking-wide ml-2 opacity-90"
              >
                Full Name
              </label>
              <input
                id="fullname"
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
              <label
                htmlFor="email"
                className="text-[13px] font-semibold text-[#ffffff] tracking-wide ml-2 opacity-90"
              >
                Email Address
              </label>
              <input
                id="email"
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
              <label
                htmlFor="contact"
                className="text-[13px] font-semibold text-[#ffffff] tracking-wide ml-2 opacity-90"
              >
                Contact Number
              </label>
              <input
                id="contact"
                name="contact"
                type="tel"
                value={formData.contact}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="password"
                className="text-[13px] font-semibold text-[#ffffff] tracking-wide ml-2 opacity-90"
              >
                Password
              </label>
              <div className="relative group">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="min. 6 characters"
                  required
                  minLength={6}
                  className={`${inputClass} pr-14`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#adaaaa] hover:text-[#ffffff] transition-colors p-2"
                  aria-label="Toggle password"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" strokeWidth={2} />
                  ) : (
                    <Eye className="w-5 h-5" strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <label className="flex items-center gap-4 cursor-pointer group w-fit select-none bg-[#131313] px-5 py-4 rounded-3xl hover:bg-[#20201f] transition-colors border border-[rgba(118,117,117,0.05)]">
                <input
                  id="isSeller"
                  name="isSeller"
                  type="checkbox"
                  checked={formData.isSeller}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${formData.isSeller ? "bg-[#4f319c] shadow-[0_0_15px_rgba(79,49,156,0.5)]" : "bg-[#262626] group-hover:bg-[#2c2c2c]"}`}
                >
                  {formData.isSeller && (
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  )}
                </div>
                <span
                  className={`text-[15px] font-medium transition-colors duration-300 ${formData.isSeller ? "text-[#a88cfb]" : "text-[#ffffff]"}`}
                >
                  Register as Seller
                </span>
              </label>
              {formData.isSeller && (
                <p className="text-[13px] text-[#adaaaa] ml-4">
                  Access exclusive seller tools upon verification.
                </p>
              )}
            </div>

            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="mt-6 w-full py-[18px] px-8 rounded-full text-[16px] font-bold text-[#00121d] bg-[linear-gradient(45deg,#3bbffa,#a88cfb)] hover:opacity-90 active:scale-[0.98] transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(59,191,250,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-[#00121d]" />
                  Authenticating...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-2 flex flex-col gap-4">
            <p className="text-[14px] text-[#adaaaa]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#3bbffa] font-semibold hover:text-[#a88cfb] transition-colors ml-1"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
