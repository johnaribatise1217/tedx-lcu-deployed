"use client";

import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import { CalendarDays, MapPin, Clock, Users, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TicketsService } from "service/TicketApi";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                setLoading(true);
                const response = await TicketsService.getTickets();
                setTickets(response);
            } catch (error) {
                console.log('Error fetching tickets:', error);
                setTickets([]);
            } finally {
                setLoading(false);
            }
        }
        fetchTicket();
    }, []);

    if (loading) {
        return (
            <section className="py-16 md:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-red-900">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-400 mx-auto mb-4"></div>
                        <p className="text-white text-lg">Loading tickets...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            id="tickets"
            className="py-16 md:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 relative overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-red-900/70" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className={`${outfit.className} text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6`}>
                        Secure Your <span className="text-red-400">Seat</span>
                    </h2>
                    <p
                        className={`${outfit.className} text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed`}
                    >
                        Join us for an unforgettable experience of ideas worth spreading.
                        Limited seats available for this exclusive TEDx event.
                    </p>

                    {/* Event Details */}
                    <div className="flex sm:flex-row flex-wrap items-center justify-center text-center gap-4 sm:gap-8 text-white mb-10 sm:mb-12">
                        <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-lg">
                            <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                            <span>Friday, November 7th, 2025</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-lg">
                            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                            <span>9:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-lg">
                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                            <span>International Conference Center, Lead City University, Ibadan</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-lg">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                            <span>200 Seats Only</span>
                        </div>
                    </div>
                </motion.div>

                {/* Ticket Options */}
                {tickets.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                        {tickets.map((ticket, index) => (
                            <motion.div
                                key={ticket.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 ${ticket.name === 'Circle Ticket' ? "border-2 border-red-400 transform scale-[1.02]" : "border border-white/20"
                                    } hover:bg-white/15 transition-all duration-300`}
                            >
                                {/* Popular badge */}


                                <div className="text-center mb-6">
                                    <h3 className={`${outfit.className} text-xl sm:text-2xl font-bold text-white mb-2`}>
                                        {ticket.name}
                                    </h3>
                                    <p className={`${outfit.className} text-gray-300 text-sm sm:text-base mb-4`}>
                                        {ticket.description}
                                    </p>
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className={`${outfit.className} text-3xl sm:text-4xl font-bold text-red-400`}>
                                            ₦{ticket.price}
                                        </span>

                                    </div>


                                    {/* Availability Info */}
                                    <div className="mt-3 text-center">
                                        <span className={`${outfit.className} text-xs sm:text-sm text-gray-400`}>
                                            {ticket.availableQuantity} Tickets Available
                                        </span>

                                    </div>
                                </div>

                                {/* Features/Benefits */}
                                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                                    {ticket.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-baseline gap-2 sm:gap-3">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full flex-shrink-0" />
                                            <span className={`${outfit.className} text-white text-sm sm:text-base`}>
                                                {benefit}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href='/tickets'>
                                    <button
                                        className="w-full bg-red-gray-600 border-white border-2 hover:bg-red-700 text-white cursor-pointer py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group">
                                        Get {ticket.name}
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />

                                    </button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-white text-xl mb-4">No tickets available at the moment</p>
                        <p className="text-gray-400">Please check back later for ticket availability</p>
                    </div>
                )}

                {/* Urgency Section */}
                {/* <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-red-600/20 border border-red-400/30 rounded-2xl p-6 sm:p-8 text-center mb-10 sm:mb-12"
                >
                    <h3 className={`${outfit.className} text-2xl sm:text-3xl font-bold text-white mb-4`}>
                        ⚡ Early Bird Special - Limited Time!
                    </h3>

                    <div className="flex justify-center items-center gap-6 sm:gap-8 text-white">
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-red-400">23</div>
                            <div className="text-xs sm:text-sm">Days</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-red-400">14</div>
                            <div className="text-xs sm:text-sm">Hours</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-red-400">32</div>
                            <div className="text-xs sm:text-sm">Minutes</div>
                        </div>
                    </div>
                </motion.div> */}

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h3 className={`${outfit.className} text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4`}>
                        Ready to be inspired?
                    </h3>
                    <p className={`${outfit.className} text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8`}>
                        Join hundreds of change-makers, innovators, and dreamers for a day of transformative ideas.
                    </p>
                    <Link href='/tickets'>
                        <button
                            className={`${outfit.className} cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-lg sm:rounded-xl font-bold text-lg sm:text-xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-red-500/25`}
                        >
                            Get Your Tickets Now
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}