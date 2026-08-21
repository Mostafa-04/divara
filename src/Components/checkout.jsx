import React, { useMemo, useState, useEffect } from "react";
import {
    ArrowLeft,
    Check,
    MapPin,
    Phone,
    User,
    ShoppingBag,
    Sparkles,
    Shield,
    Truck,
    Clock,
    CreditCard,
    ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { data } from "./data"; // استيراد البيانات من ملف JSON

export default function Checkout() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        city: "",
        address: "",
        notes: "",
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    // Charger le panier depuis localStorage
    useEffect(() => {
        try {
            const storedCart = JSON.parse(localStorage.getItem("divara_cart")) || [];
            setCart(storedCart);
        } catch {
            setCart([]);
        }
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Calcul subtotal
    |--------------------------------------------------------------------------
    */
    const subtotal = useMemo(() => {
        return cart.reduce((total, item) => {
            return total + Number(item.price) * Number(item.quantity);
        }, 0);
    }, [cart]);

    const shipping = subtotal >= 300 ? 0 : 25;
    const total = subtotal + shipping;

    /*
    |--------------------------------------------------------------------------
    | Input
    |--------------------------------------------------------------------------
    */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
        // Effacer l'erreur lorsque l'utilisateur corrige
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    */
    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Le nom est requis";
        if (!form.phone.trim()) newErrors.phone = "Le téléphone est requis";
        if (!form.city.trim()) newErrors.city = "La ville est requise";
        if (!form.address.trim()) newErrors.address = "L'adresse est requise";
        
        // Validation du téléphone marocain (optionnelle)
        const phoneRegex = /^[0-9]{10}$/;
        if (form.phone.trim() && !phoneRegex.test(form.phone.replace(/\s/g, ''))) {
            newErrors.phone = "Numéro de téléphone invalide (10 chiffres)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!cart.length) {
            alert("Votre panier est vide.");
            return;
        }

        if (!validateForm()) {
            // Scroll vers la première erreur
            const firstError = document.querySelector('.error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        setProcessing(true);

        // Créer la commande
        const order = {
            id: Date.now(),
            order_number: `DIV-${Date.now().toString().slice(-6)}`,
            created_at: new Date().toISOString(),
            customer: {
                name: form.name,
                phone: form.phone,
                city: form.city,
                address: form.address,
                notes: form.notes,
            },
            items: cart.map(item => ({
                id: item.id,
                product: {
                    id: item.id,
                    name: item.name,
                    image: item.image,
                },
                quantity: item.quantity,
                unit_price: Number(item.price),
                total_price: Number(item.price) * Number(item.quantity),
            })),
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            status: "confirmed",
        };

        // Sauvegarder la commande dans localStorage
        try {
            const orders = JSON.parse(localStorage.getItem("divara_orders")) || [];
            orders.push(order);
            localStorage.setItem("divara_orders", JSON.stringify(orders));
            
            // Vider le panier
            localStorage.removeItem("divara_cart");
            
            // Rediriger vers la page de succès avec les données de la commande
            navigate('/checkout/success', { state: { order } });
        } catch (error) {
            console.error("Erreur lors de la sauvegarde de la commande:", error);
            setErrors({ submit: "Une erreur est survenue. Veuillez réessayer." });
            setProcessing(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Empty cart
    |--------------------------------------------------------------------------
    */
    if (!cart.length) {
        return (
            <div className="min-h-screen bg-[#FCF8F1] py-3">
                <Navbar />
                <main className="mx-auto max-w-3xl px-5 py-24 text-center animate-fade-in-up">
                    <div className="mx-auto relative">
                        <div className="absolute inset-0 bg-[#B58A3A]/10 rounded-full blur-2xl animate-pulse" />
                        <div className="relative bg-[#F3EBDD] w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                            <ShoppingBag size={40} strokeWidth={1} className="text-[#B58A3A] animate-float" />
                        </div>
                    </div>
                    <h1 className="mt-6 font-serif text-3xl sm:text-4xl text-[#211B16]">
                        Votre panier est vide
                    </h1>
                    <p className="mt-3 text-sm text-[#8F8175] max-w-sm mx-auto">
                        Découvrez notre collection et ajoutez vos parfums préférés.
                    </p>
                    <a
                        href="/shop"
                        className="group inline-flex items-center gap-3 mt-8 bg-[#211B16] px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#B58A3A] hover:shadow-lg hover:shadow-[#B58A3A]/30 rounded-lg"
                    >
                        Découvrir la collection
                        <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FCF8F1] text-[#211B16]">

            <Navbar />

            {/* =====================================================
                HEADER - avec animations
            ====================================================== */}
            <section className="relative border-b border-[#B58A3A]/15 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#B58A3A]/5 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#B58A3A]/5 blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in-up">
                    <a
                        href="/cart"
                        className="group inline-flex items-center gap-2 mb-6 text-[9px] uppercase tracking-[0.15em] text-[#8F8175] transition-all duration-300 hover:text-[#B58A3A] hover:gap-3"
                    >
                        <ArrowLeft size={13} strokeWidth={1.3} className="transition-transform duration-300 group-hover:-translate-x-1" />
                        Retour au panier
                    </a>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="h-px w-6 sm:w-8 bg-[#B58A3A] animate-glow-line" />
                                <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#8C6A32] flex items-center gap-2">
                                    <Sparkles size={10} className="text-[#B58A3A]" />
                                    Commande
                                </span>
                                <span className="h-px w-6 sm:w-8 bg-[#B58A3A]/40 animate-glow-line delay-500" />
                            </div>
                            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.04em]">
                                Finaliser la commande
                                <span className="block text-[#B58A3A] italic text-xl sm:text-2xl mt-1">
                                    {cart.length} article{cart.length > 1 ? "s" : ""}
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                CONTENT
            ====================================================== */}
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="grid gap-8 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px]">

                    {/* =================================================
                        FORM
                    ================================================== */}
                    <form
                        onSubmit={handleSubmit}
                        className="border border-[#B58A3A]/15 bg-white/30 p-5 sm:p-6 md:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up"
                    >
                        <div className="mb-8">
                            <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#B58A3A] flex items-center gap-2">
                                <MapPin size={12} strokeWidth={1.5} />
                                Livraison
                            </span>
                            <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                                Vos informations
                            </h2>
                            <p className="mt-1 text-xs text-[#8F8175]">
                                Remplissez les champs ci-dessous pour finaliser votre commande.
                            </p>
                        </div>

                        {/* Name */}
                        <div className="mb-5 group">
                            <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8F8175] transition-colors duration-300 group-focus-within:text-[#B58A3A]">
                                Nom complet
                            </label>
                            <div className="relative">
                                <User
                                    size={15}
                                    strokeWidth={1.3}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8F8175] transition-colors duration-300 group-focus-within:text-[#B58A3A]"
                                />
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Votre nom complet"
                                    className={`h-12 w-full border ${errors.name ? 'border-red-400' : 'border-[#B58A3A]/20'} bg-[#FCF8F1] pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-[#B58A3A] focus:bg-white/60 focus:shadow-lg focus:shadow-[#B58A3A]/5 rounded-lg`}
                                    required
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-2 text-xs text-red-600 animate-fade-in-up error-message">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="mb-5 group">
                            <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8F8175] transition-colors duration-300 group-focus-within:text-[#B58A3A]">
                                Téléphone
                            </label>
                            <div className="relative">
                                <Phone
                                    size={15}
                                    strokeWidth={1.3}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8F8175] transition-colors duration-300 group-focus-within:text-[#B58A3A]"
                                />
                                <input
                                    name="phone"
                                    type="tel"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="06 XX XX XX XX"
                                    className={`h-12 w-full border ${errors.phone ? 'border-red-400' : 'border-[#B58A3A]/20'} bg-[#FCF8F1] pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-[#B58A3A] focus:bg-white/60 focus:shadow-lg focus:shadow-[#B58A3A]/5 rounded-lg`}
                                    required
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-2 text-xs text-red-600 animate-fade-in-up error-message">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* City */}
                        <div className="mb-5 group">
                            <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8F8175] transition-colors duration-300 group-focus-within:text-[#B58A3A]">
                                Ville
                            </label>
                            <div className="relative">
                                <MapPin
                                    size={15}
                                    strokeWidth={1.3}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8F8175] transition-colors duration-300 group-focus-within:text-[#B58A3A]"
                                />
                                <input
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    placeholder="Casablanca"
                                    className={`h-12 w-full border ${errors.city ? 'border-red-400' : 'border-[#B58A3A]/20'} bg-[#FCF8F1] pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-[#B58A3A] focus:bg-white/60 focus:shadow-lg focus:shadow-[#B58A3A]/5 rounded-lg`}
                                    required
                                />
                            </div>
                            {errors.city && (
                                <p className="mt-2 text-xs text-red-600 animate-fade-in-up error-message">
                                    {errors.city}
                                </p>
                            )}
                        </div>

                        {/* Address */}
                        <div className="mb-5 group">
                            <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8F8175] transition-colors duration-300 group-focus-within:text-[#B58A3A]">
                                Adresse
                            </label>
                            <textarea
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Votre adresse complète..."
                                className={`w-full resize-none border ${errors.address ? 'border-red-400' : 'border-[#B58A3A]/20'} bg-[#FCF8F1] p-4 text-sm outline-none transition-all duration-300 focus:border-[#B58A3A] focus:bg-white/60 focus:shadow-lg focus:shadow-[#B58A3A]/5 rounded-lg`}
                                required
                            />
                            {errors.address && (
                                <p className="mt-2 text-xs text-red-600 animate-fade-in-up error-message">
                                    {errors.address}
                                </p>
                            )}
                        </div>

                        {/* Notes */}
                        <div className="group">
                            <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8F8175] transition-colors duration-300 group-focus-within:text-[#B58A3A]">
                                Note
                                <span className="ml-1 text-[#8F8175] font-normal">
                                    (optionnel)
                                </span>
                            </label>
                            <textarea
                                name="notes"
                                value={form.notes}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Une précision pour votre livraison..."
                                className="w-full resize-none border border-[#B58A3A]/20 bg-[#FCF8F1] p-4 text-sm outline-none transition-all duration-300 focus:border-[#B58A3A] focus:bg-white/60 focus:shadow-lg focus:shadow-[#B58A3A]/5 rounded-lg"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="group relative mt-8 flex h-14 w-full items-center justify-center gap-3 bg-[#211B16] text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#B58A3A] hover:shadow-lg hover:shadow-[#B58A3A]/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#211B16] rounded-lg overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-[#B58A3A] to-[#D4A84B] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            {processing ? (
                                <span className="relative z-10 flex items-center gap-2">
                                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                    Traitement...
                                </span>
                            ) : (
                                <span className="relative z-10 flex items-center gap-3">
                                    <Check size={15} strokeWidth={1.5} />
                                    Confirmer ma commande
                                    <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            )}
                        </button>

                        {/* Erreur générale */}
                        {errors.submit && (
                            <p className="mt-4 text-center text-xs text-red-600 animate-fade-in-up">
                                {errors.submit}
                            </p>
                        )}

                        {/* Sécurité */}
                        <div className="mt-4 flex items-center justify-center gap-4 text-[8px] uppercase tracking-[0.12em] text-[#8F8175]">
                            <span className="flex items-center gap-1.5">
                                <Shield size={12} strokeWidth={1.3} />
                                Paiement sécurisé
                            </span>
                            <span className="w-px h-3 bg-[#B58A3A]/20" />
                            <span className="flex items-center gap-1.5">
                                <Clock size={12} strokeWidth={1.3} />
                                Livraison rapide
                            </span>
                        </div>
                    </form>

                    {/* =================================================
                        ORDER SUMMARY
                    ================================================== */}
                    <aside className="lg:sticky lg:top-24 h-fit animate-fade-in-up animation-delay-300">
                        <div className="border border-[#B58A3A]/15 bg-white/30 p-5 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="mb-6">
                                <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#B58A3A] flex items-center gap-2">
                                    <ShoppingBag size={12} strokeWidth={1.5} />
                                    Votre sélection
                                </span>
                                <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                                    Résumé
                                </h2>
                            </div>

                            {/* Products */}
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#B58A3A]/20 scrollbar-track-transparent">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-3 sm:gap-4 group hover:bg-[#B58A3A]/5 p-2 rounded-lg transition-colors duration-300">
                                        <div className="h-20 w-16 sm:h-24 sm:w-20 shrink-0 overflow-hidden bg-[#F3EBDD] rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
                                            <img
                                                src={item.image || `/images/products/${item.slug || item.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = '/images/placeholder.jpg';
                                                }}
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-serif text-sm sm:text-base line-clamp-1">
                                                {item.name}
                                            </h3>
                                            <p className="mt-0.5 text-[8px] uppercase tracking-[0.1em] text-[#8F8175]">
                                                Qté : {item.quantity}
                                            </p>
                                            <p className="mt-1 text-xs font-semibold text-[#211B16]">
                                                {(Number(item.price) * Number(item.quantity)).toFixed(2)} DH
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="mt-6 border-t border-[#B58A3A]/15 pt-5">
                                <div className="flex justify-between text-xs text-[#8F8175]">
                                    <span>Sous-total</span>
                                    <span>{subtotal.toFixed(2)} DH</span>
                                </div>
                                <div className="mt-2 flex justify-between text-xs">
                                    <span className="text-[#8F8175]">Livraison</span>
                                    <span className={shipping === 0 ? "text-emerald-600 font-medium" : "text-[#8F8175]"}>
                                        {shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)} DH`}
                                    </span>
                                </div>

                                {shipping > 0 && (
                                    <div className="mt-3 bg-[#B58A3A]/10 p-3 rounded-lg">
                                        <p className="text-[8px] text-[#8C6A32] uppercase tracking-[0.1em] flex items-center gap-2">
                                            <Truck size={10} />
                                            Plus que {(300 - subtotal).toFixed(2)} DH pour la livraison gratuite
                                        </p>
                                        <div className="mt-1.5 h-1 w-full bg-[#E9DED0] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#B58A3A] rounded-full transition-all duration-500"
                                                style={{ width: `${Math.min((subtotal / 300) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4 flex items-end justify-between border-t border-[#B58A3A]/10 pt-4">
                                    <span className="text-[9px] font-semibold uppercase tracking-[0.15em]">
                                        Total
                                    </span>
                                    <span className="font-serif text-2xl sm:text-3xl text-[#211B16]">
                                        {total.toFixed(2)} DH
                                    </span>
                                </div>
                            </div>

                            {/* COD */}
                            <div className="mt-5 border border-[#B58A3A]/15 bg-[#F7F0E4] p-4 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <CreditCard size={14} strokeWidth={1.3} className="text-[#B58A3A]" />
                                    <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#8C6A32]">
                                        Paiement
                                    </p>
                                </div>
                                <p className="mt-2 text-xs leading-5 text-[#6F6257]">
                                    Paiement à la livraison. Notre équipe vous contactera pour confirmer votre commande.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}

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

    .scrollbar-thin::-webkit-scrollbar {
        width: 4px;
    }

    .scrollbar-thin::-webkit-scrollbar-track {
        background: transparent;
    }

    .scrollbar-thin::-webkit-scrollbar-thumb {
        background: rgba(181, 138, 58, 0.2);
        border-radius: 10px;
    }

    .scrollbar-thin::-webkit-scrollbar-thumb:hover {
        background: rgba(181, 138, 58, 0.4);
    }
`}</style>