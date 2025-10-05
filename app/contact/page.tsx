// app/contact/page.tsx
import Link from 'next/link';
import { Mail, Calendar, Phone, Lightbulb } from 'lucide-react';

// URL ตัวอย่างสำหรับฟอร์มนัดหมาย (คุณสามารถเปลี่ยนเป็น Google Form หรือ Calendly ได้)
// *สมมติฐาน: คุณจะแทนที่ URL นี้ด้วยลิงก์ปฏิทินนัดหมายจริงในภายหลัง*
const CONSULTATION_LINK = "https://forms.gle/YOUR_GOOGLE_FORM_LINK_HERE";

export default function ContactPage() {
    return (
        <div className="space-y-12">

            {/* 1. Hero Section for Contact Page */}
            <section className="bg-gradient-to-r from-teal-50 to-blue-100 p-8 md:p-16 rounded-3xl shadow-2xl shadow-blue-200 text-center border-t-4 border-blue-500">
                <Lightbulb size={48} className="text-blue-600 mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
                    เชื่อมต่อสู่ <span className="text-blue-600">แสงสว่าง</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
                    ทุกคำถามคือการเริ่มต้นการเดินทางสู่ความเข้าใจ เราพร้อมรับฟังและให้ความช่วยเหลือคุณ
                </p>
            </section>

            {/* 2. Main Contact Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">

                {/* 2.1. Direct Contact (Email) */}
                <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 space-y-6">
                    <Mail size={40} className="text-teal-500" />
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">ติดต่อเรา (General)</h2>
                    <p className="text-gray-700 leading-relaxed">
                        สำหรับการสอบถามทั่วไป การให้ข้อเสนอแนะ หรือการติดต่อด้านธุรกิจและการโฆษณา
                    </p>

                    <div className="flex items-center space-x-3 bg-teal-50 p-4 rounded-lg border border-teal-200">
                        <Mail size={24} className="text-teal-600 flex-shrink-0" />
                        <a
                            href="mailto:admin@2candles.com"
                            className="text-lg font-semibold text-teal-700 hover:text-teal-900 transition break-all"
                        >
                            admin@2candles.com
                        </a>
                    </div>

                    <p className="text-sm text-gray-500 pt-2">
                        **หมายเหตุ:** เราจะพยายามตอบกลับอีเมล์ของคุณภายใน 24-48 ชั่วโมง
                    </p>

                </div>

                {/* 2.2. Appointment/Consultation (อาจารย์จัสติน) */}
                <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 space-y-6">
                    <Calendar size={40} className="text-blue-500" />
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">ตารางนัดหมายอาจารย์จัสติน</h2>
                    <p className="text-gray-700 leading-relaxed">
                        สำหรับผู้ที่ต้องการปรึกษาเป็นการส่วนตัว หรือนัดหมายเพื่อเข้าร่วมโครงการพิเศษ สามารถจองเวลาผ่านระบบปฏิทินนัดหมายได้โดยตรง
                    </p>

                    <Link
                        href={CONSULTATION_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center font-semibold py-3 rounded-lg shadow-md transition duration-300 bg-blue-600 text-white text-lg hover:bg-blue-700 shadow-blue-400/50"
                    >
                        <Calendar size={20} className="mr-2" />
                        จองตารางนัดหมาย
                    </Link>

                    <p className="text-sm text-gray-500 pt-2">
                        ระบบจะนำคุณไปยังฟอร์มภายนอก (เช่น Google Forms/Calendly) เพื่ออำนวยความสะดวกในการจัดเก็บข้อมูลการนัดหมาย
                    </p>
                </div>

            </div>

            {/* 3. Closing Inspirational Quote */}
            <section className="max-w-4xl mx-auto text-center mt-12 p-6 bg-yellow-50 rounded-xl border-l-4 border-yellow-500 shadow-lg">
                <p className="italic text-xl text-gray-700 font-medium">
                    "การสื่อสารคือสะพานแรกสู่การเปลี่ยนแปลง ขอให้ทุกการติดต่อของคุณเป็นไปเพื่อการเติบโตของปัญญา"
                </p>
            </section>

        </div>
    );
}