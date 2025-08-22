"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import {
    MapPin,
    Phone,
    Mail,
    Calendar,
    Instagram,
    Twitter,
    Facebook,
    Youtube,
    Linkedin,
    ExternalLink,
    Heart,
} from "lucide-react";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export default function Footer() {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const socialLinks = [
        { icon: Instagram, href: "https://instagram.com/tedxleadcityuniversity", label: "Instagram" },
        { icon: Twitter, href: "https://twitter.com/tedxleadcityuni", label: "Twitter" },
        { icon: Facebook, href: "https://facebook.com/tedxleadcityuniversity", label: "Facebook" },
        { icon: Youtube, href: "https://youtube.com/@tedxleadcityuniversity", label: "YouTube" },
        { icon: Linkedin, href: "https://linkedin.com/company/tedxleadcityuniversity", label: "LinkedIn" },
    ];

    const quickLinks = [
        { name: "About", id: "about" },
        { name: "Speakers", id: "speakers" },
        { name: "Gallery", id: "gallery" },
        { name: "FAQs", id: "faqs" },
        { name: "Contact", id: "contact" },
    ];

    const importantLinks = [
        { name: "Get Tickets", id: "tickets" },
        { name: "Become a Speaker", href: "#speaker-application" },
        { name: "Partner with Us", href: "#partnership" },
        { name: "Volunteer", href: "#volunteer" },
        { name: "Media Kit", href: "#media" },
    ];

    return (
        <footer className="bg-gray-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent" />
                <div className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-red-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-red-600/10 rounded-full blur-3xl" />
            </div>

            <div className="relative">
                {/* Main Footer Content */}
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Brand Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <div className="mb-6">
                                <Image
                                    src="/Tedx-white-logo.png"
                                    alt="TEDx Logo"
                                    width={200}
                                    height={80}
                                    className="mb-4"
                                />
                            </div>

                            <p className={`${outfit.className} text-gray-300 text-base md:text-lg leading-relaxed mb-6 max-w-md`}>
                                TEDxLeadCityUniversity brings together bright minds to give talks that are
                                idea-focused, and on a wide range of subjects, to foster learning,
                                inspiration and wonder.
                            </p>

                            {/* Event Info */}
                            <div className="space-y-3 mb-8 text-sm md:text-base">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-red-400 flex-shrink-0" />
                                    <span className={`${outfit.className} text-gray-300`}>
                                        November 20th, 2025 | 9:00 AM - 5:00 PM
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-red-400 flex-shrink-0" />
                                    <span className={`${outfit.className} text-gray-300`}>
                                        Conference Centre, Lead City University
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-red-400 flex-shrink-0" />
                                    <span className={`${outfit.className} text-gray-300`}>
                                        info@tedxleadcityuniversity.com
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-red-400 flex-shrink-0" />
                                    <span className={`${outfit.className} text-gray-300`}>
                                        +234 (0) 806 123 4567
                                    </span>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div>
                                <h4 className={`${outfit.className} text-lg font-semibold mb-4`}>
                                    Follow Us
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {socialLinks.map((social, index) => {
                                        const IconComponent = social.icon;
                                        return (
                                            <motion.a
                                                key={social.label}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0, scale: 0 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                                viewport={{ once: true }}
                                                className="p-3 bg-gray-800 rounded-full hover:bg-red-600 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                                                aria-label={social.label}
                                            >
                                                <IconComponent className="w-5 h-5" />
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h4 className={`${outfit.className} text-xl font-semibold mb-6`}>
                                Quick Links
                            </h4>
                            <ul className="space-y-3 text-sm md:text-base">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <button
                                            onClick={() => scrollToSection(link.id)}
                                            className={`${outfit.className} text-gray-300 hover:text-red-400 transition-colors duration-300 text-left flex items-center gap-2 group`}
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                {link.name}
                                            </span>
                                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Important Links + Newsletter */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <h4 className={`${outfit.className} text-xl font-semibold mb-6`}>
                                Get Involved
                            </h4>
                            <ul className="space-y-3 text-sm md:text-base">
                                {importantLinks.map((link) => (
                                    <li key={link.name}>
                                        {link.id ? (
                                            <button
                                                onClick={() => scrollToSection(link.id)}
                                                className={`${outfit.className} text-gray-300 hover:text-red-400 transition-colors duration-300 text-left flex items-center gap-2 group`}
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    {link.name}
                                                </span>
                                                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </button>
                                        ) : (
                                            <a
                                                href={link.href}
                                                className={`${outfit.className} text-gray-300 hover:text-red-400 transition-colors duration-300 flex items-center gap-2 group`}
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    {link.name}
                                                </span>
                                                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            {/* Newsletter Signup */}
                            <div className="mt-8">
                                <h5 className={`${outfit.className} text-lg font-semibold mb-4`}>
                                    Stay Updated
                                </h5>
                                <p className={`${outfit.className} text-gray-400 text-sm mb-4`}>
                                    Get the latest updates and announcements
                                </p>
                                <div className="flex flex-col sm:flex-row w-full">
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:border-red-400 text-white placeholder-gray-500 mb-3 sm:mb-0"
                                    />
                                    <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg sm:rounded-r-lg sm:rounded-l-none transition-colors duration-300 flex items-center justify-center">
                                        <Mail className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400 text-xs md:text-sm">
                                <p className={`${outfit.className} text-center md:text-left`}>
                                    © 2025 TEDxLeadCityUniversity. All rights reserved.
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    <a href="#privacy" className={`${outfit.className} hover:text-red-400 transition-colors duration-300`}>
                                        Privacy Policy
                                    </a>
                                    <span className="hidden md:inline text-gray-600">|</span>
                                    <a href="#terms" className={`${outfit.className} hover:text-red-400 transition-colors duration-300`}>
                                        Terms of Service
                                    </a>
                                    <span className="hidden md:inline text-gray-600">|</span>
                                    <a href="#code" className={`${outfit.className} hover:text-red-400 transition-colors duration-300`}>
                                        Code of Conduct
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                                <span className={`${outfit.className}`}>Made with</span>
                                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                                <span className={`${outfit.className}`}>for ideas worth spreading</span>
                            </div>
                        </div>

                        {/* TED License Notice */}
                        <div className="mt-6 pt-6 border-t border-gray-800">
                            <p className={`${outfit.className} text-center text-gray-500 text-xs leading-relaxed`}>
                                This independent TEDx event is operated under license from TED. TEDx is a program of local,
                                self-organized events that bring people together to share a TED-like experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
