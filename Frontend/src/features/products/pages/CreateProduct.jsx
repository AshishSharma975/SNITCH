// CreateProduct.jsx — COMPLETE FILE — purani file delete karke ye paste karo
import React, { useState, useRef, useCallback } from "react";
import { Loader2, UploadCloud, X, Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../hook/useproduct";

const CURRENCIES = ["USD", "EUR", "INR", "GBP", "AED", "JPY"];
const MAX_IMAGES = 7;

const CreateProduct = () => {
  const navigate = useNavigate();
  const { handleCreateProduct } = useProduct();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "USD",
  });
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addFiles = (files) => {
    const incoming = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    );
    setImages((prev) => [...prev, ...incoming].slice(0, MAX_IMAGES));
  };

  const handleFileChange = (e) => addFiles(e.target.files);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const removeImage = (idx) =>
    setImages((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.title.trim()) return setError("Product title is required.");
    if (!formData.priceAmount || Number(formData.priceAmount) <= 0)
      return setError("A valid price is required.");
    try {
      setLoading(true);
      const payload = new FormData();
      payload.append("title", formData.title.trim());
      payload.append("description", formData.description.trim());
      payload.append("priceAmount", formData.priceAmount);
      payload.append("priceCurrency", formData.priceCurrency);
      images.forEach((img) => payload.append("images", img));
      await handleCreateProduct(payload);
      setSuccess(true);
      setTimeout(() => navigate("/"), 1800);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.errors?.[0]?.msg ||
          "Failed to create product."
      );
    } finally {
      setLoading(false);
    }
  };

  // ── shared input style ──
  const inp =
    "w-full bg-white border border-[#e5e0d8] text-[#0a0a0a] placeholder-[#c8c4be] rounded-xl px-4 py-3.5 text-[13px] outline-none focus:border-[#0a0a0a] transition-colors duration-300";

  const sectionLabel = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "10px",
    letterSpacing: "0.32em",
    fontWeight: 500,
    color: "#c8c4be",
    textTransform: "uppercase",
    marginBottom: "28px",
    display: "block",
  };

  const fieldLabel = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "10px",
    letterSpacing: "0.25em",
    fontWeight: 500,
    color: "#888",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "8px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#faf9f7",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* paper texture */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23faf9f7'/%3E%3Crect width='1' height='1' fill='%23e8e4df' opacity='0.35'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Navbar ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(250,249,247,0.96)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #ede9e3",
          padding: "16px 56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#bbb",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#bbb")}
        >
          <ArrowLeft size={13} />
          Back
        </button>

        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.45em",
            fontWeight: 300,
            textTransform: "uppercase",
            color: "#0a0a0a",
          }}
        >
          Snitch
        </span>

        <div style={{ width: "64px" }} />
      </nav>

      {/* ── Page Body ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          maxWidth: "1180px",
          margin: "0 auto",
          width: "100%",
          padding: "60px 24px",
        }}
      >
        {/* ── Page Heading ── */}
        <div style={{ marginBottom: "48px" }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.38em",
              fontWeight: 500,
              textTransform: "uppercase",
              color: "#c8c4be",
              marginBottom: "16px",
            }}
          >
            New Listing — SS '25
          </p>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(44px, 5vw, 62px)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              color: "#0a0a0a",
              lineHeight: 1,
              marginBottom: "24px",
            }}
          >
            Create a Product
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "32px",
                height: "1px",
                backgroundColor: "rgba(10,10,10,0.35)",
              }}
            />
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: "#aaa",
                letterSpacing: "0.06em",
                fontWeight: 300,
              }}
            >
              Fill in the details to publish your listing
            </p>
          </div>
        </div>

        {/* Banners */}
        {error && (
          <div
            style={{
              marginBottom: "24px",
              color: "#9b2335",
              fontSize: "12px",
              backgroundColor: "#fdf2f3",
              border: "1px solid #f0d0d4",
              padding: "12px 20px",
              borderRadius: "12px",
              letterSpacing: "0.02em",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              marginBottom: "24px",
              color: "#1a6b3c",
              fontSize: "12px",
              backgroundColor: "#f0faf4",
              border: "1px solid #b8e6cc",
              padding: "12px 20px",
              borderRadius: "12px",
              letterSpacing: "0.02em",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Product listed successfully — redirecting…
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* ── Two column grid ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: "16px",
            }}
            className="create-product-grid"
          >
            {/* ─── LEFT ─── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Card — Details */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #ede9e3",
                  borderRadius: "20px",
                  padding: "36px",
                }}
              >
                <span style={sectionLabel}>Product Details</span>

                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Title */}
                  <div>
                    <label style={fieldLabel}>Title</label>
                    <input
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Oversized Linen Blazer"
                      required
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                      className={inp}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label style={fieldLabel}>Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Material, fit, care instructions — tell the story of your piece…"
                      rows={6}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        resize: "none",
                        lineHeight: "1.6",
                      }}
                      className={inp}
                    />
                  </div>
                </div>
              </div>

              {/* Card — Pricing */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #ede9e3",
                  borderRadius: "20px",
                  padding: "36px",
                }}
              >
                <span style={sectionLabel}>Pricing</span>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div>
                    <label style={fieldLabel}>Amount</label>
                    <input
                      name="priceAmount"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.priceAmount}
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                      className={inp}
                    />
                  </div>
                  <div>
                    <label style={fieldLabel}>Currency</label>
                    <div style={{ position: "relative" }}>
                      <select
                        name="priceCurrency"
                        value={formData.priceCurrency}
                        onChange={handleChange}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          appearance: "none",
                          cursor: "pointer",
                          paddingRight: "40px",
                        }}
                        className={inp}
                      >
                        {CURRENCIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <div
                        style={{
                          position: "absolute",
                          right: "16px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                        }}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#aaa"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── RIGHT — Images ─── */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #ede9e3",
                borderRadius: "20px",
                padding: "36px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                alignSelf: "start",
                position: "sticky",
                top: "72px",
              }}
            >
              {/* header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ ...sectionLabel, marginBottom: 0 }}>Images</span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    color: "#d5d0c8",
                    fontWeight: 300,
                  }}
                >
                  {images.length}
                  <span style={{ color: "#e5e0d8" }}>/{MAX_IMAGES}</span>
                </span>
              </div>

              {/* Drop Zone */}
              <button
                type="button"
                onClick={() =>
                  images.length < MAX_IMAGES && fileInputRef.current?.click()
                }
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                disabled={images.length >= MAX_IMAGES}
                style={{
                  width: "100%",
                  border: `2px dashed ${isDragging ? "rgba(10,10,10,0.25)" : "#e5e0d8"}`,
                  borderRadius: "14px",
                  backgroundColor: isDragging ? "rgba(10,10,10,0.015)" : "transparent",
                  padding: "40px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                  cursor: images.length >= MAX_IMAGES ? "not-allowed" : "pointer",
                  opacity: images.length >= MAX_IMAGES ? 0.4 : 1,
                  transition: "all 0.2s",
                  background: "none",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "#f5f2ee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <UploadCloud size={18} color="#c8c4be" />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      color: "#999",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {isDragging
                      ? "Release to upload"
                      : "Drop images or click to browse"}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px",
                      color: "#c8c4be",
                      marginTop: "4px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    PNG · JPG · WEBP — up to {MAX_IMAGES}
                  </p>
                </div>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {/* Thumbnails */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "8px",
                }}
              >
                {Array.from({ length: MAX_IMAGES }).map((_, i) => {
                  const img = images[i];
                  const url = img ? URL.createObjectURL(img) : null;
                  return img ? (
                    <div
                      key={i}
                      style={{
                        position: "relative",
                        aspectRatio: "1",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                      className="thumb-group"
                    >
                      <img
                        src={url}
                        alt={`Product ${i + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      {i === 0 && (
                        <span
                          style={{
                            position: "absolute",
                            top: "4px",
                            left: "4px",
                            fontSize: "7px",
                            backgroundColor: "rgba(10,10,10,0.7)",
                            color: "rgba(255,255,255,0.8)",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          Cover
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        style={{
                          position: "absolute",
                          inset: 0,
                          backgroundColor: "rgba(10,10,10,0.45)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "none",
                          cursor: "pointer",
                          opacity: 0,
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.opacity = "1")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = "0")
                        }
                      >
                        <X size={14} color="white" />
                      </button>
                    </div>
                  ) : (
                    <button
                      key={i}
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        aspectRatio: "1",
                        borderRadius: "10px",
                        border: "1.5px dashed #e5e0d8",
                        backgroundColor: "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#aaa";
                        e.currentTarget.style.backgroundColor = "#faf9f7";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#e5e0d8";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <Plus size={12} color="#ddd" />
                    </button>
                  );
                })}
              </div>

              {images.length > 0 && (
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    color: "#c8c4be",
                    textAlign: "center",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  First image used as cover photo
                </p>
              )}
            </div>
          </div>

          {/* ── Action Bar ── */}
          <div
            style={{
              marginTop: "16px",
              backgroundColor: "#ffffff",
              border: "1px solid #ede9e3",
              borderRadius: "20px",
              padding: "20px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                color: "#c8c4be",
                letterSpacing: "0.06em",
                fontWeight: 300,
              }}
            >
              Listing visible immediately after publishing
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}
            >
              <button
                type="button"
                onClick={() => navigate(-1)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  color: "#aaa",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  textDecoration: "underline",
                  textDecorationColor: "#ddd",
                  textUnderlineOffset: "4px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
              >
                Discard
              </button>

              <button
                type="submit"
                disabled={loading || success}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  backgroundColor: loading || success ? "#555" : "#0a0a0a",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "14px 40px",
                  cursor: loading || success ? "not-allowed" : "pointer",
                  opacity: loading || success ? 0.5 : 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "background-color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!loading && !success)
                    e.currentTarget.style.backgroundColor = "#222";
                }}
                onMouseLeave={(e) => {
                  if (!loading && !success)
                    e.currentTarget.style.backgroundColor = "#0a0a0a";
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Publishing
                  </>
                ) : success ? (
                  "Published ✓"
                ) : (
                  "Publish Listing"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* responsive grid fix */}
      <style>{`
        @media (max-width: 900px) {
          .create-product-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateProduct;