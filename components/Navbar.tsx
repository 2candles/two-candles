// components/Navbar.tsx (โค้ดฉบับสุดท้ายที่แก้ไขข้อผิดพลาด ARIA และ HTML)
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
    { name: 'หน้าแรก', href: '/' },
    { name: 'ธรรมะ', href: '/dhamma' },
    { name: 'สุขภาพ', href: '/health' },
    // 💡 เมนูใหม่
    { name: 'สมุนไพร', href: '/herbal' },
    { name: 'ศาสตร์', href: '/sciences' },
    { name: 'ครูบาอาจารย์', href: '/teachers' },
    // เมนูเดิม
    { name: 'กิจกรรม', href: '/events' },
    { name: 'ติดต่อ', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100">
            <nav className="container mx-auto max-w-7xl p-4 flex justify-between items-center">

                <Link href="/" className="flex items-center space-x-2 group" onClick={closeMenu}>
                    <span className="text-2xl font-extrabold text-blue-600 group-hover:text-blue-700 transition">🕯️</span>
                    <div className="text-xl font-bold text-gray-800">2Candles.com</div>
                </Link>

                {/* Desktop Menu Links */}
                <div className="hidden md:flex space-x-6 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-gray-600 hover:text-blue-600 transition duration-300 font-medium hover:scale-105"
                        >
                            {item.name}
                        </Link>
                    ))}
                    {/* ลบปุ่ม EN | TH ออกจาก Desktop แล้ว */}
                </div>

                {/* Hamburger Icon/Close Icon - ส่วนนี้ถูกแก้ไขให้ถูกต้องแล้ว */}
                <button
                    type="button"
                    aria-expanded={isOpen ? 'true' : 'false'}
                    className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                    onClick={toggleMenu}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu - Conditional Rendering */}
            {isOpen && (
                <div
                    className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-100 z-40 transition-opacity duration-300 ease-in-out animate-slide-down"
                >
                    <div className="flex flex-col space-y-1 px-4 py-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={closeMenu}
                                className="text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 p-3 rounded-md transition"
                            >
                                {item.name}
                            </Link>
                        ))}
                        {/* ลบปุ่ม EN | TH ออกจาก Mobile แล้ว */}
                    </div>
                </div>
            )}
        </header>
    );
}