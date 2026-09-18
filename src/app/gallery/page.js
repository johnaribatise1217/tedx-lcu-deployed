// src/app/components/Gallery.js
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['400', '700']
});

const images = [
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884381/IMG_2382_phcmla.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884382/IMG_2377_tuyv6f.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884354/IMG_2453_hpednz.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884346/IMG_2276_zdicww.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884304/IMG_2171_lzpd9b.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755814957/Ted-9_aoba5m.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884377/IMG_2278_wr7y4c.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884347/IMG_2241_d9eg0c.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884318/IMG_2441_ypxhpq.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884354/IMG_2453_hpednz.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884339/IMG_2452_yim6lu.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884303/IMG_2583_vvjydd.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884347/IMG_2241_d9eg0c.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884351/IMG_2548_pdrnln.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755885344/IMG_2216_zh0mhh.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755885344/IMG_2170_tznlq1.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755885349/IMG_2190_wq1wjb.jpg",
    "https://res.cloudinary.com/djoxzzlue/image/upload/v1755884355/IMG_2237_r9nxvc.jpg",
];

export default function page() {
    return (
        <>
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>

                </div>
            </div>

            <section className="py-12 px-6">

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
            </section>
        </>
    );
}
