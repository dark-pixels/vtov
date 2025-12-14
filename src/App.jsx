import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBasket, Truck, Leaf, Users, Menu, X, Phone, Mail, MapPin, AlertCircle, ArrowRight, Sun, Droplets, Heart, Star, Sprout, Calendar, ChevronDown, CloudRain, Flower } from 'lucide-react';

// --- Theme Colors ---
// Primary Text/Accents: #0f3d32 (Deep Green - Used for text/buttons)
// Highlights: #8cc63f (Lime Green)
// Backgrounds: #fcf8e3 (Cream/Yellow) & Gradients

const FallingLeaves = ({ count = 15 }) => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 h-full w-full">
            {[...Array(count)].map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-falling-leaf opacity-40"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${8 + Math.random() * 10}s`,
                        top: '-10%'
                    }}
                >
                    <Leaf
                        size={15 + Math.random() * 25}
                        className={`${Math.random() > 0.5 ? 'text-[#8cc63f]' : 'text-[#a3d95b]'} transform rotate-45`}
                        fill={Math.random() > 0.7 ? "currentColor" : "none"}
                    />
                </div>
            ))}
        </div>
    );
};

const RevealOnScroll = ({ children, delay = 0, direction = 'up' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const getTransform = () => {
        if (direction === 'left') return 'translate-x-10';
        if (direction === 'right') return '-translate-x-10';
        return 'translate-y-10';
    };

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${getTransform()}`
                }`}
        >
            {children}
        </div>
    );
};

const MaintenanceModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0f3d32]/60 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full p-6 md:p-8 transform transition-all animate-[scaleUp_0.4s_ease-out] border-b-8 border-[#8cc63f] relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="absolute animate-falling-leaf opacity-20" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s`, top: '-20%' }}>
                            <Leaf size={20} className="text-[#8cc63f]" />
                        </div>
                    ))}
                </div>

                <div className="relative z-10 text-center">
                    <div className="mx-auto w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tr from-[#fcf8e3] to-white rounded-full flex items-center justify-center mb-6 shadow-inner animate-bounce">
                        <ShoppingBasket className="text-[#0f3d32]" size={36} />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-[#0f3d32] mb-3 font-serif">Harvesting Soon</h3>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-center gap-2 text-yellow-700 font-medium text-sm md:text-base">
                            <Sprout size={20} className="animate-pulse flex-shrink-0" />
                            <span>Store Enhancement in Progress</span>
                        </div>
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
                        We're currently planting new features for a fresher experience.
                        Check back shortly for the best of the season!
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-[#0f3d32] to-[#1a5c4b] text-white py-3.5 md:py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-green-900/20 transition-all transform hover:-translate-y-1 active:scale-95"
                    >
                        Notify Me When Ready
                    </button>
                </div>

                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-[#0f3d32] transition-colors p-2 hover:bg-gray-100 rounded-full z-20">
                    <X size={24} />
                </button>
            </div>
        </div>
    );
};

const Header = ({ onShopClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4 md:py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex-shrink-0 flex items-center gap-2 md:gap-3 group cursor-pointer z-50">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#8cc63f] rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                            <div className={`relative p-2 md:p-2.5 rounded-full border-2 transition-colors duration-300 ${scrolled ? 'bg-[#fcf8e3] border-[#8cc63f]' : 'bg-[#fcf8e3] border-white/50'}`}>
                                {/* INCREASED LOGO SIZE HERE */}
                                <img src="v.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className={`font-bold text-lg md:text-xl tracking-tight leading-none transition-colors duration-300 ${scrolled ? 'text-[#0f3d32]' : 'text-[#0f3d32]'}`}>Vivasayam to Villa</span>
                            <span className="text-[10px] text-[#8cc63f] font-bold tracking-widest uppercase mt-0.5">Superfresh</span>
                        </div>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        {['Home', 'How It Works', 'Stories'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className={`transition-colors font-medium text-sm tracking-wide relative group py-2 ${scrolled ? 'text-[#0f3d32] hover:text-[#8cc63f]' : 'text-[#0f3d32] hover:text-[#8cc63f]'}`}
                            >
                                {item}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8cc63f] transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                        <button
                            onClick={onShopClick}
                            className="bg-[#8cc63f] text-[#0f3d32] px-7 py-2.5 rounded-full font-bold hover:bg-[#9dd650] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#8cc63f]/30 active:scale-95 flex items-center gap-2 group overflow-hidden relative"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <ShoppingBasket size={18} className="group-hover:animate-swing" />
                                Shop Now
                            </span>
                            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </button>
                    </div>

                    <div className="md:hidden z-50">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`focus:outline-none p-2 rounded-full transition-colors active:scale-90 bg-white/50 backdrop-blur-sm ${scrolled ? 'text-[#0f3d32]' : 'text-[#0f3d32]'}`}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`fixed inset-0 bg-[#0f3d32]/30 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMenuOpen(false)}
            />

            <div className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#fcf8e3] transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) z-50 md:hidden shadow-2xl ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="absolute animate-falling-leaf opacity-20" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s`, top: '-10%' }}>
                                <Leaf size={15 + Math.random() * 10} className="text-[#8cc63f]" />
                            </div>
                        ))}
                    </div>

                    <div className="p-6 pt-24 border-b border-[#0f3d32]/10 flex justify-between items-center bg-white/50 relative z-10">
                        <span className="font-bold text-xl text-[#0f3d32]">Menu</span>
                    </div>
                    <div className="flex flex-col p-6 space-y-6 relative z-10 overflow-y-auto">
                        {['Home', 'How It Works', 'Stories'].map((item, idx) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-[#0f3d32] text-xl font-bold flex items-center justify-between group p-2 rounded-lg active:bg-white/50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                                <div className="w-8 h-8 rounded-full bg-[#8cc63f]/20 flex items-center justify-center group-hover:bg-[#8cc63f] transition-colors">
                                    <ArrowRight className="text-[#0f3d32] group-hover:text-white transition-colors" size={16} />
                                </div>
                            </a>
                        ))}
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                onShopClick();
                            }}
                            className="w-full bg-[#0f3d32] text-white px-5 py-4 rounded-2xl font-bold hover:bg-[#1a5c4b] flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all mt-4"
                        >
                            <ShoppingBasket size={22} />
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

