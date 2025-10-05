// app/events/page.tsx
import Link from 'next/link';
// ตรวจสอบให้แน่ใจว่าได้ import BookOpen มาด้วย
import { CalendarCheck, Users, MapPin, GraduationCap, Building2, BookOpen } from 'lucide-react'; 
import React from 'react';

// ------------------------------------------------------------------
// 1. Data Structure and Preparation
// ------------------------------------------------------------------

// แก้ไข Type นี้ โดยการเพิ่ม 'BookOpen' เข้าไป
type IconName = 'CalendarCheck' | 'Users' | 'MapPin' | 'GraduationCap' | 'Building2' | 'BookOpen';

interface EventTopic {
    year: number;
    date?: string; 
    title: string;
    slug: string; 
    icon: IconName; // ตอนนี้สามารถรับค่า 'BookOpen' ได้แล้ว
}

// Map ชื่อ Icon string ไปยัง Component จริง
const IconMap: Record<IconName, React.ElementType> = {
    CalendarCheck: CalendarCheck,
    Users: Users,
    MapPin: MapPin,
    GraduationCap: GraduationCap, 
    Building2: Building2,
    BookOpen: BookOpen, // <--- เพิ่ม entry นี้
};

// ข้อมูลกิจกรรมทั้งหมด (รวบรวมและจัดประเภท Icon ตามเนื้อหา)
const allEvents: EventTopic[] = [
    // กิจกรรมที่ไม่ระบุปีชัดเจน (ต้นบุญ)
    { year: 9999, title: 'ต้นบุญ สถานที่ท่านทำบุญครั้งใหญ่ไว้', slug: 'ต้นบุญ', icon: 'MapPin' },

    // --- กิจกรรมปี ๒๕๕๔ (2011) ---
    { year: 2554, date: '๒๑ สิงหาคม', title: 'เปิดสอน โหราศาตร์ภาคแรก รุ่นที่ ๒๑ (วันอาทิตย์)', slug: 'โหราศาตร์ภาคแรกรุ่นที่๒๑', icon: 'GraduationCap' },
    { year: 2554, date: '๒๙ มีนาคม', title: 'เชิญร่วมวางศิลาฤกษ์อุโบสถวัดศรีนคร จ.นครพนม', slug: 'วางศิลาฤกษ์อุโบสถวัดศรีนคร', icon: 'Building2' },
    { year: 2554, date: 'มีนาคม', title: 'ขอเชิญร่วมเป็นเจ้าภาพสร้างพระประธาน ณ วัดศรีนคร', slug: 'สร้างพระประธานวัดศรีนคร', icon: 'Building2' },
    { year: 2554, date: 'มีนาคม', title: 'งานมุฑิตาจิตแด่พระอาจารย์อ๊อด (เลี้ยงพระ ๑๐๐)', slug: 'เลี้ยงพระ๑๐๐๒๕๕๔', icon: 'Users' },
    { year: 2554, title: 'เปิดสอน โหราศาตร์ภาคแรก รุ่นที่ ๑๙', slug: 'โหราศาตร์ภาคแรกรุ่นที่๑๙', icon: 'GraduationCap' },
    { year: 2554, title: 'เปิดสอน โหราศาตร์ภาคแรก รุ่นที่ ๑๘', slug: 'โหราศาตร์ภาคแรกรุ่นที่๑๘', icon: 'GraduationCap' },

    // --- กิจกรรมปี ๒๕๕๓ (2010) ---
    { year: 2553, title: 'เปิดสอน โหราศาตร์ภาคแรก รุ่นที่ ๑๗', slug: 'โหราศาตร์ภาคแรกรุ่นที่๑๗', icon: 'GraduationCap' },
    { year: 2553, title: 'งานปริวาสกรรม ณ. วัดสวนอธิษฐาน', slug: 'ปริวาสกรรม2553', icon: 'CalendarCheck' },
    { year: 2553, title: 'เปิดสอน โหราศาตร์ภาคแรก รุ่นที่ ๑๖', slug: 'โหราศาตร์ภาคแรกรุ่นที่๑๖', icon: 'GraduationCap' },
    { year: 2553, title: 'เปิดสอน โหราศาตร์ภาคแรก รุ่นที่ ๑๕', slug: 'โหราศาตร์ภาคแรกรุ่นที่๑๕', icon: 'GraduationCap' },
    { year: 2553, title: 'คอลัมส์ อะไรในคอคนคัง', slug: 'อะไรในคอคนคัง', icon: 'BookOpen' }, // ใช้ BookOpen แทน
    { year: 2553, date: '๑๑ มีนาคม', title: 'งานมุฑิตาจิตแด่พระอาจารย์อ๊อด (เลี้ยงพระร้อย)', slug: 'เลี้ยงพระ๑๐๐๒๕๕๓', icon: 'Users' },
    { year: 2553, title: 'เชิญทำบุญสร้างพระเสด็จย่าพิมพา', slug: 'สร้างพระเสด็จย่าพิมพา', icon: 'Building2' },
    { year: 2553, title: 'หนังสือสวดมนต์วัดสวนอธิษฐาน, ความคืบหน้าในการดำเนินงาน', slug: 'หนังสือสวดมนต์วัดสวนอธิษฐาน', icon: 'BookOpen' },
    { year: 2553, title: 'เปิดสอน โหราศาตร์ภาคแรก รุ่นที่ 13', slug: 'โหราศาตร์ภาคแรกรุ่นที่๑๓', icon: 'GraduationCap' },
    { year: 2553, date: '๑ มกราคม', title: 'วันคล้ายวันเกิดเป็นครูอาจารย์', slug: 'วันคล้ายวันเกิดเป็นครูอาจารย์', icon: 'Users' },

    // --- กิจกรรมปี ๒๕๕๒ (2009) ---
    { year: 2552, date: '๑๗ ตุลาคม', title: 'บุญกฐินวัดสวนอธิษฐาน', slug: 'บุญกฐินวัดสวนอธิษฐาน', icon: 'CalendarCheck' },
    { year: 2552, date: 'กรกฎาคม-สิงหาคม', title: 'งานปริวาสกรรมกลางปี ๒๕๕๒ ณ. วัดสวนอธิษฐานบารมี', slug: 'ปริวาสกรรม2552', icon: 'CalendarCheck' },
    { year: 2552, date: 'มีนาคม', title: 'งานมุฑิตาจิตแด่พระอาจารย์อ๊อด', slug: 'เลี้ยงพระ๑๐๐๒๕๕๒', icon: 'Users' },
    { year: 2552, date: 'พฤษภาคม', title: 'ผ้าป่าสามัคคีสร้างวิหารประดิษฐานพระแก้วเขียวส่อง', slug: 'ผ้าป่าสามัคคีสร้างวิหาร', icon: 'Building2' },
];


