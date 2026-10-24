'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// تهيئة محرك Gemini باستخدام المفتاح المستخرج
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey: apiKey });

export default function LiveFattPage() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [messages, setMessages] = useState<any[]>([]);
  const [chatUser, setChatUser] = useState('');
  const [chatContent, setChatContent] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
      if (data) setMessages(data);
    };

    fetchMessages();

    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderLoading(true);

    const { error } = await supabase
      .from('orders')
      .insert([{ full_name: fullName, phone: phone, address: address, product: 'منتج LiveFatt التجريبي' }]);

    setOrderLoading(false);
    if (error) {
      alert('حدث خطأ أثناء إرسال الطلب: ' + error.message);
    } else {
      setOrderSuccess(true);
    }
  };

  // استدعاء ذكاء Gemini التونسي الاحترافي للمبيعات
  const generateAiSalesReply = async (userText: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userText,
        config: {
          systemInstruction: `أنتِ مريم، مسؤولة مبيعات ودودة واحترافية جداً في منصة البث المباشر التونسية "LiveFatt TN". 
          قواعدك الصارمة:
          1. تحدثي دائماً بالدارجة التونسية العفوية والقريبة للقلب (أو بالـ Franco-Arabe إذا كتب العميل بها). إياك أن تتحدثي بالمصرية أو الخليجية.
          2. معلومات المنتج الأساسية: اسم المنتج "منتج LiveFatt التجريبي"، السعر 49 TND، والتوصيل متوفر لكامل ولايات الجمهورية التونسية في 24-48 ساعة، والتسليم يد بيد مع الدفع عند الاستلام.
          3. افهمي قصد العميل بعمق (سواء سأل عن السعر، البري، قديش، التوصيل، الألوان، المقاسات، أو أبدى تردداً).
          4. قومي دائماً بذكاء بتحفيز المشاهدين بين الحين والآخر على عمل "بارطاج (Share)" للبث لزيادة التفاعل والوصول، بطريقة محببة (مثل: "يا جماعة بارطاجيو اللايف باش يوصلكم الكل ويكبر اللمة!").
          5. لا تقل أبداً أنك ذكاء اصطناعي أو بوت، أنتِ إنسانة ومسؤولة مبيعات حقيقية في اللايف.
          6. اجعل إجابتك مختصرة، مقنعة، ومفعمة بالحيوية تماماً مثل البث المباشر الحقيقي.`
        }
      });
      return response.text || 'مرحباً بكِ! تواصلي معنا للطلب أو لأي استفسار. ✨';
    } catch (err) {
      return 'أهلاً بك! تفضلي، نحن في الخدمة لأي استفسار عن المنتج أو التوصيل. 🛍️';
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatContent.trim()) return;
    setChatLoading(true);

    const senderName = chatUser.trim() ? chatUser.trim() : 'زائر';
    const userMsg = chatContent.trim();

    // 1. حفظ رسالة الزائر في Supabase
    await supabase.from('messages').insert([{ user_name: senderName, content: userMsg }]);

    setChatContent('');
    setChatLoading(false);

    // 2. توليد رد ذكاء Gemini التونسي وحفظه في Supabase ليظهر للجميع
    const aiReplyText = await generateAiSalesReply(userMsg);
    await supabase.from('messages').insert([{ user_name: '🛍️ مريم (مبيعات LiveFatt)', content: aiReplyText }]);
  };

  return (
    <div style={{ backgroundColor: '#090d16', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '15px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '15px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ height: '12px', width: '12px', backgroundColor: '#ef4444', borderRadius: '50%', display: 'inline-block' }}></span>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0, color: '#f97316' }}>LiveFatt TN</h1>
        </div>
        <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '5px 12px', borderRadius: '15px', fontSize: '12px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
          بث مباشر حي
        </span>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', border: '1px solid #1e293b', backgroundColor: '#000' }}>
            <iframe
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              src="https://www.youtube-nocookie.com/embed/5qap5aO4i9A"
              title="Live Stream"
              allowFullScreen
            />
          </div>

          <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', color: '#fff' }}>🛍️ طلب المنتج المعروض في البث</h2>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#22c55e' }}>49 TND</span>
            </div>

            {orderSuccess ? (
              <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid #22c55e', color: '#4ade80', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                🎉 تم إرسال طلبك بنجاح! سنتصل بك لترتيب التسليم.
              </div>
            ) : (
              <form onSubmit={handleOrder} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="الاسم واللقب"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#090d16', color: '#fff' }}
                />
                <input
                  type="tel"
                  placeholder="رقم الهاتف (تونس)"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#090d16', color: '#fff' }}
                />
                <input
                  type="text"
                  placeholder="العنوان والمدينة"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#090d16', color: '#fff' }}
                />
                <button
                  type="submit"
                  disabled={orderLoading}
                  style={{ backgroundColor: '#22c55e', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '5px' }}
                >
                  {orderLoading ? 'جاري إرسال الطلب...' : 'تأكيد الشراء الآن'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Live Chat & Gemini AI Sales Agent */}
        <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '550px' }}>
          <h3 style={{ margin: '0 0 15px 0', borderBottom: '1px solid #1e293b', paddingBottom: '10px', fontSize: '16px' }}>الدردشة الحية ومساعد المبيعات الذكي</h3>
          
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', marginTop: '20px' }}>لا توجد رسائل بعد. جرب اسأل مريم بالدارجة أو بالفرانكو!</p>
            ) : (
              messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    backgroundColor: msg.user_name.includes('مريم') ? '#1e1b4b' : '#1e293b', 
                    borderLeft: msg.user_name.includes('مريم') ? '4px solid #f97316' : 'none',
                    padding: '10px', 
                    borderRadius: '8px' 
                  }}
                >
                  <strong style={{ color: msg.user_name.includes('مريم') ? '#fb923c' : '#38bdf8', display: 'block', fontSize: '12px' }}>{msg.user_name}</strong>
                  <span style={{ fontSize: '14px', color: '#f8fafc' }}>{msg.content}</span>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              type="text"
              placeholder="اسمك (اختياري)"
              value={chatUser}
              onChange={(e) => setChatUser(e.target.value)}
              style={{ backgroundColor: '#090d16', border: '1px solid #334155', color: '#fff', padding: '8px 10px', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="اكتب استفسارك (مثلاً: بقدش السوم؟ أو qdch livraison؟)..."
                required
                value={chatContent}
                onChange={(e) => setChatContent(e.target.value)}
                style={{ flex: 1, backgroundColor: '#090d16', border: '1px solid #334155', color: '#fff', padding: '10px', borderRadius: '8px', outline: 'none' }}
              />
              <button
                type="submit"
                disabled={chatLoading}
                style={{ backgroundColor: '#ea580c', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {chatLoading ? 'جاري...' : 'إرسال'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
