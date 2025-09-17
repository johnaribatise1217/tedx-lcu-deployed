"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Outfit } from "next/font/google";
import { Plus, Minus, HelpCircle, Phone, Mail } from "lucide-react";
import Link from "next/link";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const faqData = [
    {
        id: 1,
        question: "What is TEDx and how is it different from TED?",
        answer:
            "TEDx events are independently organized TED-like events that bring communities together to share ideas and spark conversation. While TED is the main organization, TEDx events are locally organized under a free license from TED, allowing communities to host their own TED-style events.",
    },
    {
        id: 2,
        question: "When and where is TEDxLeadCityUniversity taking place?",
        answer:
            "TEDxLeadCityUniversity will take place on Friday, November 7th, 2025, from 9:00 AM to 4:00 PM at the International Conference Centre, Lead City University, Ibadan, Oyo state, Nigeria. The venue is easily accessible and comfortable for all attendees.",
    },
    {
        id: 3,
        question: "How much do tickets cost and what's included?",
        answer:
            "We offer three ticket tiers: Core Tickets (₦5,000), Circle Ticket (₦10,000), and Pulse Ticket (₦15,000). All tickets include access to talks, networking opportunities, and digital certificates. Higher tiers include additional perks like Priority check-in, meals, and speaker meet-and-greets.",
    },
    {
        id: 4,
        question: "Are there student discounts available?",
        answer:
            "If you're a member of a student community on campus, there's a chance that your association executives have Insider codes. They're limited in number, but if you get on first, use it! Good luck.",
    },
];

export default function FAQ() {
    const [openItems, setOpenItems] = useState(new Set());

    const toggleItem = (id) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(id)) {
            newOpenItems.delete(id);
        } else {
            newOpenItems.add(id);
        }
        setOpenItems(newOpenItems);
    };

    return (
        <section id="faqs" className="py-16 sm:py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                        <h2
                            className={`${outfit.className} text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900`}
                        >
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <p
                        className={`${outfit.className} text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed`}
                    >
                        {`Got questions about TEDxLeadCityUniversity? We've got answers!`}
                        Find everything you need to know about the event, tickets, and
                        what to expect.
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleItem(item.id)}
                                className="w-full p-4 sm:p-6 text-left flex items-center justify-between group hover:bg-gray-100 transition-colors duration-200"
                            >
                                <h3
                                    className={`${outfit.className} text-base sm:text-lg font-semibold text-gray-900 pr-2 sm:pr-4 group-hover:text-red-600 transition-colors duration-200`}
                                >
                                    {item.question}
                                </h3>
                                <div className="flex-shrink-0">
                                    {openItems.has(item.id) ? (
                                        <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 transition-transform duration-300" />
                                    ) : (
                                        <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 group-hover:text-red-600 transition-colors duration-200" />
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openItems.has(item.id) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                                            <div className="w-full h-px bg-gray-200 mb-3 sm:mb-4" />
                                            <p
                                                className={`${outfit.className} text-sm sm:text-base text-gray-700 leading-relaxed`}
                                            >
                                                {item.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-12 sm:mt-16 p-6 sm:p-8 bg-gradient-to-r from-red-50 to-gray-50 rounded-xl sm:rounded-2xl"
                >
                    <h3
                        className={`${outfit.className} text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4`}
                    >
                        Still have questions?
                    </h3>
                    <p className={`${outfit.className} text-sm sm:text-base text-gray-600 mb-6`}>
                        {`Can't find what you're looking for? Our team is here to help!`}
                    </p>
                    <div className="flex flex-col gap-5 pt-5 justify-center items-center">
                        <h3 className="text-red-600 font-semibold md:text-2xl text-[16px] flex items-center gap-3"><Phone className="md:flex hidden" /> 08085614651, +234 812 541 8541, +234 703 434 6739</h3>
                        <h3 className="text-black font-semibold md:text-2xl text-[16px] flex items-center gap-3"><Mail className="md:flex hidden" /> tedxleadcityuniversity@gmail.com</h3>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
