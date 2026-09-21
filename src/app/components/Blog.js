'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { BlogService } from 'service/BlogService';
import { anton, spaceMono, outfit } from '../fonts'

const API_BASE_URL = 'https://tedx-lcu-server.onrender.com/api'


export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                setLoading(true);
                const response = await BlogService.getAllBlogs();
                setBlogs(response);
            } catch (error) {
                console.log('Error fetching blog posts:', error);
                console.warn('API failed, using local blog data as fallback');
                // Use local blog data as fallback
                setBlogs(blogPosts);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogPost();
    }, [])

    if (!loading && (!blogs || blogs.length === 0)) {
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
                        <h2
                            className={`${outfit.className} text-3xl sm:text-4xl md:text-5xl font-normal flex flex-col items-center py-4`}
                        >
                            Our Blog
                        </h2>
                        <p
                            className={`${outfit.className} text-base sm:text-lg md:text-xl text-gray-700 tracking-wider leading-relaxed lg:w-1/2 w-full mx-auto text-center`}
                        >
                            No blog posts yet. Check back soon!
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (

        <div id="blog" className="mt-16 sm:mt-20">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeIn" }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-white"
            >
                <div className="bg-black bg-grain p-6 sm:p-10 md:px-14">
                    {/* Kicker */}
                    <div className="flex items-center gap-4 mb-8 sm:mb-10">
                        <span className={`${spaceMono.className} text-red-600 text-xs sm:text-sm tracking-[0.3em]`}>03</span>
                        <span className={`${spaceMono.className} text-gray-400 text-xs sm:text-sm tracking-[0.3em] uppercase`}>Blog</span>
                        <span className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Heading */}
                    <h2 className={`${anton.className} uppercase text-3xl sm:text-5xl md:text-6xl text-center leading-[0.95]`}>
                        Our Blog
                    </h2>

                    {/* Subheading */}
                    <p
                        className={`${outfit.className} text-sm sm:text-lg md:text-xl text-gray-400 tracking-wide leading-relaxed lg:w-1/2 w-full mx-auto text-center mt-4`}
                    >
                        Follow the rhythm of our thoughts before and after the change makers hit the red stage. Stay updated with the TEDxLeadCityUniversity movement!
                    </p>

                    {/* Cards */}
                    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 sm:gap-8 mt-10 sm:mt-14">
                        {loading ? (
                            <p className={`${spaceMono.className} text-center text-gray-400 col-span-full text-lg`}>Loading blogs...</p>
                        ) : blogs.length === 0 ? (
                            <p className={`${spaceMono.className} text-center text-gray-400 col-span-full text-lg`}>No blogs available</p>
                        ) : (

                            blogs.slice(0, 3).map((blog) => (
                                <Link key={blog.id} href={`/blog/${blog.id}`}>
                                    <div className="border border-white/15 hover:border-red-600 flex flex-col gap-2 transition-colors duration-300 h-max cursor-pointer group">
                                        <div className="relative w-full h-[220px] sm:h-[260px] md:h-[280px] overflow-hidden">
                                            <Image
                                                src={blog.thumbnailUrl || ''}
                                                alt="Blog Image"
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <div className='flex gap-2 items-center mb-3'>
                                                <span className={`${spaceMono.className} text-red-500 text-[11px] tracking-[0.2em] uppercase`}>
                                                    {blog.tags[0]}
                                                </span>
                                                <span className='text-red-500'>/</span>
                                                <span className={`${spaceMono.className} text-red-500 text-[11px] tracking-[0.2em] uppercase`}>
                                                    {blog.tags[1]}
                                                </span>
                                            </div>
                                            <h2 className={`${anton.className} uppercase text-xl sm:text-2xl leading-tight mb-3`}>
                                                {blog.title}
                                            </h2>

                                            <p className={`${outfit.className} text-sm sm:text-base text-gray-400 tracking-wide leading-relaxed text-start`}>
                                                {blog.paragraphs[0].substring(0, 150) + '...'}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
