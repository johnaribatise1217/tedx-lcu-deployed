"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Phone, Mail } from "lucide-react";
import { anton, spaceMono, outfit } from "../fonts";

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
            "TEDxLeadCityUniversity will take place on Friday, November 6th, 2026, from 9:00 AM to 4:00 PM at the International Conference Centre, Lead City University, Ibadan, Oyo state, Nigeria. The venue is easily accessible and comfortable for all attendees.",
    },
    {
        id: 3,
        question: "How much do tickets cost and what's included?",
        answer:
            "We offer three ticket tiers: Spark Pass Tickets (₦6,000), Ripple Experience Ticket (₦13,000), and Wave circle Ticket (₦20,000).  All ticket holders will enjoy access to the TEDx talks, networking opportunities, and a digital certificate of participation. Higher ticket tiers unlock additional exclusive perks, including priority check-in, meals, opportunities to meet and engage with speakers, and access to an exclusive CV review session with career opportunities facilitated by our partners.",
    },
    {
        id: 4,
        question: "Are there student discounts available?",
        answer:
            "If you're a member of a student community on campus, there's a chance that your association executives have Insider codes. They're limited in number, but if you get on first, use it! Good luck.",
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
        <section id="faqs" className="py-16 sm:py-20 bg-[var(--paper)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-12 sm:mb-16"
                >
                    <div className="flex items-center gap-4 mb-8 sm:mb-10">
                        <span className={`${spaceMono.className} text-red-600 text-xs sm:text-sm tracking-[0.3em]`}>07</span>
                        <span className={`${spaceMono.className} text-gray-500 text-xs sm:text-sm tracking-[0.3em] uppercase`}>FAQ</span>
                        <span className="flex-1 h-px bg-black/10" />
                    </div>
                    <h2
                        className={`${anton.className} uppercase text-3xl sm:text-5xl md:text-6xl text-center leading-[0.95]`}
                    >
                        Frequently Asked Questions
                    </h2>
                    <p
                        className={`${outfit.className} text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-center mt-4`}
                    >
                        {`Got questions about TEDxLeadCityUniversity? We've got answers!`}
                        Find everything you need to know about the event, tickets, and
                        what to expect.
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="flex flex-col">
                    {faqData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="border-t border-black/10 last:border-b"
                        >
                            <button
                                onClick={() => toggleItem(item.id)}
                                className="w-full py-5 sm:py-6 text-left flex items-center justify-between gap-4 group cursor-pointer"
                            >
                                <div className="flex items-baseline gap-4">
                                    <span className={`${spaceMono.className} text-red-600 text-xs sm:text-sm`}>
                                        0{index + 1}
                                    </span>
                                    <h3
                                        className={`${outfit.className} text-base sm:text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-200`}
                                    >
                                        {item.question}
                                    </h3>
                                </div>
                                <div className="flex-shrink-0">
                                    {openItems.has(item.id) ? (
                                        <Minus className="w-5 h-5 text-red-600" />
                                    ) : (
                                        <Plus className="w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors duration-200" />
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
                                        <div className="pb-5 sm:pb-6 pl-8 sm:pl-9 pr-8">
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
                    className="text-center mt-12 sm:mt-16 p-6 sm:p-8 bg-black text-white"
                >
                    <h3
                        className={`${anton.className} uppercase text-xl sm:text-2xl mb-3 sm:mb-4`}
                    >
                        Still have questions?
                    </h3>
                    <p className={`${outfit.className} text-sm sm:text-base text-gray-400 mb-6`}>
                        {`Can't find what you're looking for? Our team is here to help!`}
                    </p>
                    <div className="flex flex-col gap-4 pt-2 justify-center items-center">
                        <span className={`${spaceMono.className} text-red-500 font-semibold text-xs sm:text-sm flex items-center gap-3`}><Phone size={16} className="md:flex hidden" /> 08085614651, +234 812 541 8541, +234 703 434 6739</span>
                        <span className={`${spaceMono.className} font-semibold text-xs sm:text-sm flex items-center gap-3`}><Mail size={16} className="md:flex hidden" /> tedxleadcityuniversity@gmail.com</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
