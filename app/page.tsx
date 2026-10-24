'use client';

import React, { useState } from 'react';

export default function LiveFattPage() {
  const [messages, setMessages] = useState([
    { sender: 'متابع تونسي', text: 'سلام، بالله الحكاية أصلية والا تقليد؟ وكيفاش نعدي كوموند؟' },
    { sender: 'مريم (المساعدة الذكية)', text: 'أهلاً بك ومرحباً! كل منتجاتنا أصلية 100% ومضمونة وتخضع لمراقبة الجودة قبل ما تخرج. لتأكيد طلبك بكل سهولة، ما عليك كان تعطيني اسمك، رقم تلفونك، وعنوانك، وفريق التوصيل يتصل بيك في أقرب وقت!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    const userText = inputMessage;
    setMessages(prev => [...prev, { sender: 'أنت', text: userText }]);
    setInputMessage('');

    // محرك تحليل ذكي وشامل يغطي كافة احتمالات أسئلة العملاء في البث المباشر
    setTimeout(() => {
      const q = userText.toLowerCase().trim();
      let replyText = "";

      // 1. الأسئلة حول الجودة، الأصالة، أو الثقة (أصلي، تقليد، يشد، جيد)
      if (q.includes('أصلي') || q.includes('اصلية') || q.includes('تقليد') || q.includes('جودة') || q.includes('مضمون') || q.includes('يشرك') || q.includes('يكسر')) {
        replyText = "أهلاً بك! نضمن لك أن منتجاتنا أصلية وممتازة وعالية الجودة، وتحظى برضا جميع حرفائنا في مختلف ولايات الجمهورية. هل أحجز لك قطعتك الآن؟ أبعث لي اسمك ورقمك وعنوانك لتأكيد الطلب.";
      }
      // 2. الأسئلة حول السعر، التخفيضات، أو الثمن (قداش، سوم، ثمن، فلوس، تخفيض)
      else if (q.includes('ثمن') || q.includes('سعر') || q.includes('سوم') || q.includes('قداش') || q.includes('فلوس') || q.includes('تخفيض') || q.includes('بروموسيون')) {
        replyText = "💰 أسعارنا تنافسية وتخفيضات البث المباشر ما زالت سارية:\n• باك العرض الخاص (قطعتين): 49 د.ت.\n• الطقم الكامل VIP: 89 د.ت.\nالعرض محدود، إذا تحب تستفيد بيه اعطيني بياناتك (الاسم، الهاتف، العنوان) تو نعديو لك الكوموند فوراً!";
      }
      // 3. الأسئلة حول التوصيل، الشحن، والوقت (توصيل، شحن، وقت، يوصل، ولاية، سوسة، تونس، صفاقس)
      else if (q.includes('توصيل') || q.includes('شحن') || q.includes('يوصل') || q.includes('وقت') || q.includes('يوم') || q.includes('ولاية') || q.includes('وين') || q.includes('تونس') || q.includes('سوسة') || q.includes('صفاقس')) {
        replyText = "🚚 التوصيل سريع جداً ومتوفر لجميع ولايات تونس الـ 24 حتى باب البيت، ويأخذ بين 24 إلى 48 ساعة فقط، والدفع يكون حصرياً عند الاستلام (تخلص كي يوصلك الباكي). تفضل أبعث لي اسمك ورقم تلفونك لنقوم بالشحن!";
      }
      // 4. الأسئلة حول المخزون أو الكمية (ستوك، مازال، كعبة، كمية، فما)
      else if (q.includes('ستوك') || q.includes('stock') || q.includes('مازال') || q.includes('كمل') || q.includes('كمية') || q.includes('كعبة') || q.includes('فما')) {
        replyText = "📦 المخزون يتراجع بسرعة رهيبة نظراً للإقبال الكبير في البث المباشر الحالي! ما زالت قطع معدودة متوفرة. لا تضيع الفرصة واكتب لي اسمك ورقم هاتفك وعنوانك لكي نحجز لك قطعتك حالاً.";
      }
      // 5. نية الشراء أو طلب المنتج مباشرة (كوموند، نشري، نطلب، نخلص، نحب، نأخذ)
      else if (q.includes('كوموند') || q.includes('نشري') || q.includes('نطلب') || q.includes('نخلص') || q.includes('نحب') || q.includes('أريد') || q.includes('بش نأخذ') || q.includes('نحجز')) {
        replyText = "ممتاز جداً اختيار موفق! لتأكيد طلبك وسرعة إرساله عبر شركاء النقل، يرجى كتابة المعلومات التالية هنا في الدردشة:\n1. الاسم واللقب\n2. رقم الهاتف الشخصي\n3. عنوان السكن الكامل والولاية\nفريقنا سيتصل بك لتأكيد الإرسال.";
      }
      // 6. التحية والسلام
      else if (q.includes('سلام') || q.includes('أهلاً') || q.includes('صباح') || q.includes('مساء') || q.includes('يعايشك') || q.includes('بربي')) {
        replyText = "وعليكم السلام ورحمة الله وبركاته وأهلاً بك في بث LiveFatt TN! أنا مريم مساعدتك الذكية، تفضل اسأل عن أي منتج أو عرض، ونحن في خدمة إجابتك وتأكيد طلبك بكل راححة.";
      }
      // 7. أي سؤال آخر عشوائي، غريب، أو خارج التوقعات (إجابة ذكية، مفيدة، وغير جافة)
      else {
        replyText = `فهمت استفسارك بخصوص "${userText}"، ونحن حريصون على تقديم أفضل خدمة وتوضيح لكل حرفائنا. جميع منتجاتنا مضمونة، والتوصيل متوفر لـ 24 ولاية والدفع عند الاستلام. إذا تحب تستفيد من عرض اليوم، اعطيني اسمك ورقم تلفونك وعنوانك وتو نعديولك الطلب بكل سرور!`;
      }

      setMessages(prev => [...prev, { sender: 'مريم (المساعدة الذكية)', text: replyText }]);
    }, 600);
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
                    <button 
                      onClick={() => setInputMessage('نحب نعدي كوموند باك العرض الخاص')}
                      style={{ backgroundColor: '#ea580c', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      اطلب الآن
                    </button>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>الطقم الكامل VIP</td>
                  <td style={{ padding: '12px', color: '#22c55e', fontWeight: 'bold' }}>89 د.ت</td>
                  <td style={{ padding: '12px', color: '#38bdf8' }}>توصيل مجاني</td>
                  <td style={{ padding: '12px' }}>
                    <button 
                      onClick={() => setInputMessage('نحب نعدي كوموند الطقم الكامل VIP')}
                      style={{ backgroundColor: '#ea580c', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      اطلب الآن
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* Right Side: Interactive Chat */}
        <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', height: '580px' }}>
          
          <div style={{ padding: '15px', borderBottom: '1px solid #1e293b', backgroundColor: '#1e293b', fontWeight: 'bold', color: '#f97316', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>💬 مريم - المساعدة الذكية للمبيعات</span>
            <span style={{ fontSize: '10px', backgroundColor: '#22c55e', color: '#020617', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>تفاعل شامل</span>
          </div>

          <div style={{ flex: '1', padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ backgroundColor: msg.sender.includes('مريم') ? '#1e1b4b' : '#1e293b', padding: '10px 14px', borderRadius: '10px', border: '1px solid #334155' }}>
                <span style={{ fontSize: '11px', color: msg.sender.includes('مريم') ? '#c084fc' : '#38bdf8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                  {msg.sender}
                </span>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.4', whiteSpace: 'pre-line' }}>{msg.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} style={{ padding: '12px', borderTop: '1px solid #1e293b', display: 'flex', gap: '8px', backgroundColor: '#020617' }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="اكتب أي سؤال يخطر ببالك..."
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
