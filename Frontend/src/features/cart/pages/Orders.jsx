import React, { useEffect, useState } from 'react';
import { useCart } from '../hook/useCart';
import { useNavigate } from 'react-router-dom';
import { Package, ChevronRight, ArrowLeft, Calendar, CreditCard, MapPin, Search, User, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../auth/hook/useAuth';
import { toast } from 'react-hot-toast';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { handleGetOrders } = useCart();
    const { handleLogout } = useAuth();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await handleGetOrders();
                setOrders(data);
            } catch (err) {
                console.error("Error fetching orders:", err);
                toast.error("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getEstimatedDelivery = (dateString) => {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 5);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="font-serif text-2xl tracking-[0.2em] animate-pulse">SNITCH</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent text-[#0a0a0a] font-sans selection:bg-[#0a0a0a] selection:text-white">
            {/* ── Navigation ── */}
            <nav className="flex justify-between items-center px-6 md:px-12 py-8 bg-white/60 backdrop-blur-xl  sticky top-0 z-50 border-b border-[#ede9e3]">
                <div className="flex gap-10 items-center">
                    <button onClick={() => navigate('/')} className="hover:opacity-50 transition-opacity p-2 -ml-2">
                        <ArrowLeft size={20} />
                    </button>
                    <span className="hidden lg:block text-[11px] tracking-[0.25em] font-bold uppercase">My Archive</span>
                </div>

                <div onClick={() => navigate('/')} className="font-serif text-3xl md:text-4xl tracking-[0.15em] cursor-pointer absolute left-1/2 -translate-x-1/2">
                    SNITCH
                </div>

                <div className="flex gap-8 items-center">
                    <div className="relative">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowUserMenu(!showUserMenu)}>
                            {user && (
                                <span className="text-[11px] tracking-[0.1em] font-bold uppercase hidden sm:block">
                                    {user.fullname}
                                </span>
                            )}
                            <User size={20} />
                        </div>
                        {showUserMenu && (
                            <div className="absolute right-0 mt-4 w-48 bg-white/60 backdrop-blur-xl  border border-[#ede9e3]/60  shadow-xl border border-[#ede9e3] shadow-2xl py-2 z-[60]">
                                <button
                                    onClick={() => { handleLogout(); setShowUserMenu(false); }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-[10px] tracking-[0.2em] font-bold hover:bg-transparent"
                                >
                                    <LogOut size={14} /> LOGOUT
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-[1000px] mx-auto px-6 py-16">
                <header className="mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl mb-4 tracking-tight">Order History</h1>
                    <p className="text-[10px] tracking-[0.4em] text-[#999] uppercase font-bold">Track your curated acquisitions</p>
                </header>

                {orders.length === 0 ? (
                    <div className="text-center py-24 bg-white/60 backdrop-blur-xl  border border-[#ede9e3]/60  shadow-xl border border-[#ede9e3] rounded-sm">
                        <Package size={40} className="mx-auto mb-6 text-[#999] opacity-20" />
                        <p className="text-[#999] font-serif text-xl italic mb-8">No pieces found in your history.</p>
                        <button onClick={() => navigate('/')} className="bg-[#0a0a0a] text-white px-10 py-4 rounded-full text-[10px] tracking-[0.2em] font-bold">
                            START EXPLORING
                        </button>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white/60 backdrop-blur-xl  border border-[#ede9e3]/60  shadow-xl border border-[#ede9e3] rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                {/* Order Header */}
                                <div className="bg-transparent px-6 py-4 border-b border-[#ede9e3] flex flex-wrap justify-between items-center gap-4">
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-[9px] tracking-widest text-[#999] uppercase font-bold mb-1">Order Placed</p>
                                            <p className="text-xs font-medium uppercase">{formatDate(order.createdAt)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] tracking-widest text-[#999] uppercase font-bold mb-1">Total Amount</p>
                                            <p className="text-xs font-bold uppercase">{order.price.amount.toLocaleString()} {order.price.currency}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-white/60 backdrop-blur-xl  border border-[#ede9e3]/60  shadow-xl border border-[#ede9e3] rounded-full">
                                        <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'SUCCESSFUL' ? 'bg-green-500' : 'bg-orange-400'}`}></div>
                                        <span className="text-[9px] tracking-widest font-bold uppercase">{order.status}</span>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="p-6 divide-y divide-[#f2f1ef]">
                                    {order.orderItems.map((item, idx) => (
                                        <div key={idx} className="py-6 first:pt-0 last:pb-0 flex gap-6">
                                            <div className="w-24 h-32 bg-[#0a0a0a]/5 rounded-sm overflow-hidden shrink-0">
                                                <img src={item.images?.[0]?.url} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <h3 className="font-serif text-lg mb-1">{item.title}</h3>
                                                <p className="text-[10px] tracking-widest text-[#999] uppercase mb-4 line-clamp-1">{item.description}</p>
                                                <div className="flex items-center gap-6">
                                                    <span className="text-[10px] tracking-widest font-bold">QTY: {item.quantity}</span>
                                                    <span className="text-[11px] font-medium">{item.price.amount.toLocaleString()} {item.price.currency}</span>
                                                </div>
                                            </div>
                                            <div className="hidden md:flex flex-col items-end justify-center">
                                                <p className="text-[9px] tracking-widest text-[#999] uppercase font-bold mb-1">Estimated Delivery</p>
                                                <p className="text-xs font-bold uppercase">{getEstimatedDelivery(order.createdAt)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer Info */}
                                <div className="px-6 py-4 bg-transparent/50 border-t border-[#ede9e3] flex justify-between items-center text-[9px] tracking-widest text-[#999] font-bold uppercase">
                                    <div className="flex gap-6">
                                        <div className="flex items-center gap-2"><CreditCard size={12} /> {order.razorpayOrderId}</div>
                                        <div className="flex items-center gap-2"><MapPin size={12} /> Delivered to your curated address</div>
                                    </div>
                                    <button onClick={() => navigate(`/product/details/${order.orderItems[0].productId}`)} className="text-[#0a0a0a] hover:opacity-50 flex items-center gap-2">
                                        REORDER PIECE <ChevronRight size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <footer className="border-t border-[#ede9e3] py-20 px-6 text-center bg-white/60 backdrop-blur-xl  border border-[#ede9e3] mt-24">
                <h2 className="font-serif text-2xl mb-8 tracking-[0.2em] font-light">SNITCH</h2>
                <p className="text-[9px] text-[#ccc] tracking-[0.1em] font-medium uppercase">
                    © 2026 SNITCH STUDIOS. YOUR CURATED ARCHIVE.
                </p>
            </footer>
        </div>
    );
};

export default Orders;
