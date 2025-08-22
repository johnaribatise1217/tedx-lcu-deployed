"use client"
import { useEffect, useState } from "react"
import { CalendarMinus2, ChevronDown, MapPin, MoveRight } from "lucide-react"
import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
})

export default function HeroSection() {
    const [offsetY, setOffsetY] = useState(0)

    useEffect(() => {
        const handleScroll = () => setOffsetY(window.scrollY)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div
            className="bg-cover bg-no-repeat h-[70vh] lg:h-[80vh] xl:h-[100vh] w-full flex flex-col gap-6 items-center justify-between px-4 sm:px-6"
            style={{
                backgroundImage:
                    "url('https://res.cloudinary.com/djoxzzlue/image/upload/v1755806126/lines_psk66q.jpg')",
                backgroundPosition: `center calc(100% + ${offsetY * 0.3}px)`,
            }}
        >
            <div></div>

            {/* Center content */}
            <div className="flex flex-col gap-6 items-center text-center max-w-3xl">
                {/* Date + Location */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-center justify-center items-center">
                    <span className={`${inter.className} text-white flex items-center gap-2 text-sm sm:text-base`}>
                        <CalendarMinus2 className="w-4 h-4 text-white" />
                        November 20th, 2025
                    </span>
                    <span className="hidden sm:block border-r h-5 border-white"></span>
                    <span className={`${inter.className} text-white flex items-center gap-2 text-sm sm:text-base`}>
                        <MapPin className="w-4 h-4 text-white" />
                        Conference centre, Lead City University
                    </span>
                </div>

                {/* Hero Title */}
                <h1
                    className={`${inter.className} text-4xl sm:text-5xl lg:text-[4.3rem] text-white font-bold leading-tight`}
                >
                    Where Big Ideas Begin <br className="hidden sm:block" /> Bold Movements
                </h1>

                {/* Button */}
                <div className="flex justify-center text-white mt-6">
                    <Link href='/tickets'>
                        <button className="flex items-center bg-red-600 hover:bg-red-700 cursor-pointer px-6 py-3 sm:px-8 sm:py-4 rounded-lg gap-3 text-xl sm:text-2xl md:text-3xl">
                            Get Tickets <MoveRight className="text-lg sm:text-xl" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Scroll Down Icon */}
            <div className="border-2 sm:border-4 border-white rounded-full p-3 sm:p-4 mb-6 sm:mb-8">
                <ChevronDown className="text-white w-6 h-6 sm:w-8 sm:h-8" />
            </div>
        </div>
    )
}
