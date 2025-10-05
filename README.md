# 🕯️ 2Candles.com: Modern Next.js Website

โปรเจ็กต์นี้คือการสร้างหน้าเว็บไซต์ 2Candles.com ขึ้นมาใหม่ โดยใช้ **Next.js 15.5.4**, TypeScript และ Tailwind CSS เน้นการออกแบบที่ทันสมัย (Modern), **Responsive** และการจัดการเนื้อหาด้วย **Markdown**

## 🛠️ เทคโนโลยีและคุณสมบัติหลัก

* **Framework:** **Next.js 15.5.4 (App Router)**
* **Language:** TypeScript
* **Styling:** Tailwind CSS (พร้อม `@tailwindcss/typography` สำหรับเนื้อหา Markdown)
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

อัพเดทเวอร์ชัน Next.js เป็น 15.5.4 และติดตั้งแพ็กเกจอื่นๆ:

```bash
# ติดตั้ง Next.js (เวอร์ชัน 15.5.4) และ Dependencies อื่นๆ
npm install next@^15.5.4 react react-dom typescript @types/react @types/node tailwindcss postcss autoprefixer lucide-react
npm install -D @tailwindcss/typography
npm install gray-matter remark remark-html
```
