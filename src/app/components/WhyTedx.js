'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { anton, spaceMono, outfit } from '../fonts'

const points = [
    {
        title: "Not Your Average Conference",
        body: "TEDx is where brilliant misfits, dreamers, and doers come to share ideas that challenge, inspire, and ignite. No fluff, just the real stuff that makes you think.",
    },
    {
        title: "Big Ideas, Real Impact",
        body: "Every story has the power to shift perspectives. At TEDx, those sparks of insight create ripples that move far beyond the room.",
    },
    {
        title: "Join the Movement",
        body: "This is more than a talk series—it’s a platform for connection, collaboration, and change. Step in, and be part of what’s next.",
    },
]

export default function WhyTedx() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeIn" }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-black"
        >
            <div className="pt-16 sm:pt-20 pb-4 md:mx-14 mx-4 flex flex-col gap-6">
                {/* Kicker */}
                <div className="flex items-center gap-4">
                    <span className={`${spaceMono.className} text-red-600 text-xs sm:text-sm tracking-[0.3em]`}>02</span>
                    <span className={`${spaceMono.className} text-gray-500 text-xs sm:text-sm tracking-[0.3em] uppercase`}>Why TEDxLCU</span>
                    <span className="flex-1 h-px bg-black/10" />
                </div>

                {/* Title */}
                <h2 className={`${anton.className} uppercase text-3xl sm:text-5xl md:text-6xl leading-[0.95]`}>
                    TEDxLeadCityUniversity
                </h2>

                {/* Description */}
                <p className={`${outfit.className} text-sm sm:text-lg md:text-xl text-left tracking-wide leading-relaxed max-w-4xl text-gray-700`}>
                    TEDx Lead City University aims to unite our community in manners we consider significant, sparking relevant discourse and conversation across campus, through our annual events, and other community engagement activities.
                    We believe that we can set the stage for the next generation of leaders, from Ibadan, to the world!
                </p>

                {/* Image + Content Grid */}
                <div className="xl:mx-20 mx-0 items-center gap-8 md:gap-12 grid lg:grid-cols-2 grid-cols-1 mt-8 sm:mt-12">
                    {/* Image */}
                    <div className="relative w-full h-[45vh] lg:h-[70vh] border-2 border-black">
                        <Image
                            src="https://res.cloudinary.com/djoxzzlue/image/upload/v1790074501/Kamsi_qq19mz.jpg"
                            alt="TEDxLCU Event"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
                        />
                    </div>

                    {/* Text Sections */}
                    <div className="flex flex-col">
                        {points.map((point, i) => (
                            <div key={point.title} className={`flex gap-4 sm:gap-6 py-5 sm:py-6 ${i !== 0 ? "border-t border-black/10" : ""}`}>
                                <span className={`${spaceMono.className} text-red-600 text-sm sm:text-base shrink-0`}>0{i + 1}</span>
                                <div>
                                    <h3 className={`${anton.className} text-lg sm:text-2xl md:text-3xl uppercase leading-tight mb-2`}>
                                        {point.title}
                                    </h3>
                                    <p className={`${outfit.className} text-sm sm:text-base md:text-lg text-left tracking-wide leading-relaxed text-gray-700`}>
                                        {point.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
