import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '../hook/useproduct';
import { ShoppingBag, Search, User, Menu, ArrowLeft, Heart, Share2, ShieldCheck, Truck, RotateCcw, ChevronLeft, ChevronRight, Info, Check, Plus, Minus, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../auth/hook/useAuth';


import { useCart } from '../../cart/hook/useCart';


const ProductDeteail = () => {
  const { productId } = useParams();
  const { handleGetProductById } = useProduct();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { handleLogout } = useAuth();
  const user = useSelector((state) => state.auth.user);
  const allproduct = useSelector((state) => state.product.allproduct);


  const [selectedAttributes, setSelectedAttributes] = useState({});
  const totalItems = useSelector((state) => state.cart?.totalItems || 0);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const data = await handleGetProductById(productId);
      setProduct(data);

      // Initialize default attributes if variants exist
      if (data.variants && data.variants.length > 0) {
        const firstVariant = data.variants[0];
        // Handle different attribute structures
        let attrs = firstVariant.attributes || {};
        if (Array.isArray(attrs)) attrs = attrs[0] || {};

        const initialAttrs = {};
        Object.entries(attrs).forEach(([key, val]) => {
          if (!key.startsWith('_')) initialAttrs[key] = val;
        });
        setSelectedAttributes(initialAttrs);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  // Compute all unique attributes available across variants
  const getAllAttributeGroups = () => {
    if (!product?.variants) return {};
    const groups = {};
    product.variants.forEach(variant => {
      let attrs = variant.attributes || {};
      if (Array.isArray(attrs)) attrs = attrs[0] || {};
      Object.entries(attrs).forEach(([key, val]) => {
        if (key.startsWith('_')) return;
        if (!groups[key]) groups[key] = new Set();
        groups[key].add(val);
      });
    });
    // Convert sets to arrays
    const result = {};
    Object.keys(groups).forEach(key => result[key] = Array.from(groups[key]));
    return result;
  };

  // Find the variant that matches currently selected attributes
  const getSelectedVariant = () => {
    if (!product?.variants) return null;
    return product.variants.find(variant => {
      let attrs = variant.attributes || {};
      if (Array.isArray(attrs)) attrs = attrs[0] || {};
      return Object.entries(selectedAttributes).every(([key, val]) => attrs[key] === val);
    });
  };

  const selectedVariant = getSelectedVariant();

  // Display Data with Fallback Logic
  const getDisplayData = () => {
    const displayPrice = selectedVariant?.price?.amount || product?.price?.amount || 0;
    const displayCurrency = selectedVariant?.price?.currency || product?.price?.currency || 'INR';
    const displayImages = (selectedVariant?.images && selectedVariant.images.length > 0)
      ? selectedVariant.images
      : (product?.images || []);
    const displayStock = selectedVariant ? selectedVariant.stock : (product?.variants?.reduce((acc, v) => acc + (v.stock || 0), 0) || 0);

    return { displayPrice, displayCurrency, displayImages, displayStock };
  };

  const { displayPrice, displayCurrency, displayImages, displayStock } = getDisplayData();

  const handleNextImage = () => {
    if (displayImages?.length > 0) {
      setActiveImage((prev) => (prev + 1) % displayImages.length);
    }
  };

  const handlePrevImage = () => {
    if (displayImages?.length > 0) {
      setActiveImage((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0a0a0a]/10 border-t-[#0a0a0a] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl mb-4 text-[#0a0a0a]">Product Not Found</h2>
        <p className="text-[#999] mb-8 font-sans">The piece you're looking for might have been moved or is no longer available.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#0a0a0a] text-white px-8 py-3 rounded-full text-xs tracking-[0.2em] font-medium transition-all hover:bg-[#222]"
        >
          RETURN TO ARCHIVE
        </button>
      </div>
    );
  }

  const attributeGroups = getAllAttributeGroups();

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#0a0a0a] font-sans selection:bg-[#0a0a0a] selection:text-white">
      {/* ── Navigation ── */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-8 sticky top-0 bg-[#faf9f7]/80 backdrop-blur-md z-50 border-b border-[#ede9e3]">
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
              <div className="absolute right-0 mt-4 w-[300px] md:w-[400px] bg-white border border-[#ede9e3] shadow-2xl z-[70] animate-in fade-in slide-in-from-top-4 duration-300 text-left">
                <div className="p-4 border-b border-[#ede9e3] flex items-center gap-3">
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

      {/* ── Main Content ── */}
      <main className="max-w-[1300px] mx-auto px-4 md:px-12 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── Left: Image Gallery ── */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col md:flex-row gap-4 md:gap-6 lg:max-w-[600px]">
            {/* Thumbnails (Desktop) */}
            <div className="hidden md:flex flex-col gap-3 w-20 shrink-0">
              {displayImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-[3/4] cursor-pointer overflow-hidden transition-all duration-300 rounded-sm ${activeImage === idx ? 'ring-1 ring-[#0a0a0a] ring-offset-2' : 'opacity-40 hover:opacity-100'}`}
                >
                  <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Main Image Container */}
            <div className="flex-1 relative aspect-[4/5] md:aspect-[3/4] bg-[#f2f1ef] overflow-hidden group rounded-sm shadow-sm max-w-[500px] lg:max-w-none mx-auto lg:mx-0">

              {displayImages.length > 0 ? (
                <>
                  <img
                    src={displayImages[activeImage]?.url}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Desktop Swipe Buttons */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center border border-[#ede9e3]"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center border border-[#ede9e3]"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#999] gap-4">
                  <Info size={32} strokeWidth={1} />
                  <span className="text-[10px] tracking-[0.3em] uppercase">Imagery Pending</span>
                </div>
              )}

              {/* Mobile Interaction Layer */}
              <div className="absolute inset-x-0 bottom-6 px-6 flex items-center justify-between md:hidden">
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                  className="bg-white/95 p-3 rounded-full shadow-md active:scale-90 transition-transform"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex gap-2.5">
                  {displayImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeImage === idx ? 'bg-[#0a0a0a] w-6' : 'bg-[#0a0a0a]/20 w-1.5'}`}
                    />
                  ))}
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                  className="bg-white/95 p-3 rounded-full shadow-md active:scale-90 transition-transform"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col py-4 md:py-0">
            {/* TOP COMMENT / BADGE */}
            <div className="inline-flex items-center gap-2 mb-8 bg-[#0a0a0a]/5 self-start px-3 py-1.5 rounded-full">
              <Check size={12} className="text-[#0a0a0a]" />
              <span className="text-[9px] font-bold tracking-[0.15em] text-[#0a0a0a] uppercase">
                Editor's Choice · SS '25 Collection
              </span>
            </div>

            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <p className="text-[10px] tracking-[0.4em] text-[#999] uppercase mb-3 font-semibold">Essential Studio Piece</p>
                <h1 className="font-serif text-3xl md:text-5xl leading-[1.1] mb-4 tracking-tight capitalize text-[#0a0a0a]">
                  {product.title}
                </h1>
              </div>
              <div className="flex gap-2">
                <button className="p-2.5 hover:bg-white rounded-full transition-all border border-transparent hover:border-[#ede9e3] hover:shadow-sm">
                  <Heart size={18} />
                </button>
                <button className="p-2.5 hover:bg-white rounded-full transition-all border border-transparent hover:border-[#ede9e3] hover:shadow-sm">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-2xl md:text-3xl font-medium tracking-tight">
                {displayPrice.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-[#999] tracking-widest uppercase">
                {displayCurrency}
              </span>
              {displayStock > 0 ? (
                <span className="ml-4 text-[10px] text-[#22c55e] font-bold tracking-widest uppercase bg-[#22c55e]/10 px-2 py-0.5 rounded">
                  In Stock
                </span>
              ) : (
                <span className="ml-4 text-[10px] text-[#ef4444] font-bold tracking-widest uppercase bg-[#ef4444]/10 px-2 py-0.5 rounded">
                  Sold Out
                </span>
              )}
            </div>

            {/* ── Attribute Selectors ── */}
            <div className="space-y-8 mb-10">
              {Object.entries(attributeGroups).map(([groupName, values]) => (
                <div key={groupName}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#0a0a0a] uppercase">{groupName}</h3>
                    {groupName.toLowerCase() === 'size' && (
                      <span className="text-[9px] text-[#999] underline cursor-pointer tracking-widest uppercase">Size Guide</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {values.map((val) => (
                      <button
                        key={val}
                        onClick={() => setSelectedAttributes(prev => ({ ...prev, [groupName]: val }))}
                        className={`px-6 py-3 text-[11px] font-bold tracking-widest uppercase transition-all border rounded-sm ${selectedAttributes[groupName] === val
                          ? 'bg-[#0a0a0a] text-white border-[#0a0a0a]'
                          : 'bg-white text-[#0a0a0a] border-[#ede9e3] hover:border-[#0a0a0a]'
                          }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-[#ede9e3] w-full mb-8"></div>

            {/* DESCRIPTION SECTION */}
            <div className="mb-10">
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#0a0a0a] uppercase mb-4">The Narrative</h3>
              <p className="text-[14px] leading-[1.8] text-[#444] font-light italic">
                "{product.description || "A masterclass in minimal design and superior craftsmanship, curated for the modern minimalist."}"
              </p>
            </div>

            {/* PRODUCT HIGHLIGHTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12 py-6 border-y border-[#ede9e3]">
              {[
                { icon: Truck, label: "Complimentary Delivery" },
                { icon: ShieldCheck, label: "Certified Authentic" },
                { icon: RotateCcw, label: "30-Day Archive Return" },
                { icon: Info, label: "Organic Fiber Composition" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#ede9e3] group-hover:bg-[#0a0a0a] group-hover:text-white transition-all duration-300">
                    <item.icon size={12} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] tracking-[0.1em] text-[#666] uppercase font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            {/* QUANTITY SELECTOR */}
            <div className="flex flex-col gap-4 mb-10">
              <span className="text-[10px] tracking-[0.25em] text-[#999] uppercase font-bold">Quantity</span>
              <div className="flex items-center w-fit border border-[#ede9e3] rounded-full px-2 py-1 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:opacity-50 transition-opacity"
                >
                  <Minus size={14} />
                </button>
                <span className="px-8 text-sm font-bold font-mono w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:opacity-50 transition-opacity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                disabled={isAdding}
                onClick={async () => {
                  if (!user) {
                    toast.error("Please login to curate your collection", {
                      style: { borderRadius: '0px', background: '#0a0a0a', color: '#fff', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }
                    });
                    navigate("/login");
                    return;
                  }
                  if (!selectedVariant) {
                    toast.error("Please select all options");
                    return;
                  }
                  setIsAdding(true);
                  try {
                    await addToCart(product._id, selectedVariant._id, quantity);
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
                          Added to selection
                        </span>
                      </div>
                    ), { duration: 3000, position: 'top-center' });
                  } finally {
                    setIsAdding(false);
                  }
                }}
                className={`flex-1 bg-[#0a0a0a] text-white py-5 rounded-full text-[11px] tracking-[0.3em] font-bold transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#0a0a0a]/10 ${isAdding ? 'opacity-70 scale-[0.98]' : 'hover:bg-[#222] active:scale-[0.98]'}`}>
                {isAdding ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    CURATING...
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    ADD TO CART
                  </>
                )}
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-5 rounded-full border border-[#ede9e3] transition-all hover:border-[#0a0a0a] ${isWishlisted ? 'bg-[#0a0a0a] border-[#0a0a0a] text-white' : 'bg-white text-[#0a0a0a]'}`}
              >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Additional UX: Size Guide & Delivery Info */}
            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-4 text-[#999] group cursor-pointer hover:text-[#0a0a0a] transition-colors">
                <div className="w-10 h-10 rounded-full border border-[#ede9e3] flex items-center justify-center group-hover:border-[#0a0a0a] transition-all">
                  <Info size={14} />
                </div>
                <span className="text-[10px] tracking-[0.2em] font-bold uppercase">Size & Fit Guide</span>
              </div>
              <div className="flex items-center gap-4 text-[#999] group cursor-pointer hover:text-[#0a0a0a] transition-colors">
                <div className="w-10 h-10 rounded-full border border-[#ede9e3] flex items-center justify-center group-hover:border-[#0a0a0a] transition-all">
                  <Truck size={14} />
                </div>
                <span className="text-[10px] tracking-[0.2em] font-bold uppercase">Express Delivery Available</span>
              </div>
            </div>

            <p className="text-[9px] text-center text-[#999] mt-8 tracking-[0.2em] uppercase font-medium">
              Secure checkout · Worldwide express delivery
            </p>
          </div>
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

export default ProductDeteail;


