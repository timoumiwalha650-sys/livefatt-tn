'use client';

import React, { useState } from 'react';

export default function LiveFattPage() {
  const [messages, setMessages] = useState([
    { sender: 'متابع تونسي', text: 'السلام عليكم، قداش السعر وهل التوصيل لجميع الولايتك؟' },
    { sender: 'مريم (المساعدة الذكية)', text: 'عصبة عليك وعلى عيلتك ومرحباً بك! السعر ممتاّز والتوصيل متوفر لـ 24 ولاية والدفع عند الاستلام.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    setMessages(prev => [...prev, { sender: 'أنت', text: inputMessage }]);
    const userQuery = inputMessage;
    setInputMessage('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { sender: 'مريم (المساعدة الذكية)', text: `يعطيك الصحة! استلمنا سؤالك: "${userQuery}". سيتم الاتصال بك لتأكيد الطلب.` }
      ]);
    }, 800);
  };

  return (
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', direction: 'rtl', padding: '0', margin: '0' }}>
      
      {/* Header */}
      <header style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#f97316', margin: 0 }}>LiveFatt TN - المنصة التونسية للبث المباشر</h1>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '6px 14px', borderRadius: '8px', border: '1px solid #334155', fontSize: '13px', color: '#38bdf8' }}>
          🚚 توصيل لـ 24 ولاية | الدفع عند الاستلام
        </div>
      </header>

      {/* Main Content Layout */}
      <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* Left Side: Video + Products Table */}
        <div style={{ flex: '2', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Stream Player */}
          <div style={{ backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #1e293b', overflow: 'hidden', height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <iframe
              style={{ width: '100%', height: '100%', border: 'none' }}
              src="https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?autoplay=0&controls=1"
              title="Live Stream"
              allowFullScreen
            />
          </div>

          {/* Organized Products Table */}
          <div style={{ backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #1e293b', padding: '20px' }}>
            <h3 style={{ color: '#f97316', marginTop: 0, marginBottom: '15px', fontSize: '18px' }}>📦 عروض البث المباشر والمنتجات المتاحة</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e293b', color: '#94a3b8' }}>
                  <th style={{ padding: '12px', borderBottom: '1px solid #334155' }}>المنتج</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #334155' }}>السعر (TND)</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #334155' }}>حالة الشحن</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #334155' }}>طلب</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>باك العرض الخاص (قطعتين)</td>
                  <td style={{ padding: '12px', color: '#22c55e', fontWeight: 'bold' }}>49 د.ت</td>
                  <td style={{ padding: '12px', color: '#38bdf8' }}>شحن سريع (24 ساعة)</td>
                  <td style={{ padding: '12px' }}>
                    <button style={{ backgroundColor: '#ea580c', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>اطلب الآن</button>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>الطقوم الكاملة VIP</td>
                  <td style={{ padding: '12px', color: '#22c55e', fontWeight: 'bold' }}>89 د.ت</td>
                  <td style={{ padding: '12px', color: '#38bdf8' }}>توصيل مجاني</td>
                  <td style={{ padding: '12px' }}>
                    <button style={{ backgroundColor: '#ea580c', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>اطلب الآن</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* Right Side: Interactive Chat */}
        <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', height: '580px' }}>
          
          <div style={{ padding: '15px', borderBottom: '1px solid #1e293b', backgroundColor: '#1e293b', fontWeight: 'bold', color: '#f97316' }}>
            💬 الدردشة المباشرة مع مريم
          </div>

          <div style={{ flex: '1', padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ backgroundColor: msg.sender.includes('مريم') ? '#1e1b4b' : '#1e293b', padding: '10px 14px', borderRadius: '10px', border: '1px solid #334155' }}>
                <span style={{ fontSize: '11px', color: msg.sender.includes('مريم') ? '#c084fc' : '#38bdf8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                  {msg.sender}
                </span>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.4' }}>{msg.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} style={{ padding: '12px', borderTop: '1px solid #1e293b', display: 'flex', gap: '8px', backgroundColor: '#020617' }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="اكتب سؤالك بالدارجة التونسية..."
              style={{ flex: '1', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', padding: '10px 12px', borderRadius: '8px', outline: 'none', fontSize: '13px' }}
            />
            <button
              type="submit"
              style={{ backgroundColor: '#ea580c', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
            >
              إرسال
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
