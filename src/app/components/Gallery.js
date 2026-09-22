// src/app/components/Gallery.js
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { anton, spaceMono, outfit } from "../fonts";

const images = [
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1790074570/Attendee89_1_tge9zo.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1790074506/Davina5_x92tme.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1790074502/Group_eqwmx4.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1790074502/owolabi_oedvdf.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1790076542/Ibukun_Akinola_8_1_zjin6s.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1790074499/Evelyn6_w5vz1a.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1790074496/Attendees1_apcvup.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1790076551/Attendee_60_1_ncyppb.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1790074496/Attendee28_v1avcl.jpg",
];

export default function Gallery() {
    return (
        <section id='gallery' className="py-16 sm:py-20 px-4 sm:px-6 md:px-14">
            {/* Kicker */}
            <div className="flex items-center gap-4 mb-8 sm:mb-10">
                <span className={`${spaceMono.className} text-red-600 text-xs sm:text-sm tracking-[0.3em]`}>04</span>
                <span className={`${spaceMono.className} text-gray-500 text-xs sm:text-sm tracking-[0.3em] uppercase`}>Gallery</span>
                <span className="flex-1 h-px bg-black/10" />
            </div>

            <h2 className={`${anton.className} uppercase text-3xl sm:text-5xl md:text-6xl flex flex-col items-center`}>
                Gallery
            </h2>

            <p className={`${outfit.className} text-base sm:text-xl text-gray-600 tracking-wide leading-relaxed lg:w-1/2 w-full pb-10 pt-4 mx-auto text-center`}>
                A glimpse into our journey through captivating visuals.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="overflow-hidden relative"
                    >
                        <Image
                            src={image}
                            alt={`Event Photo ${index + 1}`}
                            width={600}
                            height={400}
                            className="object-cover object-center w-full h-40 sm:h-56 md:h-84 grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
                        />
                    </motion.div>
                ))}
            </div>

            <div className='flex justify-center mt-8 sm:mt-10'>
                <Link href='/gallery' className={`${spaceMono.className} flex items-center gap-3 text-black hover:text-red-600 cursor-pointer text-xs sm:text-sm tracking-[0.2em] uppercase border-b-2 border-black hover:border-red-600 pb-1 transition-colors duration-300`}>
                    See More <ArrowRight size={16} />
                </Link>
            </div>
        </section>
    );
}
