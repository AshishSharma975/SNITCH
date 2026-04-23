import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../hook/useproduct";
import { ShoppingBag, Search, User, Menu, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const allproduct = useSelector((state) => state.product.allproduct);
  const { handleGetAllProduct } = useProduct();

  useEffect(() => {
    handleGetAllProduct();
  }, []);

  // ── Styling Tokens (Consistent with Dashboard) ──
  const colors = {
    bg: "#faf9f7",
    card: "#ffffff",
    border: "#ede9e3",
    textMain: "#0a0a0a",
    textMuted: "#999999",
    accent: "#0a0a0a",
  };

  const fonts = {
    serif: "'Cormorant Garamond', serif",
    sans: "'DM Sans', sans-serif",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.bg,
        fontFamily: fonts.sans,
        color: colors.textMain,
      }}
    >
      {/* ── Navigation ── */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "30px 60px",
          position: "sticky",
          top: 0,
          backgroundColor: "rgba(250, 249, 247, 0.8)",
          backdropFilter: "blur(10px)",
          zIndex: 1000,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          <Menu size={20} style={{ cursor: "pointer" }} />
          <div style={{ display: "flex", gap: "24px" }}>
            {["NEW IN", "COLLECTIONS", "CURATION"].map((item) => (
              <span
                key={item}
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div
          onClick={() => navigate("/")}
          style={{
            fontFamily: fonts.serif,
            fontSize: "32px",
            fontWeight: 400,
            cursor: "pointer",
            letterSpacing: "0.1em",
          }}
        >
          SNITCH
        </div>

        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <Search size={20} style={{ cursor: "pointer" }} />
          <User size={20} style={{ cursor: "pointer" }} onClick={() => navigate("/login")} />
          <div style={{ position: "relative", cursor: "pointer" }}>
            <ShoppingBag size={20} />
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                backgroundColor: colors.accent,
                color: "#fff",
                fontSize: "10px",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              0
            </span>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <header style={{ padding: "80px 60px 120px 60px", textAlign: "center" }}>
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: colors.textMuted,
            marginBottom: "24px",
          }}
        >
          Curated Apparel for the Modern Minimalist
        </p>
        <h1
          style={{
            fontFamily: fonts.serif,
            fontSize: "clamp(48px, 8vw, 120px)",
            fontWeight: 300,
            lineHeight: 0.9,
            marginBottom: "40px",
            letterSpacing: "-0.03em",
          }}
        >
          The <em>Art</em> of <br />
          Obsidian <em>Muse.</em>
        </h1>
        <button
          style={{
            background: colors.accent,
            color: "#fff",
            border: "none",
            padding: "20px 40px",
            borderRadius: "50px",
            fontSize: "12px",
            letterSpacing: "0.2em",
            fontWeight: 500,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          DISCOVER COLLECTION <ArrowRight size={16} />
        </button>
      </header>

      {/* ── Product Grid ── */}
      <main style={{ padding: "0 60px 100px 60px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "60px",
            borderBottom: `1px solid ${colors.border}`,
            paddingBottom: "24px",
          }}
        >
          <h2 style={{ fontFamily: fonts.serif, fontSize: "42px", fontWeight: 300 }}>
            Recent <em>Drops.</em>
          </h2>
          <span style={{ fontSize: "12px", color: colors.textMuted, letterSpacing: "0.1em" }}>
            {allproduct?.length || 0} PIECES IN ARCHIVE
          </span>
        </div>

        {!allproduct || allproduct.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 0", color: colors.textMuted }}>
            The archive is currently empty.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "60px 40px",
            }}
          >
            {allproduct.map((product) => (
              <div
                key={product._id}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
              >
                <div
                  style={{
                    aspectRatio: "3/4",
                    backgroundColor: "#efeeea",
                    borderRadius: "2px",
                    overflow: "hidden",
                    marginBottom: "24px",
                    position: "relative",
                  }}
                >
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].url}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.6s cubic-bezier(0.2, 1, 0.3, 1)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        color: "#ccc",
                      }}
                    >
                      PENDING IMAGERY
                    </div>
                  )}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "20px",
                      backgroundColor: "rgba(255,255,255,0.9)",
                      padding: "8px 16px",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                    }}
                  >
                    QUICK VIEW
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3
                      style={{
                        fontSize: "15px",
                        fontWeight: 400,
                        marginBottom: "6px",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {product.title}
                    </h3>
                    <p style={{ fontSize: "12px", color: colors.textMuted }}>Essential Studio Piece</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "15px", fontWeight: 500 }}>
                      {product.price?.amount?.toLocaleString()} {product.price?.currency}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: `1px solid ${colors.border}`,
          padding: "80px 60px",
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        <h2
          style={{
            fontFamily: fonts.serif,
            fontSize: "24px",
            marginBottom: "30px",
            letterSpacing: "0.1em",
          }}
        >
          SNITCH
        </h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginBottom: "40px" }}>
          {["PRIVACY", "TERMS", "STUDIO", "JOURNAL"].map((link) => (
            <span key={link} style={{ fontSize: "10px", letterSpacing: "0.2em", color: colors.textMuted }}>
              {link}
            </span>
          ))}
        </div>
        <p style={{ fontSize: "11px", color: "#ccc", letterSpacing: "0.05em" }}>
          © 2026 SNITCH STUDIOS. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
};

export default Home;