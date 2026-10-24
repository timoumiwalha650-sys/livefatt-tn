import React from 'react';

export default function LiveFattPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            LiveFatt TN
          </h1>
        </div>
        <span className="px-3 py-1 text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 rounded-full">
          مباشر الآن
        </span>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player Section */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
            <iframe
              className="w-full h-full border-0"
              src="https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?autoplay=0&controls=1"
              title="Live Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col gap-2">
            <h2 className="text-lg font-bold text-slate-100">بث مباشر حصري - LiveFatt TN</h2>
            <p className="text-sm text-slate-400">تفاعل معنا مباشرة عبر الدردشة الحية واكتشف أفضل العروض والمنتجات المتاحة في تونس.</p>
          </div>
        </div>

        {/* Live Chat Section */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col h-[500px] lg:h-auto overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
            <h3 className="font-semibold text-slate-200">الدردشة المباشرة</h3>
            <span className="text-xs text-slate-500">مباشر</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3">
              <span className="font-semibold text-orange-400 block mb-1">متابع تونسي</span>
              <p className="text-slate-300">أهلاً بكم! كم سعر هذا المنتج؟</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3">
              <span className="font-semibold text-red-400 block mb-1">LiveFatt TN</span>
              <p className="text-slate-300">مرحباً بك! يمكنك التواصل معنا مباشرة للحصول على التفاصيل السريعة.</p>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="p-3 border-t border-slate-800 bg-slate-900 flex gap-2">
            <input
              type="text"
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-orange-950/20"
            >
              إرسال
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
