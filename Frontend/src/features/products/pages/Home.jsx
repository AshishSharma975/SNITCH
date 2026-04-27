import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../hook/useproduct";
import { ShoppingBag, Search, User, Menu, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const allproduct = useSelector((state) => state.product.allproduct);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const { handleGetAllProduct } = useProduct();

  useEffect(() => {
    handleGetAllProduct();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#0a0a0a] font-sans selection:bg-[#0a0a0a] selection:text-white">
      {/* ── Navigation ── */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-8 sticky top-0 bg-[#faf9f7]/80 backdrop-blur-md z-50 border-b border-[#ede9e3]">
        <div className="flex gap-10 items-center">
          <Menu size={20} className="cursor-pointer hover:opacity-50 transition-opacity" />
          <div className="hidden lg:flex gap-8">
            {["NEW IN", "COLLECTIONS", "CURATION"].map((item) => (
              <span
                key={item}
                className="text-[11px] tracking-[0.25em] font-bold cursor-pointer hover:text-[#999] transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div
          onClick={() => navigate("/")}
          className="font-serif text-3xl md:text-4xl tracking-[0.15em] cursor-pointer absolute left-1/2 -translate-x-1/2"
        >
          SNITCH
        </div>

        <div className="flex gap-8 items-center">
          <Search size={20} className="cursor-pointer hidden sm:block hover:text-[#999] transition-colors" />
          <User size={20} className="cursor-pointer hidden sm:block hover:text-[#999] transition-colors" onClick={() => navigate("/login")} />
          <div
            className="relative cursor-pointer group"
            onClick={() => navigate("/cart")}
          >
            <ShoppingBag size={20} className="group-hover:text-[#999] transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#0a0a0a] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-300">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <header className="px-6 py-20 md:py-32 text-center max-w-[1200px] mx-auto">
        <p className="text-[11px] tracking-[0.5em] text-[#999] uppercase mb-8 font-bold">
          Curated Apparel for the Modern Minimalist
        </p>
        <h1 className="font-serif text-[clamp(48px,8vw,120px)] font-light leading-[0.95] mb-12 tracking-tighter">
          The <span className="italic">Art</span> of <br />
          Obsidian <span className="italic">Muse.</span>
        </h1>
        <button className="bg-[#0a0a0a] text-white px-10 py-5 rounded-full text-[11px] tracking-[0.3em] font-bold transition-all hover:bg-[#222] active:scale-[0.98] inline-flex items-center gap-4 shadow-2xl shadow-[#0a0a0a]/20">
          DISCOVER COLLECTION <ArrowRight size={16} />
        </button>
      </header>

      {/* ── Product Grid ── */}
      <main className="px-6 md:px-12 pb-32">
        <div className="flex justify-between items-end mb-16 border-b border-[#ede9e3] pb-8">
          <h2 className="font-serif text-4xl md:text-5xl font-light">
            Recent <span className="italic">Drops.</span>
          </h2>
          <span className="text-[11px] text-[#999] tracking-[0.2em] font-bold uppercase">
            {allproduct?.length || 0} Pieces in Archive
          </span>
        </div>

        {!allproduct || allproduct.length === 0 ? (
          <div className="text-center py-32 text-[#999] font-light italic">
            The archive is currently empty.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {allproduct.map((product) => (
              <div
                onClick={() => navigate(`/product/details/${product._id}`)}
                key={product._id}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-[#f2f1ef] overflow-hidden rounded-sm relative mb-6">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].url}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] tracking-[0.3em] text-[#ccc] uppercase">
                      Pending Imagery
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center">
                    <div className="bg-white px-6 py-3 text-[9px] tracking-[0.2em] font-bold uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                      View Details
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-[14px] font-medium mb-1 tracking-wide uppercase leading-tight group-hover:opacity-60 transition-opacity">
                      {product.title}
                    </h3>
                    <p className="text-[11px] text-[#999] font-bold tracking-[0.1em] uppercase">Studio Archive Piece</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[15px] font-medium tracking-tight">
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
      <footer className="border-t border-[#ede9e3] py-24 px-6 md:px-12 text-center bg-white">
        <h2 className="font-serif text-3xl mb-12 tracking-[0.2em] font-light">SNITCH</h2>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-12">
          {["PRIVACY", "TERMS", "STUDIO", "JOURNAL"].map((link) => (
            <span key={link} className="text-[10px] tracking-[0.3em] font-bold text-[#999] cursor-pointer hover:text-[#0a0a0a] transition-colors">
              {link}
            </span>
          ))}
        </div>
        <p className="text-[10px] text-[#ccc] tracking-[0.1em] font-medium">
          © 2026 SNITCH STUDIOS. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
};

export default Home;