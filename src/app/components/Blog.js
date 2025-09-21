'use client'
import React, { useEffect, useState } from 'react';
import { Outfit } from 'next/font/google';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User } from 'lucide-react';
import { toast } from 'sonner';
import { BlogService } from 'service/BlogService';

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['400', '700']
});

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
        return null;
    }

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
                        Follow the rhythm of our thoughts before and after the change makers hit the red stage. Stay updated with the TEDxLeadCityUniversity movement!
                    </p>

                    {/* Cards */}
                    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 sm:gap-8 lg:px-28 px-3 sm:px-5 mt-10 sm:mt-14">
                        {loading ? (
                            <p className="text-center text-gray-600 col-span-full text-2xl">Loading blogs...</p>
                        ) : blogs.length === 0 ? (
                            <p className="text-center text-gray-600 col-span-full text-2xl">No blogs available</p>
                        ) : (

                            blogs.slice(0, 3).map((blog) => (
                                <Link key={blog.id} href={`/blog/${blog.id}`}>
                                    <div className="rounded-2xl bg-white flex flex-col gap-2 hover:scale-[1.03] transition-transform duration-300 ease-in-out h-max cursor-pointer">
                                        <Image
                                            src={blog.thumbnailUrl || ''}
                                            alt="Blog Image"
                                            width={500}
                                            height={300}
                                            className="w-full h-[220px] sm:h-[260px] md:h-[280px] object-cover rounded-t-2xl"
                                        />
                                        <div className="p-4">
                                            <div className='flex gap-1'>
                                                <span className="text-red-600 p-2 rounded-xl text-[11px] font-medium uppercase tracking-wide">
                                                    {blog.tags[0]}
                                                </span>
                                                <span className='text-red-600'>|</span>
                                                <span className="text-red-600 p-2 rounded-xl text-[11px] font-medium uppercase tracking-wide">
                                                    {blog.tags[1]}
                                                </span>
                                            </div>
                                            <h2
                                                className={`${outfit.className} text-xl sm:text-[18px] font-normal mt-2 mb-3`}
                                            >
                                                {blog.title}
                                            </h2>

                                            <p
                                                className={`${outfit.className} text-sm sm:text-base md:text-[15px] text-gray-700 tracking-wider leading-relaxed mb-4 text-start`}
                                            >
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