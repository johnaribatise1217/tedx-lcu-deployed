'use client'
import React, { useEffect, useState } from 'react';
import { Outfit } from 'next/font/google';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogService } from 'service/BlogService';

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['400', '700']
});

export default function BlogDetail({ id }) {
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                setLoading(true);
                const response = await BlogService.getBlogById(id);
                setBlog(response);
            } catch (error) {
                console.log('Error fetching blog details:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogDetails();
    }, [id]);

    useEffect(() => {
        const fetchRelatedBlogs = async () => {
            try {
                setLoading(true)
                const response = await BlogService.getAllBlogs();
                setRelatedBlogs(response);
            } catch (error) {
                console.log('Error fetching related Blogs:', error);
            } finally {
                setLoading(false)
            }
        }

        fetchRelatedBlogs();
    }, [])



    if (loading) return <p className="text-center py-10 text-3xl flex h-screen justify-center items-center">Loading...</p>;
    if (error) return <p className="text-center py-10 text-red-500 text-3xl flex h-screen justify-center items-center">Error loading blog.</p>;
    if (!blog) return <p className="text-center py-10 text-3xl flex h-screen justify-center items-center">No blog found.</p>;

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
                    src={blog.thumbnailUrl}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="max-w-4xl mx-auto">
                        <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide mb-4">
                            {blog.tags?.[0]}
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
                        <span className={`${outfit.className}`}>{new Date(blog.createdAt).toDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={18} />
                        <span className={`${outfit.className}`}>{blog.readTime} read</span>
                    </div>
                </div>

                <h2 className={`${outfit.className} font-semibold mb-4 text-xl`}>{blog.subTitle}</h2>

                {/* Article Content */}
                {blog.paragraphs && blog.paragraphs.map((para, index) => (
                    <div key={index}>
                        <p className={`${outfit.className} text-gray-800 mb-6 leading-relaxed text-[16px] text-justify sm:text-start`}>
                            {para}
                        </p>

                        {/* Show blogImages after the 3rd paragraph */}
                        {index === 2 && blog.blogImages && blog.blogImages.length > 0 && (
                            <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                                {blog.blogImages.map((img, imgIndex) => (
                                    <img
                                        key={imgIndex}
                                        src={img}
                                        alt={`Blog image ${imgIndex + 1}`}
                                        width={400}
                                        height={400}
                                        className="rounded-lg mb-4 w-full"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-300">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}


                {/* Related Posts */}
                {/* Related Posts */}
                {relatedBlogs && relatedBlogs.length > 0 && (
                    <div className="mt-16">
                        <h3 className={`${outfit.className} text-2xl font-bold text-gray-900 mb-8`}>
                            More From Our Blog
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {relatedBlogs
                                .filter((relatedBlog) => relatedBlog.id !== blog.id) // ✅ exclude current blog
                                .slice(0, 2) // ✅ then only take 2
                                .map((relatedBlog) => (
                                    <Link key={relatedBlog.id} href={`/blog/${relatedBlog.id}`}>
                                        <div className="rounded-2xl bg-white flex flex-col gap-2 hover:scale-[1.03] transition-transform duration-300 ease-in-out cursor-pointer shadow-sm">
                                            <Image
                                                src={relatedBlog.thumbnailUrl}
                                                alt={relatedBlog.title}
                                                width={500}
                                                height={200}
                                                className="w-full h-[200px] object-cover rounded-t-2xl"
                                            />
                                            <div className="p-4">
                                                <span className="text-red-600 text-sm font-medium uppercase tracking-wide">
                                                    {relatedBlog.tags[0]}
                                                </span>
                                                <h4 className={`${outfit.className} text-lg font-normal mt-2 mb-2`}>
                                                    {relatedBlog.title}
                                                </h4>
                                                <p className={`${outfit.className} text-sm text-gray-700 leading-relaxed`}>
                                                    {relatedBlog.paragraphs[0].substring(0, 100)}...
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
