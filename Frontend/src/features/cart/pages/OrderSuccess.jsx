import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ShoppingBag, Package } from 'lucide-react';
import confetti from 'canvas-confetti';

const OrderSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // सेलेब्रेशन के लिए कॉन्फेटी (Confetti) एनीमेशन
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6 text-center selection:bg-[#0a0a0a] selection:text-white">
            {/* Animated Checkmark Container */}
            <div className="relative mb-12">
                <div className="w-32 h-32 bg-white/60 backdrop-blur-xl  border border-[#ede9e3] rounded-full flex items-center justify-center shadow-2xl shadow-[#22c55e]/10 animate-in zoom-in duration-700">
                    <CheckCircle size={64} strokeWidth={1} className="text-[#22c55e] animate-in slide-in-from-bottom-4 duration-1000" />
                </div>
                {/* Subtle rings */}
                <div className="absolute top-0 left-0 w-full h-full border border-[#22c55e]/20 rounded-full animate-ping duration-[2000ms]"></div>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl mb-6 tracking-tight animate-in fade-in slide-in-from-top-4 duration-700">
                A Curated Acquisition.
            </h1>
            
            <p className="text-[11px] tracking-[0.4em] text-[#999] uppercase font-bold mb-12 max-w-md mx-auto leading-loose animate-in fade-in duration-1000 delay-300">
                Your order has been successfully placed and is now being prepared for your archive.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                <button
                    onClick={() => navigate('/orders')}
                    className="group bg-[#0a0a0a] text-white px-10 py-5 rounded-sm text-[11px] tracking-[0.3em] font-bold transition-all hover:bg-[#222] active:scale-[0.98] flex items-center justify-center gap-4 shadow-xl shadow-[#0a0a0a]/10"
                >
                    <Package size={16} />
                    VIEW MY ARCHIVE
                </button>
                
                <button
                    onClick={() => navigate('/')}
                    className="group bg-transparent border border-[#ede9e3] text-[#0a0a0a] px-10 py-5 rounded-sm text-[11px] tracking-[0.3em] font-bold transition-all hover:bg-white/60 backdrop-blur-xl  border border-[#ede9e3] active:scale-[0.98] flex items-center justify-center gap-4"
                >
                    <ShoppingBag size={16} />
                    CONTINUE EXPLORING
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Footer decoration */}
            <div className="absolute bottom-12 left-0 w-full flex justify-center opacity-10 pointer-events-none">
                <span className="font-serif text-8xl tracking-[0.3em] font-light italic">SNITCH</span>
            </div>
        </div>
    );
};

export default OrderSuccess;
