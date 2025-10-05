// app/master/page.tsx
import Link from 'next/link';
import { BookOpen, UserCheck, Star, Heart, MessageSquare } from 'lucide-react';
import React from 'react';

// ------------------------------------------------------------------
// 1. Data Structure and Preparation
// ------------------------------------------------------------------

type IconName = 'UserCheck' | 'Star' | 'BookOpen' | 'Heart' | 'MessageSquare';

interface MasterTopic {
    title: string;
    slug: string; // ชื่อไฟล์ .md
    icon: IconName;
    description: string; // คำอธิบายสั้นๆ สำหรับแสดงในหน้าสารบัญ
    group: 'ครูบาอาจารย์' | 'เรื่องเล่าและคำสอน';
}

// Map ชื่อ Icon string ไปยัง Component จริง
const IconMap: Record<IconName, React.ElementType> = {
    UserCheck: UserCheck,      // สำหรับพระอาจารย์/บุคคลสำคัญ
    Star: Star,                // สำหรับบุคคลที่น่าเคารพ
    BookOpen: BookOpen,        // สำหรับคำสอน/บทความ
    Heart: Heart,
    MessageSquare: MessageSquare, // สำหรับเรื่องเล่า/ประสบการณ์
};

// ข้อมูลครูบาอาจารย์และคำสอน
const allMasterTopics: MasterTopic[] = [
    {
        group: 'ครูบาอาจารย์',
        title: 'ท่านพ่อบัณฑูรสิงห์ธรรมบัณฑิต (เจิม คุณาบุตร)',
        slug: 'ท่านพ่อบัณฑูรสิงห์ธรรมบัณฑิต',
        icon: 'Star',
        description: 'ประวัติและปฏิปทาของท่านพ่อบัณฑูรสิงห์ ผู้เป็นต้นแบบแห่งธรรมะและการปฏิบัติ'
    },
    {
        group: 'ครูบาอาจารย์',
        title: 'พระครูภาวนาวรคุณ (พยนต์ เขมเทโว)',
        slug: 'พระครูภาวนาวรคุณ',
        icon: 'UserCheck',
        description: 'เรื่องราวของพระอาจารย์พยนต์ เขมเทโว และคำสอนอันเป็นมงคล'
    },
    {
        group: 'ครูบาอาจารย์',
        title: 'พระเดชพระคุณพระครูวิสุทธิภาวนาคุณ (โกศล จนฺทวณฺโณ)',
        slug: 'พระเดชพระคุณพระครูวิสุทธิภาวนาคุณ',
        icon: 'UserCheck',
        description: 'ประวัติและแนวทางการปฏิบัติภาวนาของพระครูวิสุทธิภาวนาคุณ'
    },
    {
        group: 'ครูบาอาจารย์',
        title: 'พระครูปิยธรรมาลังการ นันทสุข (ปิยธมฺโม)',
        slug: 'พระครูปิยธรรมาลังการ',
        icon: 'UserCheck',
        description: 'เรื่องเล่าและคุณธรรมของพระครูปิยธรรมาลังการ นันทสุข (ปิยธมฺโม)'
    },
    // แยกหมวดเรื่องเล่าและคำสอน
    {
        group: 'เรื่องเล่าและคำสอน',
        title: 'เรื่องเล่าจากอาจารย์จัสติน',
        slug: 'เรื่องเล่าจากอาจารย์จัสติน',
        icon: 'MessageSquare',
        description: 'ประสบการณ์และข้อคิดที่ถ่ายทอดจากอาจารย์จัสติน'
    },
    {
        group: 'เรื่องเล่าและคำสอน',
        title: 'ตัวอย่างคำสอนของท่านพ่อบัณฑูรสิงห์ (เจิม คุณาบุตร)',
        slug: 'ตัวอย่างคำสอนของท่านพ่อบัณฑูรสิงห์',
        icon: 'BookOpen',
        description: 'รวมคำสอนที่น่าสนใจและสามารถนำไปประยุกต์ใช้ในชีวิตประจำวัน'
    },
];

// Grouping the data
const groupedTopics = allMasterTopics.reduce((acc, topic) => {
    if (!acc[topic.group]) {
        acc[topic.group] = [];
    }
    acc[topic.group].push(topic);
    return acc;
}, {} as Record<MasterTopic['group'], MasterTopic[]>);

// ------------------------------------------------------------------
// 2. Component Structure
// ------------------------------------------------------------------

interface MasterCardProps {
    topic: MasterTopic;
}

const MasterCard: React.FC<MasterCardProps> = ({ topic }) => {
    const IconComponent = IconMap[topic.icon];
    // กำหนดลิงก์: /master/ท่านพ่อบัณฑูรสิงห์ธรรมบัณฑิต
    const href = `/master/${topic.slug}`;

    return (
        <Link
            href={href}
            className="p-6 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-2xl hover:border-indigo-400 transition duration-300 flex flex-col space-y-4 group"
        >
            <IconComponent size={32} className="text-indigo-600 flex-shrink-0" />

            <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-700 leading-snug">
                {topic.title}
            </h3>
            <p className="text-sm text-gray-600 flex-grow">
                {topic.description}
            </p>
            <span className="text-sm font-semibold text-indigo-500 mt-2 flex items-center">
                ประวัติ/คำสอน &rarr;
            </span>
        </Link>
    );
};


export default function MasterPage() {
    const groups = Object.keys(groupedTopics) as MasterTopic['group'][];

    return (
        <div className="space-y-12">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-50 to-purple-100 p-8 md:p-16 rounded-3xl shadow-2xl shadow-indigo-200 text-center border-t-4 border-indigo-600">
                <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4 tracking-tight">
                    <span className="text-indigo-600">ครูบาอาจารย์</span>ผู้ชี้นำ
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
                    รวบรวมประวัติและคำสอนอันทรงคุณค่าจากผู้เป็นที่เคารพ ซึ่งเป็นรากฐานของ 2Candles.com
                </p>
            </section>

            {/* Content Sections by Group */}
            <div className="max-w-6xl mx-auto space-y-10">

                {groups.map((group) => (
                    <section key={group}>
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-indigo-100 pb-2">
                            {group}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupedTopics[group].map((topic) => (
                                <MasterCard key={topic.slug} topic={topic} />
                            ))}
                        </div>
                    </section>
                ))}

                {/* Closing Inspirational Quote */}
                <section className="text-center mt-12 p-6 bg-yellow-50 rounded-xl border-l-4 border-yellow-500 shadow-lg">
                    <p className="italic text-xl text-gray-700 font-medium">
                        "การตามรอยผู้มีปัญญา เป็นหนทางที่สั้นที่สุดสู่การบรรลุธรรม"
                    </p>
                </section>

            </div>
        </div>
    );
}