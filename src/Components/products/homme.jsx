import React, { useState, useEffect } from "react";
import {
    ShoppingBag,
    ArrowUpRight,
    Sparkles,
    Search,
    X,
    Grid3X3,
    LayoutList,
    ChevronDown,
} from "lucide-react";

import Navbar from "../navbar";
import Footer from "../footer";
import { data } from "../data"; // استيراد البيانات من ملف JSON

export default function Homme({
    categoryId, // نمرر ID الفئة بدلاً من الكائن الكامل
}) {
    const [viewMode, setViewMode] = useState("grid");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);

    // تحميل البيانات من JSON
    useEffect(() => {
        // العثور على الفئة
        const foundCategory = data.categories.find(cat => cat.id === categoryId);
        setCategory(foundCategory);

        // تصفية المنتجات حسب الفئة
        const filteredProducts = data.products.filter(
            product => product.category_id === categoryId && product.is_active
        );
        setProducts(filteredProducts);
    }, [categoryId]);

    // Options de tri
    const sortOptions = [
        { value: "newest", label: "Plus récents" },
        { value: "price_asc", label: "Prix croissant" },
        { value: "price_desc", label: "Prix décroissant" },
        { value: "popular", label: "Plus populaires" },
    ];

    // Filtrage et tri des produits
    const filteredAndSortedProducts = [...products]
        .filter((product) => {
            if (!searchTerm) return true;
            const search = searchTerm.toLowerCase();
            return (
                product.name.toLowerCase().includes(search) ||
                product.description?.toLowerCase().includes(search) ||
                category?.name?.toLowerCase().includes(search)
            );
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "price_asc":
                    return a.price - b.price;
                case "price_desc":
                    return b.price - a.price;
                case "popular":
                    return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
                default: // newest
                    return b.id - a.id; // Utiliser l'ID comme proxy pour la date
            }
        });

    // Si la catégorie n'est pas trouvée
    if (!category) {
        return (
            <div className="min-h-screen bg-[#FCF8F1] text-[#211B16] flex items-center justify-center">
                <div className="text-center">
                    <ShoppingBag size={48} className="mx-auto text-[#B58A3A] mb-4" />
                    <h2 className="font-serif text-2xl">Catégorie non trouvée</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FCF8F1] text-[#211B16] py-3">

            <Navbar />

            {/* =====================================================
                HERO - avec animations
            ====================================================== */}
            <section className="relative border-b border-[#B58A3A]/15 overflow-hidden">
                
                {/* Fond décoratif */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#B58A3A]/5 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#B58A3A]/5 blur-3xl animate-pulse delay-1000" />
                    
                    {/* Particules décoratives */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-[#B58A3A]/10 animate-float-particle"
                            style={{
                                width: `${Math.random() * 4 + 2}px`,
                                height: `${Math.random() * 4 + 2}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${Math.random() * 4 + 3}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-24 animate-fade-in-up">
                    {/* Small label */}
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-6 sm:w-8 bg-[#B58A3A] animate-glow-line" />
                        <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#8C6A32] flex items-center gap-2">
                            <Sparkles size={10} className="text-[#B58A3A]" />
                            Collection
                        </span>
                        <span className="h-px w-6 sm:w-8 bg-[#B58A3A]/40 animate-glow-line delay-500" />
                    </div>

                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-[-0.04em]">
                                {category.name}
                                <span className="block text-[#B58A3A] italic text-2xl sm:text-3xl mt-2">
                                    {category.id === 1 ? "L'élégance au féminin" : "L'élégance au masculin"}
                                </span>
                            </h1>
                            <p className="mt-4 sm:mt-5 max-w-xl text-sm leading-6 text-[#8F8175]">
                                Découvrez notre sélection de parfums
                                {category.id === 1 ? " féminins" : " masculins"}, imaginés pour révéler une
                                signature olfactive unique.
                            </p>
                        </div>

                        {/* Product count */}
                        <div className="flex items-center gap-3 bg-[#F3EBDD] px-4 sm:px-5 py-2 rounded-full shadow-sm">
                            <span className="text-[#B58A3A] font-bold text-lg">
                                {filteredAndSortedProducts.length}
                            </span>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-[#8F8175]">
                                Parfums
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                TOOLBAR - avec recherche et tri
            ====================================================== */}
            <section className="sticky top-0 z-30 border-b border-[#B58A3A]/15 bg-[#FCF8F1]/95 backdrop-blur-md transition-all duration-300">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        
                        {/* Barre de recherche */}
                        <div className="relative flex-1">
                            <Search
                                size={16}
                                strokeWidth={1.3}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8F8175] transition-colors duration-300"
                            />
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={`Rechercher un parfum ${category.id === 1 ? "féminin" : "masculin"}...`}
                                className="h-10 sm:h-11 w-full border border-[#B58A3A]/20 bg-white/40 pl-10 pr-8 sm:pr-10 text-xs outline-none transition-all duration-300 placeholder:text-[#AFA095] focus:border-[#B58A3A] focus:bg-white/60 focus:shadow-lg focus:shadow-[#B58A3A]/5 rounded-lg"
                            />
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#8F8175] hover:text-[#B58A3A] transition-all duration-300 hover:scale-110"
                                >
                                    <X size={15} strokeWidth={1.3} />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                            {/* Tri */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="h-10 w-32 sm:w-40 appearance-none border border-[#B58A3A]/20 bg-white/40 pl-3 pr-8 text-[9px] uppercase tracking-[0.12em] outline-none transition-all duration-300 focus:border-[#B58A3A] focus:bg-white/60 focus:shadow-lg focus:shadow-[#B58A3A]/5 rounded-lg cursor-pointer hover:border-[#B58A3A]/40 text-[#8F8175]"
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    size={12}
                                    strokeWidth={1.3}
                                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8F8175]"
                                />
                            </div>

                            {/* View toggle */}
                            <div className="flex items-center gap-1 border border-[#B58A3A]/20 rounded-lg p-1 bg-white/40">
                                <button
                                    type="button"
                                    onClick={() => setViewMode("grid")}
                                    className={`p-1.5 rounded transition-all duration-300 ${
                                        viewMode === "grid"
                                            ? "bg-[#B58A3A] text-white shadow-sm"
                                            : "text-[#8F8175] hover:text-[#211B16] hover:bg-[#F3EBDD]"
                                    }`}
                                    aria-label="Vue grille"
                                >
                                    <Grid3X3 size={15} strokeWidth={1.3} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setViewMode("list")}
                                    className={`p-1.5 rounded transition-all duration-300 ${
                                        viewMode === "list"
                                            ? "bg-[#B58A3A] text-white shadow-sm"
                                            : "text-[#8F8175] hover:text-[#211B16] hover:bg-[#F3EBDD]"
                                    }`}
                                    aria-label="Vue liste"
                                >
                                    <LayoutList size={15} strokeWidth={1.3} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Résultats de recherche */}
                    {searchTerm && (
                        <div className="mt-2 text-[9px] text-[#8F8175] animate-fade-in-up">
                            {filteredAndSortedProducts.length} résultat{filteredAndSortedProducts.length > 1 ? "s" : ""} pour "<span className="text-[#B58A3A] font-medium">{searchTerm}</span>"
                        </div>
                    )}
                </div>
            </section>

            {/* =====================================================
                PRODUCTS
            ====================================================== */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

                {filteredAndSortedProducts.length > 0 ? (
                    <div className={`
                        grid gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-x-7 lg:gap-y-12
                        ${viewMode === "grid" 
                            ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                            : "grid-cols-1"
                        }
                    `}>
                        {filteredAndSortedProducts.map((product, index) => (
                            <article
                                key={product.id}
                                className={`group animate-fade-in-up ${
                                    viewMode === "list" ? "flex gap-4 sm:gap-6 items-start" : ""
                                }`}
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                {/* =========================
                                    IMAGE
                                ========================== */}
                                <div className={`relative overflow-hidden bg-[#F3EBDD] rounded-lg shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-[#B58A3A]/10 ${
                                    viewMode === "grid" ? "aspect-[4/5] w-full" : "aspect-[4/5] w-[120px] sm:w-[180px] flex-shrink-0"
                                }`}>
                                    <a
                                        href={`/products/${product.slug}`}
                                        className="block h-full w-full"
                                    >
                                        <img
                                            src={product.image || `/images/products/${product.slug || product.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                                            alt={product.name}
                                            className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.src = '/images/placeholder.jpg';
                                            }}
                                        />
                                    </a>

                                    {/* Gradient overlay */}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#211B16]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                    {/* Badges */}
                                    <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                                        {product.is_featured && (
                                            <span className="bg-[#B58A3A] px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.18em] text-white rounded-full shadow-lg animate-glow-badge">
                                                Best Seller
                                            </span>
                                        )}
                                        {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                                            <span className="bg-[#211B16] px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.18em] text-[#F7F0E4] rounded-full shadow-lg">
                                                Dernières pièces
                                            </span>
                                        )}
                                        {product.stock_quantity === 0 && (
                                            <span className="bg-red-600 px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.18em] text-white rounded-full shadow-lg">
                                                Rupture de stock
                                            </span>
                                        )}
                                    </div>

                                    {/* Quick view */}
                                    <a
                                        href={`/products/${product.slug}`}
                                        className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center bg-[#FCF8F1] text-[#211B16] opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#B58A3A] hover:text-white hover:shadow-lg hover:shadow-[#B58A3A]/30 rounded-full"
                                        aria-label={`Voir ${product.name}`}
                                    >
                                        <ArrowUpRight size={15} strokeWidth={1.3} />
                                    </a>

                                    {/* Quick add - Désactivé si rupture de stock */}
                                    {product.stock_quantity > 0 && (
                                        <button
                                            type="button"
                                            className={`absolute bottom-3 left-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-[#211B16]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[7px] font-semibold uppercase tracking-[0.15em] hover:bg-[#B58A3A] flex items-center gap-1.5 ${
                                                viewMode === "list" ? "hidden" : ""
                                            }`}
                                        >
                                            <ShoppingBag size={12} strokeWidth={1.3} />
                                            Ajouter
                                        </button>
                                    )}
                                </div>

                                {/* =========================
                                    INFO
                                ========================== */}
                                <div className={`pt-4 relative ${
                                    viewMode === "list" ? "flex-1" : ""
                                }`}>
                                    {/* Ligne décorative */}
                                    <div className={`absolute -top-1 left-0 w-8 h-[2px] bg-[#B58A3A]/40 rounded-full transition-all duration-500 group-hover:w-12 group-hover:bg-[#B58A3A] ${
                                        viewMode === "list" ? "hidden" : ""
                                    }`} />

                                    <p className="text-[7px] font-semibold uppercase tracking-[0.25em] text-[#B58A3A] flex items-center gap-2">
                                        <span className="w-4 h-px bg-[#B58A3A]/40" />
                                        {category.name}
                                    </p>

                                    <a href={`/products/${product.slug}`}>
                                        <h2 className={`font-serif text-[17px] sm:text-[19px] leading-tight text-[#211B16] transition-colors duration-300 group-hover:text-[#B58A3A] ${
                                            viewMode === "list" ? "text-xl sm:text-2xl" : ""
                                        }`}>
                                            {product.name}
                                        </h2>
                                    </a>

                                    {product.description && (
                                        <p className={`mt-1.5 line-clamp-2 text-[10px] leading-5 text-[#8F8175] transition-all duration-300 group-hover:text-[#6F6257] ${
                                            viewMode === "list" ? "text-xs sm:text-sm" : ""
                                        }`}>
                                            {product.description}
                                        </p>
                                    )}

                                    {/* Stock indicator */}
                                    {product.stock_quantity > 0 && product.stock_quantity <= 10 && (
                                        <div className="mt-2 flex items-center gap-1.5">
                                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                                            <span className="text-[7px] uppercase tracking-[0.1em] text-amber-600">
                                                Plus que {product.stock_quantity} en stock
                                            </span>
                                        </div>
                                    )}

                                    {/* Price + Cart */}
                                    <div className={`mt-3 flex items-center justify-between gap-2 ${
                                        viewMode === "list" ? "mt-4" : ""
                                    }`}>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] sm:text-[12px] font-semibold tracking-wide text-[#211B16]">
                                                {Number(product.price).toFixed(2)} DH
                                            </span>
                                            {product.old_price && (
                                                <span className="text-[9px] text-[#9F9388] line-through">
                                                    {Number(product.old_price).toFixed(2)} DH
                                                </span>
                                            )}
                                        </div>

                                        {product.stock_quantity > 0 ? (
                                            <button
                                                type="button"
                                                className="flex items-center gap-1.5 text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.12em] text-[#8C6A32] transition-colors duration-300 hover:text-[#B58A3A] group/btn relative overflow-hidden px-2 py-1 rounded-full"
                                            >
                                                <span className="absolute inset-0 bg-[#B58A3A]/5 rounded-full scale-0 transition-transform duration-300 group-hover/btn:scale-100" />
                                                <ShoppingBag size={12} strokeWidth={1.3} className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
                                                <span className="relative z-10 hidden sm:inline">Ajouter</span>
                                            </button>
                                        ) : (
                                            <span className="text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.12em] text-red-500">
                                                Épuisé
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    /* =========================
                        EMPTY - amélioré
                    ========================== */
                    <div className="py-16 sm:py-24 text-center animate-fade-in-up">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center border-2 border-[#B58A3A]/20 rounded-full bg-[#F3EBDD]/50">
                            {searchTerm ? (
                                <Search size={28} strokeWidth={1.2} className="text-[#B58A3A]" />
                            ) : (
                                <ShoppingBag size={28} strokeWidth={1.2} className="text-[#B58A3A]" />
                            )}
                        </div>
                        <h2 className="mt-6 font-serif text-3xl sm:text-4xl">
                            {searchTerm ? "Aucun parfum trouvé" : "Aucun parfum disponible"}
                        </h2>
                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#8F8175]">
                            {searchTerm 
                                ? `Aucun produit ne correspond à votre recherche "${searchTerm}".`
                                : `Revenez bientôt pour découvrir notre nouvelle collection ${category.id === 1 ? "féminine" : "masculine"}.`
                            }
                        </p>
                        {searchTerm ? (
                            <button
                                type="button"
                                onClick={() => setSearchTerm("")}
                                className="inline-flex items-center gap-2 mt-7 bg-[#211B16] px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#B58A3A] hover:shadow-lg hover:shadow-[#B58A3A]/30 rounded-lg group"
                            >
                                <X size={14} strokeWidth={1.5} />
                                Effacer la recherche
                            </button>
                        ) : (
                            <a
                                href="/shop"
                                className="inline-flex items-center gap-2 mt-7 bg-[#211B16] px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#B58A3A] hover:shadow-lg hover:shadow-[#B58A3A]/30 rounded-lg group"
                            >
                                Voir tous les parfums
                                <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </a>
                        )}
                    </div>
                )}
            </section>

            <Footer />

            {/* =====================================================
                STYLES GLOBAUX
            ====================================================== */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(25px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes glowLine {
                    0%, 100% {
                        opacity: 0.4;
                    }
                    50% {
                        opacity: 1;
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

                @keyframes floatParticle {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0.3;
                    }
                    50% {
                        transform: translateY(-20px) translateX(8px);
                        opacity: 1;
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                }

                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                    opacity: 0;
                }

                .animate-glow-line {
                    animation: glowLine 2s ease-in-out infinite;
                }

                .animate-glow-badge {
                    animation: glowBadge 2s ease-in-out infinite;
                }

                .animate-float-particle {
                    animation: floatParticle 4s ease-in-out infinite;
                }

                .animate-pulse {
                    animation: pulse 2s ease-in-out infinite;
                }

                .delay-500 {
                    animation-delay: 500ms;
                }
                .delay-1000 {
                    animation-delay: 1000ms;
                }
            `}</style>
        </div>
    );
}