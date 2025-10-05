// app/articles/[slug]/page.tsx
import { getMarkdownData, getAllPostSlugs } from '@/lib/markdown'; // ใช้ alias @/lib/markdown

interface ArticlePageProps {
    params: {
        slug: string;
    };
}

// Next.js Feature: กำหนด Static Paths
export async function generateStaticParams() {
    return getAllPostSlugs();
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const postData = await getMarkdownData(params.slug);

    if (postData.title === "ไม่พบข้อมูล") {
        return (
            <div className="max-w-4xl mx-auto py-20 text-center">
                <h1 className="text-4xl font-bold text-red-600">404 - ไม่พบเนื้อหา</h1>
                <p className="mt-4 text-gray-600">ขออภัย เนื้อหาที่คุณร้องขออาจถูกลบหรือยังไม่ได้เผยแพร่</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 md:px-0">

            {/* ส่วนหัวบทความ */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-2">{postData.title}</h1>
            <p className="text-gray-500 mb-8 text-sm">
                เผยแพร่: {postData.date} {postData.author && `| โดย: ${postData.author}`}
            </p>

            {/* ส่วนเนื้อหา HTML ที่แปลงมาจาก Markdown (ใช้ Tailwind Prose) */}
            <div
                className="prose prose-blue prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />
        </div>
    );
}