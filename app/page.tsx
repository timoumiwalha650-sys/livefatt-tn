'use client';

import React, { useState } from 'react';

export default function LiveFattPage() {
  const [messages, setMessages] = useState([
    { sender: 'متابع تونسي', text: 'أهلاً بكم! كم سعر هذا المنتج وهل يوجد توصيل لجميع الولايات؟' },
    { sender: 'مريم (المساعدة الذكية)', text: 'أهلاً بك! السعر ممتاز والتوصيل متاح لجميع ولايات تونس والدفع عند الاستلام خلال 24-48 ساعة.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    setMessages([...messages, { sender: 'أنت', text: inputMessage }]);
    const userQuery = inputMessage;
    setInputMessage('');

    // رد آلي ذكي من مريم بالدارجة
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { sender: 'مريم (المساعدة الذكية)', text: `وصلني سؤالك "${userQuery}". تفضل بالطلب الآن وسيتصل بك فريق التوصيل في أقرب وقت!` }
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
          <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            LiveFatt TN - البث المباشر والمبيعات
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 rounded-full animate-pulse">
            🔴 مباشر (LIVE)
          </span>
          <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
            توصيل لجميع الولايات | الدفع عند الاستلام
          </span>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Video & Products Table */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Video Player Box */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center">
            <iframe
              className="w-full h-full border-0"
              src="https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&controls=1"
              title="LiveFatt TN Live Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Broadcast Info */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col gap-2 shadow-md">
            <h2 className="text-lg font-bold text-slate-100">شاشة البث المباشر والعروض الحصرية</h2>
            <p className="text-sm text-slate-400">تفاعل معنا مباشرة، اختر منتجاتك، واستفد من عروض الشحن السريع لكافة المدن التونسية.</p>
          </div>

          {/* Organized Products Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-md font-bold text-orange-400 mb-4">📦 جدول المنتجات المعروضة في البث</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm text-slate-300">
                <thead className="bg-slate-800/80 text-slate-200 border-b border-slate-700">
                  <tr>
                    <th className="p-3 rounded-r-lg">المنتج</th>
                    <th className="p-3">السعر (د.ت)</th>
                    <th className="p-3">حالة المخزون</th>
                    <th className="p-3 rounded-l-lg">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="p-3 font-medium text-white">عرض البث المباشر المميز (قطعتين)</td>
                    <td className="p-3 text-orange-400 font-bold">49 د.ت</td>
                    <td className="p-3"><span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs border border-green-500/20">متوفر</span></td>
                    <td className="p-3"><button className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold transition-all">اطلب الآن</button></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">باك العناية الشاملة (توصيل مجاني)</td>
                    <td className="p-3 text-orange-400 font-bold">89 د.ت</td>
                    <td className="p-3"><span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs border border-green-500/20">متوفر بقوة</span></td>
                    <td className="p-3"><button className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold transition-all">اطلب الآن</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Maryam Interactive Chat */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col h-[600px] overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
              <h3 className="font-semibold text-slate-200">الدردشة المباشرة مع مريم</h3>
            </div>
            <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">مساعدة مبيعات</span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-xl border ${msg.sender.includes('مريم') ? 'bg-orange-950/30 border-orange-900/50 text-slate-200' : 'bg-slate-800/60 border-slate-700/50 text-slate-300'}`}
              >
                <span className={`font-semibold block mb-1 text-xs ${msg.sender.includes('مريم') ? 'text-orange-400' : 'text-slate-400'}`}>
                  {msg.sender}
                </span>
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-900 flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="اكتب سؤالك بالدارجة التونسية..."
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
