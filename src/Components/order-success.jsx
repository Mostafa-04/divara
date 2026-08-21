import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Check,
    Package,
    Phone,
    MapPin,
    Sparkles,
    ArrowRight,
    Truck,
    Clock,
    Shield,
    Gift,
} from "lucide-react";

import Navbar from "./navbar";
import Footer from "./footer";

export default function OrderSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        // Récupérer la commande depuis l'état de navigation ou localStorage
        if (location.state?.order) {
            setOrder(location.state.order);
        } else {
            // Si pas de commande dans l'état, rediriger vers la boutique
            navigate('/shop');
        }
    }, [location, navigate]);

    // Formatage de la date
    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (!order) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-[#FCF8F1] flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#B58A3A] border-t-transparent mx-auto" />
                        <p className="mt-4 text-[#8F8175]">Chargement...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#FCF8F1] text-[#211B16]">

                <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">

                    {/* =====================================================
                        SUCCESS HEADER
                    ====================================================== */}
                    <div className="text-center animate-fade-in-up">
                        {/* Icône de succès avec animation */}
                        <div className="mx-auto relative">
                            <div className="relative bg-[#F7F0E4] h-24 w-24 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                <Check
                                    size={35}
                                    strokeWidth={1.5}
                                    className="text-[#B58A3A] animate-check"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-3">
                            <span className="h-px w-8 bg-[#B58A3A]/40" />
                            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#B58A3A] flex items-center gap-2">
                                <Sparkles size={10} className="text-[#B58A3A]" />
                                Merci pour votre confiance
                            </span>
                            <span className="h-px w-8 bg-[#B58A3A]/40" />
                        </div>

                        <h1 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl text-[#211B16]">
                            Commande confirmée
                            <span className="block text-[#B58A3A] italic text-xl sm:text-2xl mt-2">
                                Votre parfum vous attend
                            </span>
                        </h1>

                        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#8F8175]">
                            Votre commande a bien été enregistrée.
                            Notre équipe vous contactera prochainement
                            pour confirmer la livraison.
                        </p>

                        {/* Badge de statut */}
                        <div className="mt-6 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-emerald-700">
                                Commande validée
                            </span>
                        </div>
                    </div>

                    {/* =====================================================
                        ORDER INFO
                    ====================================================== */}
                    <div className="mt-10 sm:mt-12 border border-[#B58A3A]/15 bg-white/30 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up animation-delay-300 overflow-hidden">
                        {/* En-tête de la commande */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#B58A3A]/15 p-5 sm:p-6 gap-3 bg-[#F7F0E4]/50">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#B58A3A]/10 p-2 rounded-full">
                                    <Package size={16} strokeWidth={1.3} className="text-[#B58A3A]" />
                                </div>
                                <div>
                                    <span className="text-[8px] uppercase tracking-[0.15em] text-[#8F8175] block">
                                        Numéro de commande
                                    </span>
                                    <span className="font-mono text-sm font-semibold tracking-wide">
                                        #{order.order_number}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-[8px] uppercase tracking-[0.15em] text-[#8F8175] block">
                                    Date
                                </span>
                                <span className="text-xs text-[#211B16]">
                                    {formatDate(order.created_at)}
                                </span>
                            </div>
                        </div>

                        {/* Infos client */}
                        <div className="grid gap-5 p-5 sm:p-6 sm:grid-cols-2">
                            <div className="flex items-start gap-3 group">
                                <div className="bg-[#B58A3A]/10 p-2 rounded-full transition-colors duration-300 group-hover:bg-[#B58A3A]/20">
                                    <Phone size={16} strokeWidth={1.3} className="text-[#B58A3A]" />
                                </div>
                                <div>
                                    <p className="text-[8px] uppercase tracking-[0.15em] text-[#8F8175]">
                                        Téléphone
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-[#211B16]">
                                        {order.customer?.phone || "Non renseigné"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 group">
                                <div className="bg-[#B58A3A]/10 p-2 rounded-full transition-colors duration-300 group-hover:bg-[#B58A3A]/20">
                                    <MapPin size={16} strokeWidth={1.3} className="text-[#B58A3A]" />
                                </div>
                                <div>
                                    <p className="text-[8px] uppercase tracking-[0.15em] text-[#8F8175]">
                                        Livraison
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-[#211B16]">
                                        {order.customer?.city || "Non renseigné"}
                                    </p>
                                    {order.customer?.address && (
                                        <p className="text-[10px] text-[#8F8175] mt-0.5">
                                            {order.customer.address}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Produits */}
                        <div className="border-t border-[#B58A3A]/15 p-5 sm:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Gift size={14} strokeWidth={1.3} className="text-[#B58A3A]" />
                                <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#8F8175]">
                                    Articles commandés
                                </span>
                                <span className="text-[8px] text-[#B58A3A] font-medium">
                                    ({order.items?.length || 0})
                                </span>
                            </div>

                            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#B58A3A]/20 scrollbar-track-transparent">
                                {order.items?.map((item, index) => (
                                    <div
                                        key={item.id || index}
                                        className="flex items-center justify-between gap-4 p-2 rounded-lg transition-all duration-300 hover:bg-[#B58A3A]/5"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            {item.product?.image && (
                                                <div className="h-12 w-10 sm:h-14 sm:w-12 shrink-0 overflow-hidden bg-[#F3EBDD] rounded-md shadow-sm">
                                                    <img
                                                        src={item.product.image || `/images/products/${item.product.slug || item.product.name?.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                                                        alt={item.product?.name}
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = '/images/placeholder.jpg';
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-[#211B16] truncate">
                                                    {item.product?.name}
                                                </p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[9px] text-[#8F8175]">
                                                        × {item.quantity}
                                                    </span>
                                                    <span className="w-px h-3 bg-[#B58A3A]/20" />
                                                    <span className="text-[9px] text-[#B58A3A] font-medium">
                                                        {Number(item.unit_price || (item.total_price / item.quantity)).toFixed(2)} DH / unité
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs font-semibold text-[#211B16] whitespace-nowrap">
                                            {Number(item.total_price).toFixed(2)} DH
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-[#B58A3A]/15 pt-5 gap-2">
                                <div className="flex items-center gap-2">
                                    <Truck size={14} strokeWidth={1.3} className="text-[#B58A3A]" />
                                    <span className="text-[8px] uppercase tracking-[0.15em] text-[#8F8175]">
                                        Livraison
                                    </span>
                                    <span className="text-[9px] font-medium text-emerald-600">
                                        {order.shipping === 0 ? 'Gratuite' : `${order.shipping.toFixed(2)} DH`}
                                    </span>
                                </div>
                                <div className="flex items-end gap-4 sm:gap-6">
                                    <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8F8175]">
                                        Total
                                    </span>
                                    <span className="font-serif text-2xl sm:text-3xl text-[#211B16]">
                                        {Number(order.total).toFixed(2)} DH
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =====================================================
                        ETAPES DE LIVRAISON
                    ====================================================== */}
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up animation-delay-500">
                        {[
                            {
                                icon: Check,
                                label: "Commande validée",
                                description: "Votre commande a été confirmée",
                                active: true,
                            },
                            {
                                icon: Clock,
                                label: "En préparation",
                                description: "Notre équipe prépare votre colis",
                                active: false,
                            },
                            {
                                icon: Truck,
                                label: "Livraison",
                                description: "Vous serez notifié de l'expédition",
                                active: false,
                            },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center text-center p-4 rounded-lg border transition-all duration-300 ${
                                    step.active
                                        ? "border-[#B58A3A]/30 bg-[#F7F0E4] shadow-sm"
                                        : "border-[#B58A3A]/10 bg-white/30 opacity-60"
                                }`}
                            >
                                <div className={`p-2 rounded-full ${
                                    step.active ? "bg-[#B58A3A]/20" : "bg-[#F3EBDD]"
                                }`}>
                                    <step.icon
                                        size={18}
                                        strokeWidth={1.3}
                                        className={step.active ? "text-[#B58A3A]" : "text-[#8F8175]"}
                                    />
                                </div>
                                <h3 className={`mt-2 text-xs font-semibold ${
                                    step.active ? "text-[#211B16]" : "text-[#8F8175]"
                                }`}>
                                    {step.label}
                                </h3>
                                <p className="text-[9px] text-[#8F8175] mt-0.5 max-w-[180px]">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* =====================================================
                        BACK SHOP
                    ====================================================== */}
                    <div className="mt-10 sm:mt-12 text-center animate-fade-in-up animation-delay-700">
                        <a
                            href="/shop"
                            className="group inline-flex items-center gap-3 bg-[#211B16] px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#B58A3A] hover:shadow-lg hover:shadow-[#B58A3A]/30 rounded-lg"
                        >
                            Continuer mes achats
                            <ArrowRight
                                size={14}
                                strokeWidth={1.5}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </a>
                    </div>

                    {/* =====================================================
                        CONTACT
                    ====================================================== */}
                    <div className="mt-6 text-center">
                        <p className="text-[9px] text-[#8F8175]">
                            Une question ? Contactez notre équipe au{" "}
                            <a
                                href="tel:+212XXXXXX"
                                className="text-[#B58A3A] hover:underline font-medium"
                            >
                                +212 5XX XX XX XX
                            </a>
                        </p>
                    </div>
                </main>

                <Footer />
            </div>

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

                @keyframes check {
                    0% {
                        transform: scale(0) rotate(-30deg);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.2) rotate(5deg);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1) rotate(0deg);
                        opacity: 1;
                    }
                }

                @keyframes spinSlow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
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
                    animation: fadeInUp 0.7s ease-out forwards;
                    opacity: 0;
                }

                .animation-delay-300 {
                    animation-delay: 300ms;
                }
                .animation-delay-500 {
                    animation-delay: 500ms;
                }
                .animation-delay-700 {
                    animation-delay: 700ms;
                }

                .animate-check {
                    animation: check 0.8s ease-out forwards;
                }

                .animate-spin-slow {
                    animation: spinSlow 10s linear infinite;
                }

                .animate-pulse {
                    animation: pulse 2s ease-in-out infinite;
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
        </>
    );
}