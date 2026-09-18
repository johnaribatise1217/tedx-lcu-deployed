"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram, Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SpeakerService } from "service/SpeakerService";
import { anton, spaceMono, outfit } from "../fonts";

export default function Speakers() {
    const [speakers, setSpeakers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await SpeakerService.GetAllSpeakers();

                if (response && Array.isArray(response) && response.length > 0) {
                    setSpeakers(response);
                }
            } catch (error) {
                console.error('Error fetching speakers:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchSpeakers();
    }, []);

    // Helper function to get social link by name
    const getSocialLink = (socialLinks, socialName) => {
        if (!Array.isArray(socialLinks)) return '';
        const link = socialLinks.find(link =>
            link.socialName?.toLowerCase() === socialName.toLowerCase()
        );
        return link?.socialLink || '';
    };

    // Helper function to get social icon
    const getSocialIcon = (socialName) => {
        switch (socialName.toLowerCase()) {
            case 'linkedin':
                return <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />;
            case 'twitter':
                return <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />;
            case 'instagram':
                return <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />;
            default:
                return <Globe className="w-4 h-4 sm:w-5 sm:h-5" />;
        }
    };

    if (loading) {
        return (
            <section id="speakers" className="py-16 sm:py-20 px-4 sm:px-6 md:px-14 bg-[var(--paper)]">
                <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-16">
                    <div className="flex items-center gap-4 mb-8 sm:mb-10 text-left">
                        <span className={`${spaceMono.className} text-red-600 text-xs sm:text-sm tracking-[0.3em]`}>05</span>
                        <span className={`${spaceMono.className} text-gray-500 text-xs sm:text-sm tracking-[0.3em] uppercase`}>Speakers</span>
                        <span className="flex-1 h-px bg-black/10" />
                    </div>
                    <h2 className={`${anton.className} uppercase text-3xl sm:text-5xl md:text-6xl mb-4 sm:mb-6`}>
                        Featured Speakers
                    </h2>
                    <p className={`${outfit.className} text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed`}>
                        Loading our amazing speakers...
                    </p>
                </div>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white border border-black/10 overflow-hidden animate-pulse">
                                <div className="h-60 sm:h-72 md:h-80 bg-gray-300"></div>
                                <div className="p-4 sm:p-6">
                                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                                    <div className="h-16 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Don't render anything if there are no speakers
    if (!loading && (!speakers || speakers.length === 0)) {
        return null;
    }

    return (
        <section id="speakers" className="py-16 sm:py-20 px-4 sm:px-6 md:px-14 bg-[var(--paper)]">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-12 sm:mb-16">
                <div className="flex items-center gap-4 mb-8 sm:mb-10">
                    <span className={`${spaceMono.className} text-red-600 text-xs sm:text-sm tracking-[0.3em]`}>05</span>
                    <span className={`${spaceMono.className} text-gray-500 text-xs sm:text-sm tracking-[0.3em] uppercase`}>Speakers</span>
                    <span className="flex-1 h-px bg-black/10" />
                </div>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`${anton.className} uppercase text-3xl sm:text-5xl md:text-6xl text-center mb-4 sm:mb-6`}
                >
                    Featured Speakers
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={`${outfit.className} text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-center leading-relaxed`}
                >
                    Meet the visionaries, innovators, and thought leaders who will share
                    their groundbreaking ideas and inspire bold movements at
                    TEDxLeadCityUniversity.
                </motion.p>
            </div>

            {/* Speakers Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {speakers.map((speaker, index) => (
                        <motion.div
                            key={speaker.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: "easeOut",
                            }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="bg-white border border-black/10 hover:border-red-600 overflow-hidden transition-colors duration-300 group"
                        >
                            {/* Speaker Image */}
                            <div className="relative h-60 sm:h-72 md:h-80 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                <Image
                                    src={speaker.speakerImage || `/silhouette.png`}
                                    alt={speaker.fullName || 'Speaker'}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.fullName || 'Speaker')}&size=400&background=ef4444&color=white&bold=true`;
                                    }}
                                />

                                {/* Topic Overlay - Hidden for now since topic is not in API */}
                                <div className="absolute bottom-3 left-3 right-3 z-20">
                                    <p className={`${spaceMono.className} text-red-500 text-[11px] tracking-[0.2em] uppercase`}>
                                        Speaker
                                    </p>
                                </div>
                            </div>

                            {/* Speaker Info */}
                            <div className="p-4 sm:p-6">
                                <h3 className={`${anton.className} uppercase text-lg sm:text-xl md:text-2xl mb-2 leading-tight`}>
                                    {speaker.fullName || 'Coming Soon'}
                                </h3>

                                <div className="mb-3 sm:mb-4">
                                    {speaker.title && (
                                        <p className={`${spaceMono.className} text-red-600 text-xs sm:text-sm tracking-wide`}>
                                            {speaker.title}
                                        </p>
                                    )}

                                </div>

                                <p className={`${outfit.className} text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-3`}>
                                    {speaker.bio || 'Stay tuned for more information about this amazing speaker!'}
                                </p>

                                {/* Social Links */}
                                <div className="flex space-x-3 sm:space-x-4">
                                    {speaker.socialLinks && Array.isArray(speaker.socialLinks) && speaker.socialLinks.length > 0 ? (
                                        speaker.socialLinks.map((social, idx) => (
                                            social.socialLink && (
                                                <a
                                                    key={idx}
                                                    href={social.socialLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 border border-black/10 hover:bg-red-600 hover:border-red-600 text-gray-600 hover:text-white transition-all duration-300"
                                                    title={social.socialName}
                                                >
                                                    {getSocialIcon(social.socialName)}
                                                </a>
                                            )
                                        ))
                                    ) : (
                                        <div className="flex space-x-3 opacity-50">
                                            <div className="p-2 border border-black/10 text-gray-400">
                                                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </div>
                                            <div className="p-2 border border-black/10 text-gray-400">
                                                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center mt-12 sm:mt-16"
            >
                <p className={`${outfit.className} text-gray-600 text-base sm:text-lg mb-4 sm:mb-6`}>
                    {`Don't miss the chance to experience these transformative talks`}
                </p>
                <Link href='/tickets'>
                    <button className={`${spaceMono.className} cursor-pointer bg-red-600 hover:bg-red-700 text-white px-7 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm tracking-[0.2em] uppercase transition-colors duration-300`}>
                        Reserve Your Seat
                    </button>
                </Link>
            </motion.div>
        </section>
    );
}
