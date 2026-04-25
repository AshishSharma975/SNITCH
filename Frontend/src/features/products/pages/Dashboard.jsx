import React, { useEffect } from "react";
import { useProduct } from "../hook/useproduct";
import { useSelector } from "react-redux";
import { 
  Plus, 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  Settings, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  MoreVertical,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hook/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { handleGetSellerProduct } = useProduct();
  const { sellerproduct, loading } = useSelector((state) => state.product);

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  useEffect(() => {
    handleGetSellerProduct();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ── Styling Tokens ──
  const colors = {
    bg: "#faf9f7",
    card: "#ffffff",
    border: "#ede9e3",
    textMain: "#0a0a0a",
    textMuted: "#999999",
    accent: "#0a0a0a",
    hover: "#f5f2ee",
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
        display: "flex",
      }}
    >
      {/* ── Sidebar Navigation ── */}
      <aside
        style={{
          width: "280px",
          borderRight: `1px solid ${colors.border}`,
          backgroundColor: colors.card,
          display: "flex",
          flexDirection: "column",
          padding: "40px 0",
          position: "fixed",
          height: "100vh",
          zIndex: 100,
        }}
      >
        <div style={{ padding: "0 40px", marginBottom: "60px" }}>
          <span
            style={{
              fontSize: "12px",
              letterSpacing: "0.5em",
              fontWeight: 300,
              textTransform: "uppercase",
              color: colors.textMain,
            }}
          >
            Snitch
          </span>
        </div>

        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: Package, label: "Collection", active: false },
            { icon: TrendingUp, label: "Analytics", active: false },
            { icon: Settings, label: "Studio Settings", active: false },
          ].map((item, idx) => (
            <button
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px 40px",
                border: "none",
                background: item.active ? colors.bg : "transparent",
                color: item.active ? colors.textMain : colors.textMuted,
                cursor: "pointer",
                width: "100%",
                fontSize: "13px",
                fontWeight: item.active ? 500 : 400,
                letterSpacing: "0.05em",
                transition: "all 0.2s",
                textAlign: "left",
              }}
              onMouseEnter={(e) => !item.active && (e.currentTarget.style.color = colors.textMain)}
              onMouseLeave={(e) => !item.active && (e.currentTarget.style.color = colors.textMuted)}
            >
              <item.icon size={18} strokeWidth={item.active ? 2 : 1.5} />
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "0 24px" }}>
          <button
            onClick={onLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px",
              width: "100%",
              borderRadius: "12px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fee2e2",
              color: "#991b1b",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <LogOut size={16} />
            Termination
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main style={{ marginLeft: "280px", flex: 1, padding: "60px 80px" }}>
        {/* Header */}
        <header
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "80px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: colors.textMuted,
                marginBottom: "16px",
              }}
            >
              Seller Portal — Overview
            </p>
            <h1
              style={{
                fontFamily: fonts.serif,
                fontSize: "64px",
                fontWeight: 300,
                color: colors.textMain,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Manage <em>Collection.</em>
            </h1>
          </div>

          <button
            onClick={() => navigate("/seller/create-product")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: colors.accent,
              color: "#fff",
              border: "none",
              padding: "18px 32px",
              borderRadius: "14px",
              fontSize: "12px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <Plus size={18} />
            Curate New Piece
          </button>
        </header>

        {/* Stats Grid */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            marginBottom: "80px",
          }}
        >
          {[
            { label: "Total Archive", value: sellerproduct?.length || 0, sub: "Items listed" },
            { label: "Studio Reach", value: "2.4k", sub: "Views this month" },
            { label: "Sold through", value: "84%", sub: "Collection rate" },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: colors.card,
                border: `1px solid ${colors.border}`,
                borderRadius: "24px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: colors.textMuted,
                }}
              >
                {stat.label}
              </span>
              <span
                style={{
                  fontFamily: fonts.serif,
                  fontSize: "42px",
                  fontWeight: 400,
                  color: colors.textMain,
                }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: "12px", color: "#aaa" }}>{stat.sub}</span>
            </div>
          ))}
        </section>

        {/* Products Section */}
        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "40px",
              paddingBottom: "20px",
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <h2
              style={{
                fontFamily: fonts.serif,
                fontSize: "32px",
                fontWeight: 300,
                color: colors.textMain,
              }}
            >
              Your <em>Listings.</em>
            </h2>
            <div style={{ display: "flex", gap: "24px" }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "12px",
                  color: colors.textMain,
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Sort by Date
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "12px",
                  color: colors.textMuted,
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                }}
              >
                Filter
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: "100px 0", textAlign: "center" }}>
              <span style={{ fontSize: "14px", color: colors.textMuted }}>Refining archive...</span>
            </div>
          ) : !sellerproduct || sellerproduct.length === 0 ? (
            <div
              style={{
                padding: "120px 0",
                textAlign: "center",
                backgroundColor: colors.card,
                border: `1px dashed ${colors.border}`,
                borderRadius: "32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "24px",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: colors.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Package size={24} color="#ddd" />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: "24px",
                    color: colors.textMain,
                    marginBottom: "8px",
                  }}
                >
                  Archive is <em>empty.</em>
                </p>
                <p style={{ fontSize: "14px", color: colors.textMuted }}>
                  Start listing your curation to showcase it here.
                </p>
              </div>
              <button

                onClick={() => navigate("/seller/create-product")}
                style={{
                  backgroundColor: "transparent",
                  color: colors.textMain,
                  border: `1px solid ${colors.textMain}`,
                  padding: "14px 28px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Launch First Piece
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "40px",
              }}
            >
              {sellerproduct.map((product) => (
                <div
                  onClick={() => navigate(`/seller/product/${product._id}`)}
                  key={product._id}
                  style={{
                    group: "product-card",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "3/4",
                      backgroundColor: "#efeeea",
                      borderRadius: "20px",
                      overflow: "hidden",
                      position: "relative",
                      marginBottom: "20px",
                      transition: "transform 0.4s cubic-bezier(0.2, 1, 0.3, 1)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].url}
                        alt={product.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#bbb",
                          fontSize: "11px",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                        }}
                      >
                        No Imagery
                      </div>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        backgroundColor: "rgba(255,255,255,0.9)",
                        padding: "8px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      }}
                    >
                      <MoreVertical size={16} color={colors.textMain} />
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          color: colors.textMain,
                          marginBottom: "4px",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {product.title}
                      </h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Clock size={12} color={colors.textMuted} />
                        <span style={{ fontSize: "12px", color: colors.textMuted }}>
                          Listed {formatDate(product.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          color: colors.textMain,
                          display: "block",
                        }}
                      >
                        {product.price.currency} {product.price.amount.toLocaleString()}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#22c55e",
                          fontWeight: 500,
                          letterSpacing: "0.05em",
                        }}
                      >
                        ACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;