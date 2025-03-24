'use client';
import { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa'; // أيقونة الدوران

export default function Home() {
  return (
    <div dir="rtl" className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg text-center">
      {/* رسالة انتظار */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold text-blue-600">انتظـرونا قريباً</h1>
        <p className="text-gray-600 text-lg">نعمل على تقديم محتوى جديد لكم!</p>
        {/* أيقونة انتظار دوارة */}
        <FaSpinner
          size={48}
          className="animate-spin text-blue-500"
        />
      </div>
    </div>
  );
}