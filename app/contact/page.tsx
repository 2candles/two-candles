// app/contact/page.tsx
import Link from 'next/link';
import { Mail, Calendar, Phone, Lightbulb, Clock, Facebook, UserCheck } from 'lucide-react';

// URL ตัวอย่างสำหรับฟอร์มนัดหมาย (คุณสามารถเปลี่ยนเป็น Google Form หรือ Calendly ได้)
const CONSULTATION_LINK = "https://forms.gle/YOUR_GOOGLE_FORM_LINK_HERE";
const FACEBOOK_LINK = "https://www.facebook.com/YOUR_FACEBOOK_PAGE"; // URL Facebook จริงของ อ. จัสติน

export default function ContactPage() {
    return (
        <div className="space-y-12">

            {/* 1. Hero Section for Contact Page */}
            <section className="bg-gradient-to-r from-teal-50 to-blue-100 p-8 md:p-16 rounded-3xl shadow-2xl shadow-blue-200 text-center border-t-4 border-blue-500">
                <Lightbulb size={48} className="text-blue-600 mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
                    ติดต่อ <span className="text-blue-600">อาจารย์จัสติน รัตนมงคล</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
                    ทุกคำถามคือการเริ่มต้นการเดินทางสู่ความเข้าใจ เราพร้อมรับฟังและให้ความช่วยเหลือคุณ
                </p>
            </section>

            {/* 2. Main Contact Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 max-w-6xl mx-auto">

                {/* 2.1. General Contact (Email) */}
                <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 space-y-6 lg:col-span-1">
                    <Mail size={40} className="text-teal-500" />
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">ติดต่อเรา (General)</h2>
                    <p className="text-gray-700 leading-relaxed text-sm">
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

                {/* 2.2. อาจารย์จัสติน รัตนมงคล (Contact & Schedule) */}
                <div className="p-8 bg-white border-2 border-indigo-200 rounded-xl shadow-2xl shadow-indigo-100 transition duration-300 space-y-6 lg:col-span-2">
                    <UserCheck size={40} className="text-indigo-600" />
                    <h2 className="text-2xl font-extrabol border-b pb-2 text-indigo-700">
                        อ. จัสติน รัตนมงคล: ช่องทางติดต่อและปรึกษา
                    </h2>

                    {/* ตารางเวลา */}
                    <div className="space-y-2 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                        <div className="flex items-center space-x-3">
                            <Clock size={20} className="text-indigo-600 flex-shrink-0" />
                            <span className="text-md font-semibold text-gray-700">
                                วัน/เวลาที่สะดวก: <span className="font-bold text-indigo-700">วันอังคาร - พฤหัสบดี (8.30 น. - 12.30 น.)</span>
                            </span>
                        </div>
                    </div>
                    

                    {/* ช่องทางการติดต่อ */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* Facebook */}
                        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                            <Facebook size={24} className="text-blue-600 flex-shrink-0" />
                            <div>
                                <span className="text-sm font-medium text-gray-500">Facebook</span>
                                <Link
                                    href={FACEBOOK_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-md font-semibold text-blue-700 hover:text-blue-800"
                                >
                                    จัสติน รัตนมงคล
                                </Link>
                            </div>
                        </div>

                        {/* Telephone */}
                        <div className="flex items-center space-x-3 p-3 border rounded-lg bg-red-50 border-red-200">
                            <Phone size={24} className="text-red-600 flex-shrink-0" />
                            <div>
                                <span className="text-sm font-medium text-gray-500">Mobile</span>
                                <a
                                    href="tel:+66831426666"
                                    className="block text-md font-semibold text-red-700 hover:text-red-800"
                                >
                                    083-142-6666
                                </a>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 italic pt-2 border-t mt-4">
                        *กรุณา **ฝากข้อความไว้** หากโทรไม่ติด หรือติดต่อทาง Facebook อาจารย์จะติดต่อกลับในเวลาทำการที่สะดวกค่ะ
                    </p>

                    {/* ปุ่มตารางนัดหมาย (ยังคงอยู่) */}
                    <h3 className="text-xl font-bold text-gray-800 pt-4">การนัดหมายปรึกษาส่วนตัว</h3>
                    <Link
                        href={CONSULTATION_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center font-semibold py-3 rounded-lg shadow-md transition duration-300 bg-indigo-600 text-white text-lg hover:bg-indigo-700 shadow-indigo-400/50"
                    >
                        <Calendar size={20} className="mr-2" />
                        จองตารางนัดหมาย
                    </Link>
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