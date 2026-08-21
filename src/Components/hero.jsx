import React from "react";
import { ArrowRight, Sparkles, ChevronDown, Zap } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#F7F0E4] text-[#211B16] py-3">

            {/* =====================================================
                FOND ANIMÉ
            ====================================================== */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Glows animés */}
                <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#D8C7AA]/20 blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#B58A3A]/15 blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#B58A3A]/5 blur-3xl animate-pulse delay-2000" />

                {/* Particules décoratives */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-[#B58A3A]/10 animate-float-particle"
                        style={{
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${Math.random() * 4 + 3}s`,
                        }}
                    />
                ))}

                {/* Lignes décoratives */}
                <div className="absolute left-[8%] top-[18%] hidden h-px w-20 bg-[#B58A3A]/40 lg:block animate-glow-line" />
                <div className="absolute right-[8%] top-[28%] hidden h-px w-24 bg-[#B58A3A]/40 lg:block animate-glow-line delay-1000" />
                <div className="absolute left-[5%] bottom-[25%] hidden h-px w-16 bg-[#B58A3A]/30 lg:block animate-glow-line delay-2000" />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-5 py-14 sm:px-8 lg:px-12 lg:py-16">

                <div className="grid w-full items-center gap-10 lg:gap-14 lg:grid-cols-2 xl:gap-20">

                    {/* =====================================================
                        CONTENU GAUCHE
                    ====================================================== */}
                    <div className="relative z-10 text-center lg:text-left animate-fade-in-up">

                        {/* Eyebrow */}
                        <div className="mb-6 flex items-center justify-center gap-3 lg:justify-start">
                            <span className="h-px w-6 sm:w-8 bg-[#B58A3A] animate-glow-line" />
                            <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#8C6A32]">
                                Maison de Parfums
                            </span>
                            <span className="h-px w-6 sm:w-8 bg-[#B58A3A] lg:hidden animate-glow-line" />
                        </div>

                        {/* Titre principal */}
                        <h1 className="font-serif text-[3.5rem] font-medium leading-[0.88] tracking-[-0.04em] text-[#211B16] sm:text-[5rem] md:text-[6rem] lg:text-[6.5rem] xl:text-[7.5rem]">
                            Discover
                            <span className="mt-2 block italic text-[#B58A3A] relative">
                                Divara
                                <span className="absolute -bottom-3 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 w-16 h-[2px] bg-[#B58A3A]/40 rounded-full" />
                            </span>
                        </h1>

                        {/* Sous-titre */}
                        <p className="mx-auto mt-6 sm:mt-7 max-w-lg text-sm leading-7 text-[#6F6257] sm:text-base lg:mx-0 lg:text-[17px] lg:leading-8">
                            Des fragrances d'exception pensées pour révéler
                            votre personnalité et laisser une empreinte
                            inoubliable.
                        </p>

                        {/* Boutons */}
                        <div className="mt-8 sm:mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                            <a
                                href="/shop"
                                className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-[#211B16] px-6 sm:px-7 py-3.5 sm:py-4 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-[#F7F0E4] transition-all duration-300 hover:bg-[#B58A3A] hover:text-white hover:gap-5 hover:shadow-xl hover:shadow-[#B58A3A]/20 relative overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-[#B58A3A] to-[#D4A84B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative z-10">Découvrir la collection</span>
                                <ArrowRight
                                    size={14}
                                    strokeWidth={1.5}
                                    className="relative z-10 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
                                />
                            </a>

                            <a
                                href="/shop?category=femme"
                                className="group inline-flex w-full sm:w-auto items-center justify-center px-6 sm:px-7 py-3.5 sm:py-4 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-[#211B16] ring-1 ring-inset ring-[#B58A3A]/50 transition-all duration-300 hover:bg-[#B58A3A] hover:text-white hover:ring-[#B58A3A] hover:shadow-lg hover:shadow-[#B58A3A]/20"
                            >
                                Voir les parfums
                            </a>
                        </div>

                        {/* Statistiques */}
                        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-6 sm:gap-8 lg:justify-start">
                            {[
                                { label: "Élégance", value: "Femme", icon: "✨" },
                                { label: "Caractère", value: "Homme", icon: "⚡" },
                                { label: "Signature", value: "Unique", icon: "💎" },
                            ].map((item, index) => (
                                <div key={index} className="group cursor-pointer">
                                    <p className="font-serif text-xl sm:text-2xl text-[#211B16] group-hover:text-[#B58A3A] transition-colors duration-300">
                                        {item.value}
                                    </p>
                                    <p className="mt-1 text-[8px] uppercase tracking-[0.25em] text-[#8C6A32] flex items-center justify-center gap-1">
                                        <span>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* =====================================================
                        IMAGE DROITE
                    ====================================================== */}
                    <div className="relative flex min-h-[380px] items-center justify-center sm:min-h-[480px] lg:min-h-[560px] xl:min-h-[620px] animate-fade-in-up animation-delay-300">

                        {/* Cercles décoratifs animés */}
                        <div className="absolute h-[280px] w-[280px] rounded-full border border-[#B58A3A]/25 sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] xl:h-[560px] xl:w-[560px] animate-spin-slow" />
                        <div className="absolute h-[230px] w-[230px] rounded-full border border-[#B58A3A]/10 sm:h-[340px] sm:w-[340px] lg:h-[430px] lg:w-[430px] xl:h-[480px] xl:w-[480px] animate-spin-slow-reverse" />
                        <div className="absolute h-[180px] w-[180px] rounded-full border border-[#B58A3A]/5 sm:h-[280px] sm:w-[280px] lg:h-[360px] lg:w-[360px] xl:h-[400px] xl:w-[400px] animate-pulse" />

                        {/* Ornement doré */}
                        <div className="absolute top-4 sm:top-6 lg:top-8 flex flex-col items-center animate-float">
                            <div className="mb-2 flex items-center gap-2 sm:gap-3">
                                <span className="h-px w-6 sm:w-8 lg:w-10 bg-[#B58A3A]/60 animate-glow-line" />
                                <Sparkles
                                    size={15}
                                    strokeWidth={1}
                                    className="text-[#B58A3A] animate-spin-slow"
                                />
                                <span className="h-px w-6 sm:w-8 lg:w-10 bg-[#B58A3A]/60 animate-glow-line delay-500" />
                            </div>
                            <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.4em] sm:tracking-[0.45em] text-[#8C6A32]">
                                Divara
                            </span>
                        </div>

                        {/* Image produit */}
                        <div className="relative z-10 h-[340px] w-[240px] sm:h-[460px] sm:w-[320px] lg:h-[520px] lg:w-[370px] xl:h-[580px] xl:w-[420px] overflow-hidden group">
                            <img
                                src="/divara.png"
                                alt="Divara Parfums"
                                className="h-full w-full object-cover object-center transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2"
                            />
                            
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#211B16]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Reflet lumineux */}
                            <div className="absolute -inset-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        </div>

                        {/* Étiquette flottante */}
                        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 z-20 -translate-x-1/2 border border-[#B58A3A]/30 bg-[#F7F0E4]/95 px-4 sm:px-5 py-2.5 sm:py-3 text-center backdrop-blur-sm shadow-lg shadow-[#B58A3A]/10 animate-float">
                            <p className="font-serif text-base sm:text-lg italic text-[#211B16] group-hover:text-[#B58A3A] transition-colors duration-300">
                                Your signature
                            </p>
                            <p className="mt-0.5 sm:mt-1 text-[7px] sm:text-[8px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#8C6A32]">
                                Divara Parfums
                            </p>
                        </div>

                        {/* Badge de qualité */}
                        <div className="absolute top-1/4 -right-2 sm:-right-4 z-15 bg-[#B58A3A] text-white px-2 sm:px-3 py-1 sm:py-1.5 text-[6px] sm:text-[7px] font-semibold uppercase tracking-[0.2em] rotate-12 shadow-lg animate-float animation-delay-1000">
                            Luxe
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
                INDICATEUR DE SCROLL
            ====================================================== */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 lg:flex animate-bounce-slow">
                <span className="h-px w-6 sm:w-8 lg:w-10 bg-[#B58A3A]/40" />
                <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.4em] text-[#8C6A32] flex items-center gap-2">
                    Explore
                    <ChevronDown size={12} strokeWidth={1.5} className="text-[#B58A3A]" />
                </span>
                <span className="h-px w-6 sm:w-8 lg:w-10 bg-[#B58A3A]/40" />
            </div>

            {/* =====================================================
                STYLES GLOBAUX
            ====================================================== */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
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
                        transform: translateY(-12px);
                    }
                }

                @keyframes floatParticle {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0.3;
                    }
                    50% {
                        transform: translateY(-30px) translateX(10px);
                        opacity: 1;
                    }
                }

                @keyframes glowLine {
                    0%, 100% {
                        opacity: 0.4;
                        transform: scaleX(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scaleX(1.3);
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

                @keyframes spinSlowReverse {
                    from {
                        transform: rotate(360deg);
                    }
                    to {
                        transform: rotate(0deg);
                    }
                }

                @keyframes bounceSlow {
                    0%, 100% {
                        transform: translateX(-50%) translateY(0);
                    }
                    50% {
                        transform: translateX(-50%) translateY(-6px);
                    }
                }

                .animate-fade-in-up {
                    animation: fadeInUp 0.9s ease-out forwards;
                    opacity: 0;
                }

                .animation-delay-300 {
                    animation-delay: 300ms;
                }
                .animation-delay-1000 {
                    animation-delay: 1000ms;
                }
                .delay-500 {
                    animation-delay: 500ms;
                }
                .delay-1000 {
                    animation-delay: 1000ms;
                }
                .delay-2000 {
                    animation-delay: 2000ms;
                }

                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }

                .animate-float-particle {
                    animation: floatParticle 4s ease-in-out infinite;
                }

                .animate-glow-line {
                    animation: glowLine 3s ease-in-out infinite;
                }

                .animate-spin-slow {
                    animation: spinSlow 25s linear infinite;
                }

                .animate-spin-slow-reverse {
                    animation: spinSlowReverse 20s linear infinite;
                }

                .animate-bounce-slow {
                    animation: bounceSlow 2.5s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}