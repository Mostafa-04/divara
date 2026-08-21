import React, { useEffect, useRef, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";

// استيراد البيانات من ملف JSON
import { data } from "./data";// تأكد من تعديل المسار حسب موقع الملف

export default function ProductCarousel({
    categoryId, // نمرر category_id بدلاً من category object
    autoPlay = true,
    interval = 4000,
}) {
    const sliderRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // الحصول على معلومات الفئة والمنتجات من data
    const category = data.categories.find(cat => cat.id === categoryId);
    const products = data.products.filter(
        product => product.category_id === categoryId && product.is_active
    );

    // إذا لم يتم العثور على الفئة أو المنتجات
    if (!category || !products.length) return null;

    const scroll = (direction) => {
        if (!sliderRef.current || isTransitioning) return;

        const container = sliderRef.current;
        const card = container.querySelector("[data-product-card]");

        if (!card) return;

        setIsTransitioning(true);

        const cardWidth = card.offsetWidth;
        const gap = 20;
        const amount = cardWidth + gap;

        container.scrollBy({
            left: direction === "next" ? amount : -amount,
            behavior: "smooth",
        });

        setTimeout(() => setIsTransitioning(false), 500);
    };

    // Auto Play
    useEffect(() => {
        if (!autoPlay || isPaused || products.length <= 1) return;

        const timer = setInterval(() => {
            if (!sliderRef.current) return;

            const container = sliderRef.current;
            const maxScroll = container.scrollWidth - container.clientWidth;

            if (container.scrollLeft >= maxScroll - 10) {
                container.scrollTo({
                    left: 0,
                    behavior: "smooth",
                });

                return;
            }

            scroll("next");
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, isPaused, interval, products.length]);

    // Mise à jour de l'index
    useEffect(() => {
        const container = sliderRef.current;

        if (!container) return;

        const handleScroll = () => {
            const card = container.querySelector("[data-product-card]");

            if (!card) return;

            const cardWidth = card.offsetWidth + 20;
            const index = Math.round(container.scrollLeft / cardWidth);

            setCurrentIndex(index);
        };

        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 xl:py-24 ">
            {/* Fond décoratif */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#B58A3A]/5 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#B58A3A]/5 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
                {/* HEADER */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end sm:gap-6 lg:mb-12 animate-fade-in-up">
                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <span className="h-px w-6 bg-[#B58A3A] sm:w-8 animate-glow-line" />
                            <span className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.3em] text-[#8C6A32]">
                                <Sparkles size={10} className="text-[#B58A3A]" />
                                Collection
                            </span>
                            <span className="h-px w-6 bg-[#B58A3A]/40 sm:w-8 animate-glow-line delay-500" />
                        </div>

                        <h2 className="relative font-serif text-3xl leading-none tracking-[-0.03em] text-[#211B16] sm:text-4xl md:text-5xl">
                            {category.name}
                            <span className="absolute -bottom-2 left-0 h-[2px] w-12 rounded-full bg-[#B58A3A]/30" />
                        </h2>
                    </div>

                    {/* Desktop View All */}
                    <Link
                        to={`/shop?category=${category.slug}`}
                        className="group hidden items-center gap-3 border-b border-[#B58A3A]/30 pb-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#8C6A32] transition-all duration-300 hover:gap-4 hover:border-[#B58A3A] hover:text-[#B58A3A] sm:flex"
                    >
                        Voir toute la collection
                        <ArrowRight
                            size={13}
                            strokeWidth={1.3}
                            className="transition-all duration-300 group-hover:translate-x-1.5 group-hover:scale-110"
                        />
                    </Link>
                </div>

                {/* CAROUSEL */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Indicateurs */}
                    <div className="absolute -top-10 right-0 hidden items-center gap-2 sm:flex">
                        <span className="text-[10px] font-medium text-[#8C6A32]">
                            {String(currentIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[8px] text-[#B58A3A]/40">/</span>
                        <span className="text-[10px] font-medium text-[#8C6A32]">
                            {String(Math.min(products.length, 4)).padStart(2, "0")}
                        </span>
                    </div>

                    {/* LEFT ARROW */}
                    <button
                        type="button"
                        onClick={() => scroll("prev")}
                        aria-label="Produits précédents"
                        className="absolute -left-2 top-[38%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#B58A3A]/20 bg-[#FCF8F1]/80 text-[#211B16] shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-[#B58A3A] hover:bg-[#B58A3A] hover:text-white hover:shadow-lg hover:shadow-[#B58A3A]/20 lg:flex sm:-left-4 xl:-left-6"
                    >
                        <ChevronLeft size={18} strokeWidth={1.2} />
                    </button>

                    {/* PRODUCTS */}
                    <div
                        ref={sliderRef}
                        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 sm:gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                data-product-card
                                className="min-w-0 shrink-0 snap-start basis-[85%] animate-fade-in-up sm:basis-[48%] md:basis-[38%] lg:basis-[31.8%] xl:basis-[23.8%]"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {/* RIGHT ARROW */}
                    <button
                        type="button"
                        onClick={() => scroll("next")}
                        aria-label="Produits suivants"
                        className="absolute -right-2 top-[38%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#B58A3A]/20 bg-[#FCF8F1]/80 text-[#211B16] shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-[#B58A3A] hover:bg-[#B58A3A] hover:text-white hover:shadow-lg hover:shadow-[#B58A3A]/20 lg:flex sm:-right-4 xl:-right-6"
                    >
                        <ChevronRight size={18} strokeWidth={1.2} />
                    </button>
                </div>

                {/* MOBILE VIEW ALL */}
                <div className="mt-6 flex justify-center sm:hidden">
                    <Link
                        to={`/shop?category=${category.slug}`}
                        className="group flex items-center gap-3 border-b border-[#B58A3A]/30 pb-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#8C6A32] transition-all duration-300 hover:border-[#B58A3A] hover:text-[#B58A3A]"
                    >
                        Voir toute la collection
                        <ArrowRight
                            size={13}
                            strokeWidth={1.3}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {/* MOBILE DOTS */}
                <div className="mt-4 flex justify-center gap-1.5 sm:hidden">
                    {products.slice(0, 4).map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                    ? "w-6 bg-[#B58A3A]"
                                    : "w-1.5 bg-[#B58A3A]/30"
                            }`}
                            onClick={() => {
                                const container = sliderRef.current;
                                if (!container) return;
                                const card = container.querySelector("[data-product-card]");
                                if (!card) return;
                                const cardWidth = card.offsetWidth + 20;
                                container.scrollTo({
                                    left: index * cardWidth,
                                    behavior: "smooth",
                                });
                            }}
                            aria-label={`Aller au produit ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
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
            `}</style>
        </section>
    );
}