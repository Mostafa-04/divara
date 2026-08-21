import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    ArrowLeft,
    Minus,
    Plus,
    ShoppingBag,
    Check,
    Heart,
    Share2,
    Sparkles,
    Truck,
    Shield,
    RotateCcw,
    Star,
    StarHalf,
} from "lucide-react";
import Navbar from "../navbar";
import { data } from "../data"; 

export default function Show() {
    const { slug } = useParams(); // Récupérer le slug depuis l'URL
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [product, setProduct] = useState(null);
    const [productCategory, setProductCategory] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const imageRef = useRef(null);

    // تحميل المنتج من JSON باستخدام slug
    useEffect(() => {
        if (!slug) {
            navigate('/shop');
            return;
        }

        const foundProduct = data.products.find(p => p.slug === slug);
        
        if (foundProduct) {
            setProduct(foundProduct);
            // Trouver la catégorie du produit
            const category = data.categories.find(c => c.id === foundProduct.category_id);
            setProductCategory(category);
            
            // Trouver les produits similaires (même catégorie, différent ID)
            const related = data.products
                .filter(p => p.category_id === foundProduct.category_id && p.id !== foundProduct.id && p.is_active)
                .slice(0, 4);
            setRelatedProducts(related);
        } else {
            // Rediriger vers la boutique si le produit n'existe pas
            navigate('/shop');
        }
    }, [slug, navigate]);

    // Mettre à jour la quantité lorsque le produit change
    useEffect(() => {
        setQuantity(1);
        setAdded(false);
        setIsAnimating(false);
        setActiveImage(0);
    }, [product]);

    // Si le produit n'est pas trouvé
    if (!product) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-[#FCF8F1] text-[#211B16] flex items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto w-20 h-20 bg-[#F3EBDD] rounded-full flex items-center justify-center mb-4">
                            <Sparkles size={32} className="text-[#B58A3A]" />
                        </div>
                        <h2 className="font-serif text-2xl text-[#211B16] mb-2">Chargement...</h2>
                        <p className="text-[#8F8175] text-sm">Veuillez patienter un instant.</p>
                    </div>
                </div>
            </>
        );
    }

    // Images supplémentaires (simulées à partir de la même image)
    const images = [
        product.image,
        product.image,
        product.image,
        product.image,
    ];

    // Avis simulés
    const reviews = [
        { rating: 5, text: "Parfum exceptionnel, tient toute la journée !", author: "Marie L." },
        { rating: 4, text: "Très belle fragrance, élégante et raffinée.", author: "Sophie M." },
        { rating: 5, text: "Devenu mon parfum signature, je le recommande.", author: "Julie D." },
    ];

    const averageRating = 4.7;
    const totalReviews = 28;

    /*
    |--------------------------------------------------------------------------
    | Add product to cart
    |--------------------------------------------------------------------------
    */
    const addToCart = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        // Vérifier le stock
        if (product.stock_quantity <= 0) {
            setIsAnimating(false);
            return;
        }

        const storedCart = localStorage.getItem("divara_cart");
        let cart = [];

        try {
            cart = storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            cart = [];
        }

        // Limiter la quantité au stock disponible
        const existingProductIndex = cart.findIndex(
            (item) => item.id === product.id
        );

        let newQuantity = quantity;
        if (existingProductIndex !== -1) {
            const currentQuantity = cart[existingProductIndex].quantity;
            if (currentQuantity + quantity > product.stock_quantity) {
                newQuantity = product.stock_quantity - currentQuantity;
                if (newQuantity <= 0) {
                    setIsAnimating(false);
                    return;
                }
            }
            cart[existingProductIndex].quantity += newQuantity;
        } else {
            if (quantity > product.stock_quantity) {
                newQuantity = product.stock_quantity;
            }
            cart.push({
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: Number(product.price),
                image: product.image,
                quantity: newQuantity,
                category: productCategory?.name || '',
            });
        }

        localStorage.setItem("divara_cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));

        setAdded(true);
        setTimeout(() => {
            setAdded(false);
            setIsAnimating(false);
        }, 2000);
    };

    /*
    |--------------------------------------------------------------------------
    | Quantity
    |--------------------------------------------------------------------------
    */
    const increaseQuantity = () => {
        if (quantity < Math.min(10, product.stock_quantity)) {
            setQuantity((value) => value + 1);
        }
    };

    const decreaseQuantity = () => {
        setQuantity((value) => (value > 1 ? value - 1 : 1));
    };

    /*
    |--------------------------------------------------------------------------
    | Change image
    |--------------------------------------------------------------------------
    */
    const changeImage = (index) => {
        if (index !== activeImage) {
            setActiveImage(index);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#FCF8F1] text-[#211B16] py-22">

                {/* =====================================================
                    TOP
                ====================================================== */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 pt-4 sm:pt-6 lg:pt-8">

                    {/* Back */}
                    <Link
                        to="/shop"
                        className="group inline-flex items-center gap-2 mb-6 sm:mb-8 text-[9px] font-medium uppercase tracking-[0.2em] text-[#8F8175] transition-all duration-300 hover:text-[#B58A3A] hover:gap-3"
                    >
                        <ArrowLeft
                            size={14}
                            strokeWidth={1.3}
                            className="transition-transform duration-300 group-hover:-translate-x-1.5"
                        />
                        Retour à la boutique
                    </Link>

                    {/* =================================================
                        PRODUCT
                    ================================================== */}
                    <div className="grid grid-cols-1 gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-2 animate-fade-in-up">

                        {/* =========================
                            IMAGE GALLERY
                        ========================== */}
                        <div className="relative">
                            {/* Badge de luxe */}
                            <div className="absolute top-4 left-4 z-10 bg-[#B58A3A] text-white px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.2em] shadow-lg animate-float">
                                <span className="flex items-center gap-1.5">
                                    <Sparkles size={10} />
                                    {product.is_featured ? "Best Seller" : "Édition Limitée"}
                                </span>
                            </div>

                            {/* Rupture de stock */}
                            {product.stock_quantity === 0 && (
                                <div className="absolute inset-0 z-10 bg-black/50 flex items-center justify-center rounded-lg">
                                    <span className="bg-red-600 text-white px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] rounded-lg">
                                        Rupture de stock
                                    </span>
                                </div>
                            )}

                            {/* Image principale */}
                            <div 
                                ref={imageRef}
                                className="relative aspect-[4/5] overflow-hidden bg-[#F3EBDD] rounded-lg shadow-lg group"
                            >
                                <img
                                    src={product.image || `/images/products/${product.slug}.jpg`}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.src = '/images/placeholder.jpg';
                                    }}
                                />

                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#211B16]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Zoom indicator */}
                                <div className="absolute bottom-4 right-4 bg-[#FCF8F1]/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[7px] font-medium uppercase tracking-[0.15em] text-[#8C6A32] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="flex items-center gap-1.5">
                                        <span className="text-[10px]">🔍</span>
                                        Agrandir
                                    </span>
                                </div>
                            </div>

                            {/* Miniatures */}
                            <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => changeImage(index)}
                                        className={`relative aspect-square overflow-hidden bg-[#F3EBDD] rounded-md transition-all duration-300 ${
                                            index === activeImage
                                                ? "ring-2 ring-[#B58A3A] ring-offset-2 ring-offset-[#FCF8F1] scale-95"
                                                : "opacity-70 hover:opacity-100 hover:scale-95"
                                        }`}
                                    >
                                        <img
                                            src={img || `/images/products/${product.slug}.jpg`}
                                            alt={`${product.name} - vue ${index + 1}`}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.target.src = '/images/placeholder.jpg';
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* =========================
                            INFORMATION
                        ========================== */}
                        <div className="flex flex-col justify-center">

                            {/* Category */}
                            {productCategory && (
                                <p className="mb-3 sm:mb-4 text-[8px] font-semibold uppercase tracking-[0.3em] text-[#B58A3A] flex items-center gap-2">
                                    <span className="w-6 h-px bg-[#B58A3A]/40" />
                                    {productCategory.name}
                                </p>
                            )}

                            {/* Product name */}
                            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em] text-[#211B16]">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="mt-3 flex items-center gap-3">
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={`${
                                                i < Math.floor(averageRating)
                                                    ? "fill-[#B58A3A] text-[#B58A3A]"
                                                    : i < Math.ceil(averageRating) && i === Math.floor(averageRating)
                                                    ? "fill-[#B58A3A] text-[#B58A3A]"
                                                    : "text-[#D4C5B5]"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-[11px] font-medium text-[#8C6A32]">
                                    {averageRating.toFixed(1)}
                                </span>
                                <span className="text-[10px] text-[#9F9388]">
                                    ({totalReviews} avis)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="mt-4 sm:mt-6 flex items-center gap-4">
                                <span className="text-2xl sm:text-3xl font-medium text-[#211B16]">
                                    {Number(product.price).toFixed(2)} DH
                                </span>
                                {product.old_price && (
                                    <span className="text-sm sm:text-base text-[#9F9388] line-through">
                                        {Number(product.old_price).toFixed(2)} DH
                                    </span>
                                )}
                                {product.old_price && (
                                    <span className="bg-red-600 text-white text-[8px] font-semibold px-2 py-1 rounded-full uppercase tracking-[0.1em]">
                                        -{Math.round((1 - product.price / product.old_price) * 100)}%
                                    </span>
                                )}
                            </div>

                            {/* Separator */}
                            <div className="my-5 sm:my-7 h-px bg-gradient-to-r from-[#B58A3A]/30 to-transparent" />

                            {/* Description */}
                            {product.description && (
                                <div>
                                    <p className="text-sm leading-7 text-[#756960]">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* Stock info */}
                            <div className="mt-3 flex items-center gap-2">
                                {product.stock_quantity > 0 ? (
                                    <>
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] text-[#8F8175]">
                                            En stock - {product.stock_quantity} unités disponibles
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                        <span className="text-[10px] text-red-600 font-medium">
                                            Rupture de stock
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* =================================================
                                QUANTITY & ACTIONS
                            ================================================== */}
                            {product.stock_quantity > 0 && (
                                <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4">
                                    {/* Quantity */}
                                    <div>
                                        <p className="mb-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#8F8175]">
                                            Quantité
                                        </p>
                                        <div className="inline-flex h-12 items-center border border-[#B58A3A]/20 bg-white/30 rounded-lg overflow-hidden shadow-sm">
                                            <button
                                                type="button"
                                                onClick={decreaseQuantity}
                                                className="flex h-full w-10 sm:w-12 items-center justify-center text-[#211B16] transition-all duration-300 hover:bg-[#F3EBDD] hover:text-[#B58A3A] active:scale-95"
                                            >
                                                <Minus size={14} strokeWidth={1.3} />
                                            </button>
                                            <span className="flex w-10 sm:w-12 justify-center text-sm font-medium">
                                                {quantity}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={increaseQuantity}
                                                disabled={quantity >= Math.min(10, product.stock_quantity)}
                                                className={`flex h-full w-10 sm:w-12 items-center justify-center text-[#211B16] transition-all duration-300 hover:bg-[#F3EBDD] hover:text-[#B58A3A] active:scale-95 ${
                                                    quantity >= Math.min(10, product.stock_quantity) ? 'opacity-40 cursor-not-allowed' : ''
                                                }`}
                                            >
                                                <Plus size={14} strokeWidth={1.3} />
                                            </button>
                                        </div>
                                        {quantity >= product.stock_quantity && (
                                            <p className="mt-1 text-[8px] text-amber-600">
                                                Quantité maximale disponible
                                            </p>
                                        )}
                                    </div>

                                    {/* Wishlist */}
                                    <button
                                        type="button"
                                        onClick={() => setIsLiked(!isLiked)}
                                        className="h-12 w-12 flex items-center justify-center border border-[#B58A3A]/20 bg-white/30 rounded-lg transition-all duration-300 hover:border-[#B58A3A] hover:bg-[#B58A3A]/5 active:scale-95"
                                        aria-label="Ajouter aux favoris"
                                    >
                                        <Heart
                                            size={18}
                                            strokeWidth={1.3}
                                            className={`transition-all duration-300 ${
                                                isLiked ? "fill-red-500 text-red-500 scale-110" : "text-[#211B16]"
                                            }`}
                                        />
                                    </button>

                                    {/* Share */}
                                    <button
                                        type="button"
                                        className="h-12 w-12 flex items-center justify-center border border-[#B58A3A]/20 bg-white/30 rounded-lg transition-all duration-300 hover:border-[#B58A3A] hover:bg-[#B58A3A]/5 active:scale-95"
                                        aria-label="Partager"
                                        onClick={() => {
                                            if (navigator.share) {
                                                navigator.share({
                                                    title: product.name,
                                                    text: product.description,
                                                    url: window.location.href,
                                                });
                                            }
                                        }}
                                    >
                                        <Share2 size={18} strokeWidth={1.3} className="text-[#211B16]" />
                                    </button>
                                </div>
                            )}

                            {/* =================================================
                                ADD TO CART
                            ================================================== */}
                            {product.stock_quantity > 0 ? (
                                <button
                                    type="button"
                                    onClick={addToCart}
                                    disabled={isAnimating}
                                    className={`mt-6 flex h-14 w-full items-center justify-center gap-3 px-6 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#F7F0E4] transition-all duration-300 rounded-lg relative overflow-hidden ${
                                        added
                                            ? "bg-emerald-600 hover:bg-emerald-700"
                                            : "bg-[#211B16] hover:bg-[#B58A3A] hover:shadow-lg hover:shadow-[#B58A3A]/30"
                                    }`}
                                >
                                    {/* Ripple effect */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#B58A3A] to-[#D4A84B] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {added ? (
                                        <>
                                            <Check size={16} strokeWidth={1.5} className="relative z-10 animate-bounce" />
                                            <span className="relative z-10">Produit ajouté !</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag size={16} strokeWidth={1.3} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
                                            <span className="relative z-10">Ajouter au panier</span>
                                            <span className="relative z-10 text-[8px] opacity-70">
                                                ({quantity})
                                            </span>
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    disabled
                                    className="mt-6 flex h-14 w-full items-center justify-center gap-3 px-6 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8F8175] bg-[#E9DED0] rounded-lg cursor-not-allowed"
                                >
                                    <span>Rupture de stock</span>
                                </button>
                            )}

                            {/* =================================================
                                INFORMATIONS
                            ================================================== */}
                            <div className="mt-6 sm:mt-8 space-y-3 border-t border-[#B58A3A]/15 pt-5 sm:pt-6">
                                {[
                                    { icon: Truck, label: "Livraison", value: "Gratuite dès 300 DH" },
                                    { icon: Shield, label: "Paiement sécurisé", value: "CB, PayPal, etc." },
                                    { icon: RotateCcw, label: "Retour", value: "Sous 14 jours" },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between py-1.5 group cursor-default"
                                    >
                                        <span className="flex items-center gap-2.5 text-[9px] uppercase tracking-[0.15em] text-[#8F8175]">
                                            <item.icon
                                                size={14}
                                                strokeWidth={1.3}
                                                className="text-[#B58A3A] group-hover:scale-110 transition-transform duration-300"
                                            />
                                            {item.label}
                                        </span>
                                        <span className="text-[9px] text-[#211B16] font-medium">
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        RELATED PRODUCTS
                    ================================================== */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-16 sm:mt-20 pt-8 sm:pt-12 border-t border-[#B58A3A]/15 animate-fade-in-up animation-delay-300">
                            <h3 className="font-serif text-xl sm:text-2xl text-[#211B16] mb-6">
                                Vous aimerez aussi
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                {relatedProducts.map((relatedProduct) => (
                                    <Link
                                        key={relatedProduct.id}
                                        to={`/products/${relatedProduct.slug}`}
                                        className="group block"
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden bg-[#F3EBDD] rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:shadow-[#B58A3A]/10">
                                            <img
                                                src={relatedProduct.image || `/images/products/${relatedProduct.slug}.jpg`}
                                                alt={relatedProduct.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.target.src = '/images/placeholder.jpg';
                                                }}
                                            />
                                        </div>
                                        <h4 className="mt-2 text-sm font-serif text-[#211B16] group-hover:text-[#B58A3A] transition-colors duration-300">
                                            {relatedProduct.name}
                                        </h4>
                                        <p className="text-[11px] font-medium text-[#211B16]">
                                            {Number(relatedProduct.price).toFixed(2)} DH
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* =================================================
                        REVIEWS SECTION
                    ================================================== */}
                    <div className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-12 border-t border-[#B58A3A]/15 animate-fade-in-up animation-delay-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-serif text-xl sm:text-2xl text-[#211B16]">
                                Avis clients
                            </h3>
                            <span className="text-[10px] text-[#8C6A32]">
                                {totalReviews} avis
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-[#B58A3A]/10 transition-all duration-300 hover:shadow-md hover:border-[#B58A3A]/20"
                                >
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                className={`${
                                                    i < review.rating
                                                        ? "fill-[#B58A3A] text-[#B58A3A]"
                                                        : "text-[#D4C5B5]"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[12px] text-[#756960] leading-relaxed">
                                        "{review.text}"
                                    </p>
                                    <p className="mt-2 text-[9px] font-medium text-[#8C6A32]">
                                        - {review.author}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-6px);
                    }
                }

                .animate-fade-in-up {
                    animation: fadeInUp 0.7s ease-out forwards;
                    opacity: 0;
                }

                .animation-delay-300 {
                    animation-delay: 300ms;
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animate-bounce {
                    animation: bounce 0.5s ease-in-out;
                }

                @keyframes bounce {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.2);
                    }
                }
            `}</style>
        </>
    );
}