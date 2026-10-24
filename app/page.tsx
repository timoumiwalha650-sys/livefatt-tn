'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Message {
  id?: string;
  sender: string;
  text: string;
  created_at?: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

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
        setMessages((prev) => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;

    const userText = inputText;
    setInputText('');
    setLoading(true);

    // حفظ رسالة الزبون في Supabase
    await supabase.from('messages').insert([{ sender: 'User', text: userText }]);

    // رد ترحيبي ذكي من المساعدة "مريم"
    setTimeout(async () => {
      const maryemReply = "أهلاً بك! توصيل لجميع ولايات تونس في 24-48 ساعة والدفع عند الاستلام. شارك البث لنستفيد معاً! 🇹🇳";
      await supabase.from('messages').insert([{ sender: 'مريم (AI)', text: maryemReply }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="flex flex-col h-screen bg-gray-950 text-white font-sans">
      <header className="p-4 bg-gray-900 border-b border-gray-800 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-red-500">LiveFatt TN 🇹🇳</h1>
          <p className="text-xs text-gray-400">البث المباشر والمساعد الذكي مريم</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
          <span className="text-sm font-medium text-green-400">مباشر (LIVE)</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 bg-black flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-800 relative">
          <div className="text-center p-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-600 flex items-center justify-center text-2xl font-bold">
              🎥
            </div>
            <h2 className="text-lg font-semibold">شاشة البث المباشر</h2>
            <p className="text-sm text-gray-500 mt-1">توصيل لجميع الولايات | الدفع عند الاستلام</p>
          </div>
        </div>

        <div className="w-full md:w-96 flex flex-col bg-gray-900">
          <div className="p-3 border-b border-gray-800 bg-gray-900/50">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <span>💬</span> الدردشة المباشرة مع مريم
            </h3>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'User' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-gray-400 mb-1">{msg.sender}</span>
                <div
                  className={`p-3 rounded-lg max-w-[85%] text-sm ${
                    msg.sender === 'User'
                      ? 'bg-red-600 text-white rounded-br-none'
                      : 'bg-gray-800 text-gray-100 rounded-bl-none border border-gray-700'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-gray-500 animate-pulse">مريم تكتب الآن...</div>}
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-800 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اكتب سؤالك بالدارجة التونسية..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500 text-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50"
            >
              إرسال
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
