'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import { DUMMY_USERS, DUMMY_LISTINGS, DUMMY_REVIEWS, DUMMY_TRANSACTIONS, CATEGORY_ICONS } from '@/lib/dummyData';

function getTrustScoreClass(score) {
    if (score >= 85) return 'trust-score-high';
    if (score >= 65) return 'trust-score-medium';
    return 'trust-score-low';
}

function StarRating({ rating }) {
    return <span className="review-stars">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>;
}

function TrustScoreRing({ score, size = 80 }) {
    const radius = size * 0.42;
    const circumference = 2 * Math.PI * radius;
    const progress = (score / 100) * circumference;
    const color = score >= 85 ? '#16a34a' : score >= 65 ? '#ca8a04' : '#dc2626';
    return (
        <div style={{ width: size, height: size, position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="5" />
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth="5"
                    strokeDasharray={circumference} strokeDashoffset={circumference - progress}
                    strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }} />
            </svg>
            <div style={{ fontSize: size * 0.22, fontWeight: 800, color, zIndex: 1, fontFamily: 'Outfit, sans-serif' }}>{score}</div>
        </div>
    );
}

export default function ProfilePage() {
    const params = useParams();
    const userId = parseInt(params.id);
    const user = DUMMY_USERS.find((u) => u.id === userId) || DUMMY_USERS[0];
    const userListings = DUMMY_LISTINGS.filter((l) => l.seller === user.id);
    const userReviews = DUMMY_REVIEWS.filter((r) => r.reviewee === user.id);
    const userTransactions = DUMMY_TRANSACTIONS.filter((t) => t.seller === user.id || t.buyer === user.id);
    const [tab, setTab] = useState('listings');
    const [copied, setCopied] = useState(false);

    const avgRating = userReviews.length > 0
        ? (userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length).toFixed(1)
        : 'N/A';

    const qrData = JSON.stringify({ platform: 'Marcus', name: user.full_name, trust_score: user.trust_score, id: user.qr_code_id });

    const handleCopy = () => {
        navigator.clipboard.writeText(`https://marcus.app/trust/${user.qr_code_id}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="page-container" style={{ maxWidth: 1000 }}>
            {/* Profile Header — Two Column */}
            <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 20, marginBottom: 20 }}>
                {/* Left: Info + Stats */}
                <div className="glass-card" style={{ padding: 22 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
                        <img src={user.avatar} alt={user.full_name}
                            style={{ width: 60, height: 60, borderRadius: '50%', border: '2.5px solid var(--orange-400)', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                                <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>{user.full_name}</h1>
                                {user.is_verified && <span className="badge badge-verified" style={{ fontSize: '0.6rem', padding: '1px 6px' }}>✅ .edu</span>}
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: 0, lineHeight: 1.4 }}>{user.bio}</p>
                            <div style={{ display: 'flex', gap: 12, fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
                                <span>🎓 {user.university} &apos;{String(user.graduation_year).slice(2)}</span>
                                <span>📅 Joined {new Date(user.member_since).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>
                    {/* Stats Row — compact */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                        {[
                            { v: user.trust_score, l: 'Trust', c: getTrustScoreClass(user.trust_score) },
                            { v: `${user.show_up_rate}%`, l: 'Show-up', c: 'trust-score-high' },
                            { v: user.total_transactions, l: 'Trades', c: '' },
                            { v: avgRating, l: 'Rating', c: '' },
                            { v: user.response_time, l: 'Response', c: '', small: true },
                        ].map((s) => (
                            <div key={s.l} style={{ textAlign: 'center', padding: '8px 4px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                <div style={{ fontWeight: 700, color: s.c ? undefined : 'var(--orange-500)', fontSize: s.small ? '0.72rem' : '0.95rem', fontFamily: 'Outfit, sans-serif' }} className={s.c}>{s.v}</div>
                                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 1 }}>{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Trust QR */}
                <div className="glass-card" style={{ padding: 14, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <TrustScoreRing score={user.trust_score} size={72} />
                    <div style={{ padding: 6, background: 'white', borderRadius: 8, border: '1px solid var(--border-color)', margin: '6px 0', display: 'inline-block' }}>
                        <QRCodeSVG value={qrData} size={64} fgColor="#1A1A1A" bgColor="#FFFFFF" level="M" includeMargin={false} />
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={handleCopy} style={{ fontSize: '0.68rem', padding: '3px 10px', width: '100%' }}>
                        {copied ? '✓ Copied!' : '🔗 Share QR'}
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="filter-chips" style={{ marginBottom: 14 }}>
                {[
                    { key: 'listings', icon: '📦', label: 'Listings', count: userListings.length },
                    { key: 'reviews', icon: '⭐', label: 'Reviews', count: userReviews.length },
                    { key: 'history', icon: '📋', label: 'History', count: userTransactions.length },
                ].map((t) => (
                    <button key={t.key} className={`filter-chip ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
                        {t.icon} {t.label} ({t.count})
                    </button>
                ))}
            </div>

            {/* Listings */}
            {tab === 'listings' && (
                <div className="grid-listings stagger" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
                    {userListings.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1', textAlign: 'center', padding: 30, fontSize: '0.88rem' }}>No listings yet.</p>
                    ) : userListings.map((listing) => (
                        <Link href={`/listing/${listing.id}`} key={listing.id} style={{ textDecoration: 'none' }}>
                            <div className="listing-card">
                                <div className="listing-card-image" style={{ height: 150 }}>
                                    {listing.image_url ? <img src={listing.image_url} alt={listing.title} /> : (CATEGORY_ICONS[listing.category] || '📦')}
                                    <div className="listing-card-badges">
                                        {listing.is_fair_price && <span className="badge badge-fair">✓ Fair</span>}
                                        {listing.demand_level === 'hot' && <span className="badge badge-hot">🔥</span>}
                                    </div>
                                </div>
                                <div className="listing-card-body" style={{ padding: 12 }}>
                                    <div className="listing-card-title" style={{ fontSize: '0.85rem' }}>{listing.title}</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="listing-card-price" style={{ fontSize: '1.1rem' }}>${parseFloat(listing.price).toLocaleString()}</div>
                                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>📍 {listing.location}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Reviews */}
            {tab === 'reviews' && (
                <div className="stagger">
                    {userReviews.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 30, fontSize: '0.88rem' }}>No reviews yet.</p>
                    ) : userReviews.map((review) => (
                        <div key={review.id} className="review-card" style={{ padding: 14 }}>
                            <div className="review-header" style={{ marginBottom: 6 }}>
                                <img src={review.reviewer_avatar} alt="" className="review-avatar" style={{ width: 30, height: 30 }} />
                                <div className="review-meta">
                                    <h4 style={{ fontSize: '0.82rem' }}>{review.reviewer_name}</h4>
                                    <span>{new Date(review.created_at).toLocaleDateString()}</span>
                                </div>
                                <StarRating rating={review.rating} />
                            </div>
                            <p className="review-comment" style={{ fontSize: '0.82rem' }}>{review.comment}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Transaction History */}
            {tab === 'history' && (
                <div className="stagger">
                    {userTransactions.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 30, fontSize: '0.88rem' }}>No transactions yet.</p>
                    ) : userTransactions.map((t) => {
                        const isSeller = t.seller === user.id;
                        return (
                            <div key={t.id} className="glass-card" style={{ padding: 12, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <img src={isSeller ? t.buyer_avatar : t.seller_avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.82rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.listing_title}</div>
                                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{isSeller ? `Sold to ${t.buyer_name}` : `Bought from ${t.seller_name}`}</div>
                                </div>
                                <div style={{ fontWeight: 800, color: isSeller ? 'var(--green)' : 'var(--orange-500)', fontFamily: 'Outfit', fontSize: '0.9rem' }}>
                                    {isSeller ? '+' : '-'}${parseFloat(t.amount).toLocaleString()}
                                </div>
                                <div style={{
                                    padding: '2px 7px', borderRadius: 'var(--radius-full)', fontSize: '0.6rem', fontWeight: 600, textTransform: 'uppercase',
                                    background: t.status === 'completed' ? 'var(--green-bg)' : 'rgba(202,138,4,0.08)',
                                    color: t.status === 'completed' ? 'var(--green)' : 'var(--yellow)',
                                }}>{t.status}</div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
