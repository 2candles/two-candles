// app/page.tsx
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

// ------------------------------------------------------------------
// Reusable Components (คงเดิม)
// ------------------------------------------------------------------

interface SidebarCardProps {
    title: string;// app/page.tsx
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

// ------------------------------------------------------------------
// Reusable Components (คงเดิม)
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
// Main Page Layout (แก้ไข Sidebar ซ้าย)
// ------------------------------------------------------------------

export default function HomePage() {
    return (
        <div className="space-y-10">

            {/* 1. Hero Section */}
            <section className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 md:p-16 rounded-3xl shadow-2xl shadow-blue-200 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
                    สพฺพทานํ <span className="text-blue-600">ธมฺมทานํ</span> ชินาติ
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                    การให้ธรรมะ ชนะการให้ทั้งปวง
                </p>
                <PrimaryButton
                    href="/learn"
                    className="bg-blue-600 text-white text-lg hover:bg-blue-700 shadow-xl shadow-blue-400/50 flex items-center justify-center mx-auto w-auto px-8"
                >
                    <span className="mr-2">เริ่มเรียนรู้</span> <ChevronRight size={20} />
                </PrimaryButton>
            </section>

            {/* 2. Three-Column Layout (3/6/3) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">

                {/* 2.1. Sidebar ซ้าย (Sponsors เท่านั้น) - md:col-span-3 */}
                <aside className="md:col-span-3 space-y-6">
                    <SidebarCard title="SPONSORS">
                        <div className="h-40 md:h-64 bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg border-dashed border-2 border-gray-300 text-sm">
                            พื้นที่สำหรับผู้สนับสนุน
                        </div>
                    </SidebarCard>
                </aside>

                {/* 2.2. Main Content (พื้นที่ตรงกลาง) - md:col-span-6 */}
                <div className="md:col-span-6 space-y-8">

                    <section className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-orange-500">
                        <h2 className="text-xl md:text-2xl font-bold text-orange-700 mb-4">ยินดีต้อนรับสู่ 2Candles.com</h2>
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-start">
                            <img src="/2candles_041.jpg" alt="เทียนศักดิ์สิทธิ์" className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md" />
                            <p className="text-gray-700 leading-relaxed">
                                <span className="font-extrabold text-xl md:text-2xl text-orange-500">"สวัสดีจ้า"</span> ยินดีต้อนรับสู่เวปไซต์ซึ่งสร้างขึ้นตามเจตนารมณ์ของ อาจารย์จัสติน รัตนมงคล
                                <br /><br />
                                วัตถุประสงค์หลักของเวปเพื่อให้อาจารย์จัสตินใช้เผยแผ่ ศาสตร์ต่างๆตามความตั้งใจอันดีของท่าน และใช้เป็นช่องทางสำหรับสื่อสารระหว่างอาจารย์และลูกศิษย์
                                <br /><br />
                                บุญกุศลใดหากมีบังเกิดจากการจัดทำเวปไซต์นี้ เราขอน้อมถวายเป็นพุทธบูชา ธัมมะบูชา สังฆะบูชา ปะฏิปัตติบูชา
                            </p>
                        </div>
                    </section>

                    <section className="p-6 bg-white rounded-xl shadow-lg">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 border-b pb-2">ข่าวสารจากอาจารย์จัสติน และ ลูกศิษย์</h2>
                        <div className="flex items-start space-x-4">
                            <img src="/_IMG_0007.jpg" alt="อ. จัสติน รัตนมงคล" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full shadow-md" />
                            <div>
                                <h3 className="font-extrabold text-lg md:text-xl text-green-700">อ. จัสติน รัตนมงคล</h3>
                                <p className="text-gray-600 mt-1">ติดต่อ อาจารย์จัสติน เพื่อตรวจ "ต้นบุญ" หรือขอคำปรึกษา</p>
                                <Link href="/contact" className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-flex items-center">
                                    อ่านต่อ <ChevronRight size={16} />
                                </Link>
                            </div>
                        </div>
                        <br />
                        <div className="flex items-start space-x-4">
                            <img src="/2candles_041.jpg" alt="อ. จัสติน รัตนมงคล" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full shadow-md" />
                            <div>
                                <h3 className="font-extrabold text-lg md:text-xl text-green-700">เพลงธรรมะ</h3>
                                <p className="text-gray-600 mt-1">กะระณียะเมตตะสุตตัง ขันธปริตรคาถา</p>
                                <Link href="/dhamma" className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-flex items-center">
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
// Main Page Layout (แก้ไข Sidebar ซ้าย)
// ------------------------------------------------------------------

export default function HomePage() {
    return (
        <div className="space-y-10">

            {/* 1. Hero Section */}
            <section className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 md:p-16 rounded-3xl shadow-2xl shadow-blue-200 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
                    สพฺพทานํ <span className="text-blue-600">ธมฺมทานํ</span> ชินาติ
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                    การให้ธรรมะ ชนะการให้ทั้งปวง
                </p>
                <PrimaryButton
                    href="/learn"
                    className="bg-blue-600 text-white text-lg hover:bg-blue-700 shadow-xl shadow-blue-400/50 flex items-center justify-center mx-auto w-auto px-8"
                >
                    <span className="mr-2">เริ่มเรียนรู้</span> <ChevronRight size={20} />
                </PrimaryButton>
            </section>

            {/* 2. Three-Column Layout (3/6/3) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">

                {/* 2.1. Sidebar ซ้าย (Sponsors เท่านั้น) - md:col-span-3 */}
                <aside className="md:col-span-3 space-y-6">
                    <SidebarCard title="SPONSORS">
                        <div className="h-40 md:h-64 bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg border-dashed border-2 border-gray-300 text-sm">
                            พื้นที่สำหรับผู้สนับสนุน
                        </div>
                    </SidebarCard>
                </aside>

                {/* 2.2. Main Content (พื้นที่ตรงกลาง) - md:col-span-6 */}
                <div className="md:col-span-6 space-y-8">

                    <section className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-orange-500">
                        <h2 className="text-xl md:text-2xl font-bold text-orange-700 mb-4">ยินดีต้อนรับสู่ 2Candles.com</h2>
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-start">
                            <img src="/2candles_041.jpg" alt="เทียนศักดิ์สิทธิ์" className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md" />
                            <p className="text-gray-700 leading-relaxed">
                                <span className="font-extrabold text-xl md:text-2xl text-orange-500">"สวัสดีจ้า"</span> ยินดีต้อนรับสู่เวปไซต์ซึ่งสร้างขึ้นตามเจตนารมณ์ของ อาจารย์จัสติน รัตนมงคล
                                <br /><br />
                                วัตถุประสงค์หลักของเวปเพื่อให้อาจารย์จัสตินใช้เผยแผ่ ศาสตร์ต่างๆตามความตั้งใจอันดีของท่าน และใช้เป็นช่องทางสำหรับสื่อสารระหว่างอาจารย์และลูกศิษย์
                                <br /><br />
                                บุญกุศลใดหากมีบังเกิดจากการจัดทำเวปไซต์นี้ เราขอน้อมถวายเป็นพุทธบูชา ธัมมะบูชา สังฆะบูชา ปะฏิปัตติบูชา
                            </p>
                        </div>
                    </section>

                    <section className="p-6 bg-white rounded-xl shadow-lg">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 border-b pb-2">ข่าวสารจากอาจารย์จัสติน และ ลูกศิษย์</h2>
                        <div className="flex items-start space-x-4">
                            <img src="/_IMG_0007.jpg" alt="อ. จัสติน รัตนมงคล" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full shadow-md" />
                            <div>
                                <h3 className="font-extrabold text-lg md:text-xl text-green-700">อ. จัสติน รัตนมงคล</h3>
                                <p className="text-gray-600 mt-1">ติดต่อ อาจารย์จัสติน เพื่อตรวจ "ต้นบุญ" หรือขอคำปรึกษา</p>
                                <Link href="/contact" className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-flex items-center">
                                    อ่านต่อ <ChevronRight size={16} />
                                </Link>
                            </div>
                        </div>
                        <br />
                        <div className="flex items-start space-x-4">
                            <img src="/2candles_041.jpg" alt="อ. จัสติน รัตนมงคล" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full shadow-md" />
                            <div>
                                <h3 className="font-extrabold text-lg md:text-xl text-green-700">เพลงธรรมะ</h3>
                                <p className="text-gray-600 mt-1">กะระณียะเมตตะสุตตัง ขันธปริตรคาถา</p>
                                <Link href="/dhamma" className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-flex items-center">
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
