"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

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
        <nav className="bg-black text-white p-5 flex items-center justify-between px-6 md:px-20 relative">
            {/* Logo */}
            <Image
                src="https://res.cloudinary.com/djoxzzlue/image/upload/v1755806113/Tedx-white-logo_wkzr1i.png"
                alt="Tedx Logo"
                width={180}
                height={180}
                className="w-36 md:w-48"
            />

            {/* Desktop Menu */}
            <ul className="hidden lg:flex justify-center gap-10 text-lg font-semibold">
                {["about", "blog", "gallery", "speakers", "tickets", "faqs"].map(
                    (item) => (
                        <li
                            key={item}
                            className="text-white hover:text-red-600 cursor-pointer transition-colors duration-300"
                            onClick={() => scrollToSection(item)}
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </li>
                    )
                )}
            </ul>

            {/* Mobile Menu Button */}
            <button
                className="lg:hidden cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle Menu"
            >
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-black shadow-lg lg:hidden z-50">
                    <ul className="flex flex-col items-center gap-6 py-6 text-lg font-semibold">
                        {["about", "blog", "gallery", "speakers", "tickets", "faqs"].map(
                            (item) => (
                                <li
                                    key={item}
                                    className="text-white hover:text-red-600 cursor-pointer transition-colors duration-300"
                                    onClick={() => scrollToSection(item)}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}
