'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LiveFattPage() {
  // Order state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<any[]>([]);
  const [chatUser, setChatUser] = useState('');
  const [chatContent, setChatContent] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Fetch initial messages & subscribe to real-time changes
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

  // Handle order submission
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

  // Handle chat submission
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatContent.trim()) return;
    setChatLoading(true);

    const senderName = chatUser.trim() ? chatUser.trim() : 'زائر';
    const { error } = await supabase
      .from('messages')
      .insert([{ user_name: senderName, content: chatContent.trim() }]);

    setChatLoading(false);
    if (error) {
      alert('حدث خطأ أثناء إرسال الرسالة: ' + error.message);
    } else {
      setChatContent('');
    }
  };

  return (
    <div style={{ backgroundColor: '#090d16', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '15px' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '15px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ height: '12px', width: '12px', backgroundColor: '#ef4444', borderRadius: '50%', display: 'inline-block' }}></span>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0, color: '#f97316' }}>LiveFatt TN</h1>
        </div>
        <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '5px 12px', borderRadius: '15px', fontSize: '12px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
          بث مباشر حي
        </span>
      </header>

      {/* Main Container */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Stream & Order Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Player */}
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', border: '1px solid #1e293b', backgroundColor: '#000' }}>
            <iframe
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              src="https://www.youtube-nocookie.com/embed/5qap5aO4i9A"
              title="Live Stream"
              allowFullScreen
            />
          </div>

          {/* Form Box */}
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

        {/* Live Chat Section */}
        <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '550px' }}>
          <h3 style={{ margin: '0 0 15px 0', borderBottom: '1px solid #1e293b', paddingBottom: '10px', fontSize: '16px' }}>الدردشة التفاعلية الحية</h3>
          
          {/* Message List */}
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', marginTop: '20px' }}>لا توجد رسائل بعد. كن أول من يعلق!</p>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '8px' }}>
                  <strong style={{ color: '#f97316', display: 'block', fontSize: '12px' }}>{msg.user_name}</strong>
                  <span style={{ fontSize: '14px', color: '#f8fafc' }}>{msg.content}</span>
                </div>
              ))
            )}
          </div>

          {/* Chat Input Form */}
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
                placeholder="اكتب تعليقك..."
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
                {chatLoading ? '...' : 'إرسال'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
