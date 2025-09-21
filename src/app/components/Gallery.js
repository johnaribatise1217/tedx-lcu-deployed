// src/app/components/Gallery.js
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['400', '700']
});

const images = [
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755885349/IMG_2190_wq1wjb.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755885344/IMG_2216_zh0mhh.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755885344/IMG_2170_tznlq1.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884381/IMG_2382_phcmla.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884318/IMG_2441_ypxhpq.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884311/IMG_2249_zr9bib.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755814957/Ted-7_iel0l7.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755805800/IMG_2455_yh9zgq.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755806087/IMG_2174_xnku5f.jpg",
];

export default function Gallery() {
    return (
        <section id='gallery' className="py-12 px-6">
            <h2 className={`${outfit.className} text-5xl font-normal flex flex-col items-center pt-4`}>
                Gallery
            </h2>

            <p className={`${outfit.className} text-xl text-gray-700 tracking-wider leading-relaxed lg:w-1/2 w-full pb-10 mx-auto text-center`}>
                A glimpse into our journey through captivating visuals.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="overflow-hidden rounded-xl shadow-lg"
                    >
                        <Image
                            src={image}
                            alt={`Event Photo ${index + 1}`}
                            width={600}
                            height={400}
                            className="object-cover w-full h-64 hover:scale-110 transition-transform duration-500"
                        />
                    </motion.div>
                ))}
            </div>

            <div className='flex justify-center text-white mt-7'>
                <Link href='/gallery' className={`${outfit.className} flex items-center text-red-600 hover:text-black cursor-pointer p-5 rounded-lg gap-4 text-xl`}>
                    See More <ArrowRight className='text-xl' />
                </Link>
            </div>
        </section>
    );
}
