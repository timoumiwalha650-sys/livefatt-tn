'vulnerable'
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// إنشاء اتصال Supabase باستخدام متغيرات البيئة
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

interface Message {
  id: string;
  user_name: string;
  message: string;
  created_at: string;
}

export default function LiveFattHome() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('متابع تونسي');
  const [streamUrl, setStreamUrl] = useState('https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID');

  useEffect(() => {
    // جلب الرسائل القديمة عند فتح الصفحة
    fetchMessages();

    // تفعيل الاستماع الفوري للرسائل الجديدة (Realtime)
    const channel = supabase
      .channel('public:chat_messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(50);

    if (error) {
      console.error('Error fetching messages:', error);
    } else if (data) {
      setMessages(data);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase.from('chat_messages').insert([
      {
        user_name: userName,
        message: newMessage,
      },
    ]);

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold text-red-500">LiveFatt TN 🔴 مباشر</h1>
        <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm animate-pulse border border-red-500/30">
          البث حي الآن
        </span>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* قسم مشغل البث */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
            <iframe
              src={streamUrl}
              className="w-full h-full"
              allowFullScreen
              title="LiveFatt Stream"
            ></iframe>
          </div>
          <div>
            <h2 className="text-xl font-semibold">بث مباشر حصري - LiveFatt TN</h2>
            <p className="text-gray-400 text-sm mt-1">تفاعل معنا مباشرة عبر الدردشة الحية.</p>
          </div>
        </div>

        {/* قسم الدردشة الحية (Live Chat) */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl flex flex-col h-[500px] lg:h-auto overflow-hidden shadow-xl">
          <div className="p-4 bg-gray-900/80 border-b border-gray-800 font-semibold text-sm text-gray-300">
            الدردشة المباشرة
          </div>

          {/* صندوق عرض الرسائل */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center my-auto text-sm">لا توجد رسائل بعد، كن أول المزارعين المشاركين!</p>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="bg-gray-800/50 p-2.5 rounded-lg border border-gray-700/50">
                  <span className="font-bold text-red-400 text-xs block mb-1">{msg.user_name}</span>
                  <span className="text-sm text-gray-200 break-words">{msg.message}</span>
                </div>
              ))
            )}
          </div>

          {/* نموذج إرسال الرسائل */}
          <form onSubmit={sendMessage} className="p-3 bg-gray-950 border-t border-gray-800 flex flex-col gap-2">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="اسمك المستعار..."
              className="bg-gray-900 border border-gray-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition"
              >
                إرسال
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
