// app/dhamma/page.tsx
import Link from 'next/link';
import { BookOpen, Zap, TrendingUp } from 'lucide-react';

// ข้อมูลตัวอย่าง (Dummy Data) สำหรับแสดงในหน้าสารบัญ
const dhammaTopics = [
  { 
    title: 'หลักอริยมรรคมีองค์ 8', 
    description: 'เส้นทางปฏิบัติเพื่อความพ้นทุกข์ที่พระพุทธเจ้าทรงค้นพบ', 
    href: '/articles/noble-eightfold-path', 
    icon: BookOpen 
  },
  { 
    title: 'การเจริญสติในชีวิตประจำวัน', 
    description: 'วิธีฝึกสติง่ายๆ ขณะเดิน ยืน นั่ง นอน และทำงาน', 
    href: '/articles/daily-mindfulness', 
    icon: Zap 
  },
  { 
    title: 'ความสำคัญของการทำทาน', 
    description: 'อานิสงส์ของการให้และเจตนาที่เป็นกุศล', 
    href: '/articles/merit-of-dana', 
    icon: TrendingUp 
  },
];

export default function DhammaPage() {
  return (
    <div className="space-y-12">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 p-8 md:p-16 rounded-3xl shadow-2xl shadow-blue-200 text-center border-t-4 border-blue-600">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
          ปัญญาและ<span className="text-blue-600">เส้นทางธรรม</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          รวบรวมหลักธรรมคำสอนที่ช่วยนำทางชีวิตสู่ความสงบและความสุขที่ยั่งยืน
        </p>
      </section>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-100 pb-2">หัวข้อธรรมะหลัก</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dhammaTopics.map((topic) => (
            <Link 
              key={topic.title} 
              href={topic.href} 
              className="p-6 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl hover:border-blue-300 transition duration-300 flex flex-col space-y-3"
            >
              <topic.icon size={32} className="text-blue-500 mb-2" />
              <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600">{topic.title}</h3>
              <p className="text-gray-600 text-sm flex-grow">{topic.description}</p>
              <span className="text-sm font-semibold text-blue-500 mt-2 flex items-center">
                อ่านบทความ &rarr;
              </span>
            </Link>
          ))}
        </div>
        
        {/* Call to Action/More Link */}
        <div className="text-center mt-10">
          <Link href="/articles" className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition border-b border-gray-300 hover:border-blue-600 pb-1">
            ดูบทความธรรมะทั้งหมด...
          </Link>
        </div>
      </div>
    </div>
  );
}