# สรุปขั้นตอนการสร้างเว็บไซต์ (Next.js + Tailwind + Markdown) 🛠️

1.  **การติดตั้ง:** ติดตั้ง Next.js, TypeScript, Tailwind CSS, และไลบรารีสำหรับ Markdown (`gray-matter`, `remark`, `remark-html`)
2.  **โครงสร้างไฟล์:** สร้างโฟลเดอร์ `content`, `lib`, และ `components`
3.  **Layout หลัก:** กำหนด `RootLayout` (`app/layout.tsx`) ให้มี `Navbar` และ `Footer` ปรากฏทุกหน้า
4.  **Responsive Navbar:** สร้าง `Navbar.tsx` ที่ใช้ `useState` เพื่อจัดการ **Hamburger Menu** สำหรับ Mobile
5.  **หน้าแรก (Home):** สร้าง `app/page.tsx` ด้วย Layout 3 คอลัมน์ (3/6/3) ที่เป็น Responsive
6.  **Markdown Integration:** สร้าง Utility function ใน `lib/markdown.ts` เพื่ออ่านไฟล์ `.md` และสร้าง Dynamic Route (`app/articles/[slug]/page.tsx`) เพื่อแสดงเนื้อหา

-----

## โครงสร้างไฟล์ที่สมบูรณ์ 📁

นี่คือโครงสร้างไฟล์ทั้งหมดที่คุณต้องสร้างและใส่โค้ด:

```
2Candles-Project/
├── app/
│   ├── articles/
│   │   └── [slug]/
│   │       └── page.tsx      # แสดงเนื้อหาจากไฟล์ .md
│   ├── globals.css           # CSS และ Tailwind Directives
│   ├── layout.tsx            # Root Layout (Navbar, Footer)
│   └── page.tsx              # หน้าแรก (Home Page)
├── components/
│   └── Navbar.tsx            # Component สำหรับ Header/Navbar (พร้อม Hamburger)
├── content/
│   └── article-1.md          # ไฟล์เนื้อหา Markdown ตัวอย่าง
├── lib/
│   └── markdown.ts           # Utility สำหรับการอ่านและแปลง Markdown
├── public/
│   ├── placeholder-candle.jpg 
│   └── placeholder-profile.jpg
├── package.json              # (ตรวจดู dependencies)
└── README.md                 # เอกสารอัพเดทสำหรับ GitHub
```

-----

## 1\. การติดตั้ง Dependencies (Dependencies List)

เปิด Terminal ในโปรเจ็กต์ของคุณและรันคำสั่งเหล่านี้เพื่อติดตั้งทุกอย่างที่จำเป็น:

```bash
# ติดตั้ง Next.js, Tailwind และ Typography Plugin
npm install next react react-dom typescript @types/react @types/node tailwindcss postcss autoprefixer
npm install -D @tailwindcss/typography
# ติดตั้ง Markdown Utilities
npm install gray-matter remark remark-html
# ติดตั้ง Icon Library
npm install lucide-react
```

> **หมายเหตุ:** ต้องมีการตั้งค่า Tailwind ใน `tailwind.config.ts` โดยเพิ่ม `require('@tailwindcss/typography')` ในส่วนของ `plugins`

-----

## 2\. โค้ดฉบับเต็ม 💻

### A. Utility Function (`lib/markdown.ts`)

```typescript
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
```

### B. Navbar (`components/Navbar.tsx`)

