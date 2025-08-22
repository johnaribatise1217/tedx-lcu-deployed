'use client'
import React from 'react';
import { Outfit } from 'next/font/google';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User } from 'lucide-react';
import { blogPosts } from 'lib/blogData'; // Import blog data from separate file

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['400', '700']
});

export default function Blog() {
    return (
        <div id="blog" className="mt-20">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeIn" }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-black rounded-lg"
            >
                <div className="bg-gray-200 p-6 sm:p-10">
                    {/* Heading */}
                    <h2
                        className={`${outfit.className} text-3xl sm:text-4xl md:text-5xl font-normal flex flex-col items-center py-4`}
                    >
                        Our Blog
                    </h2>

                    {/* Subheading */}
                    <p
                        className={`${outfit.className} text-base sm:text-lg md:text-xl text-gray-700 tracking-wider leading-relaxed lg:w-1/2 w-full mx-auto text-center`}
                    >
                        Follow the rhythm of our thoughts before and after the change makers hit the red stage. Stay updated with the TEDxFortGarry movement!
                    </p>

                    {/* Cards */}
                    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 sm:gap-8 lg:px-28 px-3 sm:px-5 mt-10 sm:mt-14">
                        {blogPosts.map((blog) => (
                            <Link key={blog.id} href={`/blog/${blog.slug}`}>
                                <div className="rounded-2xl bg-white flex flex-col gap-2 hover:scale-[1.03] transition-transform duration-300 ease-in-out h-max cursor-pointer">
                                    <Image
                                        src={blog.image}
                                        alt="Blog Image"
                                        width={500}
                                        height={300}
                                        className="w-full h-[220px] sm:h-[260px] md:h-[280px] object-cover rounded-t-2xl"
                                    />
                                    <div className="p-4">
                                        <span className="text-red-600 text-sm font-medium uppercase tracking-wide">
                                            {blog.category}
                                        </span>
                                        <h2
                                            className={`${outfit.className} text-xl sm:text-2xl font-normal mt-2 mb-3`}
                                        >
                                            {blog.title}
                                        </h2>
                                        <p
                                            className={`${outfit.className} text-sm sm:text-base md:text-lg text-gray-700 tracking-wider leading-relaxed mb-4 text-start`}
                                        >
                                            {blog.excerpt}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <User size={14} />
                                                {blog.author}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {blog.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {blog.readTime}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}