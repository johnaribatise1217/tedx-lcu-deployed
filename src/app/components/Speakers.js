"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import { Linkedin, Twitter, Globe } from "lucide-react";
import Link from "next/link";

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700']
});

const speakers = [
    {
        id: 1,
        name: "COMING SOON",
        title: "coming soon",
        company: "coming soon",
        topic: "UNREVEALED",
        bio: "",
        image: "/silhouette.png",
        social: {
            linkedin: "",
            twitter: "",
            website: ""
        }
    },
    {
        id: 2,
        name: "COMING SOON",
        title: "coming soon",
        company: "coming soon",
        topic: "UNREVEALED",
        bio: "",
        image: "/male.png",
        social: {
            linkedin: "",
            twitter: "",
            website: ""
        }
    },
    {
        id: 3,
        name: "COMING SOON",
        title: "coming soon",
        company: "coming soon",
        topic: "UNREVEALED",
        bio: "",
        image: "/silhouette.png",
        social: {
            linkedin: "",
            twitter: "",
            website: ""
        }
    },
    {
        id: 4,
        name: "COMING SOON",
        title: "coming soon",
        company: "coming soon",
        topic: "UNREVEALED",
        bio: "",
        image: "/male.png",
        social: {
            linkedin: "",
            twitter: "",
            website: ""
        }
    },
    {
        id: 5,
        name: "COMING SOON",
        title: "coming soon",
        company: "coming soon",
        topic: "UNREVEALED",
        bio: "",
        image: "/silhouette.png",
        social: {
            linkedin: "",
            twitter: "",
            website: ""
        }
    },
    {
        id: 6,
        name: "COMING SOON",
        title: "coming soon",
        company: "coming soon",
        topic: "UNREVEALED",
        bio: "",
        image: "/male.png",
        social: {
            linkedin: "",
            twitter: "",
            website: ""
        }
    }
];


export default function Speakers() {
    return (
        <section id="speakers" className="py-12 px-4 sm:px-6 bg-gray-50">
            {/* Header */}
            <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`${outfit.className} text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-900 mb-4 sm:mb-6`}
                >
                    Featured Speakers
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={`${outfit.className} text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed`}
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
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Speaker Image */}
                            <div className="relative h-60 sm:h-72 md:h-80 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                <Image
                                    src={speaker.image}
                                    alt={speaker.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${speaker.name}&size=400&background=ef4444&color=white&bold=true`;
                                    }}
                                />

                                {/* Topic Overlay */}
                                <div className="absolute bottom-3 left-3 right-3 z-20">
                                    <p
                                        className={`${outfit.className} text-red-400 text-xs sm:text-sm font-medium mb-1`}
                                    >
                                        TOPIC
                                    </p>
                                    <h4
                                        className={`${outfit.className} text-white text-sm sm:text-base md:text-lg font-semibold leading-tight`}
                                    >
                                        {speaker.topic}
                                    </h4>
                                </div>
                            </div>

                            {/* Speaker Info */}
                            <div className="p-4 sm:p-6">
                                <h3
                                    className={`${outfit.className} text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2`}
                                >
                                    {speaker.name}
                                </h3>

                                <div className="mb-3 sm:mb-4">
                                    <p
                                        className={`${outfit.className} text-red-600 font-semibold text-sm sm:text-base`}
                                    >
                                        {speaker.title}
                                    </p>
                                    <p
                                        className={`${outfit.className} text-gray-600 text-xs sm:text-sm`}
                                    >
                                        {speaker.company}
                                    </p>
                                </div>

                                <p
                                    className={`${outfit.className} text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6`}
                                >
                                    {speaker.bio}
                                </p>

                                {/* Social Links */}
                                <div className="flex space-x-3 sm:space-x-4">
                                    <a
                                        href={speaker.social.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-gray-100 hover:bg-red-600 text-gray-600 hover:text-white transition-all duration-300"
                                    >
                                        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </a>
                                    <a
                                        href={speaker.social.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-gray-100 hover:bg-red-600 text-gray-600 hover:text-white transition-all duration-300"
                                    >
                                        <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </a>
                                    <a
                                        href={speaker.social.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-gray-100 hover:bg-red-600 text-gray-600 hover:text-white transition-all duration-300"
                                    >
                                        <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </a>
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
                <p
                    className={`${outfit.className} text-gray-600 text-base sm:text-lg mb-4 sm:mb-6`}
                >
                    {`Don't miss the chance to experience these transformative talks`}
                </p>
                <Link href='/tickets'>
                    <button
                        className={`${outfit.className} cursor-pointer bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl`}
                    >
                        Reserve Your Seat
                    </button>
                </Link>
            </motion.div>
        </section>
    );
}