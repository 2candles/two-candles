// app/health/page.tsx
import Link from 'next/link';
import { Heart, Leaf, CookingPot, BookOpen, Utensils, MessageSquare, Briefcase } from 'lucide-react';
import React from 'react';

// ------------------------------------------------------------------
// 1. Data Structure and Preparation
// ------------------------------------------------------------------

type TopicGroup = 'คำครู สู่ศิษย์' | 'บทความสุขภาพทั่วไป';
type IconName = 'Heart' | 'Leaf' | 'CookingPot' | 'BookOpen' | 'Utensils' | 'MessageSquare' | 'Briefcase';

interface HealthTopic {
    group: TopicGroup;
    title: string;
    slug: string; // ชื่อไฟล์ .md ที่ไม่มีนามสกุล
    icon: IconName;
}

// Map ชื่อ Icon string ไปยัง Component จริง
const IconMap: Record<IconName, React.ElementType> = {
    Heart: Heart,
    Leaf: Leaf,
    CookingPot: CookingPot,
    BookOpen: BookOpen,
    Utensils: Utensils,
    MessageSquare: MessageSquare,
    Briefcase: Briefcase,
};

// ข้อมูลเนื้อหาทั้งหมดตามที่คุณระบุ
const allHealthTopics: HealthTopic[] = [
    // --- หมวดหมู่: คำครู สู่ศิษย์ ---
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "เสียงไม่มีพลัง"', slug: 'health-SoundPowerless', icon: 'Heart' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "ไรฝุ่น....."', slug: 'health-DustMites', icon: 'Leaf' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "อาหารเป็นพิษ"', slug: 'health-FoodPoisoning', icon: 'CookingPot' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "เป็นหวัด..."', slug: 'health-Cold', icon: 'Heart' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "หวัด...วิธีโบราณ"', slug: 'health-Oldcold', icon: 'Leaf' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "เด็กดู ทีวีมากเกินไป"', slug: 'health-ChildrenTV', icon: 'Heart' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "หนาว"', slug: 'health-Colds', icon: 'Heart' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "ความจำเสื่อม"', slug: 'health-Amnesia', icon: 'Heart' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "อย่าอาบน้ำดึก"', slug: 'health-ShowerLate', icon: 'Heart' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "สูตร ล้างคอ"', slug: 'health-ClearThroat', icon: 'Leaf' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "ล้างไต.....ควรทำ"', slug: 'health-KidneyDialysis', icon: 'CookingPot' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "ล้างไต นิ่ว"', slug: 'health-Frown', icon: 'CookingPot' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "สูตร ลดความอ้วน...น่าลอง"', slug: 'health-LoseWeight', icon: 'CookingPot' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "โรคที่มากับน้ำ"', slug: 'health-WaterBorne', icon: 'Heart' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "ยาผีบอก..... "', slug: 'health-GhostMedicine', icon: 'Leaf' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "หยวกกล้วย ช่วยได้"', slug: 'health-BananaStalk', icon: 'Leaf' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "ท้องเสีย บ่อย"', slug: 'health-Diarrhea', icon: 'CookingPot' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "นอน ห้องแอร์"', slug: 'health-SleepAir-conditioned', icon: 'Heart' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "สูตรลับ สำหรับ ผู้ชาย"', slug: 'health-SecretMen', icon: 'Heart' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "สมุนไพรใหม่ควรอ่าน "หินระเบิด"', slug: 'health-ExplosiveRock', icon: 'Leaf' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "ผักเสี้ยน กับ พยาธิ"', slug: 'health-Tare', icon: 'Leaf' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "สะตอ กับ เบาหวาน"', slug: 'health-Gator', icon: 'Leaf' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "มีปัญหาเกี่ยวเรื่องหู"', slug: 'health-EarsProblems', icon: 'Heart' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "วิธีทานยา"', slug: 'health-TakeMedicine', icon: 'CookingPot' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "โรคที่มากับน้ำท่วม"', slug: 'health-WaterBorne2', icon: 'Heart' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "ปวดแขน...เท้าชา"', slug: 'health-PainArmsFeet', icon: 'Heart' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "ไอ เรื้อรัง"', slug: 'health-ChronicCough', icon: 'Heart' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "ผื่นคัน ตามตัว"', slug: 'health-ItchyRash', icon: 'Leaf' },
    { group: 'คำครู สู่ศิษย์', title: 'ตอน "ปวดท้อง...แบบ หญิงๆ"', slug: 'health-FemaleAbdominal', icon: 'Heart' },

    // --- หมวดหมู่: บทความสุขภาพทั่วไป ---
    { group: 'บทความสุขภาพทั่วไป', title: 'ช่องว่างระหว่างวัย... ชีวิตสนุกเพียงรู้จักและเข้าใจความต่าง', slug: 'health-AgeGap', icon: 'MessageSquare' },
    { group: 'บทความสุขภาพทั่วไป', title: 'สูตรหน้าผ่อง แก้หน้าไหม้ แก้ฝ้า', slug: 'health-GlowingFace', icon: 'Leaf' },
    { group: 'บทความสุขภาพทั่วไป', title: 'จัดการอย่างไรดีกับอาการ PMS', slug: 'health-PMSsymptoms', icon: 'Heart' },
    { group: 'บทความสุขภาพทั่วไป', title: '9 โรคอันตรายคนออฟฟิศ', slug: 'health-OfficeSyndrome', icon: 'Briefcase' },
    { group: 'บทความสุขภาพทั่วไป', title: 'ระวังร้อนนี้ โรคลมแดด (ฮีทสโตก Heat Stroke)', slug: 'health-HeatStroke', icon: 'Heart' },
    { group: 'บทความสุขภาพทั่วไป', title: 'การนวดระบายน้ำเหลือง', slug: 'health-Lymph', icon: 'Leaf' },
    { group: 'บทความสุขภาพทั่วไป', title: 'ชีวิตพอเพียงของมหาเศรษฐีอันดับสองของโลก : วอร์เรน บัพเฟตต์ (Warren Buffet)', slug: 'health-WarrenBuffet', icon: 'BookOpen' },
    { group: 'บทความสุขภาพทั่วไป', title: 'วัดบางค้อ', slug: 'health-BangKhoTemple', icon: 'BookOpen' }, // จัดเป็นเนื้อหาทั่วไป
    { group: 'บทความสุขภาพทั่วไป', title: 'ชีวิตหน้าจอคอมพิวเตอร์', slug: 'health-ComputerLife', icon: 'Briefcase' },
    { group: 'บทความสุขภาพทั่วไป', title: 'วิธีชะลอความแก่', slug: 'health-SlowDownAging', icon: 'Leaf' },
];

