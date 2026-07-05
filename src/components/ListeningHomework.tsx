"use client";

import { useRef } from "react";
import { Headphones, ShieldOff } from "lucide-react";

interface ListeningHomeworkProps {
  task: {
    _id: string;
    title: string;
    content: string;
    type: string;
  };
}

export default function ListeningHomework({ task }: ListeningHomeworkProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Headphones size={18} className="text-green-600" />
          Audio Listening
        </h2>

        <div className="p-6 bg-gray-50 rounded-lg flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <Headphones size={36} className="text-green-600" />
          </div>

          <p className="text-sm text-gray-500 text-center">
            Audio: <strong>Maris</strong>
          </p>

          <audio
            ref={audioRef}
            controls
            controlsList="nodownload noremoteplayback"
            className="w-full max-w-md"
            style={{ pointerEvents: "auto" }}
          >
            <source src={task.content} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
            <ShieldOff size={14} />
            Download disabled for students
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Listen to the audio carefully and complete the related tasks.
        </p>
      </div>
    </div>
  );
}
