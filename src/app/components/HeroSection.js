"use client"
import { useEffect, useState } from "react"
import { CalendarMinus2, MapPin, MergeIcon, MoveRight } from "lucide-react"
import Link from "next/link"
import { anton, spaceMono } from "../fonts"
import Marquee from "./Marquee"

export default function HeroSection() {
    const [offsetY, setOffsetY] = useState(0)

    useEffect(() => {
        const handleScroll = () => setOffsetY(window.scrollY)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="relative">
            <div
                className="bg-grain bg-cover bg-no-repeat h-[85vh] sm:h-[90vh] xl:h-screen w-full flex flex-col justify-end"
                style={{
                    backgroundImage: "url('/images/Kamsi2.jpg')",
                    backgroundPosition: `center calc(100% + ${offsetY * 0.3}px)`,
                }}
            >
                {/* Darkening overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

                {/* Frame + kicker row */}
                <div className="relative z-10 flex items-start justify-between px-5 sm:px-8 md:px-14 pt-28 sm:pt-32">
                    <span className={`${spaceMono.className} text-white/80 text-[11px] sm:text-xs tracking-[0.3em] uppercase`}>
                        Est. TEDxLeadCityUniversity
                    </span>
                    <span className={`${spaceMono.className} hidden sm:block text-white/80 text-xs tracking-[0.3em] uppercase`}>
                        Ibadan, Nigeria
                    </span>
                </div>

                {/* Center content */}
                <div className="relative flex flex-col gap-6 items-center text-center px-4 sm:px-6 pb-14 sm:pb-16">
                    {/* Ripple rings, pulsing outward behind the headline */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                        <span className="ripple-ring w-40 h-40 sm:w-56 sm:h-56" style={{ animationDelay: "0s" }} />
                        <span className="ripple-ring w-40 h-40 sm:w-56 sm:h-56" style={{ animationDelay: "1.5s" }} />
                        <span className="ripple-ring w-40 h-40 sm:w-56 sm:h-56" style={{ animationDelay: "3s" }} />
                    </div>

                    <span className={`${spaceMono.className} relative z-10 border border-white text-red-100 text-[10px] sm:text-xs tracking-[0.3em] uppercase px-3 py-1`}>
                        2026 THEME
                    </span>

                    {/* Hero Title */}
                    <h1 className={`${anton.className} relative z-10 text-white uppercase leading-[0.9] text-5xl sm:text-7xl lg:text-8xl xl:text-9xl`}>
                        The Ripple
                        <br />
                        <span className="text-red-600">Effect.</span>
                    </h1>

                    <p className={`${spaceMono.className} relative z-10 text-white/90 text-base sm:text-lg tracking-[0.15em] uppercase`}>
                        Every idea sends a wave.
                    </p>

                    {/* Date + Location */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center mt-2">
                        <span className={`${spaceMono.className} text-white flex items-center gap-2 text-xs sm:text-sm border border-white/30 px-4 py-2`}>
                            <CalendarMinus2 className="w-4 h-4 text-red-500" />
                            Fri, Nov 6th, 2026
                        </span>
                        <span className={`${spaceMono.className} text-white flex items-center gap-2 text-xs sm:text-sm border border-white/30 px-4 py-2 text-center`}>
                            <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                            International Conference Center, Lead City University
                        </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3 justify-center mt-4">
                        <Link href='/tickets'>
                            <button className={`${spaceMono.className} flex items-center bg-red-600 hover:bg-red-700 cursor-pointer px-6 py-3.5 sm:px-8 sm:py-4 gap-3 text-xs sm:text-sm tracking-[0.2em] uppercase text-white transition-colors duration-300`}>
                                Get Tickets <MoveRight size={16} />
                            </button>
                        </Link>

                        <Link href='https://www.tachpae.com/events/tedx-leadcity-the-collective-2025'>
                            <button className={`${spaceMono.className} flex items-center hover:bg-white hover:text-black border-2 border-white transition-colors duration-300 cursor-pointer px-6 py-3.5 sm:px-8 sm:py-4 gap-3 text-xs sm:text-sm tracking-[0.2em] uppercase text-white`}>
                                Tedx Merch <MergeIcon size={16} />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Ticker strip replaces the old scroll-down chevron */}
            <Marquee />
        </div>
    )
}
