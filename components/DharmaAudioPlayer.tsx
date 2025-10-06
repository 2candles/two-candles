// components/DharmaAudioPlayer.tsx (อัปเดต)
'use client';

import { Play, Pause, Music } from 'lucide-react';

interface DharmaAudioPlayerProps {
    titleTH: string;
    titleEN: string;
    audioSrc: string; // เพิ่ม Path ของไฟล์เสียง
    trackId: string; // ID เฉพาะของบทสวด
    
    // Props ใหม่สำหรับควบคุมสถานะจากภายนอก
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
}

/**
 * คอมโพเนนต์สำหรับแสดงชื่อบทสวดและปุ่มควบคุมการเล่น (ควบคุมโดย parent component)
 */
export default function DharmaAudioPlayer({ 
    titleTH, 
    titleEN, 
    isPlaying, 
    onPlay, 
    onPause 
}: DharmaAudioPlayerProps) {
    
    const togglePlay = () => {
        if (isPlaying) {
            onPause();
        } else {
            onPlay();
        }
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            
            <div className="flex items-start space-x-4">
                <Music size={24} className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{titleTH}</h3>
                    <p className="text-sm text-gray-500 italic">{titleEN}</p>
                </div>
            </div>

            <button
                onClick={togglePlay}
                className={`p-3 rounded-full transition-colors duration-200 shadow-lg ml-4 flex-shrink-0
                    ${isPlaying 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                aria-label={isPlaying ? 'หยุดชั่วคราว' : 'เล่น'}
            >
                {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
            </button>
        </div>
    );
}