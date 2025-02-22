// app/add-question/page.tsx
'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AddQuestion() {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [correctOption, setCorrectOption] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [closeDate, setCloseDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  // دالة لإضافة السؤال

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      if (!question || !option1 || !option2 || !correctOption || !closeDate) {
        setErrorMessage('يرجى ملء جميع الحقول.');
        return;
      }
      
      if (correctOption !== option1 && correctOption !== option2) {
        setErrorMessage('الإجابة الصحيحة يجب أن تكون واحدة من الخيارين.');
        return;
      }
      if (new Date(closeDate) <= new Date(publishDate)) {
        setErrorMessage('تاريخ الإغلاق يجب أن يكون بعد تاريخ النشر.');
        return;
      }
  
      const { error } = await supabase.from('questions').insert([
        {
          question,
          option1,
          option2,
          correct_option: correctOption,
          close_date: closeDate,
        },
      ]);
  
      if (error) {
        throw new Error(`حدث خطأ أثناء إضافة السؤال. التفاصيل: ${error.message}`);
      }
  
      setSuccessMessage('تمت إضافة السؤال بنجاح!');
      setQuestion('');
      setOption1('');
      setOption2('');
      setCorrectOption('');
      setPublishDate('');
      setCloseDate('');
    } catch (err) {
      console.error('Error adding question:', err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-xl font-bold text-blue-600 mb-4">إضافة سؤال جديد</h1>
      {/* استمارة إضافة السؤال */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* حقل السؤال */}
        <div>
          <label className="block text-gray-700 font-bold mb-1">السؤال:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="اكتب السؤال هنا"
            className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* حقل الخيار الأول */}
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-1">الخيار الأول:</label>
            <input
              type="text"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              placeholder="اكتب الخيار الأول"
              className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="button"
            className="py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
            onClick={() => setCorrectOption(option1)}
          >
            اختر
          </button>
        </div>

        {/* حقل الخيار الثاني */}
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-1">الخيار الثاني:</label>
            <input
              type="text"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              placeholder="اكتب الخيار الثاني"
              className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="button"
            className="py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
            onClick={() => setCorrectOption(option2)}
          >
            اختر
          </button>
        </div>

        {/* حقل الإجابة الصحيحة */}
        <div>
          <label className="block text-gray-700 font-bold mb-1">الإجابة الصحيحة:</label>
          <input
            type="text"
            value={correctOption}
            readOnly
            className="w-full py-2 px-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>


{/* حقل تاريخ الإغلاق */}
<div>
  <label className="block text-gray-700 font-bold mb-1">تاريخ ووقت انتهاء العرض:</label>
  <input
  type="datetime-local"
  value={closeDate}
  onChange={(e) => setCloseDate(e.target.value)}
  className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
  required
/>

</div>


        {/* زر الإرسال */}
        <button
          type="submit"
          className={`w-full py-2 px-4 font-semibold rounded transition ${
            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={loading}
        >
          {loading ? 'جارٍ الإضافة...' : 'إضافة السؤال'}
        </button>

        {/* رسائل النجاح أو الخطأ */}
        {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
}