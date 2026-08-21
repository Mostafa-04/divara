import React from "react";
import {
    Sparkles,
    Heart,
    Leaf,
    ArrowRight,
    Award,
    Gem,
} from "lucide-react";

export default function About() {
    return (
        <main className="bg-[#FCF8F1] text-[#211B16] overflow-x-hidden py-3">

            {/* =====================================================
                HERO - avec animation d'entrée
            ====================================================== */}
            <section className="relative overflow-hidden border-b border-[#B58A3A]/15">
                
                {/* Décorations de fond animées */}
                <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#B58A3A]/5 blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#B58A3A]/5 blur-3xl animate-pulse delay-1000" />

                <div className="mx-auto grid min-h-[520px] max-w-7xl grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-20">

                    {/* Texte avec animations */}
                    <div className="max-w-xl animate-fade-in-up">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-10 bg-[#B58A3A] animate-glow" />
                            <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#8C6A32]">
                                Notre histoire
                            </span>
                        </div>

                        <h1 className="font-serif text-4xl leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-6xl xl:text-7xl">
                            Une signature
                            <span className="mt-2 block italic text-[#B58A3A] relative">
                                qui vous ressemble.
                                <span className="absolute -bottom-2 left-0 w-20 h-[2px] bg-[#B58A3A]/30 rounded-full" />
                            </span>
                        </h1>

                        <p className="mt-7 max-w-md text-[12px] leading-7 text-[#756960] sm:text-[13px] md:text-[14px]">
                            Divara est née d'une passion pour les parfums
                            qui racontent une histoire. Des fragrances pensées
                            pour accompagner chaque personnalité et laisser
                            derrière soi une empreinte inoubliable.
                        </p>

                        <a
                            href="/shop"
                            className="group mt-8 inline-flex items-center gap-4 border-b border-[#B58A3A] pb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#211B16] transition-all duration-300 hover:text-[#B58A3A] hover:border-[#B58A3A]/40 hover:gap-6"
                        >
                            Découvrir la collection
                            <ArrowRight
                                size={14}
                                strokeWidth={1.3}
                                className="transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
                            />
                        </a>
                    </div>

                    {/* Image avec animations */}
                    <div className="relative mx-auto w-full max-w-md lg:max-w-none animate-fade-in-up animation-delay-300">
                        <div className="absolute -right-3 -top-3 h-20 w-20 border-r border-t border-[#B58A3A]/40 sm:-right-5 sm:-top-5 sm:h-28 sm:w-28 lg:h-32 lg:w-32 animate-pulse" />
                        <div className="absolute -bottom-3 -left-3 h-20 w-20 border-b border-l border-[#B58A3A]/40 sm:-bottom-5 sm:-left-5 sm:h-28 sm:w-28 lg:h-32 lg:w-32 animate-pulse delay-500" />

                        <div className="relative aspect-[4/5] overflow-hidden bg-[#E9DED0] group-hover:scale-105 transition-transform duration-700">
                            <img
                                src="/divara.jpg"
                                alt="Divara Parfums"
                                className="h-full w-full object-cover transition-transform duration-1000 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#211B16]/20 via-transparent to-transparent" />
                            
                            {/* Badge animé */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#211B16]/90 backdrop-blur-sm px-6 py-3 text-center animate-float">
                                <p className="text-[8px] uppercase tracking-[0.3em] text-[#B58A3A]">
                                    Divara Parfums
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                INTRO - avec animations
            ====================================================== */}
            <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#B58A3A]/5 to-transparent pointer-events-none" />

                <div className="mx-auto max-w-3xl text-center animate-fade-in-up">
                    <div className="mb-5 flex items-center justify-center gap-3">
                        <span className="h-px w-6 sm:w-8 bg-[#B58A3A]/60" />
                        <Sparkles
                            size={14}
                            strokeWidth={1.2}
                            className="text-[#B58A3A] animate-spin-slow"
                        />
                        <span className="h-px w-6 sm:w-8 bg-[#B58A3A]/60" />
                    </div>

                    <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#8C6A32]">
                        L'essence de Divara
                    </p>

                    <h2 className="mt-5 font-serif text-3xl leading-tight tracking-[-0.03em] sm:text-4xl md:text-5xl">
                        Le parfum comme
                        <span className="italic text-[#B58A3A] relative">
                            {" "}expression de soi.
                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-[#B58A3A]/30 rounded-full" />
                        </span>
                    </h2>

                    <p className="mx-auto mt-7 max-w-2xl text-[12px] leading-7 text-[#756960] sm:text-[13px] md:text-[14px]">
                        Nous croyons qu'un parfum ne se résume pas à une
                        fragrance. Il évoque un souvenir, souligne une
                        personnalité et devient parfois une véritable
                        signature.
                    </p>
                </div>
            </section>

            {/* =====================================================
                VALUES - avec animations au scroll
            ====================================================== */}
            <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#8C6A32]">
                            Nos valeurs
                        </p>
                        <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em] sm:text-4xl md:text-5xl">
                            L'élégance dans
                            <span className="italic text-[#B58A3A]">
                                {" "}chaque détail.
                            </span>
                        </h2>
                    </div>

                    <div className="mt-12 md:mt-14 grid grid-cols-1 gap-4 sm:gap-px overflow-hidden border border-[#B58A3A]/15 bg-[#B58A3A]/15 md:grid-cols-3">
                        {[
                            {
                                icon: Sparkles,
                                title: "Élégance",
                                description: "Des créations raffinées pensées pour accompagner chaque moment avec distinction.",
                                delay: "0",
                            },
                            {
                                icon: Heart,
                                title: "Passion",
                                description: "Une attention particulière portée à chaque fragrance pour créer une expérience unique.",
                                delay: "200",
                            },
                            {
                                icon: Leaf,
                                title: "Authenticité",
                                description: "Une identité sincère qui célèbre la personnalité et la singularité de chacun.",
                                delay: "400",
                            },
                        ].map((value, index) => (
                            <div
                                key={index}
                                className="bg-[#FCF8F1] px-6 sm:px-8 md:px-10 py-8 sm:py-10 text-center group hover:bg-[#FCF8F1]/80 transition-all duration-500 hover:shadow-lg hover:scale-[1.02] relative overflow-hidden animate-fade-in-up"
                                style={{ animationDelay: `${value.delay}ms` }}
                            >
                                {/* Effet de survol */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#B58A3A]/0 via-[#B58A3A]/5 to-[#B58A3A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#B58A3A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                                <div className="relative z-10">
                                    <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-[#B58A3A]/25 group-hover:border-[#B58A3A] group-hover:bg-[#B58A3A]/10 transition-all duration-300">
                                        <value.icon
                                            size={18}
                                            strokeWidth={1.2}
                                            className="text-[#B58A3A] group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>

                                    <h3 className="mt-5 sm:mt-6 font-serif text-xl sm:text-2xl group-hover:text-[#B58A3A] transition-colors duration-300">
                                        {value.title}
                                    </h3>

                                    <p className="mt-3 sm:mt-4 text-[11px] leading-6 text-[#756960] sm:text-[12px]">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
                STYLES GLOBAUX
            ====================================================== */}
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
                        transform: translateX(-50%) translateY(0);
                    }
                    50% {
                        transform: translateX(-50%) translateY(-8px);
                    }
                }

                @keyframes glow {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.3;
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

                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                }

                .animation-delay-300 {
                    animation-delay: 300ms;
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animate-glow {
                    animation: glow 2s ease-in-out infinite;
                }

                .animate-spin-slow {
                    animation: spinSlow 10s linear infinite;
                }

                .delay-1000 {
                    animation-delay: 1000ms;
                }
            `}</style>
        </main>
    );
}