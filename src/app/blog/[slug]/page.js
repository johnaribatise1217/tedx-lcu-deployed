// app/blog/[slug]/page.js
import BlogDetail from '@/app/components/BlogDetails';
import { blogPosts } from 'lib/blogData';
import { notFound } from 'next/navigation';

// Generate static paths for all blog posts
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }) {
    const blog = blogPosts.find(post => post.slug === params.slug);

    if (!blog) {
        return {
            title: 'Blog Post Not Found',
        };
    }

    return {
        title: `${blog.title} | TEDxFortGarry Blog`,
        description: blog.excerpt,
        openGraph: {
            title: blog.title,
            description: blog.excerpt,
            images: [blog.image],
        },
    };
}

export default function BlogPage({ params }) {
    const blog = blogPosts.find(post => post.slug === params.slug);

    if (!blog) {
        notFound();
    }

    return <BlogDetail slug={params.slug} />;
}