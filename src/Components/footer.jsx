import React from "react";
import {
    MessageCircle,
    MapPin,
    Phone,
    Mail,
} from "lucide-react";
import { LuFacebook } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="border-t border-[#B58A3A]/15 bg-[#211B16] text-[#F7F0E4]">

            <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">

                {/* =========================
                    MAIN FOOTER
                ========================== */}
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

                    {/* =========================
                        BRAND
                    ========================== */}
                    <div className="sm:col-span-2 lg:col-span-1">

                        <a
                            href="/"
                            className="inline-flex items-center"
                        >
                            <img
                                src="/divara.png"
                                alt="Divara Parfums"
                                className="h-12 w-auto object-contain"
                            />
                        </a>

                        <p className="mt-4 max-w-xs text-[11px] leading-6 text-[#AFA095]">
                            Des parfums élégants et intemporels,
                            pensés pour révéler votre personnalité
                            et laisser une signature unique.
                        </p>

                        {/* Social */}
                        <div className="mt-5 flex items-center gap-2">

                            <a
                                href="#"
                                aria-label="Instagram"
                                className="flex h-8 w-8 items-center justify-center border border-[#B58A3A]/25 text-[#C8BCAF] transition-all duration-300 hover:border-[#B58A3A] hover:bg-[#B58A3A] hover:text-white"
                            >
                                 <FaInstagram
                                    size={14}
                                    strokeWidth={1.4}
                                /> 
                            </a>

                            <a
                                href="#"
                                aria-label="Facebook"
                                className="flex h-8 w-8 items-center justify-center border border-[#B58A3A]/25 text-[#C8BCAF] transition-all duration-300 hover:border-[#B58A3A] hover:bg-[#B58A3A] hover:text-white"
                            >
                                <LuFacebook 
                                    size={14}
                                    strokeWidth={1.4}
                                /> 
                            </a>

                            <a
                                href="#"
                                aria-label="WhatsApp"
                                className="flex h-8 w-8 items-center justify-center border border-[#B58A3A]/25 text-[#C8BCAF] transition-all duration-300 hover:border-[#B58A3A] hover:bg-[#B58A3A] hover:text-white"
                            >
                                <MessageCircle
                                    size={14}
                                    strokeWidth={1.4}
                                />
                            </a>

                        </div>

                    </div>

                    {/* =========================
                        NAVIGATION
                    ========================== */}
                    <div>

                        <h3 className="mb-5 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#B58A3A]">
                            Navigation
                        </h3>

                        <div className="flex flex-col gap-3">

                            <a
                                href="/"
                                className="w-fit text-[10px] uppercase tracking-[0.15em] text-[#C8BCAF] transition-colors hover:text-[#B58A3A]"
                            >
                                Accueil
                            </a>

                            <a
                                href="/shop"
                                className="w-fit text-[10px] uppercase tracking-[0.15em] text-[#C8BCAF] transition-colors hover:text-[#B58A3A]"
                            >
                                Collection
                            </a>

                            <a
                                href="/about"
                                className="w-fit text-[10px] uppercase tracking-[0.15em] text-[#C8BCAF] transition-colors hover:text-[#B58A3A]"
                            >
                                Notre histoire
                            </a>

                            <a
                                href="/contact"
                                className="w-fit text-[10px] uppercase tracking-[0.15em] text-[#C8BCAF] transition-colors hover:text-[#B58A3A]"
                            >
                                Contact
                            </a>

                        </div>

                    </div>

                    {/* =========================
                        COLLECTION
                    ========================== */}
                    <div>

                        <h3 className="mb-5 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#B58A3A]">
                            Collection
                        </h3>

                        <div className="flex flex-col gap-3">

                            <a
                                href="/shop"
                                className="w-fit text-[10px] uppercase tracking-[0.15em] text-[#C8BCAF] transition-colors hover:text-[#B58A3A]"
                            >
                                Tous les parfums
                            </a>

                            <a
                                href="/shop?category=femme"
                                className="w-fit text-[10px] uppercase tracking-[0.15em] text-[#C8BCAF] transition-colors hover:text-[#B58A3A]"
                            >
                                Femme
                            </a>

                            <a
                                href="/shop?category=homme"
                                className="w-fit text-[10px] uppercase tracking-[0.15em] text-[#C8BCAF] transition-colors hover:text-[#B58A3A]"
                            >
                                Homme
                            </a>

                            <a
                                href="/shop?filter=bestsellers"
                                className="w-fit text-[10px] font-semibold uppercase tracking-[0.15em] text-[#B58A3A] transition-colors hover:text-[#D1A957]"
                            >
                                Best Sellers
                            </a>

                        </div>

                    </div>

                    {/* =========================
                        CONTACT
                    ========================== */}
                    <div>

                        <h3 className="mb-5 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#B58A3A]">
                            Contact
                        </h3>

                        <div className="flex flex-col gap-4">

                            {/* Location */}
                            <div className="flex items-start gap-3">

                                <MapPin
                                    size={14}
                                    strokeWidth={1.3}
                                    className="mt-0.5 shrink-0 text-[#B58A3A]"
                                />

                                <span className="text-[10px] leading-5 text-[#AFA095]">
                                    Casablanca, Maroc
                                </span>

                            </div>

                            {/* Phone */}
                            <a
                                href="tel:+212600000000"
                                className="flex items-center gap-3 text-[10px] text-[#AFA095] transition-colors hover:text-[#B58A3A]"
                            >
                                <Phone
                                    size={14}
                                    strokeWidth={1.3}
                                    className="shrink-0 text-[#B58A3A]"
                                />

                                +212 6 00 00 00 00
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:contact@divara.ma"
                                className="flex items-center gap-3 text-[10px] text-[#AFA095] transition-colors hover:text-[#B58A3A]"
                            >
                                <Mail
                                    size={14}
                                    strokeWidth={1.3}
                                    className="shrink-0 text-[#B58A3A]"
                                />

                                contact@divara.ma
                            </a>

                        </div>

                    </div>

                </div>

                {/* =========================
                    BOTTOM
                ========================== */}
                <div className="mt-9 border-t border-[#B58A3A]/10 pt-5">

                    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">

                        <p className="text-[8px] uppercase tracking-[0.15em] text-[#756960]">
                            © {new Date().getFullYear()} Divara Parfums
                        </p>

                        <div className="flex items-center gap-5">

                            <a
                                href="/privacy"
                                className="text-[8px] uppercase tracking-[0.15em] text-[#756960] transition-colors hover:text-[#B58A3A]"
                            >
                                Confidentialité
                            </a>

                            <a
                                href="/terms"
                                className="text-[8px] uppercase tracking-[0.15em] text-[#756960] transition-colors hover:text-[#B58A3A]"
                            >
                                Conditions
                            </a>

                        </div>

                    </div>

                </div>

            </div>
        </footer>
    );
}