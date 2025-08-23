'use client'
import React from 'react'
import { Outfit } from 'next/font/google'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion';
import Link from 'next/link'


const outfit = Outfit({
    subsets: ['latin'],
    weight: ['400', '700']
})

export default function About() {
    return (
        <div id='about'>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }} // triggers when 20% in view
                className="p-6 text-black rounded-lg"
            >
                <div className="mt-20 md:mx-14 mx-0 flex flex-col gap-6">
                    <span className="text-gray-700 sm:w-max w-full  bg-gray-100 rounded-full py-2 px-4 border sm:text-[16px] text-sm font-semibold">
                        What Even is TEDx?? We’re Glad You Asked 😎
                    </span>

                    <h2 className={`${outfit.className} md:text-4xl text-xl  font-semibold`}>
                        Bringing “Ideas Worth Spreading” to Your Community
                    </h2>

                    <p className={`${outfit.className} md:text-2xl text-sm sm:text-left text-justify tracking-wider leading-relaxed`}>
                        In the spirit of discovering and spreading ideas, TED has created a program called TEDx. TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. Our event is called TEDxFortGarry, where x = independently organized TED event. At our TEDxFortGarry event, TED Talks video and live speakers will combine to spark deep discussion and connection in a small group. The TED Conference provides general guidance for the TEDx program, but individual TEDx events, including ours, are self-organized.
                    </p>

                    {/* Image Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-8">
                        {/* Left smaller image (takes 2/5 of grid) */}
                        <div className="relative md:col-span-2 col-span-3 md:h-[66vh] h-[40vh] md:w-auto w-full">
                            <Image
                                src="/Eni.jpg"
                                alt="Main image"
                                fill
                                className="rounded-2xl object-cover hover:scale-[1.04] transition-transform duration-300 ease-in-out"
                            />
                        </div>

                        {/* Right stacked images (takes 3/5 of grid) */}
                        <div className="col-span-3 flex flex-col gap-4">
                            <div className="relative w-full h-[32vh]">
                                <Image
                                    src="/Ted-1.jpg"
                                    alt="Top image"
                                    fill
                                    className="rounded-2xl object-cover hover:scale-[1.04] transition-transform duration-300 ease-in-out"
                                />
                            </div>
                            <div className="relative w-full h-[32vh]">
                                <Image
                                    src="/Ted-2.jpg"
                                    alt="Bottom image"
                                    fill
                                    className="rounded-2xl object-cover object-center hover:scale-[1.04] transition-transform duration-300 ease-in-out"
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center text-white mt-5'>
                        <Link href='https://www.ted.com/about/programs-initiatives/tedx-program' target='_blank'>
                            <button className={`${outfit.className} flex items-center bg-red-600 hover:bg-red-700 border-black border-2 cursor-pointer sm:p-5 p-1.5 rounded-lg gap-4 md:text-3xl text-lg`}>
                                Learn More <ArrowRight className='text-xl' />
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
