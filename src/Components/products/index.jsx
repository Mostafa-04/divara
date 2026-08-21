import React, { useEffect, useState } from "react";
import {
    Search,
    SlidersHorizontal,
    X,
    ArrowUpRight,
    ShoppingBag,
    ChevronDown,
    Sparkles,
    Filter,
    Grid3X3,
    LayoutList,
} from "lucide-react";

import Navbar from "../navbar";
import Footer from "../footer";
import { data } from "../data"; // استيراد البيانات من ملف JSON

export default function ProductsIndex() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [viewMode, setViewMode] = useState("grid");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // حالة المنتجات والتصفية
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);

    // تحميل البيانات من JSON
    useEffect(() => {
        // تحميل الفئات
        setCategories(data.categories);
        
        // تصفية المنتجات الأولية
        filterProducts("", "");
    }, []);

    // دالة تصفية المنتجات
    const filterProducts = (searchTerm, categorySlug) => {
        let filtered = [...data.products];
        
        // تصفية حسب الفئة
        if (categorySlug) {
            const categoryObj = data.categories.find(cat => cat.slug === categorySlug);
            if (categoryObj) {
                filtered = filtered.filter(product => product.category_id === categoryObj.id);
            }
        }
        
        // تصفية حسب البحث
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchLower) ||
                product.description?.toLowerCase().includes(searchLower)
            );
        }
        
        // ترتيب المنتجات (الأحدث أولاً)
        filtered.sort((a, b) => b.id - a.id);
        
        setFilteredProducts(filtered);
        setTotalProducts(filtered.length);
    };

    // البحث مع تأخير
    useEffect(() => {
        const timer = setTimeout(() => {
            filterProducts(search, category);
        }, 300);

        return () => clearTimeout(timer);
    }, [search, category]);

    // تغيير الفئة
    const handleCategoryChange = (value) => {
        setCategory(value);
    };

    // إعادة تعيين الفلاتر
    const clearFilters = () => {
        setSearch("");
        setCategory("");
        filterProducts("", "");
    };

    const hasFilters = search || category;

    return (
        <div className="min-h-screen bg-[#FCF8F1] text-[#211B16]">

            <Navbar />

            {/* =====================================================
                HEADER - avec animation
            ====================================================== */}
            <section className="relative border-b border-[#B58A3A]/15 overflow-hidden">
                
                {/* Fond décoratif */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#B58A3A]/5 blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#B58A3A]/5 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 animate-fade-in-up">
                    {/* Label */}
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-6 sm:w-8 bg-[#B58A3A] animate-glow-line" />
                        <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#8C6A32] flex items-center gap-2">
                            <Sparkles size={10} className="text-[#B58A3A]" />
                            Divara Parfums
                        </span>
                        <span className="h-px w-6 sm:w-8 bg-[#B58A3A]/40 animate-glow-line delay-500" />
                    </div>

                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-[-0.04em]">
                                Tous les parfums
                                <span className="block text-[#B58A3A] italic text-2xl sm:text-3xl mt-2">
                                    Trouvez votre signature
                                </span>
                            </h1>
                            <p className="mt-4 sm:mt-5 max-w-xl text-sm leading-6 text-[#8F8175]">
                                Explorez notre collection de parfums
                                pour femme et homme et trouvez votre
                                signature olfactive.
                            </p>
                        </div>

                        {/* Count avec animation */}
                        <div className="flex items-center gap-4">
                            <div className="text-[9px] uppercase tracking-[0.2em] text-[#8F8175] bg-[#F3EBDD] px-4 py-2 rounded-full">
                                <span className="text-[#B58A3A] font-bold text-sm">
                                    {totalProducts}
                                </span>
                                {" "}Parfums
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                FILTERS - sticky avec animations
            ====================================================== */}
            <section className="sticky top-0 z-30 border-b border-[#B58A3A]/15 bg-[#FCF8F1]/95 backdrop-blur-md transition-all duration-300">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center">

                        {/* Search */}
                        <div className="relative flex-1">
                            <Search
                                size={16}
                                strokeWidth={1.3}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8F8175] transition-colors duration-300 group-focus-within:text-[#B58A3A]"
                            />
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher un parfum..."
                                className="h-11 sm:h-12 w-full border border-[#B58A3A]/20 bg-white/40 pl-10 sm:pl-11 pr-8 sm:pr-10 text-xs outline-none transition-all duration-300 placeholder:text-[#AFA095] focus:border-[#B58A3A] focus:bg-white/60 focus:shadow-lg focus:shadow-[#B58A3A]/5 rounded-lg"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#8F8175] hover:text-[#B58A3A] transition-all duration-300 hover:scale-110"
                                >
                                    <X size={15} strokeWidth={1.3} />
                                </button>
                            )}
                        </div>

                        {/* Category */}
                        <div className="relative md:w-56">
                            <SlidersHorizontal
                                size={15}
                                strokeWidth={1.3}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8C6A32]"
                            />
                            <select
                                value={category}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="h-11 sm:h-12 w-full appearance-none border border-[#B58A3A]/20 bg-white/40 pl-10 pr-10 text-[10px] uppercase tracking-[0.12em] outline-none transition-all duration-300 focus:border-[#B58A3A] focus:bg-white/60 focus:shadow-lg focus:shadow-[#B58A3A]/5 rounded-lg cursor-pointer hover:border-[#B58A3A]/40"
                            >
                                <option value="">Toutes les catégories</option>
                                {categories.map((item) => (
                                    <option key={item.id} value={item.slug}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                size={14}
                                strokeWidth={1.3}
                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8F8175] transition-transform duration-300"
                            />
                        </div>

                        {/* View toggle - desktop */}
                        <div className="hidden md:flex items-center gap-1 border border-[#B58A3A]/20 rounded-lg p-1 bg-white/40">
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
                                <Grid3X3 size={16} strokeWidth={1.3} />
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
                                <LayoutList size={16} strokeWidth={1.3} />
                            </button>
                        </div>

                        {/* Clear */}
                        {hasFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="flex h-11 sm:h-12 items-center justify-center gap-2 border border-[#211B16] px-4 sm:px-5 text-[9px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#211B16] hover:text-white hover:shadow-lg hover:shadow-[#211B16]/20 rounded-lg active:scale-95"
                            >
                                <X size={13} strokeWidth={1.3} />
                                Effacer
                            </button>
                        )}

                        {/* Mobile filter toggle */}
                        <button
                            type="button"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="md:hidden flex h-11 items-center justify-center gap-2 border border-[#B58A3A]/20 px-4 text-[9px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#B58A3A] hover:bg-[#B58A3A]/5 rounded-lg"
                        >
                            <Filter size={14} strokeWidth={1.3} />
                            Filtres
                        </button>
                    </div>
                </div>
            </section>

            {/* =====================================================
                PRODUCTS
            ====================================================== */}
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

                {/* Results info */}
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#8F8175] bg-[#F3EBDD] px-3 py-1 rounded-full">
                        {totalProducts} résultat{totalProducts > 1 ? "s" : ""}
                        {search && (
                            <span className="ml-1 text-[#B58A3A]">
                                pour "{search}"
                            </span>
                        )}
                        {category && !search && (
                            <span className="ml-1 text-[#B58A3A]">
                                en {categories.find(c => c.slug === category)?.name || ''}
                            </span>
                        )}
                    </p>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className={`
                        grid gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-x-7 lg:gap-y-12
                        ${viewMode === "grid" 
                            ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                            : "grid-cols-1"
                        }
                    `}>
                        {filteredProducts.map((product, index) => {
                            // Trouver la catégorie du produit
                            const productCategory = data.categories.find(
                                cat => cat.id === product.category_id
                            );
                            
                            return (
                                <article
                                    key={product.id}
                                    className={`group animate-fade-in-up ${
                                        viewMode === "list" ? "flex gap-4 sm:gap-6 items-start" : ""
                                    }`}
                                    style={{ animationDelay: `${index * 80}ms` }}
                                >
                                    {/* Product image */}
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

                                        {/* Category badge */}
                                        {productCategory && (
                                            <span className="absolute left-3 top-3 bg-[#FCF8F1]/90 backdrop-blur-sm px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.18em] text-[#8C6A32] rounded-full shadow-sm transition-all duration-300 group-hover:bg-[#B58A3A] group-hover:text-white">
                                                {productCategory.name}
                                            </span>
                                        )}

                                        {/* Badge stock */}
                                        {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                                            <span className="absolute right-3 top-3 bg-amber-600 px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.2em] text-white rounded-full shadow-lg animate-pulse">
                                                Dernières pièces
                                            </span>
                                        )}
                                        {product.stock_quantity === 0 && (
                                            <span className="absolute right-3 top-3 bg-red-600 px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.2em] text-white rounded-full shadow-lg">
                                                Épuisé
                                            </span>
                                        )}

                                        {/* Badge featured */}
                                        {product.is_featured && product.stock_quantity > 5 && (
                                            <span className="absolute right-3 top-3 bg-[#B58A3A] px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.2em] text-white rounded-full shadow-lg">
                                                Best Seller
                                            </span>
                                        )}

                                        {/* Detail button */}
                                        <a
                                            href={`/products/${product.slug}`}
                                            className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center bg-[#FCF8F1] text-[#211B16] opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#B58A3A] hover:text-white hover:shadow-lg hover:shadow-[#B58A3A]/30 rounded-full"
                                        >
                                            <ArrowUpRight size={15} strokeWidth={1.3} />
                                        </a>

                                        {/* Quick add - apparaît au survol */}
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

                                    {/* Product info */}
                                    <div className={`pt-4 relative ${
                                        viewMode === "list" ? "flex-1" : ""
                                    }`}>
                                        {/* Ligne décorative */}
                                        <div className={`absolute -top-1 left-0 w-8 h-[2px] bg-[#B58A3A]/40 rounded-full transition-all duration-500 group-hover:w-12 group-hover:bg-[#B58A3A] ${
                                            viewMode === "list" ? "hidden" : ""
                                        }`} />

                                        {productCategory && (
                                            <p className="text-[7px] font-semibold uppercase tracking-[0.25em] text-[#B58A3A] flex items-center gap-2">
                                                <span className="w-4 h-px bg-[#B58A3A]/40" />
                                                {productCategory.name}
                                            </p>
                                        )}

                                        <a href={`/products/${product.slug}`}>
                                            <h2 className={`mt-1.5 font-serif text-[17px] sm:text-[19px] leading-tight text-[#211B16] transition-colors duration-300 group-hover:text-[#B58A3A] ${
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

                                        <div className={`mt-3 flex items-center justify-between ${
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
                            );
                        })}
                    </div>
                ) : (
                    /* Empty state amélioré */
                    <div className="py-16 sm:py-24 text-center animate-fade-in-up">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center border-2 border-[#B58A3A]/20 rounded-full bg-[#F3EBDD]/50">
                            <Search size={28} strokeWidth={1.2} className="text-[#B58A3A]" />
                        </div>
                        <h2 className="mt-6 font-serif text-3xl sm:text-4xl">
                            Aucun parfum trouvé
                        </h2>
                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#8F8175]">
                            {search || category 
                                ? "Aucun produit ne correspond à votre recherche. Essayez un autre mot-clé ou une autre catégorie."
                                : "Aucun parfum disponible pour le moment."
                            }
                        </p>
                        {(search || category) && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-7 bg-[#211B16] px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#B58A3A] hover:shadow-lg hover:shadow-[#B58A3A]/30 rounded-lg group"
                            >
                                <span className="flex items-center gap-2">
                                    Voir tous les parfums
                                    <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </span>
                            </button>
                        )}
                    </div>
                )}
            </main>

            <Footer />

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

                .delay-500 {
                    animation-delay: 500ms;
                }

                .animate-pulse {
                    animation: pulse 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}