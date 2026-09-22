'use client'
import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion';
import Link from 'next/link'
import { anton, spaceMono, outfit } from '../fonts'

export default function About() {
    return (
        <div id='about' className="bg-[var(--paper)]">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-black"
            >
                <div className="pt-20 sm:pt-24 pb-4 md:mx-14 mx-4 flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <span className={`${spaceMono.className} text-red-600 text-xs sm:text-sm tracking-[0.3em]`}>01</span>
                        <span className={`${spaceMono.className} text-gray-500 text-xs sm:text-sm tracking-[0.3em] uppercase`}>About</span>
                        <span className="flex-1 h-px bg-black/10" />
                    </div>

                    <h2 className={`${anton.className} uppercase md:text-6xl text-4xl leading-[0.95]`}>
                        Bringing “Ideas Worth<br className="hidden sm:block" /> Spreading” to Your Community
                    </h2>

                    <p className={`${outfit.className} md:text-xl text-sm sm:text-left text-justify tracking-wide leading-relaxed max-w-4xl text-gray-700`}>
                        In the spirit of discovering and spreading ideas, TED has created a program called TEDx. TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. Our event is called TEDX Lead City University., where x = independently organized TED event. At our TEDX Lead City University. event, TED Talks video and live speakers will combine to spark deep discussion and connection in a small group. The TED Conference provides general guidance for the TEDx program, but individual TEDx events, including ours, are self-organized.
                    </p>

                    {/* Image Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 mt-6 sm:mt-8">
                        {/* Left smaller image (takes 2/5 of grid) */}
                        <div className="relative md:col-span-2 col-span-3 md:h-[66vh] h-[40vh] md:w-auto w-full border-2 border-black">
                            <Image
                                src="https://res.cloudinary.com/djoxzzlue/image/upload/v1790074497/Evelyn_gfcwuq.jpg"
                                alt="Main image"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
                            />
                        </div>

                        {/* Right stacked images (takes 3/5 of grid) */}
                        <div className="col-span-3 flex flex-col gap-4">
                            <div className="relative w-full h-[32vh] border-2 border-black">
                                <Image
                                    src="https://res.cloudinary.com/djoxzzlue/image/upload/v1790074496/Attendees_duiljx.jpg"
                                    alt="Top image"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
                                />
                            </div>
                            <div className="relative w-full h-[32vh] border-2 border-black">
                                <Image
                                    src="/Ted-2.jpg"
                                    alt="Bottom image"
                                    fill
                                    className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center mt-5'>
                        <Link href='https://www.ted.com/about/programs-initiatives/tedx-program' target='_blank'>
                            <button className={`${spaceMono.className} flex items-center bg-black hover:bg-red-600 text-white cursor-pointer px-7 py-4 gap-4 text-xs sm:text-sm tracking-[0.2em] uppercase transition-colors duration-300`}>
                                Learn More <ArrowRight size={16} />
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
