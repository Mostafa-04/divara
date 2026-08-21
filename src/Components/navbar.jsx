import React, { useState, useEffect } from "react";
import {
    Search,
    ShoppingBag,
    UserRound,
    Menu,
    X,
    ChevronDown,
    Sparkles,
    Heart,
    ArrowRight,
} from "lucide-react";
import useCart from "./useCart";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [collectionOpen, setCollectionOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { cartCount } = useCart();
    const location = useLocation();

    // Effet de défilement pour le navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setCollectionOpen(false);
    };

    // Vérifier si un lien est actif
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header 
            className={`
                fixed top-0 z-50 w-full transition-all duration-500
                ${scrolled 
                    ? "bg-[#FCF8F1]/95 backdrop-blur-xl shadow-lg shadow-[#211B16]/5 border-b border-[#B58A3A]/10" 
                    : "bg-[#F7F0E4] border-b border-[#B58A3A]/15"
                }
            `}
        >

            {/* =====================================================
                ANNOUNCEMENT BAR
            ====================================================== */}
            <div className={`
                relative overflow-hidden bg-gradient-to-r from-[#211B16] via-[#2A221C] to-[#211B16] px-4 py-2.5 text-center transition-all duration-500
                ${scrolled ? "opacity-0 h-0 py-0 overflow-hidden" : "opacity-100 h-auto"}
            `}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#B58A3A]/5 via-[#B58A3A]/10 to-[#B58A3A]/5 animate-pulse" />
                <div className="relative flex items-center justify-center gap-3">
                    <Sparkles size={10} className="text-[#B58A3A] animate-pulse" />
                    <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#F7F0E4] sm:text-[9px]">
                        Livraison gratuite à partir de <span className="text-[#B58A3A] font-bold">300 DH</span>
                    </p>
                    <Sparkles size={10} className="text-[#B58A3A] animate-pulse delay-500" />
                </div>
            </div>

            {/* =====================================================
                MAIN NAVBAR
            ====================================================== */}
            <nav className={`
                transition-all duration-500
                ${scrolled ? "py-1" : "py-0"}
            `}>
                <div className="mx-auto flex h-[68px] max-w-7xl items-center px-4 sm:h-[76px] sm:px-8 lg:px-12">

                    {/* =================================================
                        LOGO - À GAUCHE
                    ================================================= */}
                    <Link
                        to="/"
                        className="flex-shrink-0 transition-all duration-300 hover:scale-105"
                    >
                        <div className="flex flex-col">
                            {/* Ornement avec sparkles */}
                            <div className="mb-0.5 flex items-center gap-1.5">
                                <span className="h-px w-3 bg-[#B58A3A]/40" />
                                <Sparkles size={6} className="text-[#B58A3A]" />
                                <span className="h-px w-3 bg-[#B58A3A]/40" />
                            </div>

                            {/* Brand */}
                            <span className="font-serif text-[26px] font-light leading-none tracking-[-0.04em] text-[#211B16] sm:text-[30px]">
                                Divara
                            </span>

                            {/* Subtitle */}
                            <div className="mt-0.5 flex items-center gap-1.5">
                                <span className="h-px w-2 bg-[#B58A3A]/20" />
                                <span className="text-[6px] font-semibold uppercase tracking-[0.4em] text-[#8C6A32]">
                                    Parfums
                                </span>
                                <span className="h-px w-2 bg-[#B58A3A]/20" />
                            </div>
                        </div>
                    </Link>

                    {/* =================================================
                        MOBILE MENU BUTTON
                    ================================================= */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        className={`
                            ml-auto flex h-10 w-10 items-center justify-center rounded-full
                            transition-all duration-300
                            hover:bg-[#B58A3A]/10
                            lg:hidden
                            ${mobileMenuOpen ? "bg-[#B58A3A]/10" : ""}
                        `}
                        aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {mobileMenuOpen ? (
                            <X size={20} strokeWidth={1.5} className="text-[#B58A3A]" />
                        ) : (
                            <Menu size={20} strokeWidth={1.5} className="text-[#211B16]" />
                        )}
                    </button>

                    {/* =================================================
                        DESKTOP NAVIGATION - AU CENTRE
                    ================================================= */}
                    <div className="hidden flex-1 lg:flex lg:justify-center">
                        <div className="flex items-center gap-1 xl:gap-2">

                            {/* Accueil */}
                            <Link
                                to="/"
                                className={`
                                    group relative px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] transition-all duration-300
                                    ${isActive('/') 
                                        ? "text-[#B58A3A]" 
                                        : "text-[#211B16] hover:text-[#B58A3A]"
                                    }
                                `}
                            >
                                Accueil
                                <span className={`
                                    absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[#B58A3A] transition-all duration-300 group-hover:w-8
                                    ${isActive('/') ? "w-8" : "w-0"}
                                `} />
                            </Link>

                            {/* =================================================
                                COLLECTION DROPDOWN
                            ================================================= */}
                            <div 
                                className="group relative"
                                onMouseEnter={() => setCollectionOpen(true)}
                                onMouseLeave={() => setCollectionOpen(false)}
                            >
                                <button
                                    type="button"
                                    onClick={() => setCollectionOpen((prev) => !prev)}
                                    className={`
                                        flex items-center gap-1.5 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] transition-all duration-300
                                        ${collectionOpen || isActive('/shop') ? "text-[#B58A3A]" : "text-[#211B16] hover:text-[#B58A3A]"}
                                    `}
                                    aria-expanded={collectionOpen}
                                >
                                    Collection
                                    <ChevronDown
                                        size={11}
                                        strokeWidth={1.5}
                                        className={`
                                            transition-transform duration-300
                                            ${collectionOpen ? "rotate-180" : "group-hover:rotate-180"}
                                        `}
                                    />
                                </button>

                                {/* Dropdown */}
                                <div
                                    className={`
                                        absolute left-1/2 -translate-x-1/2 top-full w-64
                                        border border-[#B58A3A]/10
                                        bg-[#FCF8F1]/95 backdrop-blur-lg
                                        rounded-xl
                                        p-2
                                        shadow-2xl shadow-[#211B16]/10
                                        transition-all duration-300
                                        ${collectionOpen
                                            ? "visible translate-y-2 opacity-100"
                                            : "invisible translate-y-0 opacity-0"
                                        }
                                        group-hover:visible
                                        group-hover:translate-y-2
                                        group-hover:opacity-100
                                    `}
                                >
                                    {/* En-tête du dropdown */}
                                    <div className="px-4 pb-3 pt-4">
                                        <p className="font-serif text-sm italic text-[#8C6A32] flex items-center justify-center gap-2">
                                            <span className="h-px w-4 bg-[#B58A3A]/30" />
                                            Nos fragrances
                                            <span className="h-px w-4 bg-[#B58A3A]/30" />
                                        </p>
                                    </div>

                                    <div className="space-y-0.5">
                                        {[
                                            { path: "/shop", label: "Tous les parfums", icon: "✦" },
                                            { path: "/shop/femme", label: "Femme", icon: "♀" },
                                            { path: "/shop/homme", label: "Homme", icon: "♂" },
                                        ].map((item) => (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                onClick={closeMobileMenu}
                                                className={`
                                                    flex items-center justify-between px-4 py-3
                                                    text-[9px] uppercase tracking-[0.15em]
                                                    rounded-lg
                                                    transition-all duration-200
                                                    hover:bg-[#B58A3A]/10 hover:pl-5 hover:text-[#B58A3A]
                                                    ${isActive(item.path) ? "bg-[#B58A3A]/5 text-[#B58A3A]" : "text-[#211B16]"}
                                                `}
                                            >
                                                <span className="flex items-center gap-3">
                                                    <span className="text-[#B58A3A]">{item.icon}</span>
                                                    {item.label}
                                                </span>
                                                <ArrowRight size={12} strokeWidth={1.5} className="text-[#B58A3A] opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="my-2 mx-4 h-px bg-gradient-to-r from-transparent via-[#B58A3A]/20 to-transparent" />

                                    {/* Best Sellers */}
                                    <Link
                                        to="/shop?filter=bestsellers"
                                        onClick={closeMobileMenu}
                                        className="flex items-center justify-between px-4 py-3 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#8C6A32] rounded-lg transition-all duration-200 hover:bg-[#B58A3A]/10 hover:text-[#B58A3A]"
                                    >
                                        <span className="flex items-center gap-2">
                                            <Heart size={12} strokeWidth={1.5} />
                                            Best Sellers
                                        </span>
                                        <span className="text-[#B58A3A]">→</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Notre histoire */}
                            <Link
                                to="#about"
                                className={`
                                    group relative px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] transition-all duration-300
                                    ${isActive('/about') 
                                        ? "text-[#B58A3A]" 
                                        : "text-[#211B16] hover:text-[#B58A3A]"
                                    }
                                `}
                            >
                                Notre histoire
                                <span className={`
                                    absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[#B58A3A] transition-all duration-300 group-hover:w-8
                                    ${isActive('/about') ? "w-8" : "w-0"}
                                `} />
                            </Link>

                        </div>
                    </div>

                    {/* =================================================
                        RIGHT ACTIONS
                    ================================================= */}
                    <div className="ml-auto flex items-center gap-1">


                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-[#B58A3A]/10 hover:text-[#B58A3A]"
                            aria-label="Panier"
                        >
                            <ShoppingBag
                                size={18}
                                strokeWidth={1.3}
                                className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                            />
                            {cartCount > 0 && (
                                <span className="
                                    absolute -right-0.5 -top-0.5
                                    flex h-[18px] min-w-[18px]
                                    items-center justify-center
                                    rounded-full
                                    bg-gradient-to-br from-[#B58A3A] to-[#D4A84B]
                                    px-1
                                    text-[7px] font-bold
                                    text-white
                                    shadow-lg shadow-[#B58A3A]/30
                                    animate-pulse
                                ">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                    </div>
                </div>
            </nav>

            {/* =====================================================
                MOBILE MENU
            ====================================================== */}
            <div
                id="mobile-menu"
                className={`
                    overflow-hidden border-b border-[#B58A3A]/10
                    bg-[#FCF8F1]/95 backdrop-blur-lg
                    transition-all duration-500 ease-in-out
                    lg:hidden
                    ${mobileMenuOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}
                `}
            >
                <div className="px-5 py-6 sm:px-8">
                    {/* Navigation avec numéros élégants */}
                    <div className="space-y-1">
                        {[
                            { path: "/", label: "Accueil", number: "01" },
                            { path: "/shop", label: "Collection", number: "02", hasSubmenu: true },
                            { path: "#about", label: "Notre histoire", number: "03" },
                        ].map((item) => (
                            <div key={item.path}>
                                {item.hasSubmenu ? (
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => setCollectionOpen((prev) => !prev)}
                                            className="flex w-full items-center justify-between py-4 border-b border-[#B58A3A]/10"
                                        >
                                            <span className="text-[10px] font-medium uppercase tracking-[0.2em] flex items-center gap-3">
                                                <span className="text-[#B58A3A] text-[8px] font-bold">{item.number}</span>
                                                {item.label}
                                            </span>
                                            <ChevronDown
                                                size={14}
                                                strokeWidth={1.5}
                                                className={`text-[#B58A3A] transition-transform duration-300 ${collectionOpen ? "rotate-180" : ""}`}
                                            />
                                        </button>
                                        <div className={`
                                            overflow-hidden transition-all duration-300 pl-6
                                            ${collectionOpen ? "max-h-60 pb-2 opacity-100" : "max-h-0 opacity-0"}
                                        `}>
                                            <Link
                                                to="/shop"
                                                onClick={closeMobileMenu}
                                                className="block py-2.5 font-serif text-base italic text-[#6F6257] hover:text-[#B58A3A] transition-colors border-b border-[#B58A3A]/5"
                                            >
                                                Tous les parfums
                                            </Link>
                                            <Link
                                                to="/shop/femme"
                                                onClick={closeMobileMenu}
                                                className="block py-2.5 font-serif text-base italic text-[#6F6257] hover:text-[#B58A3A] transition-colors border-b border-[#B58A3A]/5"
                                            >
                                                Femme
                                            </Link>
                                            <Link
                                                to="/shop/homme"
                                                onClick={closeMobileMenu}
                                                className="block py-2.5 font-serif text-base italic text-[#6F6257] hover:text-[#B58A3A] transition-colors border-b border-[#B58A3A]/5"
                                            >
                                                Homme
                                            </Link>
                                            <Link
                                                to="/shop?filter=bestsellers"
                                                onClick={closeMobileMenu}
                                                className="block py-2.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8C6A32] hover:text-[#B58A3A] transition-colors"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <Heart size={12} strokeWidth={1.5} />
                                                    Best Sellers
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={item.path}
                                        onClick={closeMobileMenu}
                                        className="flex items-center justify-between py-4 border-b border-[#B58A3A]/10"
                                    >
                                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] flex items-center gap-3">
                                            <span className="text-[#B58A3A] text-[8px] font-bold">{item.number}</span>
                                            {item.label}
                                        </span>
                                        <ArrowRight size={12} strokeWidth={1.5} className="text-[#B58A3A]" />
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* =================================================
                        MOBILE ACTIONS
                    ================================================= */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#B58A3A]/10">
                        <Link
                            to="/account"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-2 rounded-full bg-[#F7F0E4] px-4 py-2 text-[9px] uppercase tracking-[0.15em] text-[#6F6257] transition-all duration-300 hover:bg-[#B58A3A] hover:text-white"
                        >
                            <UserRound size={14} strokeWidth={1.3} />
                            Mon compte
                        </Link>

                        <Link
                            to="/shop?filter=bestsellers"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8C6A32] hover:text-[#B58A3A] transition-colors"
                        >
                            <Heart size={12} strokeWidth={1.5} />
                            Best Sellers →
                        </Link>
                    </div>

                    {/* Contact rapide */}
                    <div className="mt-4 flex items-center justify-center gap-4 text-[8px] text-[#8F8175]">
                        <span>✦</span>
                        <span>contact@divara.ma</span>
                        <span>✦</span>
                        <span>+212 5XX XX XX XX</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .animate-pulse {
                    animation: pulse 2s ease-in-out infinite;
                }
                .delay-500 {
                    animation-delay: 500ms;
                }
            `}</style>
        </header>
    );
}