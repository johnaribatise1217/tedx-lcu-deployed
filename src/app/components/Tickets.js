"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TicketsService } from "service/TicketApi";
import { anton, spaceMono, outfit } from "../fonts";

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
            <section className="py-16 md:py-20 bg-black bg-grain">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
                        <p className={`${spaceMono.className} text-white text-sm tracking-[0.2em] uppercase`}>Loading tickets...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            id="tickets"
            className="py-16 md:py-20 bg-black bg-grain relative overflow-hidden"
        >
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-14 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-12 md:mb-16"
                >
                    <div className="flex items-center gap-4 mb-8 sm:mb-10">
                        <span className={`${spaceMono.className} text-red-500 text-xs sm:text-sm tracking-[0.3em]`}>06</span>
                        <span className={`${spaceMono.className} text-gray-400 text-xs sm:text-sm tracking-[0.3em] uppercase`}>Tickets</span>
                        <span className="flex-1 h-px bg-white/10" />
                    </div>

                    <h2 className={`${anton.className} uppercase text-4xl sm:text-6xl md:text-7xl text-white mb-4 sm:mb-6 text-center leading-[0.95]`}>
                        Secure Your <span className="text-red-600">Seat</span>
                    </h2>
                    <p
                        className={`${outfit.className} text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed text-center`}
                    >
                        Join us for an unforgettable experience of ideas worth spreading.
                        Limited seats available for this exclusive TEDx event.
                    </p>

                    {/* Event Details */}
                    <div className="flex sm:flex-row flex-wrap items-center justify-center text-center gap-3 sm:gap-6 text-white mb-10 sm:mb-12">
                        <div className={`${spaceMono.className} flex items-center gap-2 text-xs sm:text-sm border border-white/20 px-4 py-2`}>
                            <CalendarDays className="w-4 h-4 text-red-500" />
                            Friday, November 6th, 2026
                        </div>
                        <div className={`${spaceMono.className} flex items-center gap-2 text-xs sm:text-sm border border-white/20 px-4 py-2`}>
                            <Clock className="w-4 h-4 text-red-500" />
                            9:00 AM - 4:00 PM
                        </div>
                        <div className={`${spaceMono.className} flex items-center gap-2 text-xs sm:text-sm border border-white/20 px-4 py-2`}>
                            <MapPin className="w-4 h-4 text-red-500" />
                            International Conference Center, Lead City University
                        </div>
                        <div className={`${spaceMono.className} flex items-center gap-2 text-xs sm:text-sm border border-white/20 px-4 py-2`}>
                            <Users className="w-4 h-4 text-red-500" />
                            300 Seats Only
                        </div>
                    </div>
                </motion.div>

                {/* Ticket Options */}
                {tickets?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                        {tickets.map((ticket, index) => (
                            <motion.div
                                key={ticket.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className={`relative bg-white/5 p-6 sm:p-8 ${ticket.name === 'Circle Ticket' ? "border-2 border-red-600" : "border border-white/15"
                                    } hover:bg-white/10 transition-all duration-300`}
                            >
                                <div className="text-center mb-6">
                                    <h3 className={`${anton.className} uppercase text-xl sm:text-2xl text-white mb-2`}>
                                        {ticket.name}
                                    </h3>
                                    <p className={`${outfit.className} text-gray-400 text-sm sm:text-base mb-4`}>
                                        {ticket.description}
                                    </p>
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className={`${anton.className} text-3xl sm:text-4xl text-red-500`}>
                                            ₦{ticket.price}
                                        </span>
                                    </div>

                                    {/* Availability Info */}
                                    <div className="mt-3 text-center">
                                        <span className={`${spaceMono.className} text-[11px] sm:text-xs tracking-wide text-gray-500`}>
                                            {ticket.availableQuantity} Tickets Available
                                        </span>
                                    </div>
                                </div>

                                {/* Features/Benefits */}
                                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                                    {ticket.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-baseline gap-2 sm:gap-3">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full flex-shrink-0" />
                                            <span className={`${outfit.className} text-white text-sm sm:text-base`}>
                                                {benefit}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href='/tickets'>
                                    <button
                                        className={`${spaceMono.className} w-full bg-red-600 hover:bg-red-700 text-white cursor-pointer py-3 sm:py-4 text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group`}>
                                        Get {ticket.name}
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className={`${outfit.className} text-white text-xl mb-4`}>No tickets available at the moment</p>
                        <p className={`${outfit.className} text-gray-400`}>Please check back later for ticket availability</p>
                    </div>
                )}

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center border-t border-white/10 pt-10 sm:pt-12"
                >
                    <h3 className={`${anton.className} uppercase text-xl sm:text-3xl text-white mb-3 sm:mb-4`}>
                        Ready to be inspired?
                    </h3>
                    <p className={`${outfit.className} text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8`}>
                        Join hundreds of change-makers, innovators, and dreamers for a day of transformative ideas.
                    </p>
                    <Link href='/tickets'>
                        <button
                            className={`${spaceMono.className} cursor-pointer bg-red-600 hover:bg-red-700 text-white px-8 sm:px-12 py-4 sm:py-5 text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300`}
                        >
                            Get Your Tickets Now
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
