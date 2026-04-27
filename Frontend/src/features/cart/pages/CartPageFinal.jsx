import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCart } from '../hook/useCart';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronRight, Truck, ShieldCheck, RotateCcw, ArrowLeft, Search, User, Check, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../auth/hook/useAuth';

import { toast } from 'react-hot-toast';

const CartPageFinal = () => {
  console.log("Cart component rendering...");
  const navigate = useNavigate();
  const { handleGetCart, handleRemoveFromCart, handleUpdateQuantity, handleIncrementQuantity, handleDecrementQuantity, handleRemoveItem, handleClearCart } = useCart();

  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const user = useSelector((state) => state.auth.user);
  const allproduct = useSelector((state) => state.product.allproduct);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { handleLogout } = useAuth();


  useEffect(() => {
    handleGetCart();
  }, []);

  const onRemoveItem = async (productId, variantId) => {
    await handleRemoveFromCart(productId, variantId);
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-slide-down' : 'opacity-0 scale-95'
        } glass-toast flex items-center gap-4 px-6 py-4 rounded-full shadow-2xl transition-all duration-500 ease-in-out`}
      >
        <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center animate-rotate-in">
          <Check size={16} className="text-white" />
        </div>
        <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#0a0a0a] whitespace-nowrap">
          Removed from selection
        </span>
      </div>
    ), { duration: 2000, position: 'top-center' });
  }

  const onUpdateQty = async (productId, variantId, newQty) => {
    if (newQty < 1) return;
    await handleUpdateQuantity(productId, variantId, newQty);
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-[#0a0a0a]/5 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag size={40} strokeWidth={1} className="text-[#0a0a0a]/20" />
        </div>
        <h2 className="font-serif text-3xl mb-4 text-[#0a0a0a]">Your Archive is Empty</h2>
        <p className="text-[#999] mb-8 font-sans max-w-xs mx-auto text-sm leading-relaxed">
          Discover our latest collection and find the perfect pieces for your curated wardrobe.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#0a0a0a] text-white px-10 py-4 rounded-full text-[10px] tracking-[0.2em] font-bold transition-all hover:bg-[#222] active:scale-[0.98] shadow-xl shadow-[#0a0a0a]/10"
        >
          CONTINUE EXPLORING
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#0a0a0a] font-sans selection:bg-[#0a0a0a] selection:text-white">
      {/* ── Navigation ── */}
     <nav className="flex justify-between items-center px-6 md:px-12 py-8 bg-[#faf9f7]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#ede9e3]">
        <div className="flex gap-10 items-center">
          <button onClick={() => navigate(-1)} className="hover:opacity-50 transition-opacity p-2 -ml-2">
            <ArrowLeft size={20} />
          </button>
          <div className="hidden lg:flex gap-8">
            {['NEW IN', 'COLLECTIONS', 'CURATION'].map((item) => (
              <span key={item} className="text-[11px] tracking-[0.25em] font-bold cursor-pointer hover:text-[#999] transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div
          onClick={() => navigate('/')}
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
                <div className="p-4 border-b border-[#ede9e3] flex items-center gap-3 text-left">
                  <Search size={16} className="text-[#999]" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search Archive..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent outline-none text-[12px] tracking-[0.1em] font-medium uppercase text-[#0a0a0a]"
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
                  <div className="max-h-[400px] overflow-y-auto text-left">
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
            <User 
              size={20} 
              className="cursor-pointer hover:text-[#999] transition-colors" 
              onClick={() => setShowUserMenu(!showUserMenu)} 
            />
            {showUserMenu && (
              <div className="absolute right-0 mt-4 w-48 bg-white border border-[#ede9e3] shadow-2xl py-2 z-[60] animate-in fade-in slide-in-from-top-2 duration-300">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[10px] tracking-[0.2em] font-bold hover:bg-[#faf9f7] transition-colors"
                  >
                    <LogOut size={14} /> LOGOUT
                  </button>
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
            <div
              className="relative cursor-pointer group"
              onClick={() => navigate('/cart')}
            >
              <ShoppingBag size={20} className="group-hover:text-[#999] transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0a0a0a] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-300">
                  {totalItems}
                </span>
              )}
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-[1300px] mx-auto px-6 md:px-12 py-12">
        <header className="mb-16">
          <h1 className="font-serif text-4xl md:text-6xl mb-4 tracking-tight">Your Selection</h1>
          <p className="text-[10px] tracking-[0.4em] text-[#999] uppercase font-bold">Review your curated pieces before checkout</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* ── Item List ── */}
          <div className="lg:col-span-8 space-y-12">
            {cartItems.map((item) => {
              const product = item.productId;
              const variant = product?.variants?.find(v => v._id === item.variantId);
              const displayImage = variant?.images?.[0]?.url || product?.images?.[0]?.url;

              return (
                <div key={item._id} className="group flex flex-col sm:flex-row gap-8 pb-12 border-b border-[#0a0a0a]/5 last:border-0">
                  {/* Image Container */}
                  <div
                    className="w-full sm:w-48 aspect-[3/4] bg-[#f2f1ef] overflow-hidden rounded-sm shrink-0 cursor-pointer"
                    onClick={() => navigate(`/product/details/${product._id}`)}
                  >
                    <img
                      src={displayImage}
                      alt={product?.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-[9px] tracking-[0.3em] text-[#999] uppercase mb-1 font-bold">
                          {product?.category || "Essential"}
                        </p>
                        <h3
                          className="font-serif text-xl md:text-2xl cursor-pointer hover:opacity-60 transition-opacity"
                          onClick={() => navigate(`/product/details/${product._id}`)}
                        >
                          {product?.title}
                        </h3>
                      </div>
                      <button
                        className="p-2 hover:bg-[#ef4444]/5 hover:text-[#ef4444] rounded-full transition-all text-[#999]"
                        onClick={() => onRemoveItem(product._id, item.variantId)}
                      >
                        <Trash2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>

                    {/* Attributes */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                      {(() => {
                        let attrs = variant?.attributes || {};
                        if (Array.isArray(attrs)) attrs = attrs[0] || {};

                        return Object.entries(attrs).map(([key, val]) => {
                          if (key.startsWith('_') || typeof val === 'object') return null;
                          return (
                            <div key={key} className="flex gap-2 items-center">
                              <span className="text-[9px] tracking-[0.1em] text-[#999] uppercase font-bold">{key}:</span>
                              <span className="text-[10px] tracking-widest text-[#0a0a0a] font-medium uppercase">{val}</span>
                            </div>
                          );
                        });
                      })()}
                    </div>

                    <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      {/* Quantity Controls */}

                      <div className="flex items-center border border-[#ede9e3] rounded-full px-2 py-1 w-fit bg-white">
                        <button
                          onClick={() => item.quantity > 1 ? onUpdateQty(product._id, item.variantId, item.quantity - 1) : onRemoveItem(product._id, item.variantId)}
                          className="p-2 hover:opacity-50 transition-opacity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-6 text-xs font-bold font-mono">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrementQuantity(product._id, item.variantId)}
                          className="p-2 hover:opacity-50 transition-opacity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-[10px] tracking-[0.2em] text-[#999] uppercase mb-1 font-bold">Item Total</p>
                        <p className="text-lg font-medium tracking-tight">
                          {(item.price.amount * item.quantity).toLocaleString()} {item.price.currency}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Summary Column ── */}
          <aside className="lg:col-span-4 sticky top-32">
            <div className="bg-white border border-[#ede9e3] p-8 md:p-10 rounded-sm shadow-sm">
              <h2 className="font-serif text-2xl mb-8">Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs tracking-widest uppercase text-[#666]">
                  <span>Subtotal</span>
                  <span className="text-[#0a0a0a] font-bold">{totalPrice.toLocaleString()} INR</span>
                </div>
                <div className="flex justify-between text-xs tracking-widest uppercase text-[#666]">
                  <span>Shipping</span>
                  <span className="text-[#22c55e] font-bold tracking-widest uppercase text-[10px]">Complimentary</span>
                </div>
                <div className="flex justify-between text-xs tracking-widest uppercase text-[#666]">
                  <span>Estimated Tax</span>
                  <span className="text-[#0a0a0a] font-bold">Calculated at checkout</span>
                </div>
              </div>

              <div className="h-px bg-[#f2f1ef] w-full mb-8"></div>

              <div className="flex justify-between items-baseline mb-10">
                <span className="font-serif text-xl">Total</span>
                <div className="text-right">
                  <span className="text-3xl font-medium tracking-tighter">{totalPrice.toLocaleString()}</span>
                  <span className="text-[10px] font-bold text-[#999] ml-2 tracking-widest uppercase text-xs">INR</span>
                </div>
              </div>

              <button
                className="w-full bg-[#0a0a0a] text-white py-6 rounded-sm text-[11px] tracking-[0.4em] font-bold transition-all hover:bg-[#222] active:scale-[0.99] flex items-center justify-center gap-4 mb-6 shadow-xl shadow-[#0a0a0a]/10"
              >
                PROCEED TO CHECKOUT
                <ArrowRight size={14} />
              </button>

              <p className="text-[9px] text-center text-[#999] tracking-[0.2em] uppercase font-bold mb-8">
                Secure Encryption · Worldwide Express
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 gap-4 pt-8 border-t border-[#f2f1ef]">
                {[
                  { icon: Truck, label: "Express Delivery" },
                  { icon: ShieldCheck, label: "Certified Archive" },
                  { icon: RotateCcw, label: "Hassle-free Returns" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 opacity-60">
                    <item.icon size={14} strokeWidth={1.5} />
                    <span className="text-[9px] tracking-[0.2em] uppercase font-bold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mt-8 flex items-center justify-center gap-2 text-[#999] hover:text-[#0a0a0a] transition-colors cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <span className="text-[10px] tracking-[0.2em] font-bold uppercase">Continue Shopping</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </aside>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[#ede9e3] py-24 px-6 md:px-12 text-center bg-white mt-24">
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

export default CartPageFinal;