```tsx
// components/Navbar.tsx
'use client'; 
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; 

const navItems = [
    { name: 'หน้าแรก', href: '/' },
    { name: 'ธรรมะ', href: '/dhamma' },
    { name: 'สุขภาพ', href: '/health' },
    { name: 'กิจกรรม', href: '/events' },
    { name: 'ติดต่อ', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100"> 
        <nav className="container mx-auto max-w-7xl p-4 flex justify-between items-center">
            
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-2 group">
                <span className="text-2xl font-extrabold text-blue-600 group-hover:text-blue-700 transition">🕯️</span>
                <div className="text-xl font-bold text-gray-800">2Candles.com</div>
            </Link>

            {/* Desktop Menu Links */}
            <div className="hidden md:flex space-x-6 items-center">
                {navItems.map((item) => (
                    <Link 
                        key={item.name} 
                        href={item.href} 
                        className="text-gray-600 hover:text-blue-600 transition duration-300 font-medium hover:scale-105"
                    >
                        {item.name}
                    </Link>
                ))}
                
                {/* Language Switch บน Desktop */}
                <button className="text-sm font-medium text-gray-700 hover:text-blue-600 transition p-2 rounded-lg border border-transparent hover:border-blue-200 ml-4">
                    EN | TH
                </button>
            </div>

            {/* Hamburger Icon */}
            <button 
                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </nav>

        {/* Mobile Menu (Sliding Down) */}
        <div 
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100 py-2 border-t border-gray-100' : 'max-h-0 opacity-0'
            }`}
        >
            <div className="flex flex-col space-y-2 px-4 pb-4">
                {navItems.map((item) => (
                    <Link 
                        key={item.name} 
                        href={item.href} 
                        onClick={() => setIsOpen(false)} // ปิดเมนูเมื่อคลิก
                        className="text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 p-2 rounded-md transition"
                    >
                        {item.name}
                    </Link>
                ))}
                 <button className="text-left text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 p-2 rounded-md transition">
                    EN | TH
                </button>
            </div>
        </div>
    </header>
  );
}
```

### C. Layout หลัก (`app/layout.tsx`)

```tsx
// app/layout.tsx
import './globals.css';
import Navbar from '../components/Navbar'; 
import React from 'react';

// แยก Footer ออกมาเพื่อให้โค้ด layout สะอาด
const Footer = () => (
    <footer className="bg-gray-800 text-white p-8 mt-10 border-t-8 border-blue-600"> 
        <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-8 mb-8">
                
                <div className="col-span-2 md:col-span-2 space-y-3">
                    <div className="flex items-center space-x-2">
                        <span className="text-3xl font-extrabold text-blue-400">🕯️</span>
                        <div className="text-2xl font-bold text-white">2Candles.com</div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        เส้นทางสู่แสงสว่างแห่งปัญญา ศาสตร์แห่งธรรมะ สุขภาพ และการใช้ชีวิตอย่างสมดุล
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-blue-300 uppercase tracking-wider">สารบัญหลัก</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="/" className="text-gray-400 hover:text-blue-400 transition">หน้าแรก</a></li>
                        <li><a href="/dhamma" className="text-gray-400 hover:text-blue-400 transition">ธรรมะและสติ</a></li>
                        <li><a href="/health" className="text-gray-400 hover:text-blue-400 transition">สุขภาพและชีวิต</a></li>
                        <li><a href="/events" className="text-gray-400 hover:text-blue-400 transition">กิจกรรม</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-blue-300 uppercase tracking-wider">สนับสนุน</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="/donate" className="text-gray-400 hover:text-blue-400 transition">ร่วมทำบุญ</a></li>
                        <li><a href="/subscribe" className="text-gray-400 hover:text-blue-400 transition">สมัครสมาชิก</a></li>
                        <li><a href="/sponsors" className="text-gray-400 hover:text-blue-400 transition">ผู้สนับสนุน</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-blue-300 uppercase tracking-wider">ข้อมูล</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="/about" className="text-gray-400 hover:text-blue-400 transition">เกี่ยวกับเรา</a></li>
                        <li><a href="/contact" className="text-gray-400 hover:text-blue-400 transition">ติดต่อ</a></li>
                        <li><a href="/privacy" className="text-gray-400 hover:text-blue-400 transition">นโยบายความเป็นส่วนตัว</a></li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 pt-4">
                <p>
                    © {new Date().getFullYear()} 2Candles.com. All Rights Reserved.
                </p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition">Facebook</a> 
                    <a href="#" className="hover:text-white transition">YouTube</a>
                </div>
            </div>
        </div>
    </footer>
);


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="bg-gray-50">
      <body>
        <div className="min-h-screen flex flex-col">
          
          <Navbar /> 

          <main className="flex-grow container mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
