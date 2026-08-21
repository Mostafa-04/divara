import React, { useEffect, useState } from "react";
import {
    Minus,
    Plus,
    Trash2,
    ShoppingBag,
    ArrowRight,
    Sparkles,
    Shield,
    Truck,
    RotateCcw,
    CreditCard,
    X,
} from "lucide-react";
import Navbar from "./navbar";
// استيراد البيانات من ملف JSON
import { data } from "./data"; // تأكد من تعديل المسار

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [isRemoving, setIsRemoving] = useState(null);
    const [isUpdating, setIsUpdating] = useState(null);
    const [products, setProducts] = useState([]);

    /*
    |--------------------------------------------------------------------------
    | تحميل المنتجات من JSON
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        // تحميل المنتجات من ملف JSON
        setProducts(data.products);
    }, []);

    /*
    |--------------------------------------------------------------------------
    | تحميل السلة من localStorage
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        const storedCart = localStorage.getItem("divara_cart");

        if (!storedCart) {
            setCart([]);
            return;
        }

        try {
            const parsedCart = JSON.parse(storedCart);
            // التحقق من أن المنتجات في السلة لا تزال موجودة في JSON
            const validCart = parsedCart.filter(cartItem => 
                data.products.some(product => product.id === cartItem.id)
            );
            setCart(validCart);
        } catch (error) {
            setCart([]);
        }
    }, []);

    /*
    |--------------------------------------------------------------------------
    | حفظ السلة في localStorage
    |--------------------------------------------------------------------------
    */
    const saveCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("divara_cart", JSON.stringify(newCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    /*
    |--------------------------------------------------------------------------
    | تحديث الكمية
    |--------------------------------------------------------------------------
    */
    const updateQuantity = (id, quantity) => {
        setIsUpdating(id);
        const newCart = cart.map((item) => {
            if (item.id !== id) return item;
            // التحقق من المخزون
            const product = data.products.find(p => p.id === id);
            const maxQuantity = product ? product.stock_quantity : 999;
            return {
                ...item,
                quantity: Math.min(Math.max(1, quantity), maxQuantity),
            };
        });
        saveCart(newCart);
        setTimeout(() => setIsUpdating(null), 300);
    };

    /*
    |--------------------------------------------------------------------------
    | إزالة منتج
    |--------------------------------------------------------------------------
    */
    const removeItem = (id) => {
        setIsRemoving(id);
        setTimeout(() => {
            const newCart = cart.filter((item) => item.id !== id);
            saveCart(newCart);
            setIsRemoving(null);
        }, 300);
    };

    /*
    |--------------------------------------------------------------------------
    | حساب المجموع
    |--------------------------------------------------------------------------
    */
    const total = cart.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
    );

    const subtotal = total;
    const shipping = total >= 300 ? 0 : 25;
    const finalTotal = subtotal + shipping;

    /*
    |--------------------------------------------------------------------------
    | حالة السلة فارغة
    |--------------------------------------------------------------------------
    */
    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[#FCF8F1] px-5 animate-fade-in-up">
                <div className="text-center max-w-md">
                    {/* Icône animée */}
                    <div className="mx-auto relative">
                        <div className="absolute inset-0 bg-[#B58A3A]/10 rounded-full blur-2xl animate-pulse" />
                        <div className="relative bg-[#F3EBDD] w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                            <ShoppingBag
                                size={40}
                                strokeWidth={1}
                                className="text-[#B58A3A] animate-float"
                            />
                        </div>
                    </div>

                    <h1 className="mt-6 font-serif text-3xl sm:text-4xl text-[#211B16]">
                        Votre panier est vide
                    </h1>
                    <p className="mt-3 text-sm text-[#8F8175] max-w-sm mx-auto">
                        Découvrez notre collection de parfums d'exception et trouvez votre signature olfactive.
                    </p>

                    <a
                        href="/shop"
                        className="group inline-flex items-center gap-3 mt-7 bg-[#211B16] px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#B58A3A] hover:shadow-lg hover:shadow-[#B58A3A]/30 rounded-lg"
                    >
                        Découvrir la boutique
                        <ArrowRight
                            size={14}
                            strokeWidth={1.5}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </a>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#FCF8F1] py-3">

                {/* =====================================================
                    HEADER
                ====================================================== */}
                <section className="relative border-b border-[#B58A3A]/15 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#B58A3A]/5 blur-3xl animate-pulse" />
                        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#B58A3A]/5 blur-3xl animate-pulse delay-1000" />
                    </div>

                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in-up">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="h-px w-6 sm:w-8 bg-[#B58A3A] animate-glow-line" />
                                    <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#8C6A32] flex items-center gap-2">
                                        <Sparkles size={10} className="text-[#B58A3A]" />
                                        Mon panier
                                    </span>
                                    <span className="h-px w-6 sm:w-8 bg-[#B58A3A]/40 animate-glow-line delay-500" />
                                </div>
                                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#211B16]">
                                    Votre panier
                                    <span className="block text-[#B58A3A] italic text-xl sm:text-2xl mt-1">
                                        {cart.length} article{cart.length > 1 ? "s" : ""}
                                    </span>
                                </h1>
                            </div>

                            {/* Total rapide */}
                            <div className="bg-[#F3EBDD] px-5 py-3 rounded-full shadow-sm">
                                <span className="text-[9px] uppercase tracking-[0.15em] text-[#8F8175]">
                                    Total
                                </span>
                                <span className="ml-2 font-semibold text-[#211B16]">
                                    {finalTotal.toFixed(2)} DH
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    CART CONTENT
                ====================================================== */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]">

                        {/* PRODUCTS */}
                        <div className="space-y-4 sm:space-y-5 animate-fade-in-up">
                            {cart.map((item, index) => {
                                // الحصول على معلومات المنتج الكاملة من JSON
                                const product = data.products.find(p => p.id === item.id);
                                return (
                                    <div
                                        key={item.id}
                                        className={`group flex gap-4 sm:gap-5 border-b border-[#B58A3A]/15 pb-4 sm:pb-5 transition-all duration-300 ${
                                            isRemoving === item.id
                                                ? "opacity-0 transform -translate-x-8"
                                                : "opacity-100 transform translate-x-0"
                                        }`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        {/* Image */}
                                        <div className="relative flex-shrink-0">
                                            <img
                                                src={item.image || `/images/products/${item.slug || item.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                                                alt={item.name}
                                                className="h-24 w-20 sm:h-28 sm:w-24 object-cover bg-[#F3EBDD] rounded-lg shadow-sm transition-transform duration-500 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.target.src = '/images/placeholder.jpg';
                                                }}
                                            />
                                            <div className="absolute -top-1 -right-1 bg-[#B58A3A] text-white text-[6px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                                {item.quantity}
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="flex flex-1 flex-col">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
                                                <div>
                                                    <h2 className="font-serif text-lg sm:text-xl text-[#211B16] transition-colors duration-300 group-hover:text-[#B58A3A]">
                                                        {item.name}
                                                    </h2>
                                                    <p className="text-sm text-[#8F8175]">
                                                        {Number(item.price).toFixed(2)} DH
                                                    </p>
                                                    {product && (
                                                        <p className="text-[8px] text-[#8F8175] mt-0.5">
                                                            Stock: {product.stock_quantity} unités
                                                        </p>
                                                    )}
                                                </div>
                                                <p className="text-sm font-semibold text-[#211B16] sm:text-right">
                                                    {(Number(item.price) * item.quantity).toFixed(2)} DH
                                                </p>
                                            </div>

                                            <div className="mt-auto flex items-center justify-between pt-3">
                                                {/* Quantity */}
                                                <div className="flex items-center border border-[#B58A3A]/20 rounded-lg overflow-hidden bg-white/40">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.quantity - 1)
                                                        }
                                                        disabled={item.quantity <= 1}
                                                        className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-[#8F8175] transition-all duration-300 hover:bg-[#B58A3A] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#8F8175]"
                                                    >
                                                        <Minus size={12} strokeWidth={1.5} />
                                                    </button>
                                                    <span className={`w-8 sm:w-10 text-center text-xs font-medium transition-all duration-300 ${
                                                        isUpdating === item.id ? "scale-110 text-[#B58A3A]" : ""
                                                    }`}>
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.quantity + 1)
                                                        }
                                                        disabled={product ? item.quantity >= product.stock_quantity : false}
                                                        className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-[#8F8175] transition-all duration-300 hover:bg-[#B58A3A] hover:text-white ${
                                                            product && item.quantity >= product.stock_quantity ? 'opacity-40 cursor-not-allowed' : ''
                                                        }`}
                                                    >
                                                        <Plus size={12} strokeWidth={1.5} />
                                                    </button>
                                                </div>

                                                {/* Remove */}
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-[#8F8175] transition-all duration-300 hover:text-red-600 hover:scale-110 p-2 -m-2"
                                                    aria-label="Supprimer"
                                                >
                                                    <Trash2 size={16} strokeWidth={1.3} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* SUMMARY */}
                        <div className="lg:sticky lg:top-24 h-fit animate-fade-in-up animation-delay-300">
                            <div className="border border-[#B58A3A]/15 bg-[#F7F0E4] p-5 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles size={16} className="text-[#B58A3A]" />
                                    <h2 className="font-serif text-2xl text-[#211B16]">
                                        Résumé
                                    </h2>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-[#8F8175]">
                                            Sous-total
                                        </span>
                                        <span className="text-sm font-medium">
                                            {subtotal.toFixed(2)} DH
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-[#8F8175]">
                                            Livraison
                                        </span>
                                        <span className={`text-sm font-medium ${shipping === 0 ? "text-emerald-600" : "text-[#8F8175]"}`}>
                                            {shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)} DH`}
                                        </span>
                                    </div>

                                    {shipping > 0 && (
                                        <div className="bg-[#B58A3A]/10 p-3 rounded-lg">
                                            <p className="text-[9px] text-[#8C6A32] uppercase tracking-[0.1em] flex items-center gap-2">
                                                <Truck size={12} />
                                                Plus que {(300 - subtotal).toFixed(2)} DH pour la livraison gratuite
                                            </p>
                                            <div className="mt-2 h-1 w-full bg-[#E9DED0] rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#B58A3A] rounded-full transition-all duration-500"
                                                    style={{ width: `${Math.min((subtotal / 300) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="h-px bg-[#B58A3A]/15" />

                                    <div className="flex items-center justify-between">
                                        <span className="font-serif text-lg">
                                            Total
                                        </span>
                                        <span className="text-xl font-bold text-[#211B16]">
                                            {finalTotal.toFixed(2)} DH
                                        </span>
                                    </div>
                                </div>

                                {/* Bouton commande */}
                                <a
                                    href="/checkout"
                                    className="group relative mt-6 flex w-full items-center justify-center gap-3 bg-[#211B16] py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#B58A3A] hover:shadow-lg hover:shadow-[#B58A3A]/30 rounded-lg overflow-hidden"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#B58A3A] to-[#D4A84B] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <span className="relative z-10 flex items-center gap-3">
                                        Passer la commande
                                        <ArrowRight
                                            size={14}
                                            strokeWidth={1.5}
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </span>
                                </a>

                                {/* Informations de paiement */}
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.12em] text-[#8F8175]">
                                        <CreditCard size={12} strokeWidth={1.3} />
                                        Paiement sécurisé
                                    </div>
                                    <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.12em] text-[#8F8175]">
                                        <Shield size={12} strokeWidth={1.3} />
                                        Livraison offerte dès 300 DH
                                    </div>
                                    <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.12em] text-[#8F8175]">
                                        <RotateCcw size={12} strokeWidth={1.3} />
                                        Retour sous 14 jours
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
                STYLES GLOBAUX
            ====================================================== */}
            <style jsx>{`
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

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-8px);
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

                .animation-delay-300 {
                    animation-delay: 300ms;
                }

                .animate-glow-line {
                    animation: glowLine 2s ease-in-out infinite;
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
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
        </>
    );
}