// Grouping the data by year (เรียงลำดับจากปีล่าสุดไปเก่าสุด)
const groupedEvents = allEvents.reduce((acc, event) => {
    // ใช้ปี 9999 เป็นหมวด "กิจกรรมทั่วไป/สำคัญ" หรือปรับชื่อเป็น "ต้นบุญ"
    const groupKey = event.year === 9999 ? 'ต้นบุญ' : `ปี พ.ศ. ${event.year}`;
    if (!acc[groupKey]) {
        acc[groupKey] = [];
    }
    acc[groupKey].push(event);
    return acc;
}, {} as Record<string, EventTopic[]>);

// เรียงลำดับกลุ่มปีจากมากไปน้อย (2554 -> 2553 -> 2552 -> ต้นบุญ)
const sortedGroups = Object.keys(groupedEvents).sort((a, b) => {
    if (a === 'ต้นบุญ') return 1;
    if (b === 'ต้นบุญ') return -1;
    return b.localeCompare(a);
});


// ------------------------------------------------------------------
// 2. Component Structure
// ------------------------------------------------------------------

interface EventCardProps {
    event: EventTopic;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const IconComponent = IconMap[event.icon];
    const href = `/articles/${event.slug}`; // ลิงก์ไปยังหน้าเนื้อหา Markdown

    return (
        <Link
            href={href}
            className="p-5 bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-xl hover:border-purple-300 transition duration-300 flex items-start space-x-4 group"
        >
            <IconComponent size={24} className="text-purple-600 flex-shrink-0 mt-1" />
            <div className='flex flex-col'>
                {event.date && (
                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full inline-block w-fit mb-1">
                        {event.date}
                    </span>
                )}
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-700 leading-snug">
                    {event.title}
                </h3>
                <span className="text-xs text-gray-500 mt-1 inline-flex items-center">
                    ดูรายละเอียดกิจกรรม &rarr;
                </span>
            </div>
        </Link>
    );
};


export default function EventsPage() {
    return (
        <div className="space-y-12">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-50 to-purple-100 p-8 md:p-16 rounded-3xl shadow-2xl shadow-orange-200 text-center border-t-4 border-purple-600">
                <h1 className="text-4xl md:text-5xl font-extrabold text-purple-900 mb-4 tracking-tight">
                    ปฏิทิน<span className="text-purple-600">กิจกรรม</span>และประวัติ
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
                    รวบรวมกิจกรรมสำคัญและการทำบุญในอดีต เพื่อเป็นบันทึกการเดินทางแห่งธรรม
                </p>
            </section>

            {/* Content Sections by Year Group */}
            <div className="max-w-6xl mx-auto space-y-10">

                {sortedGroups.map((groupKey) => (
                    <section key={groupKey}>
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-purple-100 pb-2">
                            {groupKey}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupedEvents[groupKey].map((event) => (
                                <EventCard key={event.slug} event={event} />
                            ))}
                        </div>
                    </section>
                ))}

                {/* Call to Action (Optional) */}
                <div className="text-center mt-12 p-8 bg-purple-50 rounded-xl border border-purple-200">
                    <p className="text-xl font-semibold text-purple-800 mb-4">
                        ร่วมสร้างบุญใหม่กับ 2 Candles
                    </p>
                    <Link href="/contact" className="inline-block px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition">
                        สอบถามกิจกรรมปัจจุบัน
                    </Link>
                </div>

            </div>
        </div>
    );
}