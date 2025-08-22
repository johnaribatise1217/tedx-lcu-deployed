'use client'
import React, { useState } from 'react';
import { Outfit } from 'next/font/google';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from 'lib/blogData';

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['400', '700']
});

export default function BlogDetail({ slug }) {

    // Find the blog post by slug
    const blog = blogPosts.find(post => post.slug === slug);

    if (!blog) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
                    <p className="text-gray-600 mb-8">{`The blog post you're looking for doesn't exist.`}</p>
                    <Link href="/" className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>

                </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-96 overflow-hidden">
                <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-opacity-30"></div>
                <div className="absolute inset-1 bg-black opacity-50 w-full h"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="max-w-4xl mx-auto">
                        <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide mb-4">
                            {blog.category}
                        </span>
                        <h1 className={`${outfit.className} text-4xl md:text-5xl font-bold text-white mb-4`}>
                            {blog.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
                    <div className="flex items-center gap-2">
                        <User size={18} />
                        <span className={`${outfit.className} font-medium`}>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span className={`${outfit.className}`}>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={18} />
                        <span className={`${outfit.className}`}>{blog.readTime}</span>
                    </div>
                </div>

                {/* Article Content */}
                <div
                    className={`${outfit.className} prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed md:text-left text-justify`}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Call to Action */}
                <div className="mt-16 p-8 bg-red-50 rounded-2xl text-center">
                    <h3 className={`${outfit.className} text-2xl font-bold text-gray-900 mb-4`}>
                        Join the TEDxLeadCityUniversity Community
                    </h3>
                    <p className={`${outfit.className} text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed`}>
                        Be part of a movement that celebrates ideas worth spreading.
                        Stay updated on upcoming events, speaker announcements, and community initiatives.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href='https://www.instagram.com/tedxleadcityuniversity?utm_source=ig_web_button_share_sheet&igsh=bjZmMDlkdjBwZms40' target='_blank'>
                            <button className={`${outfit.className} px-8 py-3 cursor-pointer bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-medium`}>
                                Join our community
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Related Posts */}
                <div className="mt-16">
                    <h3 className={`${outfit.className} text-2xl font-bold text-gray-900 mb-8`}>
                        More From Our Blog
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {blogPosts.filter(post => post.id !== blog.id).slice(0, 2).map((relatedBlog) => (
                            <Link key={relatedBlog.id} href={`/blog/${relatedBlog.slug}`}>
                                <div className="rounded-2xl bg-white flex flex-col gap-2 hover:scale-[1.03] transition-transform duration-300 ease-in-out cursor-pointer shadow-sm">
                                    <Image
                                        src={relatedBlog.image}
                                        alt={relatedBlog.title}
                                        width={500}
                                        height={200}
                                        className="w-full h-[200px] object-cover rounded-t-2xl"
                                    />
                                    <div className="p-4">
                                        <span className="text-red-600 text-sm font-medium uppercase tracking-wide">
                                            {relatedBlog.category}
                                        </span>
                                        <h4 className={`${outfit.className} text-lg font-normal mt-2 mb-2`}>
                                            {relatedBlog.title}
                                        </h4>
                                        <p className={`${outfit.className} text-sm text-gray-700 leading-relaxed`}>
                                            {relatedBlog.excerpt.substring(0, 100)}...
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}