```

### D. หน้าแรก (`app/page.tsx`)

```tsx
// app/page.tsx
import { ChevronRight } from 'lucide-react'; 
import Link from 'next/link';

// ------------------------------------------------------------------
// Reusable Components
// ------------------------------------------------------------------

interface SidebarCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const SidebarCard: React.FC<SidebarCardProps> = ({ title, children, className = '' }) => (
    <div className={`p-5 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ${className}`}>
        <h3 className="font-extrabold text-lg text-gray-800 border-b-2 border-blue-100 pb-2 mb-4">{title}</h3>
        {children}
    </div>
);

interface PrimaryButtonProps {
    children: React.ReactNode;
    className?: string;
    href?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className = '', href = '#' }) => {
    const buttonClass = `w-full font-semibold py-3 rounded-lg shadow-md transition duration-300 ${className}`;
    
    // ใช้ Link component ถ้ามี href
    if (href !== '#') {
        return (
            <Link href={href} className={`${buttonClass} text-center`}>
                {children}
            </Link>
        );
    }
    
    return (
        <button className={buttonClass}>
            {children}
        </button>
    );
};


// ------------------------------------------------------------------
// Main Page Layout
// ------------------------------------------------------------------

export default function HomePage() {
  return (
    <div className="space-y-10">
      
      {/* 1. Hero Section (Responsive) */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 md:p-16 rounded-3xl shadow-2xl shadow-blue-200 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
          สัพทาน <span className="text-blue-600">ธัมมทาน</span> ชินวุติ
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          เส้นทางสู่ความสงบและการชนะธรรมแห่งปวงชน
        </p>
        <PrimaryButton 
            href="/learn"
            className="bg-blue-600 text-white text-lg hover:bg-blue-700 shadow-xl shadow-blue-400/50 flex items-center justify-center mx-auto w-auto px-8"
        >
            <span className="mr-2">เริ่มเรียนรู้</span> <ChevronRight size={20} />
        </PrimaryButton>
      </section>

      {/* 2. Three-Column Layout (3/6/3 - Responsive Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        
        {/* 2.1. Sidebar ซ้าย (Login/Subscribe) - md:col-span-3 */}
        <aside className="md:col-span-3 space-y-6">
          <SidebarCard title="เข้าสู่ระบบ / ลงทะเบียน">
            <PrimaryButton href="/login" className="bg-gray-600 hover:bg-gray-700 text-white mb-3">เข้าสู่ระบบ</PrimaryButton>
            <PrimaryButton href="/subscribe" className="bg-green-500 hover:bg-green-600 shadow-green-400/50 text-white">สมัครสมาชิก</PrimaryButton>
          </SidebarCard>
          
          <SidebarCard title="SPONSORS">
            <div className="h-28 bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg border-dashed border-2 border-gray-300 text-sm">
                พื้นที่สำหรับผู้สนับสนุน
            </div>
          </SidebarCard>
        </aside>

        {/* 2.2. Main Content (พื้นที่ตรงกลาง) - md:col-span-6 */}
        <div className="md:col-span-6 space-y-8">
          
          <section className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-orange-500">
            <h2 className="text-xl md:text-2xl font-bold text-orange-700 mb-4">ยินดีต้อนรับสู่ 2Candles.com</h2>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-start">
              <img src="/placeholder-candle.jpg" alt="เทียนศักดิ์สิทธิ์" className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md" />
              <p className="text-gray-700 leading-relaxed">
                <span className="font-extrabold text-xl md:text-2xl text-orange-500">วิถีชีวิต</span> คือเครื่องมืออันทรงพลังในการสร้างสรรค์ชีวิตที่ดีกว่าเดิม ...
                <br /><br />
                เรามุ่งมั่นที่จะเผยแพร่ความรู้และปัญญา เพื่อความสุขและความสงบแก่ทุกชีวิตบนโลกใบนี้
              </p>
            </div>
          </section>

          <section className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 border-b pb-2">บทความเด่นวันนี้</h2>
            <div className="flex items-start space-x-4">
                <img src="/placeholder-profile.jpg" alt="ภาพ อ. จารันต์" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full shadow-md" />
                <div>
                    <h3 className="font-extrabold text-lg md:text-xl text-green-700">อ. จารันต์ รัตนกมล</h3>
                    <p className="text-gray-600 mt-1">ศาสตร์เพื่อการมีชีวิตอย่างเข้าใจและถูกธรรม: อาหารอากาศและการเจริญสติ</p>
                    {/* เชื่อมโยงไปที่ Dynamic Route ของ Markdown */}
                    <Link href="/articles/article-1" className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-flex items-center">
                        อ่านต่อ <ChevronRight size={16} />
                    </Link>
                </div>
            </div>
          </section>

        </div>

        {/* 2.3. Sidebar ขวา (ส่วนบุญ/กิจกรรม) - md:col-span-3 */}
        <aside className="md:col-span-3 space-y-6">
          
          <SidebarCard title="ร่วมทำบุญ">
            <div className="bg-gradient-to-br from-purple-200 to-pink-100 p-4 rounded-lg text-center mb-4">
                <div className="text-3xl mb-2">🙏</div>
                <p className="text-sm font-semibold text-purple-800">ร่วมบริจาคเพื่อโครงการธรรมะใหญ่</p>
            </div>
            <PrimaryButton href="/donate" className="bg-purple-600 hover:bg-purple-700 shadow-purple-400/50 text-white">ทำบุญออนไลน์</PrimaryButton>
          </SidebarCard>

          <SidebarCard title="ปฏิทินกิจกรรม">
            <ul className="space-y-3">
                <li className="text-sm border-b pb-2"><span className="font-bold text-blue-600">วันนี้:</span> พิธีสวดมนต์ประจำสัปดาห์</li>
                <li className="text-sm border-b pb-2"><span className="font-bold text-blue-600">ส.ส.หน้า:</span> โครงการอบรมกรรมฐาน</li>
                <li className="text-sm"><Link href="/events" className='font-bold text-blue-600 hover:text-blue-700 transition'>ดูทั้งหมด...</Link></li>
            </ul>
          </SidebarCard>
        </aside>
      </div>
    </div>
  );
}
```

### E. Dynamic Markdown Page (`app/articles/[slug]/page.tsx`)

```tsx
// app/articles/[slug]/page.tsx
import { getMarkdownData, getAllPostSlugs } from '@/lib/markdown'; // ใช้ alias @/lib/markdown

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Next.js Feature: กำหนด Static Paths
export async function generateStaticParams() {
  // สังเกตว่าเราใช้ slug เป็น array ของ object ที่มี property ชื่อ slug
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
```

### F. ไฟล์เนื้อหาตัวอย่าง (`content/article-1.md`)

```markdown
---
title: บทความเรื่อง ศาสตร์แห่งการเจริญสติและการใช้ชีวิต
date: '2025-10-05'
author: ผู้ช่วยเขียนโค้ด 2 Candles
---

# ศาสตร์แห่งการเจริญสติและวิถีชีวิตที่ยั่งยืน

การใช้ชีวิตอย่างมีสติเป็นรากฐานสำคัญของความสุขและความสงบ **2Candles.com** เชื่อว่าธรรมะสามารถบูรณาการเข้ากับชีวิตประจำวันได้

## ประโยชน์ของการฝึกสติ

* **ลดความเครียด:** การเจริญสติช่วยให้เราอยู่กับปัจจุบันและลดความกังวลในอนาคต
* **เพิ่มความเข้าใจ:** เราสามารถตอบสนองต่อสถานการณ์ต่างๆ ได้ดีขึ้น ไม่ใช่แค่การตอบโต้
* **สุขภาพดี:** ส่งผลดีต่อทั้งสุขภาพกายและสุขภาพจิตที่แข็งแรง

> "สัพทาน ธัมมทาน ชินวุติ" - การชนะด้วยธรรมะคือการชนะที่ยั่งยืนที่สุด

นี่คือ **รายการลำดับ** ที่สำคัญ:

1.  การตื่นรู้ในทุกขณะ
2.  การหายใจเข้า-ออกอย่างช้าๆ
3.  การเจริญเมตตาภาวนา

คุณสามารถ **เน้นข้อความ** ในส่วนที่สำคัญได้ และใส่ **ลิงก์** ได้ตามปกติ [อ่านเพิ่มเติมเกี่ยวกับธรรมะ](/)
```

-----

## 3\. ไฟล์ README.md ที่อัพเดทแล้ว 📝

````markdown
# 🕯️ 2Candles.com: Modern Next.js Website

โปรเจ็กต์นี้คือการสร้างหน้าเว็บไซต์ 2Candles.com ขึ้นมาใหม่ โดยใช้ Next.js 14, TypeScript และ Tailwind CSS เน้นการออกแบบที่ทันสมัย (Modern), **Responsive** และการจัดการเนื้อหาด้วย **Markdown**

## 🛠️ เทคโนโลยีและคุณสมบัติหลัก

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (พร้อม **@tailwindcss/typography** สำหรับเนื้อหา Markdown)
* **Content Management:** **Markdown/Front Matter** (ใช้ `gray-matter`, `remark`, `remark-html`)
* **Responsive:** รองรับทุกอุปกรณ์ (Mobile First) พร้อม **Hamburger Menu** บนจอขนาดเล็ก
* **Deployment:** Vercel

## 🏗️ โครงสร้างและการนำทาง

### Layout หลัก (3 คอลัมน์)

เว็บไซต์ใช้โครงสร้างแบบ 3 คอลัมน์บน Desktop และปรับเป็น 1 คอลัมน์บน Mobile

| ส่วนประกอบ | สัดส่วน (Desktop) | Component |
| :--- | :--- | :--- |
| **Navbar** | คงที่บนทุกหน้า | `components/Navbar.tsx` (พร้อม Hamburger Menu) |
| **เนื้อหาหลัก** | 6/12 | `app/page.tsx` (Hero Section, บทความ) |
| **Sidebar ซ้าย/ขวา** | 3/12 และ 3/12 | `app/page.tsx` (Login, Sponsors, ทำบุญ, กิจกรรม) |

### Dynamic Content

เนื้อหาบทความถูกจัดเก็บในรูปแบบ Markdown ภายใต้โฟลเดอร์ `content/` และแสดงผลผ่าน Dynamic Route:

* **Logic:** `lib/markdown.ts`
* **Display URL:** `/articles/[slug]` (เช่น `/articles/article-1`)

## 🚀 การเริ่มต้นโปรเจ็กต์

### 1. ติดตั้ง Dependencies

ตรวจสอบให้แน่ใจว่าคุณมี Node.js และ npm/yarn ติดตั้งอยู่ จากนั้นติดตั้งแพ็กเกจทั้งหมด:

```bash
# ติดตั้งทั้งหมดตามที่ระบุในคำแนะนำ
npm install next react react-dom typescript @types/react @types/node tailwindcss postcss autoprefixer lucide-react
npm install -D @tailwindcss/typography
npm install gray-matter remark remark-html
````

### 2\. รัน Local Server

รันโปรเจ็กต์ในโหมดพัฒนา (Development Mode):

```bash
npm run dev
```

เว็บไซต์จะเปิดที่ `http://localhost:3000`

### 3\. Build & Deploy

สำหรับการสร้าง Production Build และการ Deploy บน Vercel:

```bash
npm run build
```

-----

ตอนนี้โค้ดทั้งหมดครบถ้วนและพร้อมสำหรับการเริ่มต้นใช้งานแล้วครับ\! ขอให้สนุกกับการพัฒนาเว็บไซต์ **2 Candles** ครับ 😊