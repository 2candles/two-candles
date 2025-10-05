// lib/markdown.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export async function getMarkdownData(id: string) {
  const fullPath = path.join(contentDirectory, `${id}.md`);
  if (!fs.existsSync(fullPath)) {
    // throw new Error(`File not found at ${fullPath}`);
    // ส่งข้อมูลที่ไม่พบแทนการ throw error เพื่อให้ Next.js ไม่ล่ม
    return {
        id,
        title: "ไม่พบข้อมูล",
        contentHtml: "<h3>ขออภัย ไม่พบเนื้อหาที่คุณต้องการ</h3>",
        date: "N/A"
    };
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as { title: string, date: string, author?: string }),
  };
}

export function getAllPostSlugs() {
  // ตรวจสอบว่าโฟลเดอร์ content มีอยู่จริง
  if (!fs.existsSync(contentDirectory)) return [];

  const fileNames = fs.readdirSync(contentDirectory);
  
  return fileNames.map(fileName => {
    // ลบส่วนขยาย .md ออก
    return {
      slug: fileName.replace(/\.md$/, ''),
    };
  });
}