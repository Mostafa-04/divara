import React, { useState } from "react";
import { ShoppingBag, ArrowUpRight, Heart, Eye } from "lucide-react";

export default function ProductCard({ product }) {
    const [isLiked, setIsLiked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <article 
            className="group relative animate-fade-in-up"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            {/* =========================
                IMAGE
            ========================== */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F3EBDD] rounded-lg shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-[#B58A3A]/10">

                {/* Product image */}
                <a
                    href={`/products/${product.slug}`}
                    className="block h-full w-full"
                >
                    <img
                        src={`${product.image}`}
                        alt={product.name}
                        className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                        loading="lazy"
                    />
                </a>

                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#211B16]/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* =========================
                    BADGES
                ========================== */}
                <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                    {product.is_new && (
                        <span className="bg-[#211B16] px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#F7F0E4] shadow-lg animate-pulse">
                            Nouveau
                        </span>
                    )}

                    {product.is_bestseller && !product.is_new && (
                        <span className="bg-[#B58A3A] px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.2em] text-white shadow-lg animate-glow-badge">
                            Best Seller
                        </span>
                    )}

                    {product.discount && (
                        <span className="bg-red-600 px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.2em] text-white shadow-lg animate-pulse">
                            -{product.discount}%
                        </span>
                    )}
                </div>

                {/* =========================
                    ACTIONS RAPIDES
                ========================== */}
                <div className="absolute right-3 top-3 flex flex-col gap-2">
                    {/* Wishlist */}
                    <button
                        type="button"
                        onClick={() => setIsLiked(!isLiked)}
                        className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center bg-[#FCF8F1]/90 backdrop-blur-sm text-[#211B16] shadow-sm transition-all duration-300 hover:bg-[#B58A3A] hover:text-white hover:shadow-lg hover:shadow-[#B58A3A]/30 rounded-full translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        aria-label="Ajouter aux favoris"
                    >
                        <Heart 
                            size={14} 
                            strokeWidth={1.5} 
                            className={`transition-all duration-300 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
                        />
                    </button>

                    {/* Quick view */}
                    <button
                        type="button"
                        className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center bg-[#FCF8F1]/90 backdrop-blur-sm text-[#211B16] shadow-sm transition-all duration-300 hover:bg-[#B58A3A] hover:text-white hover:shadow-lg hover:shadow-[#B58A3A]/30 rounded-full translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        style={{ transitionDelay: '100ms' }}
                        aria-label="Aperçu rapide"
                    >
                        <Eye size={14} strokeWidth={1.5} />
                    </button>
                </div>

                {/* =========================
                    QUICK ACTION - Voir produit
                ========================== */}
                <a
                    href={`/products/${product.slug}`}
                    aria-label={`Voir ${product.name}`}
                    className="absolute bottom-3 right-3 flex h-9 w-9 sm:h-10 sm:w-10 translate-y-2 items-center justify-center bg-[#FCF8F1] text-[#211B16] opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#B58A3A] hover:text-white hover:shadow-lg hover:shadow-[#B58A3A]/30 rounded-full"
                >
                    <ArrowUpRight size={15} strokeWidth={1.3} />
                </a>

                {/* =========================
                    CARTE DE PRIX FLOTTANTE
                ========================== */}
                <div className={`absolute bottom-3 left-3 bg-[#211B16]/90 backdrop-blur-sm px-3 py-1.5 rounded-full transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <span className="text-[9px] font-semibold text-[#F7F0E4]">
                        {Number(product.price).toFixed(2)} DH
                    </span>
                </div>
            </div>

            {/* =========================
                PRODUCT INFO
            ========================== */}
            <div className="pt-4 sm:pt-5 relative">
                {/* Ligne décorative */}
                <div className="absolute -top-1 left-0 w-8 h-[2px] bg-[#B58A3A]/40 rounded-full transition-all duration-500 group-hover:w-12 group-hover:bg-[#B58A3A]" />

                {/* Category */}
                {product.category?.name && (
                    <p className="text-[7px] font-medium uppercase tracking-[0.25em] text-[#B58A3A] flex items-center gap-2">
                        <span className="w-4 h-px bg-[#B58A3A]/40" />
                        {product.category.name}
                    </p>
                )}

                {/* Product name */}
                <a
                    href={`/products/${product.slug}`}
                    className="mt-1.5 block"
                >
                    <h3 className="font-serif text-[17px] sm:text-[19px] md:text-[21px] leading-tight text-[#211B16] transition-all duration-300 group-hover:text-[#B58A3A]">
                        {product.name}
                    </h3>
                </a>

                {/* Description */}
                {product.description && (
                    <p className="mt-1.5 line-clamp-2 text-[9px] sm:text-[10px] leading-5 text-[#8F8175] transition-all duration-300 group-hover:text-[#6F6257]">
                        {product.description}
                    </p>
                )}

                {/* Bottom */}
                <div className="mt-3 flex items-center justify-between">
                    {/* Price with discount */}
                    <div className="flex items-center gap-2">
                        {product.discount ? (
                            <>
                                <span className="text-[11px] sm:text-[12px] font-semibold tracking-wide text-[#B58A3A]">
                                    {Number(product.price * (1 - product.discount / 100)).toFixed(2)} DH
                                </span>
                                <span className="text-[9px] text-[#8F8175] line-through">
                                    {Number(product.price).toFixed(2)} DH
                                </span>
                            </>
                        ) : (
                            <span className="text-[11px] sm:text-[12px] font-semibold tracking-wide text-[#211B16]">
                                {Number(product.price).toFixed(2)} DH
                            </span>
                        )}
                    </div>

                    {/* Add to cart */}
                    <button
                        type="button"
                        className="group/btn flex items-center gap-1.5 text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.15em] text-[#8C6A32] transition-all duration-300 hover:text-[#B58A3A] relative overflow-hidden px-2 py-1"
                    >
                        <span className="absolute inset-0 bg-[#B58A3A]/5 rounded-full scale-0 transition-transform duration-300 group-hover/btn:scale-100" />
                        <ShoppingBag
                            size={12}
                            strokeWidth={1.3}
                            className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-y-0.5"
                        />
                        <span className="relative z-10">Ajouter</span>
                    </button>
                </div>

                {/* Note de parfum - si disponible */}
                {product.notes && (
                    <div className="mt-2 flex items-center gap-1.5">
                        {product.notes.map((note, index) => (
                            <span 
                                key={index}
                                className="text-[6px] uppercase tracking-[0.15em] text-[#8F8175] bg-[#F3EBDD] px-2 py-0.5 rounded-full"
                            >
                                {note}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes glowBadge {
                    0%, 100% {
                        box-shadow: 0 0 5px rgba(181, 138, 58, 0.3);
                    }
                    50% {
                        box-shadow: 0 0 20px rgba(181, 138, 58, 0.6);
                    }
                }

                .animate-fade-in-up {
                    animation: fadeInUp 0.5s ease-out forwards;
                    opacity: 0;
                }

                .animate-glow-badge {
                    animation: glowBadge 2s ease-in-out infinite;
                }
            `}</style>
        </article>
    );
}