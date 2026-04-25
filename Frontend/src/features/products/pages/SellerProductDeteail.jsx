import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '../hook/useproduct';
import { 
  ArrowLeft, 
  Plus, 
  Settings2, 
  Package, 
  Layers, 
  Edit3, 
  Trash2, 
  UploadCloud, 
  Check, 
  X,
  ChevronRight,
  Info,
  DollarSign,
  Maximize2,
  LayoutGrid,
  ChevronLeft
} from 'lucide-react';

const SellerProductDeteail = () => {
  const { productId } = useParams();
  const { handleGetProductById, handleCreateProductVariant, handleDeleteProductVariant } = useProduct();
  const handleDeleteVariant = async (variantId) => {
    if (window.confirm("Are you sure you want to remove this variant?")) {
      try {
        setLoading(true);
        await handleDeleteProductVariant(productId, variantId);
        await fetchProductData();
      } catch (error) {
        console.error("Error deleting variant:", error);
        alert("Failed to delete variant");
      } finally {
        setLoading(false);
      }
    }
  };
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  
  // ── New Variant Configuration State ──
  const [newVariant, setNewVariant] = useState({
    stock: 0,
    price: { amount: '', currency: 'INR' }, // Optional price
    images: [], // Optional images
    attributes: { 'Size': '' } // At least one attribute required, now as an object
  });

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const data = await handleGetProductById(productId);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  // ── Dynamic Attribute Logic (Object-based) ──
  const addAttribute = () => {
    // Generate a unique placeholder key
    let newKey = 'New Attribute';
    let counter = 1;
    while (newVariant.attributes[newKey]) {
      newKey = `New Attribute ${counter}`;
      counter++;
    }
    
    setNewVariant(prev => ({
      ...prev,
      attributes: { ...prev.attributes, [newKey]: '' }
    }));
  };

  const updateAttributeKey = (oldKey, newKey) => {
    if (oldKey === newKey) return;
    
    setNewVariant(prev => {
      const newAttributes = { ...prev.attributes };
      const value = newAttributes[oldKey];
      delete newAttributes[oldKey];
      newAttributes[newKey] = value;
      return { ...prev, attributes: newAttributes };
    });
  };

  const updateAttributeValue = (key, value) => {
    setNewVariant(prev => ({
      ...prev,
      attributes: { ...prev.attributes, [key]: value }
    }));
  };

  const removeAttribute = (key) => {
    if (Object.keys(newVariant.attributes).length > 1) {
      setNewVariant(prev => {
        const newAttributes = { ...prev.attributes };
        delete newAttributes[key];
        return { ...prev, attributes: newAttributes };
      });
    }
  };

  // ── Image Handling Logic (Mocking for now) ──
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (newVariant.images.length + files.length > 7) {
      alert("Maximum 7 images allowed per variant.");
      return;
    }
    
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));

    setNewVariant(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const removeImage = (index) => {
    setNewVariant(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateStock = (variantId, newStock) => {
    setProduct(prev => ({
      ...prev,
      variants: prev.variants.map(v => v._id === variantId ? { ...v, stock: parseInt(newStock) } : v)
    }));
  };

  const validateVariant = () => {
    // Enforce at least one attribute with non-empty key and value
    const keys = Object.keys(newVariant.attributes);
    const hasValidAttribute = keys.some(key => key.trim() && newVariant.attributes[key].trim());
    
    if (!hasValidAttribute) {
      alert("At least one valid attribute (Key and Value) is required.");
      return false;
    }
    return true;
  };

  const handleCreateVariant = async () => {
    if (validateVariant()) {
      try {
        setLoading(true);
        await handleCreateProductVariant(productId, newVariant);
        
        // Refresh product data
        await fetchProductData();
        
        setIsModalOpen(false);
        // Reset form
        setNewVariant({
          stock: 0,
          price: { amount: '', currency: 'INR' },
          images: [],
          attributes: { 'Size': '' }
        });
      } catch (error) {
        console.error("Error creating variant:", error);
        alert("Failed to create variant.");
      } finally {
        setLoading(false);
      }
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
        <button 
          onClick={() => navigate('/dashboard')} 
          className="text-[#0a0a0a]/60 hover:text-[#0a0a0a] underline text-[10px] tracking-[0.3em] font-bold uppercase transition-all"
        >
          RETURN TO DASHBOARD
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#0a0a0a] font-sans selection:bg-[#0a0a0a] selection:text-white">
      {/* ── Navigation ── */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 sticky top-0 bg-[#faf9f7]/80 backdrop-blur-md z-50 border-b border-[#ede9e3]">
        <div className="flex gap-8 items-center">
          <button onClick={() => navigate(-1)} className="hover:text-[#999] transition-colors p-2 -ml-2">
            <ArrowLeft size={20} />
          </button>
          <div>
            <p className="text-[9px] tracking-[0.4em] text-[#999] uppercase font-bold">Studio Archive</p>
            <h1 className="text-sm font-bold tracking-tight uppercase">{product.title}</h1>
          </div>
        </div>

        <div 
          onClick={() => navigate('/')}
          className="font-serif text-2xl md:text-3xl tracking-[0.15em] cursor-pointer absolute left-1/2 -translate-x-1/2"
        >
          SNITCH
        </div>

        <div className="flex gap-4">
          <button className="hidden md:flex items-center gap-3 px-8 py-2.5 bg-[#0a0a0a] text-white rounded-full text-[10px] font-bold tracking-[0.2em] transition-transform active:scale-95 shadow-lg shadow-[#0a0a0a]/10">
            SAVE AS DRAFT
          </button>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* ── Left: Core Product Identity ── */}
          <div className="lg:col-span-4 space-y-12">
            <section className="bg-white border border-[#ede9e3] rounded-sm p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-[#faf9f7] border border-[#ede9e3] rounded-full flex items-center justify-center">
                  <Package size={16} strokeWidth={1.5} />
                </div>
                <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#0a0a0a]">Archive Original</h3>
              </div>
              
              <div className="aspect-[3/4] bg-[#faf9f7] overflow-hidden rounded-sm mb-10 relative group">
                <img 
                  src={product.images?.[activeImage]?.url} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Image Nav Overlay */}
                <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
                  {product.images?.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-1 h-1 rounded-full transition-all duration-300 ${activeImage === idx ? 'bg-[#0a0a0a] w-4' : 'bg-[#0a0a0a]/20'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="text-[9px] tracking-[0.2em] text-[#999] uppercase font-bold block mb-4">Design Narrative</label>
                  <p className="text-sm leading-relaxed text-[#444] font-light italic">"{product.description}"</p>
                </div>
                
                <div className="pt-8 border-t border-[#ede9e3] flex justify-between items-center">
                  <div>
                    <label className="text-[9px] tracking-[0.2em] text-[#999] uppercase font-bold block mb-2">Base Pricing</label>
                    <p className="text-xl font-medium tracking-tight">
                      {product.price?.amount?.toLocaleString()} 
                      <span className="text-[10px] text-[#999] font-bold uppercase ml-2 tracking-widest">{product.price?.currency}</span>
                    </p>
                  </div>
                  <button className="w-10 h-10 border border-[#ede9e3] hover:bg-[#0a0a0a] hover:text-white rounded-full flex items-center justify-center transition-all">
                    <Edit3 size={14} />
                  </button>
                </div>
              </div>
            </section>

            {/* Quick Stats / Technical Info */}
            <section className="px-8 space-y-6">
              <div className="flex items-center justify-between text-[10px] tracking-[0.1em] text-[#999] uppercase font-bold">
                <span>Created Date</span>
                <span className="text-[#0a0a0a]">{new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] tracking-[0.1em] text-[#999] uppercase font-bold">
                <span>Last Modified</span>
                <span className="text-[#0a0a0a]">{new Date(product.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] tracking-[0.1em] text-[#999] uppercase font-bold">
                <span>Archived ID</span>
                <span className="text-[#0a0a0a] font-mono tracking-tighter opacity-50">{product._id.slice(-8)}</span>
              </div>
            </section>
          </div>

          {/* ── Right: Variants & Stock Architecture ── */}
          <div className="lg:col-span-8 space-y-12">
            <section className="bg-white border border-[#ede9e3] rounded-sm p-8 md:p-12 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-[#faf9f7] border border-[#ede9e3] rounded-full flex items-center justify-center shadow-inner">
                    <LayoutGrid size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#0a0a0a]">Studio Variations</h3>
                    <p className="text-[10px] text-[#999] tracking-[0.1em] mt-2 font-medium">Managing {product.variants?.length || 0} configurations</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="group flex items-center gap-4 px-10 py-4 bg-[#0a0a0a] text-white rounded-full text-[10px] font-bold tracking-[0.3em] transition-all hover:bg-[#222] shadow-xl shadow-[#0a0a0a]/5"
                >
                  <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" /> NEW ARCHIVE PIECE
                </button>
              </div>

              {/* Variants Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product.variants?.length > 0 ? (
                  product.variants.map((variant, idx) => (
                    <div key={idx} className="group relative bg-[#faf9f7] border border-[#ede9e3] rounded-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#0a0a0a]/5">
                      <div className="flex flex-col sm:flex-row h-full">
                        <div className="w-full sm:w-1/3 aspect-[3/4] bg-white overflow-hidden relative">
                          <img 
                            src={variant.images?.[0]?.url || product.images?.[0]?.url} 
                            className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-1000" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f7]/40 to-transparent"></div>
                        </div>
                        
                        <div className="flex-1 p-6 flex flex-col">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="mb-4">
                                <span className="text-[9px] tracking-[0.2em] text-[#999] uppercase font-bold block mb-3">Specifications</span>
                                <div className="space-y-2">
                                  {(() => {
                                    let attrs = variant.attributes || {};
                                    if (Array.isArray(attrs) && attrs.length > 0) attrs = attrs[0];
                                    const entries = Object.entries(attrs).filter(([k]) => !k.startsWith('_'));
                                    
                                    if (entries.length === 0) return <p className="text-[10px] text-[#999] italic">Standard Configuration</p>;
                                    
                                    return entries.map(([key, val]) => (
                                      <div key={key} className="flex items-center gap-4">
                                        <span className="text-[8px] text-[#999] uppercase font-extrabold tracking-[0.2em] w-16 shrink-0">{key}</span>
                                        <span className="text-[11px] text-[#0a0a0a] font-bold tracking-tight uppercase bg-[#0a0a0a]/5 px-2.5 py-1 rounded-sm">
                                          {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                                        </span>
                                      </div>
                                    ));
                                  })()}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className="text-[12px] font-bold tracking-tight px-4 py-2 bg-white border border-[#ede9e3] rounded-full shadow-sm text-[#0a0a0a]">
                                {variant.price?.amount?.toLocaleString()} {variant.price?.currency || 'INR'}
                              </span>
                              {variant.stock <= 5 && variant.stock > 0 && (
                                <span className="text-[8px] font-bold text-[#ef4444] uppercase tracking-[0.2em] bg-[#ef4444]/10 px-2 py-0.5 rounded">Low Stock</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-auto pt-6 border-t border-[#f2f1ef] grid grid-cols-2 gap-8">
                            <div className="space-y-3">
                              <span className="text-[9px] tracking-[0.2em] text-[#999] uppercase font-bold block mb-1">Current Inventory</span>
                              <div className="flex items-center gap-4">
                                <div className="relative group">
                                  <input 
                                    type="number" 
                                    className="w-24 bg-white border border-[#ede9e3] rounded-full px-4 py-2 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#0a0a0a] transition-all"
                                    defaultValue={variant.stock}
                                    onBlur={(e) => handleUpdateStock(variant._id, e.target.value)}
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full ${variant.stock > 0 ? 'bg-[#22c55e]' : 'bg-[#ef4444]'}`}></div>
                                  <span className={`text-[10px] font-bold uppercase tracking-widest ${variant.stock > 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                                    {variant.stock > 0 ? 'Available' : 'Sold Out'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-end justify-end gap-3">
                              <button className="p-2.5 bg-[#faf9f7] hover:bg-[#0a0a0a] hover:text-white rounded-full transition-all border border-[#ede9e3]">
                                <Edit3 size={14} />
                              </button>
                              <button 
                                onClick={() => handleDeleteVariant(variant._id)}
                                className="p-2.5 bg-[#faf9f7] hover:bg-[#ef4444] hover:text-white rounded-full transition-all border border-[#ede9e3]"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover Actions */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <button className="p-3 bg-white hover:bg-[#0a0a0a] hover:text-white rounded-full border border-[#ede9e3] shadow-xl transition-all">
                          <Edit3 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteVariant(variant._id)}
                          className="p-3 bg-white hover:bg-[#ef4444] hover:text-white rounded-full border border-[#ede9e3] shadow-xl transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-32 flex flex-col items-center justify-center bg-[#faf9f7]/50 border border-dashed border-[#ede9e3] rounded-sm">
                    <div className="w-16 h-16 bg-white border border-[#ede9e3] rounded-full flex items-center justify-center mb-8 shadow-sm">
                      <Layers size={24} className="text-[#999]" strokeWidth={1} />
                    </div>
                    <p className="text-[10px] tracking-[0.4em] text-[#999] uppercase font-bold">No Archive Pieces Configured</p>
                    <button 
                       onClick={() => setIsModalOpen(true)}
                       className="mt-8 text-[10px] tracking-[0.2em] font-bold uppercase text-[#0a0a0a] border-b border-[#0a0a0a] pb-1 hover:pb-2 transition-all"
                    >
                      INITIALIZE SELECTION
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* ── Add Variant Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-6">
          <div 
            className="absolute inset-0 bg-[#faf9f7]/95 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white border border-[#ede9e3] rounded-sm w-full max-w-[900px] max-h-[90vh] overflow-y-auto shadow-2xl overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-white border-b border-[#ede9e3] p-10 flex justify-between items-center z-10">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-[#faf9f7] border border-[#ede9e3] rounded-full flex items-center justify-center shadow-inner">
                  <Plus size={20} />
                </div>
                <div>
                  <h3 className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#0a0a0a]">Configure Archive Entry</h3>
                  <p className="text-[9px] text-[#999] mt-2 font-bold uppercase tracking-[0.2em]">Adding to {product.title}</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-[#faf9f7] border border-[#ede9e3] rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-10 space-y-16">
              {/* Media Upload Architecture */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                   <label className="text-[9px] tracking-[0.3em] text-[#999] uppercase font-bold block">Archival Imagery (Optional, Max 7)</label>
                   <span className="text-[9px] text-[#999] font-bold">{newVariant.images.length}/7</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {newVariant.images.length < 7 && (
                    <label className="aspect-[3/4] border border-dashed border-[#ede9e3] rounded-sm flex flex-col items-center justify-center gap-4 hover:border-[#0a0a0a] hover:bg-[#faf9f7] transition-all cursor-pointer group bg-[#faf9f7]/30">
                      <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
                      <UploadCloud size={28} className="text-[#999] group-hover:text-[#0a0a0a] transition-colors" strokeWidth={1} />
                      <span className="text-[8px] tracking-[0.2em] uppercase font-bold text-[#999]">Add Media</span>
                    </label>
                  )}
                  {newVariant.images.map((img, i) => (
                    <div key={i} className="aspect-[3/4] bg-[#faf9f7] rounded-sm border border-[#ede9e3] relative group overflow-hidden">
                       <img src={img.url} className="w-full h-full object-cover" />
                       <button 
                        onClick={() => removeImage(i)}
                        className="absolute top-2 right-2 p-1 bg-white border border-[#ede9e3] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                       >
                         <X size={12} />
                       </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Attributes Architecture */}
              <div className="space-y-8">
                <div className="flex justify-between items-center pb-4 border-b border-[#ede9e3]">
                  <label className="text-[9px] tracking-[0.3em] text-[#999] uppercase font-bold block">Composition Details (At least 1 Required)</label>
                  <button 
                    onClick={addAttribute}
                    className="text-[9px] font-bold tracking-[0.2em] text-[#0a0a0a] border-b border-[#0a0a0a] pb-0.5 uppercase hover:pb-1 transition-all"
                  >
                    + Add Attribute
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {newVariant.attributes && typeof newVariant.attributes === 'object' ? (
                    Object.entries(newVariant.attributes).map(([key, value], index) => (
                      <div key={index} className="flex border border-[#ede9e3] rounded-sm overflow-hidden shadow-sm group">
                        <input 
                          type="text" 
                          placeholder="Key (e.g. Size, Voltage)"
                          value={String(key)}
                          onChange={(e) => updateAttributeKey(key, e.target.value)}
                          className="w-1/3 bg-[#faf9f7] border-r border-[#ede9e3] px-4 py-3 text-[10px] text-[#0a0a0a] font-bold uppercase tracking-widest focus:outline-none" 
                        />
                        <input 
                          type="text" 
                          placeholder="Value"
                          value={typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          onChange={(e) => updateAttributeValue(key, e.target.value)}
                          className="w-2/3 bg-white px-4 py-3 text-[10px] font-bold focus:outline-none flex-1" 
                        />
                        {Object.keys(newVariant.attributes).length > 1 && (
                          <button 
                            onClick={() => removeAttribute(key)}
                            className="px-3 bg-white border-l border-[#ede9e3] text-[#ef4444] hover:bg-[#ef4444] hover:text-white transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-[#999] italic">Initializing attributes...</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                   {['Color', 'Size', 'Storage', 'Voltage', 'Material', 'Fit'].map(preset => (
                     <button 
                      key={preset}
                      onClick={() => {
                        // If there's an empty or placeholder key, use that, otherwise add new
                        const emptyKey = Object.keys(newVariant.attributes).find(k => k.startsWith('New Attribute') && !newVariant.attributes[k]);
                        if (emptyKey) updateAttributeKey(emptyKey, preset);
                        else setNewVariant(prev => ({ ...prev, attributes: { ...prev.attributes, [preset]: '' } }));
                      }}
                      className="px-3 py-1 bg-white border border-[#ede9e3] rounded-full text-[9px] font-bold tracking-widest text-[#999] hover:border-[#0a0a0a] hover:text-[#0a0a0a] transition-all"
                     >
                       + {preset}
                     </button>
                   ))}
                </div>
              </div>

              {/* Commercial Specs (Optional) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <label className="text-[9px] tracking-[0.3em] text-[#999] uppercase font-bold block pb-4 border-b border-[#ede9e3]">Commercial Specs (Optional)</label>
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <span className="text-[9px] text-[#999] uppercase tracking-widest font-bold">Variant Pricing (Leave empty for base price)</span>
                      <div className="relative">
                        <input 
                          type="number" 
                          placeholder={product.price?.amount}
                          value={newVariant.price.amount || ''}
                          onChange={(e) => setNewVariant(prev => ({ ...prev, price: { ...prev.price, amount: e.target.value } }))}
                          className="w-full bg-[#faf9f7] border border-[#ede9e3] rounded-sm px-5 py-4 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#0a0a0a]" 
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-[#999] uppercase tracking-[0.2em]">{product.price?.currency}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <span className="text-[9px] text-[#999] uppercase tracking-widest font-bold">Initial Inventory Count</span>
                      <input 
                        type="number" 
                        value={newVariant.stock}
                        onChange={(e) => setNewVariant(prev => ({ ...prev, stock: e.target.value }))}
                        className="w-full bg-[#faf9f7] border border-[#ede9e3] rounded-sm px-5 py-4 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#0a0a0a]" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 border-t border-[#ede9e3] flex flex-col sm:flex-row gap-6 bg-[#faf9f7]/30">
              <button 
                 onClick={() => setIsModalOpen(false)}
                 className="flex-1 py-5 border border-[#ede9e3] hover:bg-[#0a0a0a] hover:text-white rounded-full text-[10px] font-bold tracking-[0.4em] uppercase transition-all shadow-sm"
              >
                DISCARD ENTRY
              </button>
              <button 
                 onClick={handleCreateVariant}
                 className="flex-1 py-5 bg-[#0a0a0a] text-white rounded-full text-[10px] font-bold tracking-[0.4em] uppercase transition-transform active:scale-[0.98] shadow-2xl shadow-[#0a0a0a]/10"
              >
                SAVE TO ARCHIVE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProductDeteail;