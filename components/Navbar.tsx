// components/Navbar.tsx
'use client'; // จำเป็นต้องใช้ Client Component เพราะมีการใช้ State (useState)
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; 

const navItems = [
    { name: 'หน้าแรก', href: '/' },
    { name: 'ธรรมะ', href: '/dhamma' },
    { name: 'สุขภาพ', href: '/health' },
    { name: 'กิจกรรม', href: '/events' },
    { name: 'ติดต่อ', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State สำหรับควบคุมเมนูมือถือ

  // ฟังก์ชันสลับสถานะ
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // ฟังก์ชันปิดเมนูเมื่อคลิก Link
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100"> 
        <nav className="container mx-auto max-w-7xl p-4 flex justify-between items-center">
            
            {/* Logo Section */}
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
                
                {/* Language Switch บน Desktop */}
                <button className="text-sm font-medium text-gray-700 hover:text-blue-600 transition p-2 rounded-lg border border-transparent hover:border-blue-200 ml-4">
                    EN | TH
                </button>
            </div>

            {/* Hamburger Icon/Close Icon */}
            <button 
                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                onClick={toggleMenu} // เรียกใช้ฟังก์ชัน toggleMenu
                aria-expanded={isOpen} // Accessibility
                aria-label={isOpen ? 'Close menu' : 'Open menu'} // Accessibility
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </nav>

        {/* Mobile Menu - ใช้ Conditional Rendering แทนการซ่อนด้วย max-h */}
        {isOpen && (
            <div 
                className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-100 z-40 transition-opacity duration-300 ease-in-out animate-slide-down"
            >
                <div className="flex flex-col space-y-1 px-4 py-4">
                    {navItems.map((item) => (
                        <Link 
                            key={item.name} 
                            href={item.href} 
                            onClick={closeMenu} // ปิดเมนูเมื่อคลิก
                            className="text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 p-3 rounded-md transition"
                        >
                            {item.name}
                        </Link>
                    ))}
                    {/* Language Switch บน Mobile */}
                    <button className="text-left text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 p-3 rounded-md transition mt-2">
                        EN | TH
                    </button>
                </div>
            </div>
        )}
    </header>
  );
}