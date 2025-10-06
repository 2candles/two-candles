// app/dhamma/page.tsx (อัปเดตทั้งหมด)
'use client'; // ต้องใช้ 'use client' เพราะเราใช้ hooks

import { useRef, useState, useEffect } from 'react';
import DharmaAudioPlayer from '@/components/DharmaAudioPlayer';

interface DharmaTrack {
    trackId: string;
    titleTH: string;
    titleEN: string;
    audioSrc: string;
}

// ข้อมูลบทสวด (อัปเดต Path ของไฟล์เสียง)
const dharmaTracks: DharmaTrack[] = [
    { 
        trackId: 'metta',
        titleTH: 'กะระณียะเมตตะสุตตัง (บทสวดแผ่เมตตา)', 
        titleEN: 'Karaniya Metta Sutta',
        audioSrc: '/audio/Karaniya Metta Sutta.mp3' 
    },
    { 
        trackId: 'khandha',
        titleTH: 'ขันธปริตรคาถา (บทสวดป้องกันภัยจากอสรพิษ)', 
        titleEN: 'Khandha Paritta Gatha',
        audioSrc: '/audio/Kantaparitkata.mp3' 
    },
];

export default function DhammaPage() {
    // 1. เก็บอินสแตนซ์ของ HTML Audio Element
    const audioRef = useRef<HTMLAudioElement | null>(null);
    
    // 2. สถานะสำหรับติดตาม ID ของเพลงที่กำลังเล่นอยู่
    const [activeTrackId, setActiveTrackId] = useState<string | null>(null);

    // สร้าง Audio Element เมื่อ Component Mount
    useEffect(() => {
        audioRef.current = new Audio();
        
        // เคลียร์ Audio Element เมื่อ Component Unmount เพื่อป้องกัน Memory Leak
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // ฟังก์ชันสำคัญ: จัดการการเล่นเพลงใหม่
    const handlePlay = (track: DharmaTrack) => {
        const audio = audioRef.current;
        if (!audio) return;

        // 💡 Logic ควบคุม: หากมีเพลงกำลังเล่นอยู่ หรือ กำลังจะเล่นเพลงใหม่ ให้จัดการปิดเพลงเดิมก่อน
        if (activeTrackId !== track.trackId) {
            // 1. ตั้งค่า source ใหม่
            audio.src = track.audioSrc;
            
            // 2. เล่นเพลง
            audio.play()
                 .then(() => setActiveTrackId(track.trackId))
                 .catch(error => console.error("Error playing audio:", error));
        } else {
             // ถ้ากดปุ่มเพลงเดิมซ้ำ (แต่เราจะจัดการนี้ใน togglePlay ในคอมโพเนนต์ลูก)
             // โค้ดนี้ไม่ควรจะถูกเรียกถ้า Logic ในคอมโพเนนต์ลูกถูกต้อง
        }
    };
    
    // ฟังก์ชัน: จัดการการหยุดเพลง
    const handlePause = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            setActiveTrackId(null);
        }
    };

    return (
        <div className="py-10">
            
            <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-4">
                เพลงธรรมะและบทสวด
            </h1>
            <p className="text-xl text-center text-gray-500 mb-12">
                เสียงแห่งธรรมะนำทางสู่ความสงบและสติ
            </p>

            <div className="max-w-3xl mx-auto space-y-6">
                {dharmaTracks.map((track) => (
                    <DharmaAudioPlayer 
                        key={track.trackId}
                        {...track}
                        
                        // Pass สถานะและฟังก์ชันควบคุมไปยังคอมโพเนนต์ลูก
                        isPlaying={activeTrackId === track.trackId}
                        onPlay={() => handlePlay(track)} 
                        onPause={handlePause}
                    />
                ))}
            </div>

            <div className="max-w-3xl mx-auto mt-12 p-6 bg-green-50 border-l-4 border-green-400 rounded-lg">
                <p className="text-sm text-gray-700 font-bold">
                    ✅ สถานะ: ระบบการเล่นเสียงจริง (HTML Audio API) เปิดใช้งานแล้ว! 
                </p>
            </div>
        </div>
    );
}