// Grouping the data for display
const groupedTopics = allHealthTopics.reduce((acc, topic) => {
    if (!acc[topic.group]) {
        acc[topic.group] = [];
    }
    acc[topic.group].push(topic);
    return acc;
}, {} as Record<TopicGroup, HealthTopic[]>);


// ------------------------------------------------------------------
// 2. Component Structure
// ------------------------------------------------------------------

interface TopicCardProps {
    topic: HealthTopic;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
    const IconComponent = IconMap[topic.icon];
    // ลิงก์ไปยังหน้าบทความ Markdown
    const href = `/articles/${topic.slug}`;

    return (
        <Link
            href={href}
            className="p-5 bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-xl hover:border-green-300 transition duration-300 flex items-start space-x-4"
        >
            <IconComponent size={24} className="text-green-600 flex-shrink-0 mt-1" />
            <div className='flex flex-col'>
                <h3 className="text-lg font-bold text-gray-800 hover:text-green-700 leading-snug">
                    {topic.title}
                </h3>
                <span className="text-xs text-gray-500 mt-1 inline-flex items-center">
                    อ่านเพิ่มเติม &rarr;
                </span>
            </div>
        </Link>
    );
};


export default function HealthPage() {
    const groups = Object.keys(groupedTopics) as TopicGroup[];

    return (
        <div className="space-y-12">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-50 to-teal-100 p-8 md:p-16 rounded-3xl shadow-2xl shadow-green-200 text-center border-t-4 border-green-600">
                <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4 tracking-tight">
                    ศาสตร์แห่ง<span className="text-green-600">สุขภาพดี</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
                    รวบรวมคำแนะนำและภูมิปัญญาเพื่อสุขภาพกายที่แข็งแรง สอดคล้องกับสุขภาพจิตที่สงบ
                </p>
            </section>

            {/* Content Sections by Group */}
            <div className="max-w-6xl mx-auto space-y-10">

                {groups.map((group) => (
                    <section key={group}>
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-green-100 pb-2">
                            {group}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupedTopics[group].map((topic) => (
                                <TopicCard key={topic.slug} topic={topic} />
                            ))}
                        </div>
                    </section>
                ))}

                {/* Call to Action (Optional) */}
                <div className="text-center mt-12 p-8 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-xl font-semibold text-green-800 mb-4">
                        สุขภาพที่ดีเริ่มต้นที่การเรียนรู้
                    </p>
                    <Link href="/contact" className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition">
                        สอบถามข้อมูลเพิ่มเติม
                    </Link>
                </div>

            </div>
        </div>
    );
}