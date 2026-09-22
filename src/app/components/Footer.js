"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    MapPin,
    Phone,
    Mail,
    Calendar,
    Instagram,
    Linkedin,
    ExternalLink,
    Heart,
} from "lucide-react";
import { anton, spaceMono, outfit } from "../fonts";
import Link from "next/link";

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
        { name: "Media Kit", id: "gallery" },
    ];

    return (
        <footer className="bg-black bg-grain text-white relative overflow-hidden border-t-2 border-red-600">
            <div className="relative">
                {/* Main Footer Content */}
                <div className="max-w-7xl mx-auto px-6 md:px-14 py-16">
                    {/* Kicker */}
                    <div className="flex items-center gap-4 mb-10 sm:mb-14">
                        <span className={`${spaceMono.className} text-red-500 text-xs sm:text-sm tracking-[0.3em]`}>08</span>
                        <span className={`${spaceMono.className} text-gray-400 text-xs sm:text-sm tracking-[0.3em] uppercase`}>Contact</span>
                        <span className="flex-1 h-px bg-white/10" />
                    </div>

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
                                    src="https://res.cloudinary.com/djoxzzlue/image/upload/v1755806113/Tedx-white-logo_wkzr1i.png"
                                    alt="TEDx Logo"
                                    width={200}
                                    height={80}
                                    className="mb-4 w-40"
                                />
                            </div>

                            <p className={`${outfit.className} text-gray-400 text-base md:text-lg leading-relaxed mb-6 max-w-md`}>
                                TEDxLeadCityUniversity brings together bright minds to give talks that are
                                idea-focused, and on a wide range of subjects, to foster learning,
                                inspiration and wonder.
                            </p>

                            {/* Event Info */}
                            <div className={`${spaceMono.className} space-y-3 mb-8 text-xs sm:text-sm`}>
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-300">
                                        Friday, November 6th, 2026 | 9:00 AM - 4:00 PM
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-300">
                                        International Conference Center, Lead City University.
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-300">
                                        tedxleadcityuniversity@gmail.com
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-300">
                                        08085614651, +234 812 541 8541, +234 703 434 6739
                                    </span>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div>
                                <h4 className={`${spaceMono.className} text-xs sm:text-sm tracking-[0.2em] uppercase mb-4`}>
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
                                                className="p-3 border border-white/15 hover:bg-red-600 hover:border-red-600 text-gray-300 hover:text-white transition-all duration-300"
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
                            <h4 className={`${spaceMono.className} text-xs sm:text-sm tracking-[0.2em] uppercase mb-6`}>
                                Quick Links
                            </h4>
                            <ul className="space-y-3 text-sm md:text-base">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <button
                                            onClick={() => scrollToSection(link.id)}
                                            className={`${outfit.className} text-gray-300 hover:text-red-500 transition-colors duration-300 text-left flex items-center gap-2 group cursor-pointer`}
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
                            <h4 className={`${spaceMono.className} text-xs sm:text-sm tracking-[0.2em] uppercase mb-6`}>
                                Get Involved
                            </h4>
                            <ul className="space-y-3 text-sm md:text-base">
                                {importantLinks.map((link) => (
                                    <li key={link.name}>
                                        {link.id ? (
                                            <button
                                                onClick={() => scrollToSection(link.id)}
                                                className={`${outfit.className} text-gray-300 hover:text-red-500 transition-colors duration-300 text-left flex items-center gap-2 group cursor-pointer`}
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    {link.name}
                                                </span>
                                                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </button>
                                        ) : (
                                            <a
                                                href={link.href}
                                                className={`${outfit.className} text-gray-300 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group`}
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
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-6 md:px-14 py-8">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                            <div className={`${spaceMono.className} flex flex-col md:flex-row items-center gap-4 text-gray-500 text-[11px] md:text-xs`}>
                                <p className="text-center md:text-left">
                                    © 2026 TEDxLeadCityUniversity. All rights reserved.
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    <a href="#privacy" className="hover:text-red-500 transition-colors duration-300">
                                        Privacy Policy
                                    </a>
                                    <span className="hidden md:inline text-gray-700">|</span>
                                    <a href="#terms" className="hover:text-red-500 transition-colors duration-300">
                                        Terms of Service
                                    </a>
                                    <span className="hidden md:inline text-gray-700">|</span>
                                    <a href="#code" className="hover:text-red-500 transition-colors duration-300">
                                        Code of Conduct
                                    </a>
                                </div>
                            </div>

                            <div className={`${spaceMono.className} flex items-center gap-2 text-gray-500 text-[11px] md:text-xs`}>
                                <span>Made with</span>
                                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                                <Link href="https://babatunde-ajagbe.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors duration-300">
                                    by Babatunde Ajagbe
                                </Link>
                            </div>
                        </div>

                        {/* TED License Notice */}
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <p className={`${outfit.className} text-center text-gray-600 text-xs leading-relaxed`}>
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
