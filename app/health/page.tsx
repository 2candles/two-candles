// app/health/page.tsx
import Link from 'next/link';
import { Heart, Leaf, CookingPot } from 'lucide-react';

// ข้อมูลตัวอย่าง (Dummy Data) สำหรับแสดงในหน้าสารบัญ
const healthTopics = [
  { 
    title: 'โภชนาการสำหรับวิถีชีวิตชาวพุทธ', 
    description: 'การเลือกอาหารที่ถูกสุขลักษณะและเหมาะสมกับหลักธรรม', 
    href: '/articles/buddhist-nutrition', 
    icon: CookingPot 
  },
  { 
    title: 'การบริหารร่างกายและจิตใจ', 
    description: 'โยคะ การเดินจงกรม และการสร้างสมดุลชีวิต', 
    href: '/articles/mind-body-balance', 
    icon: Heart 
  },
  { 
    title: 'สมุนไพรและธรรมชาติบำบัด', 
    description: 'เรียนรู้การใช้พลังจากธรรมชาติเพื่อเยียวยาร่างกาย', 
    href: '/articles/herbal-remedies', 
    icon: Leaf 
  },
];

export default function HealthPage() {
  return (
    <div className="space-y-12">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-teal-100 p-8 md:p-16 rounded-3xl shadow-2xl shadow-green-200 text-center border-t-4 border-green-600">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4 tracking-tight">
          ศาสตร์แห่ง<span className="text-green-600">สุขภาพดี</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          แนวทางปฏิบัติเพื่อสุขภาพกายที่แข็งแรง สอดคล้องกับสุขภาพจิตที่สงบ
        </p>
      </section>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-100 pb-2">หัวข้อสุขภาพหลัก</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthTopics.map((topic) => (
            <Link 
              key={topic.title} 
              href={topic.href} 
              className="p-6 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl hover:border-green-300 transition duration-300 flex flex-col space-y-3"
            >
              <topic.icon size={32} className="text-green-500 mb-2" />
              <h3 className="text-xl font-bold text-gray-800 hover:text-green-600">{topic.title}</h3>
              <p className="text-gray-600 text-sm flex-grow">{topic.description}</p>
              <span className="text-sm font-semibold text-green-500 mt-2 flex items-center">
                อ่านบทความ &rarr;
              </span>
            </Link>
          ))}
        </div>
        
        {/* Call to Action/More Link */}
        <div className="text-center mt-10">
          <Link href="/articles" className="text-lg font-semibold text-gray-700 hover:text-green-600 transition border-b border-gray-300 hover:border-green-600 pb-1">
            ดูบทความสุขภาพทั้งหมด...
          </Link>
        </div>
      </div>
    </div>
  );
}