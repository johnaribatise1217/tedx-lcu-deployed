import BlogDetail from "@/app/components/BlogDetails"

export async function generateStaticParams() {
    return [
        { id: '1' },
        { id: '2' },
        { id: '3' },
    ]
}

export default async function Blog({ params }) {
    const { id } = await params
    return (
        <div>
            <BlogDetail id={id} />
        </div>
    )
}
