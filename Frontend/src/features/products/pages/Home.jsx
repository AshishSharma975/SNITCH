import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../hook/useproduct";
import { ShoppingBag, Search, User, Menu, ArrowRight, LogOut, LogIn, UserPlus, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hook/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const allproduct = useSelector((state) => state.product.allproduct);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const { handleGetAllProduct } = useProduct();
  const { handleLogout } = useAuth();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

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
          <div className="relative group">
            <Search 
              size={20} 
              className="cursor-pointer hidden sm:block hover:text-[#999] transition-colors" 
              onClick={() => setShowSearch(!showSearch)}
            />
            {showSearch && (
              <div className="absolute right-0 mt-4 w-[300px] md:w-[400px] bg-white border border-[#ede9e3] shadow-2xl z-[70] animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="p-4 border-b border-[#ede9e3] flex items-center gap-3">
                  <Search size={16} className="text-[#999]" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search Archive..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent outline-none text-[12px] tracking-[0.1em] font-medium uppercase"
                  />
                  <button 
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery("");
                    }}
                    className="text-[10px] font-bold text-[#999] hover:text-[#0a0a0a]"
                  >
                    CLOSE
                  </button>
                </div>
                
                {searchQuery && (
                  <div className="max-h-[400px] overflow-y-auto">
                    {allproduct?.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                      allproduct
                        ?.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((product) => (
                          <div
                            key={product._id}
                            onClick={() => {
                              navigate(`/product/details/${product._id}`);
                              setShowSearch(false);
                              setSearchQuery("");
                            }}
                            className="flex items-center gap-4 p-4 hover:bg-[#faf9f7] cursor-pointer transition-colors border-b border-[#faf9f7] last:border-0"
                          >
                            <div className="w-12 h-16 bg-[#f2f1ef] rounded-sm overflow-hidden shrink-0">
                              <img src={product.images?.[0]?.url} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div>
                              <p className="text-[11px] font-bold tracking-widest uppercase mb-1">{product.title}</p>
                              <p className="text-[10px] text-[#999] tracking-widest uppercase">
                                {product.price?.amount?.toLocaleString()} {product.price?.currency}
                              </p>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="p-8 text-center text-[#999] text-[10px] tracking-widest uppercase italic">
                        No pieces found
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="relative">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowUserMenu(!showUserMenu)}>
              {user && (
                <span className="text-[11px] tracking-[0.1em] font-bold uppercase hidden sm:block hover:text-[#999] transition-colors">
                  {user.fullname}
                </span>
              )}
              <User 
                size={20} 
                className="hover:text-[#999] transition-colors" 
              />
            </div>
            {showUserMenu && (
              <div className="absolute right-0 mt-4 w-48 bg-white border border-[#ede9e3] shadow-2xl py-2 z-[60] animate-in fade-in slide-in-from-top-2 duration-300">
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/orders");
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[10px] tracking-[0.2em] font-bold hover:bg-[#faf9f7] border-b border-[#ede9e3]"
                    >
                      <Package size={14} /> MY ARCHIVE
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[10px] tracking-[0.2em] font-bold hover:bg-[#faf9f7] transition-colors"
                    >
                      <LogOut size={14} /> LOGOUT
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate("/login");
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[10px] tracking-[0.2em] font-bold hover:bg-[#faf9f7] transition-colors border-b border-[#ede9e3]"
                    >
                      <LogIn size={14} /> LOGIN
                    </button>
                    <button
                      onClick={() => {
                        navigate("/register");
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[10px] tracking-[0.2em] font-bold hover:bg-[#faf9f7] transition-colors"
                    >
                      <UserPlus size={14} /> SIGN UP
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {user && (
            <div className="flex gap-8 items-center">
              <div
                className="cursor-pointer hover:text-[#999] transition-colors"
                onClick={() => navigate("/orders")}
                title="My Orders"
              >
                <Package size={20} />
              </div>
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
          )}
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