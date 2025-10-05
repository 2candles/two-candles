// app/layout.tsx
import './globals.css';
import Navbar from '../components/Navbar'; 
import React from 'react';

// แยก Footer ออกมาเพื่อให้โค้ด layout สะอาด
const Footer = () => (
    <footer className="bg-gray-800 text-white p-8 mt-10 border-t-8 border-blue-600"> 
        <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-8 mb-8">
                
                <div className="col-span-2 md:col-span-2 space-y-3">
                    <div className="flex items-center space-x-2">
                        <span className="text-3xl font-extrabold text-blue-400">🕯️</span>
                        <div className="text-2xl font-bold text-white">2Candles.com</div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        เส้นทางสู่แสงสว่างแห่งปัญญา ศาสตร์แห่งธรรมะ สุขภาพ และการใช้ชีวิตอย่างสมดุล
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-blue-300 uppercase tracking-wider">สารบัญหลัก</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="/" className="text-gray-400 hover:text-blue-400 transition">หน้าแรก</a></li>
                        <li><a href="/dhamma" className="text-gray-400 hover:text-blue-400 transition">ธรรมะและสติ</a></li>
                        <li><a href="/health" className="text-gray-400 hover:text-blue-400 transition">สุขภาพและชีวิต</a></li>
                        <li><a href="/events" className="text-gray-400 hover:text-blue-400 transition">กิจกรรม</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-blue-300 uppercase tracking-wider">สนับสนุน</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="/donate" className="text-gray-400 hover:text-blue-400 transition">ร่วมทำบุญ</a></li>
                        <li><a href="/subscribe" className="text-gray-400 hover:text-blue-400 transition">สมัครสมาชิก</a></li>
                        <li><a href="/sponsors" className="text-gray-400 hover:text-blue-400 transition">ผู้สนับสนุน</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-blue-300 uppercase tracking-wider">ข้อมูล</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="/about" className="text-gray-400 hover:text-blue-400 transition">เกี่ยวกับเรา</a></li>
                        <li><a href="/contact" className="text-gray-400 hover:text-blue-400 transition">ติดต่อ</a></li>
                        <li><a href="/privacy" className="text-gray-400 hover:text-blue-400 transition">นโยบายความเป็นส่วนตัว</a></li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 pt-4">
                <p>
                    © {new Date().getFullYear()} 2Candles.com. All Rights Reserved.
                </p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition">Facebook</a> 
                    <a href="#" className="hover:text-white transition">YouTube</a>
                </div>
            </div>
        </div>
    </footer>
);


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="bg-gray-50">
      <body>
        <div className="min-h-screen flex flex-col">
          
          <Navbar /> 

          <main className="flex-grow container mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}