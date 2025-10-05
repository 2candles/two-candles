// app/events/page.tsx
import Link from 'next/link';
import { CalendarCheck, Users, MapPin } from 'lucide-react';

// ข้อมูลตัวอย่าง (Dummy Data) สำหรับแสดงในหน้าสารบัญ
const upcomingEvents = [
    {
        title: 'อบรมกรรมฐาน: แสงเทียนนำทาง',
        date: '10 พ.ย. 2568',
        description: 'การฝึกปฏิบัติเจริญสติแบบเข้มข้น 3 วัน 2 คืน',
        href: '/event/meditation-retreat',
        icon: CalendarCheck
    },
    {
        title: 'เสวนาธรรม: ธรรมะในชีวิตประจำวัน',
        date: '20 พ.ย. 2568',
        description: 'พบปะพูดคุยกับ อ. จารันต์ ที่กรุงเทพฯ',
        href: '/event/dhamma-talk',
        icon: Users
    },
    {
        title: 'โครงการทอดผ้าป่าสามัคคี',
        date: '25 พ.ย. 2568',
        description: 'ร่วมบุญสร้างเสนาสนะที่วัดป่า... ณ เชียงใหม่',
        href: '/event/kathina',
        icon: MapPin
    },
];

export default function EventsPage() {
    return (
        <div className="space-y-12">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-50 to-purple-100 p-8 md:p-16 rounded-3xl shadow-2xl shadow-orange-200 text-center border-t-4 border-purple-600">
                <h1 className="text-4xl md:text-5xl font-extrabold text-purple-900 mb-4 tracking-tight">
                    ปฏิทิน<span className="text-purple-600">กิจกรรม</span>และพิธีกรรม
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
                    เข้าร่วมกิจกรรมที่จะนำพาคุณไปสู่การปฏิบัติและพบปะผู้มีธรรมะ
                </p>
            </section>

            {/* Content Grid */}
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-purple-100 pb-2">กิจกรรมที่กำลังจะมาถึง</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event) => (
                        <Link
                            key={event.title}
                            href={event.href}
                            className="p-6 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl hover:border-purple-300 transition duration-300 flex flex-col space-y-3"
                        >
                            <div className="flex items-center justify-between">
                                <event.icon size={32} className="text-purple-500" />
                                <span className="text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">{event.date}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 hover:text-purple-600 mt-2">{event.title}</h3>
                            <p className="text-gray-600 text-sm flex-grow">{event.description}</p>
                            <span className="text-sm font-semibold text-purple-500 mt-2 flex items-center">
                                รายละเอียด &rarr;
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Call to Action/More Link */}
                <div className="text-center mt-10">
                    <Link href="/events/archive" className="text-lg font-semibold text-gray-700 hover:text-purple-600 transition border-b border-gray-300 hover:border-purple-600 pb-1">
                        ดูปฏิทินกิจกรรมทั้งหมด...
                    </Link>
                </div>
            </div>
        </div>
    );
}