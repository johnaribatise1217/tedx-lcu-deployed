'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Outfit } from 'next/font/google'
import Image from 'next/image'

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['400', '700']
})

export default function WhyTedx() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeIn" }}
            viewport={{ once: true, amount: 0.2 }}
            className="p-4 sm:p-6 text-black rounded-lg"
        >
            <div className="mt-10 md:mx-14 mx-0 flex flex-col gap-6">
                {/* Tag */}
                <span className="text-gray-700 w-max bg-gray-100 rounded-full py-2 px-4 border text-sm sm:text-base font-semibold">
                    💭 TEDxLCU?
                </span>

                {/* Title */}
                <h2 className={`${outfit.className} text-xl sm:text-3xl md:text-4xl font-semibold`}>
                    TEDxLeadCityUniversity
                </h2>

                {/* Description */}
                <p className={`${outfit.className} text-sm sm:text-lg md:text-xl lg:text-2xl text-left tracking-wide leading-relaxed`}>
                    TEDx Lead City University aims to unite our community in manners we consider significant, sparking relevant discourse and conversation across campus, through our annual events, and other community engagement activities.
                    We believe that we can set the stage for the next generation of leaders, from Ibadan, to the world!

                </p>

                {/* Image + Content Grid */}
                <div className="xl:mx-28 mx-0 items-center gap-8 md:gap-10 grid lg:grid-cols-2 grid-cols-1 mt-10 sm:mt-14">
                    {/* Image */}
                    <Image
                        src="https://res.cloudinary.com/djoxzzlue/image/upload/v1755884377/IMG_2397_kwj5go.jpg"
                        alt="TEDxLCU Event"
                        width={500}
                        height={600}
                        className="rounded-2xl h-auto w-full object-cover hover:scale-[1.04] transition-transform duration-300 ease-in-out"
                    />

                    {/* Text Sections */}
                    <div className="flex flex-col gap-6 md:gap-10">
                        <div>
                            <h2 className={`${outfit.className} text-lg sm:text-2xl md:text-3xl font-medium`}>
                                Not Your Average Conference
                            </h2>
                            <p className={`${outfit.className} text-sm sm:text-lg md:text-xl text-left tracking-wide leading-relaxed`}>
                                TEDx is where brilliant misfits, dreamers, and doers come to share ideas that challenge, inspire, and ignite. No fluff, just the real stuff that makes you think.
                            </p>
                        </div>

                        <div>
                            <h2 className={`${outfit.className} text-lg sm:text-2xl md:text-3xl font-medium`}>
                                Big Ideas, Real Impact
                            </h2>
                            <p className={`${outfit.className} text-sm sm:text-lg md:text-xl text-left tracking-wide leading-relaxed`}>
                                Every story has the power to shift perspectives. At TEDx, those sparks of insight create ripples that move far beyond the room.
                            </p>
                        </div>

                        <div>
                            <h2 className={`${outfit.className} text-lg sm:text-2xl md:text-3xl font-medium`}>
                                Join the Movement
                            </h2>
                            <p className={`${outfit.className} text-sm sm:text-lg md:text-xl text-left tracking-wide leading-relaxed`}>
                                This is more than a talk series—it’s a platform for connection, collaboration, and change. Step in, and be part of what’s next.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
