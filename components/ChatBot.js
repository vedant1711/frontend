'use client';

import { useState, useRef, useEffect } from 'react';

const FEATURE_KB = [
    { q: ['trust qr', 'qr code', 'trust score', 'reputation'], a: 'Your **Trust QR** lives in your profile page. It shows your TrustScore, show-up rate, and transaction history. Share the link anywhere — group chats, flyers, or texts. Go to **Profile → Trust QR** to see yours!' },
    { q: ['boost', 'promote', 'top of feed'], a: 'You can **boost a listing** for $1–$3 to pin it to the top of the marketplace for 7 days. Go to **Boost → Boost a Listing** in the nav.' },
    { q: ['pro', 'subscription', 'plan', 'pricing', 'premium'], a: '**Pro Seller** costs $2/week and gives you unlimited listings + instant access to new listings as a buyer. Visit the **Boost** page from the navigation.' },
    { q: ['sell', 'list', 'post', 'create listing'], a: 'To sell an item, tap **+** or go to the Marketplace and select "Create Listing." Fill in title, photos, description, and our AI will suggest a fair price!' },
    { q: ['buy', 'purchase', 'how to buy'], a: 'Browse the **Marketplace**, tap any listing, and message the seller. Once you agree on terms, complete the transaction and both of you build trust!' },
    { q: ['uhaul', 'u-haul', 'delivery', 'moving', 'logistics', 'truck'], a: 'For bulky items, you can **book a U-Haul** directly from the listing detail page — no redirect! Pick a date + time window and confirm. 🚛' },
    { q: ['sublease', 'apartment', 'rent', 'housing'], a: 'Subleases are listed in the Marketplace under the **Subleases** category filter. A small transaction fee ($10–$20) applies for trust verification and dispute protection.' },
    { q: ['fee', 'transaction fee', 'cost'], a: 'Marcus is free to use! Fees: **Boost** ($1–3/listing), **Pro** ($2/week), and a small **transaction fee** ($5–$20) on high-value items like subleases.' },
    { q: ['verify', 'verification', '.edu', 'sign up', 'register'], a: 'Sign up with your **.edu email** to get verified instantly. Your TrustScore starts at 50 and grows with every successful transaction.' },
    { q: ['search', 'find', 'filter', 'category'], a: 'Use the **search bar** at the top of the Marketplace to find items. You can also filter by category (Furniture, Textbooks, Electronics, etc.).' },
    { q: ['review', 'rating', 'feedback'], a: 'After a transaction, both buyer and seller can leave reviews. Reviews include a star rating, comment, and show-up confirmation.' },
    { q: ['safe', 'safety', 'scam', 'fraud'], a: 'Marcus verifies all users via .edu email. Every user has a visible TrustScore, show-up rate, and review history. Scan someone\'s Trust QR before meeting up!' },
];

function findAnswer(input) {
    const lower = input.toLowerCase();
    for (const entry of FEATURE_KB) {
        if (entry.q.some((keyword) => lower.includes(keyword))) {
            return entry.a;
        }
    }
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        return 'Hey there! 👋 I\'m Marcus Assistant. Ask me about any feature — Trust QR, boosting listings, subleases, U-Haul booking, pricing, and more!';
    }
    return 'I\'m not sure about that one! Try asking about: **Trust QR**, **boosting listings**, **Pro plan**, **U-Haul delivery**, **subleases**, **fees**, or **how to sell**.';
}

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hi! 👋 I\'m Marcus Assistant. Ask me anything about the app — features, pricing, how things work!' },
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const send = () => {
        if (!input.trim()) return;
        const userMsg = input.trim();
        setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setTimeout(() => {
            setMessages((prev) => [...prev, { role: 'bot', text: findAnswer(userMsg) }]);
        }, 400);
    };

    return (
        <>
            {/* FAB */}
            <button
                onClick={() => setOpen(!open)}
                style={{
                    position: 'fixed', bottom: 24, right: 24, zIndex: 9998,
                    width: 54, height: 54, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--orange-500), var(--orange-600))',
                    color: 'white', border: 'none', cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(242,101,34,0.35)',
                    fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                title="Marcus Assistant"
            >
                {open ? '✕' : '💬'}
            </button>

            {/* Chat Window */}
            {open && (
                <div style={{
                    position: 'fixed', bottom: 90, right: 24, zIndex: 9997,
                    width: 360, maxHeight: 480,
                    background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-xl)', boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                    display: 'flex', flexDirection: 'column', overflow: 'hidden',
                    animation: 'fadeIn 0.25s ease',
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '14px 18px', borderBottom: '1px solid var(--border-color)',
                        background: 'linear-gradient(135deg, var(--orange-500), var(--orange-600))', color: 'white',
                        display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                        <img src="/marcus-logo-nobg.png" alt="Marcus" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'contain', background: 'rgba(255,255,255,0.2)', padding: 3 }} />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem', fontFamily: 'Outfit, sans-serif' }}>Marcus Assistant</div>
                            <div style={{ fontSize: '0.68rem', opacity: 0.8 }}>Ask about any feature</div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', maxHeight: 320 }}>
                        {messages.map((msg, i) => (
                            <div key={i} style={{
                                display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                marginBottom: 8,
                            }}>
                                <div style={{
                                    maxWidth: '82%', padding: '8px 12px', borderRadius: 14,
                                    fontSize: '0.82rem', lineHeight: 1.55,
                                    ...(msg.role === 'user' ? {
                                        background: 'var(--orange-500)', color: 'white',
                                        borderBottomRightRadius: 4,
                                    } : {
                                        background: 'var(--bg-secondary)', color: 'var(--text-primary)',
                                        borderBottomLeftRadius: 4,
                                    }),
                                }} dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    {/* Quick Actions */}
                    <div style={{ padding: '6px 14px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: 5, overflowX: 'auto' }}>
                        {['Trust QR', 'Boost', 'U-Haul', 'Fees'].map((q) => (
                            <button key={q} onClick={() => { setInput(q); setTimeout(() => { setMessages((p) => [...p, { role: 'user', text: q }]); setInput(''); setTimeout(() => setMessages((p) => [...p, { role: 'bot', text: findAnswer(q) }]), 400); }, 50); }}
                                style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', fontSize: '0.68rem', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit', color: 'var(--text-secondary)' }}>
                                {q}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div style={{ padding: '8px 12px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: 8 }}>
                        <input
                            type="text" value={input} onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && send()}
                            placeholder="Ask about features..."
                            style={{
                                flex: 1, padding: '8px 12px', borderRadius: 'var(--radius-full)',
                                border: '1px solid var(--border-color)', fontSize: '0.82rem',
                                fontFamily: 'inherit', background: 'var(--bg-secondary)', color: 'var(--text-primary)',
                                outline: 'none',
                            }}
                        />
                        <button onClick={send} style={{
                            width: 34, height: 34, borderRadius: '50%', border: 'none', cursor: 'pointer',
                            background: 'var(--orange-500)', color: 'white', fontSize: '0.9rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>↑</button>
                    </div>
                </div>
            )}
        </>
    );
}
