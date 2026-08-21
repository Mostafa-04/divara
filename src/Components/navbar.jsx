import React, { useState } from "react";
import {
    Search,
    ShoppingBag,
    UserRound,
    Menu,
    X,
    ChevronDown,
} from "lucide-react";
import useCart from "./useCart";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [collectionOpen, setCollectionOpen] = useState(false);
    const { cartCount } = useCart();

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className="relative z-50 w-full bg-[#F7F0E4] text-[#211B16]">

            {/* =====================================================
                ANNOUNCEMENT BAR
            ====================================================== */}
            <div className="bg-[#211B16] px-4 py-2 text-center">
                <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-[#F7F0E4] sm:text-[9px]">
                    Livraison gratuite à partir de 200 DH
                </p>
            </div>

            {/* =====================================================
                MAIN NAVBAR
            ====================================================== */}
            <nav className="border-b border-[#B58A3A]/20">

                <div className="mx-auto flex h-[76px] max-w-7xl items-center px-4 sm:h-[84px] sm:px-8 lg:px-12">

                    {/* =================================================
                        MOBILE MENU BUTTON
                    ================================================= */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        className="flex h-10 w-10 items-center justify-center text-[#211B16] transition-colors duration-300 hover:text-[#B58A3A] lg:hidden"
                        aria-label={
                            mobileMenuOpen
                                ? "Fermer le menu"
                                : "Ouvrir le menu"
                        }
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {mobileMenuOpen ? (
                            <X
                                size={22}
                                strokeWidth={1.3}
                            />
                        ) : (
                            <Menu
                                size={22}
                                strokeWidth={1.3}
                            />
                        )}
                    </button>

                    {/* =================================================
                        DESKTOP LEFT NAVIGATION
                    ================================================= */}

                                        {/* =================================================
                        CENTER LOGO
                    ================================================= */}
                    <Link
                        to="/"
                        className="
                            absolute left-1/2
                            -translate-x-1/2
                           
                            lg:relative lg:left-auto lg:flex-1 lg:translate-x-0
                        "
                    >

                        <div className="flex flex-col">

                            {/* Ornament */}
                            <div className="mb-1 flex  gap-1.5">

                                <span className="h-px w-4 bg-[#B58A3A]/60 sm:w-6" />

                                <span className="text-[7px] text-[#B58A3A]">
                                    ✦
                                </span>

                                <span className="h-px w-4 bg-[#B58A3A]/60 sm:w-6" />

                            </div>

                            {/* Brand */}
                            <span className="font-serif text-[27px] font-medium leading-none tracking-[-0.04em] text-[#211B16] sm:text-[32px]">
                                Divara
                            </span>

                            {/* Subtitle */}
                            <span className="mt-1 text-[6px] font-semibold uppercase tracking-[0.5em] text-[#8C6A32] sm:text-[7px]">
                                Parfums
                            </span>

                        </div>

                   </Link>
                    <div className="hidden flex-1 lg:block">

                        <div className="flex items-center text-center gap-3 xl:gap-9">

                            {/* Accueil */}
                            <Link
                                to="/"
                                className="group relative py-3 text-[9px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[#B58A3A]"
                            >
                                Accueil

                                <span className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#B58A3A] transition-transform duration-300" />
                           </Link>

                            {/* =================================================
                                COLLECTION DROPDOWN
                            ================================================= */}
                            <div className="group relative">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setCollectionOpen((prev) => !prev)
                                    }
                                    className="flex items-center gap-1.5 py-3 text-[9px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[#B58A3A]"
                                    aria-expanded={collectionOpen}
                                >
                                    Collection

                                    <ChevronDown
                                        size={11}
                                        strokeWidth={1.4}
                                        className={`transition-transform duration-300 ${
                                            collectionOpen
                                                ? "rotate-180"
                                                : "group-hover:rotate-180"
                                        }`}
                                    />
                                </button>

                                {/* Dropdown */}
                                <div
                                    className={`
                                        absolute left-0 top-full w-60
                                        border border-[#B58A3A]/15
                                        bg-[#FCF8F1]
                                        p-2
                                        shadow-xl shadow-[#211B16]/10
                                        transition-all duration-300
                                        ${
                                            collectionOpen
                                                ? "visible translate-y-0 opacity-100"
                                                : "invisible translate-y-2 opacity-0"
                                        }
                                        group-hover:visible
                                        group-hover:translate-y-0
                                        group-hover:opacity-100
                                    `}
                                >

                                    <div className="px-4 pb-2 pt-3">

                                        <p className="font-serif text-sm italic text-[#8C6A32]">
                                            Nos fragrances
                                        </p>

                                        <div className="mt-2 h-px bg-[#B58A3A]/10" />

                                    </div>

                                    <Link
                                        to="/shop"
                                        className="flex items-center justify-between px-4 py-3 text-[9px] uppercase tracking-[0.15em] transition-all duration-200 hover:bg-[#F7F0E4] hover:pl-5 hover:text-[#B58A3A]"
                                    >
                                        Tous les parfums

                                        <span className="text-[#B58A3A]">
                                            →
                                        </span>
                                   </Link>

                                    <Link
                                        to="/shop/femme"
                                        className="flex items-center justify-between px-4 py-3 text-[9px] uppercase tracking-[0.15em] transition-all duration-200 hover:bg-[#F7F0E4] hover:pl-5 hover:text-[#B58A3A]"
                                    >
                                        Femme

                                        <span className="text-[#B58A3A]">
                                            →
                                        </span>
                                   </Link>

                                    <Link
                                        to="/shop/homme"
                                        className="flex items-center justify-between px-4 py-3 text-[9px] uppercase tracking-[0.15em] transition-all duration-200 hover:bg-[#F7F0E4] hover:pl-5 hover:text-[#B58A3A]"
                                    >
                                        Homme

                                        <span className="text-[#B58A3A]">
                                            →
                                        </span>
                                   </Link>

                                    <div className="my-1 h-px bg-[#B58A3A]/10" />


                                </div>
                            </div>

                            {/* Notre histoire */}
                            <Link
                                to="/about"
                                className="py-3 text-[9px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[#B58A3A]"
                            >
                                Notre histoire
                           </Link>

                            {/* Contact */}
                            <Link
                                to="/contact"
                                className="py-3 text-[9px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[#B58A3A]"
                            >
                                Contact
                           </Link>

                        </div>
                    </div>


                    {/* =================================================
                        RIGHT ACTIONS
                    ================================================= */}
                    <div className="ml-auto flex items-center gap-0.5 sm:gap-1">

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="group relative flex h-10 w-10 items-center justify-center transition-colors duration-300 hover:text-[#B58A3A]"
                            aria-label="Panier"
                        >
                            <ShoppingBag
                                size={18}
                                strokeWidth={1.3}
                                className="transition-transform duration-300 group-hover:scale-110"
                            />

                                {cartCount > 0 && (
                                    <span className="
                                        absolute
                                        right-0.5
                                        top-0.5
                                        flex
                                        h-[16px]
                                        min-w-[16px]
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#B58A3A]
                                        px-1
                                        text-[8px]
                                        font-semibold
                                        text-white
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
                    overflow-hidden border-b border-[#B58A3A]/20
                    bg-[#FCF8F1]
                    transition-all duration-500 ease-in-out
                    lg:hidden
                    ${
                        mobileMenuOpen
                            ? "max-h-[700px] opacity-100"
                            : "max-h-0 opacity-0"
                    }
                `}
            >

                <div className="px-5 py-6 sm:px-8">

                    {/* Navigation */}
                    <div>

                        {/* Accueil */}
                        <Link
                            to="/"
                            onClick={closeMobileMenu}
                            className="group flex items-center justify-between border-b border-[#B58A3A]/10 py-4"
                        >
                            <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
                                Accueil
                            </span>

                            <span className="text-[9px] text-[#B58A3A]">
                                01
                            </span>
                       </Link>

                        {/* Collection */}
                        <div className="border-b border-[#B58A3A]/10">

                            <button
                                type="button"
                                onClick={() =>
                                    setCollectionOpen((prev) => !prev)
                                }
                                className="flex w-full items-center justify-between py-4"
                            >
                                <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
                                    Collection
                                </span>

                                <ChevronDown
                                    size={13}
                                    strokeWidth={1.3}
                                    className={`text-[#B58A3A] transition-transform duration-300 ${
                                        collectionOpen
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />
                            </button>

                            {/* Mobile collection */}
                            <div
                                className={`
                                    overflow-hidden transition-all duration-300
                                    ${
                                        collectionOpen
                                            ? "max-h-52 pb-2 opacity-100"
                                            : "max-h-0 opacity-0"
                                    }
                                `}
                            >

                                <Link
                                    to="/shop"
                                    onClick={closeMobileMenu}
                                    className="block py-2 pl-4 font-serif text-base italic text-[#6F6257]"
                                >
                                    Tous les parfums
                               </Link>

                                <Link
                                    to="/shop/femme"
                                    onClick={closeMobileMenu}
                                    className="block py-2 pl-4 font-serif text-base italic text-[#6F6257]"
                                >
                                    Femme
                               </Link>

                                <Link
                                    to="/shop/homme"
                                    onClick={closeMobileMenu}
                                    className="block py-2 pl-4 font-serif text-base italic text-[#6F6257]"
                                >
                                    Homme
                               </Link>

                                <Link
                                    to="/shop?filter=bestsellers"
                                    onClick={closeMobileMenu}
                                    className="block py-2 pl-4 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8C6A32]"
                                >
                                    Best Sellers
                               </Link>

                            </div>

                        </div>

                        {/* Notre histoire */}
                        <Link
                            to="/about"
                            onClick={closeMobileMenu}
                            className="flex items-center justify-between border-b border-[#B58A3A]/10 py-4"
                        >
                            <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
                                Notre histoire
                            </span>

                            <span className="text-[9px] text-[#B58A3A]">
                                03
                            </span>
                       </Link>

                        {/* Contact */}
                        <Link
                            to="/contact"
                            onClick={closeMobileMenu}
                            className="flex items-center justify-between border-b border-[#B58A3A]/10 py-4"
                        >
                            <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
                                Contact
                            </span>

                            <span className="text-[9px] text-[#B58A3A]">
                                04
                            </span>
                       </Link>

                    </div>

                    {/* =================================================
                        MOBILE ACTIONS
                    ================================================= */}
                    <div className="mt-5 flex items-center justify-between">

                        <Link
                            to="/account"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-[#6F6257]"
                        >
                            <UserRound
                                size={14}
                                strokeWidth={1.3}
                            />

                            Mon compte
                       </Link>

                        <Link
                            to="/shop?filter=bestsellers"
                            onClick={closeMobileMenu}
                            className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8C6A32]"
                        >
                            Best Sellers →
                       </Link>

                    </div>

                </div>
            </div>

        </header>
    );
}