// --- NEW CREATIVE HERO SECTION ---
const Hero = ({ onShopClick }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    // Handle Mouse Move for 3D Tilt Effect
    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25; // Division controls sensitivity
        const y = (e.clientY - top - height / 2) / 25;
        setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 }); // Reset on leave
    };

    return (
        <div
            id="home"
            className="relative bg-gradient-to-br from-[#fcf8e3] via-white to-[#f0fdf4] overflow-hidden min-h-screen flex items-center pt-24 pb-12 md:pt-20 md:pb-0 perspective-2000"
        >
            {/* Background Rotating Sunburst */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#fef3c7] to-transparent rounded-full blur-3xl opacity-40 animate-spin-slow origin-center -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            {/* Animated Blobs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#8cc63f] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#4ade80] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center flex flex-col gap-16">

                    {/* LEFT: Text Content */}
                    <div className="text-center lg:text-left z-20">
                        <RevealOnScroll direction="left">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-[#8cc63f]/40 text-[#0f3d32] text-xs md:text-sm font-bold mb-8 shadow-sm backdrop-blur-md">
                                <span className="flex h-2.5 w-2.5 relative mr-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8cc63f] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8cc63f]"></span>
                                </span>
                                Direct from Organic Farms
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={100} direction="left">
                            <h1 className="text-5xl sm:text-6xl lg:text-8xl tracking-tight font-extrabold text-[#0f3d32] leading-[1] mb-8 font-serif">
                                <span className="block mb-2">Honest Farming,</span>
                                <span className="relative inline-block">
                                    <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#8cc63f] to-[#4ade80] animate-pulse-slow">Fresh Living.</span>
                                    {/* Decorative underline/sprout */}
                                    <svg className="absolute -bottom-2 right-0 w-full h-4 text-[#8cc63f] opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                    </svg>
                                    <Leaf className="absolute -top-6 -right-6 text-[#8cc63f] animate-bounce-slow" size={32} />
                                </span>
                            </h1>
                        </RevealOnScroll>

                        <RevealOnScroll delay={200} direction="left">
                            <p className="mt-6 text-xl text-gray-600 sm:max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                We don't just deliver vegetables; we deliver the sunrise.
                                Experience the journey from <span className="text-[#8cc63f] font-bold">Soil to Soul</span> in 12 hours.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll delay={300} direction="up">
                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                                <button
                                    onClick={onShopClick}
                                    className="w-full sm:w-auto px-10 py-5 bg-[#0f3d32] text-white rounded-2xl font-bold text-lg hover:bg-[#1a5c4b] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 group flex items-center justify-center gap-3 relative overflow-hidden"
                                >
                                    <span className="relative z-10">Order Fresh Box</span>
                                    <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
                                    {/* Button Glint Effect */}
                                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                                </button>
                                <a href="#how-it-works" className="w-full sm:w-auto px-10 py-5 border-2 border-[#0f3d32]/10 text-[#0f3d32] rounded-2xl font-bold text-lg hover:bg-white hover:border-[#0f3d32] transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                                    <span>How It Works</span>
                                </a>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={400} direction="up">
                            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-80">
                                <div className="flex flex-col items-center lg:items-start">
                                    <span className="text-3xl font-bold text-[#8cc63f]">12h</span>
                                    <span className="text-xs font-bold text-[#0f3d32] uppercase tracking-wider">Harvest to Home</span>
                                </div>
                                <div className="h-8 w-px bg-[#0f3d32]/20"></div>
                                <div className="flex flex-col items-center lg:items-start">
                                    <span className="text-3xl font-bold text-[#8cc63f]">100%</span>
                                    <span className="text-xs font-bold text-[#0f3d32] uppercase tracking-wider">Chemical Free</span>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* RIGHT: Interactive Ecosystem Visual */}
                    <div
                        className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center perspective-1000"
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* 3D Container */}
                        <div
                            className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] transition-transform duration-100 ease-out"
                            style={{ transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)` }}
                        >
                            {/* Orbit Rings */}
                            <div className="absolute inset-0 border border-dashed border-[#8cc63f]/30 rounded-full animate-spin-slow" style={{ transform: 'rotateX(60deg)' }}></div>
                            <div className="absolute inset-10 border border-[#0f3d32]/10 rounded-full animate-spin-reverse-slow"></div>

                            {/* Orbiting Elements (The Ecosystem) */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 animate-orbit-1 z-20">
                                <div className="bg-white p-3 rounded-xl shadow-lg transform hover:scale-110 transition-transform">
                                    <Sun className="text-yellow-400" size={28} />
                                </div>
                            </div>
                            <div className="absolute bottom-10 right-0 animate-orbit-2 z-0">
                                <div className="bg-white p-3 rounded-xl shadow-lg transform hover:scale-110 transition-transform">
                                    <CloudRain className="text-blue-400" size={28} />
                                </div>
                            </div>
                            <div className="absolute top-1/2 -left-4 animate-orbit-3 z-20">
                                <div className="bg-white p-3 rounded-xl shadow-lg transform hover:scale-110 transition-transform">
                                    <Truck className="text-[#0f3d32]" size={28} />
                                </div>
                            </div>

                            {/* Main Floating Card */}
                            <div className="absolute inset-0 flex items-center justify-center transform translate-z-20">
                                <div className="relative bg-white/90 backdrop-blur-xl p-8 sm:p-12 rounded-[2.5rem] shadow-[0_30px_60px_rgba(15,61,50,0.2)] border border-white flex flex-col items-center justify-center text-center group cursor-default">

                                    {/* Badge */}
                                    <div className="absolute -top-6 -right-6 bg-[#8cc63f] text-[#0f3d32] w-20 h-20 rounded-full flex flex-col items-center justify-center font-bold text-xs shadow-xl border-4 border-white animate-bounce-slow z-30">
                                        <span className="text-lg">Fresh</span>
                                        <span>DAILY</span>
                                    </div>

                                    {/* Icon */}
                                    <div className="bg-gradient-to-br from-[#fcf8e3] to-[#e6f4d0] p-6 rounded-[2rem] mb-6 shadow-inner transform group-hover:scale-110 transition-transform duration-500">
                                        <ShoppingBasket size={64} className="text-[#0f3d32]" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-[#0f3d32] mb-2 font-serif">Today's Harvest</h3>
                                    <div className="flex gap-2 justify-center mb-4">
                                        <Star size={16} className="text-yellow-400 fill-current" />
                                        <Star size={16} className="text-yellow-400 fill-current" />
                                        <Star size={16} className="text-yellow-400 fill-current" />
                                        <Star size={16} className="text-yellow-400 fill-current" />
                                        <Star size={16} className="text-yellow-400 fill-current" />
                                    </div>
                                    <div className="text-sm font-medium text-gray-500 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                                        Spinach • Carrots • Okra
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-[#0f3d32]/30 hidden md:block">
                <ChevronDown size={32} />
            </div>
        </div>
    );
};

const StatsSection = () => (
    <div className="bg-gradient-to-r from-[#0f3d32] to-[#1a5c4b] py-12 md:py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-dots"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:divide-x divide-white/10">
                {[
                    { label: "Families Served", value: "500+" },
                    { label: "Partner Farmers", value: "50+" },
                    { label: "Daily Harvests", value: "100%" },
                    { label: "Villages Supported", value: "12" },
                ].map((stat, idx) => (
                    <RevealOnScroll key={idx} delay={idx * 100}>
                        <div className="p-2 md:p-4 group cursor-default">
                            <div className="text-3xl md:text-5xl font-bold text-[#8cc63f] mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                            <div className="text-green-100/80 text-xs md:text-sm font-bold uppercase tracking-widest">{stat.label}</div>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </div>
    </div>
);

const FeatureCard = ({ icon: Icon, title, description, color }) => (
    <div
        className="bg-white p-6 md:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group hover:-translate-y-2 h-full relative overflow-hidden"
    >
        <div className={`absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-${color}-50 rounded-bl-[80px] md:rounded-bl-[100px] -mr-6 -mt-6 opacity-50 group-hover:scale-150 transition-transform duration-700 ease-out`}></div>

        <div className="relative z-10">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#fcf8e3] rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-[#0f3d32] group-hover:rotate-12 transition-transform duration-500 shadow-sm">
                <Icon size={32} className="text-[#0f3d32] md:w-10 md:h-10" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#0f3d32] mb-3 md:mb-4 font-serif">{title}</h3>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">{description}</p>
        </div>
    </div>
);

const Features = () => {
    return (
        <div id="stories" className="py-16 md:py-24 bg-white relative overflow-hidden">
            {/* Background Decorative */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#8cc63f]/20 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
                    <RevealOnScroll>
                        <h2 className="text-xs md:text-sm text-[#8cc63f] font-bold tracking-[0.2em] uppercase mb-3 md:mb-4">Our Core Values</h2>
                        <p className="text-3xl md:text-5xl font-bold text-[#0f3d32] font-serif">
                            Why Your Neighbors Trust Us
                        </p>
                    </RevealOnScroll>
                </div>

                <div className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-3">
                    <RevealOnScroll delay={0}>
                        <FeatureCard
                            icon={Truck}
                            title="Hyper-Local Delivery"
                            description="Harvested at 6 AM, delivered by 6 PM. We strictly serve gated communities within 20km."
                            color="green"
                        />
                    </RevealOnScroll>
                    <RevealOnScroll delay={150}>
                        <FeatureCard
                            icon={Leaf}
                            title="Zero-Chemical"
                            description="We practice traditional 'Iyarkai Vivasayam' (Natural Farming). No chemicals, just nature."
                            color="yellow"
                        />
                    </RevealOnScroll>
                    <RevealOnScroll delay={300}>
                        <FeatureCard
                            icon={Users}
                            title="Farmer First"
                            description="No middlemen. Your purchase directly supports the farmer's family with fair pricing."
                            color="blue"
                        />
                    </RevealOnScroll>
                </div>
            </div>
        </div>
    );
};

const HowItWorks = ({ onShopClick }) => {
    const steps = [
        { title: "You Order", desc: "Select your veggie box on our app before 8 PM.", icon: <Calendar size={32} /> },
        { title: "We Harvest", desc: "Farmers harvest exactly what is needed at dawn.", icon: <Sprout size={32} /> },
        { title: "We Deliver", desc: "Fresh produce reaches your villa by evening.", icon: <Truck size={32} /> },
    ];

    return (
        <div id="how-it-works" className="py-16 md:py-24 bg-gradient-to-b from-[#fcf8e3] to-[#e6f4d0] relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-20">
                    <RevealOnScroll>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0f3d32] font-serif mb-3 md:mb-4">From Soil to Salad</h2>
                        <p className="text-[#5a7c74] font-medium text-lg md:text-xl">A transparent journey you can trust.</p>
                    </RevealOnScroll>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-[#0f3d32]/10 border-t-2 border-dashed border-[#0f3d32]/20 z-0"></div>

                    {steps.map((step, index) => (
                        <RevealOnScroll key={index} delay={index * 200}>
                            <div className="relative z-10 flex flex-col items-center text-center group cursor-pointer">
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-white border-4 border-[#8cc63f] rounded-full flex items-center justify-center text-[#0f3d32] mb-6 md:mb-8 shadow-xl group-hover:scale-110 group-hover:bg-[#8cc63f] group-hover:text-white transition-all duration-300 transform group-hover:-rotate-12">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-[#0f3d32] mb-3 md:mb-4">{step.title}</h3>
                                <p className="text-[#4a6b63] max-w-xs mx-auto text-base md:text-lg leading-relaxed">{step.desc}</p>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>

                <div className="mt-16 md:mt-20 text-center">
                    <RevealOnScroll delay={600}>
                        <button
                            onClick={onShopClick}
                            className="inline-flex items-center justify-center px-10 py-4 md:px-12 md:py-5 border border-transparent text-lg font-bold rounded-full text-white bg-[#0f3d32] hover:bg-[#1a5c4b] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                        >
                            Start Your Order
                        </button>
                    </RevealOnScroll>
                </div>
            </div>
        </div>
    );
};

const Testimonials = () => (
    <div className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
                <RevealOnScroll>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0f3d32] font-serif">Community Stories</h2>
                    <p className="mt-3 md:mt-4 text-gray-500 text-lg">See what your neighbors are cooking.</p>
                </RevealOnScroll>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                    { name: "Lakshmi R.", loc: "Casagrand, OMR", text: "Finally, spinach that tastes like spinach! The difference between supermarket veggies and Vivasayam to Villa is night and day." },
                    { name: "Rahul K.", loc: "Prestige, ECR", text: "I love knowing that my purchase directly helps a farmer. The weekly subscription box is a lifesaver for my busy family." },
                    { name: "Priya S.", loc: "Hiranandani", text: "The quality is consistently amazing. No plastic packaging and delivered fresh right to my door. Highly recommended!" }
                ].map((item, idx) => (
                    <RevealOnScroll key={idx} delay={idx * 150} direction="up">
                        <div className="bg-gray-50 p-6 md:p-8 rounded-[2rem] hover:bg-[#fcf8e3] transition-colors duration-500 group h-full flex flex-col justify-between">
                            <div>
                                <div className="flex gap-1 text-yellow-400 mb-4 md:mb-6">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" className="group-hover:animate-pulse" />)}
                                </div>
                                <p className="text-[#4a6b63] italic mb-6 md:mb-8 text-base md:text-lg leading-relaxed">"{item.text}"</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#0f3d32] to-[#1a5c4b] rounded-full flex items-center justify-center text-[#8cc63f] font-bold text-lg md:text-xl shadow-lg">
                                    {item.name[0]}
                                </div>
                                <div>
                                    <div className="font-bold text-[#0f3d32] text-base md:text-lg">{item.name}</div>
                                    <div className="text-xs md:text-sm text-[#8cc63f] font-medium">{item.loc}</div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </div>
    </div>
);

const CTA = ({ onShopClick }) => {
    return (
        <div className="bg-[#fcf8e3] py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <RevealOnScroll>
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-md">
                        <Leaf className="text-[#8cc63f]" size={32} />
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0f3d32] mb-6 md:mb-8 font-serif leading-tight">
                        Ready to taste <span className="italic text-[#8cc63f]">real</span> vegetables?
                    </h2>
                    <p className="text-lg md:text-xl text-[#4a6b63] mb-8 md:mb-12 max-w-2xl mx-auto">
                        Join 500+ families in OMR and ECR who have switched to Vivasayam to Villa Superfresh.
                    </p>
                    <button
                        onClick={onShopClick}
                        className="w-full sm:w-auto bg-[#0f3d32] text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-lg md:text-xl hover:bg-[#1a5c4b] shadow-2xl hover:shadow-[#0f3d32]/30 transform transition-all hover:-translate-y-1 active:scale-95"
                    >
                        Check My Location
                    </button>
                </RevealOnScroll>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="bg-[#0f3d32] text-white pt-16 md:pt-24 pb-10 relative overflow-hidden">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 md:mb-16">
                    <div className="col-span-1 md:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#fcf8e3] p-2 rounded-lg">
                                {/* REPLACED LEAF ICON WITH LOGO IMAGE */}
                                <img src="v.png" alt="Logo" className="w-8 h-8 object-contain" />
                            </div>
                            <span className="font-bold text-xl md:text-2xl tracking-tight">Vivasayam to Villa</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            Bridging the gap between rural soil and urban soul. We deliver freshness, not just vegetables.
                        </p>
                        <div className="flex space-x-4">
                            {['F', 'I', 'X'].map((social, i) => (
                                <div key={i} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#8cc63f] hover:text-[#0f3d32] transition-all cursor-pointer transform hover:scale-110">
                                    {social}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6 md:mb-8 text-[#8cc63f]">Quick Links</h3>
                        <ul className="space-y-4 text-gray-300">
                            <li><a href="#" className="hover:text-[#8cc63f] hover:translate-x-2 inline-block transition-transform">Our Story</a></li>
                            <li><a href="#" className="hover:text-[#8cc63f] hover:translate-x-2 inline-block transition-transform">Farmer Profiles</a></li>
                            <li><a href="#" className="hover:text-[#8cc63f] hover:translate-x-2 inline-block transition-transform">Delivery Areas</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6 md:mb-8 text-[#8cc63f]">Contact Us</h3>
                        <ul className="space-y-6 text-gray-300">
                            <li className="flex items-center gap-4 group cursor-pointer">
                                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#8cc63f] group-hover:text-[#0f3d32] transition-colors">
                                    <Phone size={20} />
                                </div>
                                <span className="group-hover:text-white transition-colors text-sm md:text-base">+91 95859 97065</span>
                            </li>
                            <li className="flex items-center gap-4 group cursor-pointer">
                                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#8cc63f] group-hover:text-[#0f3d32] transition-colors">
                                    <Mail size={20} />
                                </div>
                                <span className="group-hover:text-white transition-colors text-sm md:text-base break-all">contact@vivasayamtovilla.com</span>
                            </li>
                            <li className="flex items-center gap-4 group cursor-pointer">
                                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#8cc63f] group-hover:text-[#0f3d32] transition-colors">
                                    <MapPin size={20} />
                                </div>
                                <span className="group-hover:text-white transition-colors text-sm md:text-base">Chennai, Tamil Nadu</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6 md:mb-8 text-[#8cc63f]">Join the Community</h3>
                        <p className="text-gray-400 text-sm mb-6">Get notified about the next harvest.</p>
                        <div className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8cc63f] focus:bg-white/10 transition-colors"
                            />
                            <button className="bg-[#8cc63f] text-[#0f3d32] px-6 py-4 rounded-2xl font-bold hover:bg-white hover:shadow-lg transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-4">
                    <p className="text-center md:text-left">&copy; 2024 Vivasayam to Villa Superfresh. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-[#8cc63f] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#8cc63f] transition-colors">Terms of Service</a>
                    </div>
                    <div className="flex items-center gap-1">
                        <span>Developed by</span>
                        <a href="https://darkpixels.in" target="_blank" rel="noopener noreferrer" className="font-bold text-[#8cc63f] hover:text-white transition-colors">Dark Pixels</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const App = () => {
    const [isMaintenanceOpen, setIsMaintenanceOpen] = useState(false);

    // New Effect for Title and Favicon
    useEffect(() => {
        // Set Title
        document.title = "Vivasayam to Villa Superfresh";

        // Set Favicon
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = 'v.png';
    }, []);

    const openMaintenance = () => setIsMaintenanceOpen(true);
    const closeMaintenance = () => setIsMaintenanceOpen(false);

    return (
        <div className="font-sans antialiased text-gray-900 bg-white scroll-smooth selection:bg-[#8cc63f] selection:text-[#0f3d32]">
            <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(5deg); }
          80% { transform: rotate(-5deg); }
        }
        .group-hover\\:animate-swing:hover { animation: swing 1s ease-in-out; }

        @keyframes falling-leaf {
            0% { transform: translate(0, -10%) rotate(0deg) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translate(0, 100vh) rotate(360deg) translateX(-50px); opacity: 0; }
        }
        .animate-falling-leaf { animation-name: falling-leaf; animation-timing-function: linear; animation-iteration-count: infinite; }
        
        .perspective-1000 { perspective: 1000px; }
        .perspective-2000 { perspective: 2000px; }
        
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 40s linear infinite; }

        @keyframes spin-reverse-slow { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .animate-spin-reverse-slow { animation: spin-reverse-slow 30s linear infinite; }

        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
        
        @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
        .animate-pulse-slow { animation: pulse-slow 4s infinite ease-in-out; }

        @keyframes orbit-1 { 0% { transform: translateX(0) translateY(0) scale(1); z-index: 20; } 25% { transform: translateX(120px) translateY(40px) scale(0.8); z-index: 0; } 50% { transform: translateX(0) translateY(80px) scale(1); z-index: 20; } 75% { transform: translateX(-120px) translateY(40px) scale(1.2); z-index: 40; } 100% { transform: translateX(0) translateY(0) scale(1); z-index: 20; } }
        .animate-orbit-1 { animation: orbit-1 12s infinite linear; }

        @keyframes orbit-2 { 0% { transform: translateX(0) translateY(0) scale(1); z-index: 20; } 25% { transform: translateX(-100px) translateY(-50px) scale(1.2); z-index: 40; } 50% { transform: translateX(0) translateY(-100px) scale(1); z-index: 20; } 75% { transform: translateX(100px) translateY(-50px) scale(0.8); z-index: 0; } 100% { transform: translateX(0) translateY(0) scale(1); z-index: 20; } }
        .animate-orbit-2 { animation: orbit-2 15s infinite linear; }
        
        @keyframes orbit-3 { 0% { transform: translateX(0) translateY(0) scale(1); z-index: 20; } 50% { transform: translateX(150px) translateY(50px) scale(0.8); z-index: 0; } 100% { transform: translateX(0) translateY(0) scale(1); z-index: 20; } }
        .animate-orbit-3 { animation: orbit-3 18s infinite linear; }
      `}</style>

            {/* GLOBAL Falling Leaves - Covers entire App */}
            <FallingLeaves count={20} />

            <MaintenanceModal isOpen={isMaintenanceOpen} onClose={closeMaintenance} />

            <Header onShopClick={openMaintenance} />
            <Hero onShopClick={openMaintenance} />
            <StatsSection />
            <Features />
            <HowItWorks onShopClick={openMaintenance} />
            <Testimonials />
            <CTA onShopClick={openMaintenance} />
            <Footer />
        </div>
    );
};

export default App;