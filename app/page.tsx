import React from 'react';

export default function LiveFattPage() {
  return (
    <div style={{ backgroundColor: '#090d16', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '15px', marginBottom: '25px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ height: '12px', width: '12px', backgroundColor: '#ef4444', borderRadius: '50%', display: 'inline-block' }}></span>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#f97316' }}>LiveFatt TN</h1>
        </div>
        <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '5px 12px', borderRadius: '15px', fontSize: '12px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
          مباشر الآن
        </span>
      </header>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Video Player Section */}
        <div style={{ flex: '2' }}>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', border: '1px solid #1e293b', backgroundColor: '#000' }}>
            <iframe
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              src="https://www.youtube-nocookie.com/embed/5qap5aO4i9A"
              title="Live Stream"
              allowFullScreen
            />
          </div>
          <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#0f172a', borderRadius: '10px', border: '1px solid #1e293b' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>بث مباشر حصري - LiveFatt TN</h2>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>تفاعل معنا مباشرة عبر الدردشة الحية واكتشف أفضل العروض والمنتجات المتاحة.</p>
          </div>
        </div>

        {/* Chat Section */}
        <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '450px' }}>
          <h3 style={{ margin: '0 0 15px 0', borderBottom: '1px solid #1e293b', paddingBottom: '10px', fontSize: '16px' }}>الدردشة المباشرة</h3>
          
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '15px' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
              <strong style={{ color: '#f97316', display: 'block', fontSize: '12px' }}>متابع تونسي</strong>
              <span style={{ fontSize: '14px' }}>أهلاً بكم! كم سعر هذا المنتج؟</span>
            </div>
            <div style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '8px' }}>
              <strong style={{ color: '#ef4444', display: 'block', fontSize: '12px' }}>LiveFatt TN</strong>
              <span style={{ fontSize: '14px' }}>مرحباً بك! يمكنك التواصل معنا مباشرة للحصول على التفاصيل.</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="اكتب رسالتك هنا..."
              style={{ flex: 1, backgroundColor: '#090d16', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', outline: 'none' }}
            />
            <button style={{ backgroundColor: '#ea580c', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              إرسال
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
