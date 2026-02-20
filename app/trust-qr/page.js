'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DUMMY_USERS, DUMMY_TRANSACTIONS } from '@/lib/dummyData';

function getTrustScoreClass(score) {
    if (score >= 85) return 'trust-score-high';
    if (score >= 65) return 'trust-score-medium';
    return 'trust-score-low';
}

export default function TrustQRPage() {
    const [tab, setTab] = useState('transactions');

    // Build unique seller / buyer lists from transactions
    const uniqueSellers = [];
    const uniqueBuyers = [];
    const sellerIds = new Set();
    const buyerIds = new Set();

    DUMMY_TRANSACTIONS.forEach((t) => {
        if (!sellerIds.has(t.seller)) {
            sellerIds.add(t.seller);
            const user = DUMMY_USERS.find((u) => u.id === t.seller);
            if (user) uniqueSellers.push(user);
        }
        if (!buyerIds.has(t.buyer)) {
            buyerIds.add(t.buyer);
            const user = DUMMY_USERS.find((u) => u.id === t.buyer);
            if (user) uniqueBuyers.push(user);
        }
    });

    return (
        <div className="page-container">
            <div className="section-header fade-in">
                <h1>Trust Network</h1>
                <p>Explore verified transactions and the people behind them. Every trade builds a chain of trust.</p>
            </div>

            {/* Tabs */}
            <div className="filter-chips fade-in" style={{ marginBottom: 28 }}>
                <button className={`filter-chip ${tab === 'transactions' ? 'active' : ''}`} onClick={() => setTab('transactions')}>
                    📋 Transactions ({DUMMY_TRANSACTIONS.length})
                </button>
                <button className={`filter-chip ${tab === 'sellers' ? 'active' : ''}`} onClick={() => setTab('sellers')}>
                    🏷️ Sellers ({uniqueSellers.length})
                </button>
                <button className={`filter-chip ${tab === 'buyers' ? 'active' : ''}`} onClick={() => setTab('buyers')}>
                    🛒 Buyers ({uniqueBuyers.length})
                </button>
            </div>

            {/* Transactions List */}
            {tab === 'transactions' && (
                <div className="stagger">
                    {DUMMY_TRANSACTIONS.map((t) => (
                        <div key={t.id} className="glass-card" style={{ padding: 18, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 200 }}>
                                <img src={t.seller_avatar} alt="" style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }} />
                                <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t.listing_title}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                                        <Link href={`/profile/${t.seller}`} style={{ color: 'var(--orange-500)', fontWeight: 500 }}>{t.seller_name}</Link>
                                        {' → '}
                                        <Link href={`/profile/${t.buyer}`} style={{ color: 'var(--blue)', fontWeight: 500 }}>{t.buyer_name}</Link>
                                    </div>
                                </div>
                            </div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--orange-500)', fontFamily: 'Outfit, sans-serif' }}>
                                ${parseFloat(t.amount).toLocaleString()}
                            </div>
                            <div style={{
                                padding: '3px 10px',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.68rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                                ...(t.status === 'completed' ? {
                                    background: 'var(--green-bg)',
                                    color: 'var(--green)',
                                    border: '1px solid rgba(22,163,74,0.15)',
                                } : {
                                    background: 'rgba(202,138,4,0.08)',
                                    color: 'var(--yellow)',
                                    border: '1px solid rgba(202,138,4,0.15)',
                                }),
                            }}>
                                {t.status}
                            </div>
                            {t.completed_at && (
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                                    {new Date(t.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Sellers */}
            {tab === 'sellers' && (
                <div className="people-list stagger">
                    {uniqueSellers.map((user) => (
                        <Link href={`/profile/${user.id}`} key={user.id} style={{ textDecoration: 'none' }}>
                            <div className="person-card">
                                <img src={user.avatar} alt={user.full_name} />
                                <div className="person-info">
                                    <div className="person-name">{user.full_name} {user.is_verified && '✅'}</div>
                                    <div className="person-meta">{user.university} · {user.total_transactions} sales</div>
                                </div>
                                <span className={`trust-score ${getTrustScoreClass(user.trust_score)}`} style={{ fontSize: '0.9rem' }}>
                                    {user.trust_score}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Buyers */}
            {tab === 'buyers' && (
                <div className="people-list stagger">
                    {uniqueBuyers.map((user) => (
                        <Link href={`/profile/${user.id}`} key={user.id} style={{ textDecoration: 'none' }}>
                            <div className="person-card">
                                <img src={user.avatar} alt={user.full_name} />
                                <div className="person-info">
                                    <div className="person-name">{user.full_name} {user.is_verified && '✅'}</div>
                                    <div className="person-meta">{user.university} · Trust {user.trust_score}</div>
                                </div>
                                <span className={`trust-score ${getTrustScoreClass(user.trust_score)}`} style={{ fontSize: '0.9rem' }}>
                                    {user.trust_score}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Bottom Info */}
            <div className="glass-card fade-in" style={{ padding: 20, marginTop: 32, textAlign: 'center', background: 'var(--bg-warm)', borderColor: 'rgba(242,101,34,0.15)' }}>
                <div style={{ fontWeight: 600, marginBottom: 4, fontSize: '0.9rem' }}>🔲 Want to see your own Trust QR?</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 10 }}>
                    Your portable Trust QR lives in your profile. Share it anywhere — group chats, flyers, texts.
                </p>
                <Link href="/profile/1" className="btn btn-primary btn-sm">
                    View My Profile & Trust QR →
                </Link>
            </div>
        </div>
    );
}
