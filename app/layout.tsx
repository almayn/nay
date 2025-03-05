import './globals.css'; // استيراد ملف الأنماط العام

export const metadata = {
  title: 'مسابقة الماس الرمضانية', // الاسم الذي سيظهر في المتصفح
  description: 'شارك في مسابقة رمضان اليومية واربح جوائز قيمة!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* ✅ تحسين بيانات المشاركة عند النشر في سناب شات وتويتر وفيسبوك */}
        <meta property="og:title" content="مسابقة الماس الرمضانية 🎉" />
        <meta property="og:description" content="شارك في المسابقة واربح جوائز رائعة! 🚀" />
        <meta property="og:image" content="https://almasyn.com/snap-thumbnail.jpg" />
        <meta property="og:url" content="https://almasyn.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body>{children}</body>
    </html>
  );
}
