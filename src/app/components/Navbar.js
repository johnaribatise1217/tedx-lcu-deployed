"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { anton, spaceMono } from "../fonts";

const navItems = ["about", "blog", "gallery", "speakers", "tickets", "faqs"];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            setMenuOpen(false);
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? "bg-black/85 backdrop-blur-md border-b border-white/10" : "bg-gradient-to-b from-black/60 to-transparent"
                    }`}
            >
                <div className="flex items-center justify-between px-5 sm:px-8 md:px-14 py-4">
                    {/* Logo */}
                    <Image
                        src="https://res.cloudinary.com/djoxzzlue/image/upload/v1755806113/Tedx-white-logo_wkzr1i.png"
                        alt="Tedx Logo"
                        width={160}
                        height={160}
                        className="w-28 md:w-36"
                    />

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex items-center gap-8">
                        {navItems.map((item, i) => (
                            <li
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className={`${spaceMono.className} group relative cursor-pointer text-white text-xs tracking-[0.2em] uppercase`}
                            >
                                {item}
                                <span className="absolute -bottom-1.5 left-0 w-0 group-hover:w-full h-[2px] bg-red-600 transition-all duration-300" />
                            </li>
                        ))}
                    </ul>

                    {/* Desktop CTA */}
                    <button
                        onClick={() => scrollToSection("tickets")}
                        className={`${spaceMono.className} hidden lg:flex items-center gap-2 border-2 border-white text-white px-5 py-2 text-xs tracking-[0.2em] uppercase hover:bg-red-600 hover:border-red-600 transition-colors duration-300 cursor-pointer`}
                    >
                        Get Tickets <ArrowUpRight size={14} />
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden cursor-pointer text-white"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <Menu size={26} />
                    </button>
                </div>
            </nav>

            {/* Fullscreen Mobile Menu */}
            <div
                className={`fixed inset-0 z-[60] bg-black transition-transform duration-500 ease-in-out lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-white/10">
                    <Image
                        src="https://res.cloudinary.com/djoxzzlue/image/upload/v1755806113/Tedx-white-logo_wkzr1i.png"
                        alt="Tedx Logo"
                        width={140}
                        height={140}
                        className="w-28"
                    />
                    <button
                        className="cursor-pointer text-white"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close Menu"
                    >
                        <X size={28} />
                    </button>
                </div>
                <ul className="flex flex-col px-6 sm:px-8 mt-6">
                    {navItems.map((item, i) => (
                        <li
                            key={item}
                            onClick={() => scrollToSection(item)}
                            className={`${anton.className} text-white text-4xl sm:text-5xl uppercase border-b border-white/10 py-4 cursor-pointer flex items-baseline gap-4`}
                        >
                            <span className={`${spaceMono.className} text-red-500 text-base align-middle`}>
                                0{i + 1}
                            </span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
