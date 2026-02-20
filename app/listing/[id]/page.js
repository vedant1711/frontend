'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getListing, getReviews } from '@/lib/api';
import { DUMMY_LISTINGS, DUMMY_REVIEWS, CATEGORY_ICONS } from '@/lib/dummyData';

function getTrustScoreClass(score) {
    if (score >= 85) return 'trust-score-high';
    if (score >= 65) return 'trust-score-medium';
    return 'trust-score-low';
}

function StarRating({ rating }) {
    return <span className="review-stars">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>;
}

export default function ListingDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [listing, setListing] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showBooking, setShowBooking] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [toast, setToast] = useState(null);

    useEffect(() => {
        async function load() {
            const data = await getListing(params.id);
            if (data) {
                setListing(data);
            } else {
                const fallback = DUMMY_LISTINGS.find((l) => l.id === parseInt(params.id));
                setListing(fallback || DUMMY_LISTINGS[0]);
            }
            const revData = await getReviews(`reviewee=${params.id}`);
            setReviews(revData && revData.results ? revData.results : DUMMY_REVIEWS.slice(0, 4));
            setLoading(false);
        }
        load();
    }, [params.id]);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const handleBookDelivery = () => {
        if (!deliveryDate || !deliveryTime) return;
        setBookingConfirmed(true);
        showToast('✅ U-Haul delivery has been booked!');
    };

    if (loading || !listing) {
        return (
            <div className="page-container" style={{ textAlign: 'center', padding: 120 }}>
                <p style={{ color: 'var(--text-muted)' }}>Loading listing...</p>
            </div>
        );
    }

    const conditionLabels = { new: 'Brand New', like_new: 'Like New', good: 'Good', fair: 'Fair', worn: 'Well Worn' };
    const isSublease = listing.category === 'sublease';
    const isHighValue = parseFloat(listing.price) >= 500;

    return (
        <div className="page-container">
            {toast && <div className="toast">{toast}</div>}

            <div style={{ marginBottom: 14 }}>
                <Link href="/marketplace" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>← Back to Marketplace</Link>
            </div>

            <div className="detail-grid fade-in">
                {/* Main */}
                <div className="detail-main">
                    <div className="detail-image">
                        {listing.image_url ? (
                            <img src={listing.image_url} alt={listing.title} />
                        ) : (
                            CATEGORY_ICONS[listing.category] || '📦'
                        )}
                        <div className="detail-badges">
                            {listing.is_fair_price && <span className="badge badge-fair">✓ Fair Price</span>}
                            {listing.demand_level === 'hot' && <span className="badge badge-hot">🔥 Hot</span>}
                            {listing.is_promoted && <span className="badge badge-promoted">⚡ Boosted</span>}
                            {listing.is_bulky && <span className="badge badge-bulky">📦 Bulky</span>}
                        </div>
                    </div>

                    <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6, letterSpacing: -0.5 }}>{listing.title}</h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, flexWrap: 'wrap' }}>
                        <div className="listing-card-price" style={{ fontSize: '2rem' }}>${parseFloat(listing.price).toLocaleString()}</div>
                        {listing.ai_suggested_price_low && (
                            <div style={{ padding: '5px 12px', background: 'var(--green-bg)', borderRadius: 'var(--radius-full)', border: '1px solid rgba(22,163,74,0.15)', fontSize: '0.78rem', color: 'var(--green)', fontWeight: 500 }}>
                                AI Fair Range: ${parseFloat(listing.ai_suggested_price_low).toFixed(0)} — ${parseFloat(listing.ai_suggested_price_high).toFixed(0)}
                            </div>
                        )}
                        {(isSublease || isHighValue) && (
                            <div style={{ padding: '5px 12px', background: 'rgba(37,99,235,0.06)', borderRadius: 'var(--radius-full)', border: '1px solid rgba(37,99,235,0.15)', fontSize: '0.78rem', color: 'var(--blue)', fontWeight: 500 }}>
                                {isSublease ? '$10–$20 transaction fee' : '$5 transaction fee'}
                            </div>
                        )}
                    </div>

                    {/* Detail Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginBottom: 22 }}>
                        <div className="glass-card" style={{ padding: 14, textAlign: 'center' }}>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 3 }}>Condition</div>
                            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{conditionLabels[listing.condition] || listing.condition}</div>
                        </div>
                        <div className="glass-card" style={{ padding: 14, textAlign: 'center' }}>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 3 }}>Category</div>
                            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{CATEGORY_ICONS[listing.category]} {listing.category}</div>
                        </div>
                        <div className="glass-card" style={{ padding: 14, textAlign: 'center' }}>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 3 }}>Views</div>
                            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{listing.views_count}</div>
                        </div>
                        <div className="glass-card" style={{ padding: 14, textAlign: 'center' }}>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 3 }}>Saves</div>
                            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{listing.saves_count}</div>
                        </div>
                    </div>

                    <div style={{ marginBottom: 28 }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>Description</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.92rem' }}>{listing.description}</p>
                    </div>

                    {listing.location && (
                        <div style={{ marginBottom: 28 }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 6 }}>📍 Location</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{listing.location}</p>
                        </div>
                    )}

                    {/* U-Haul Booking — Post-Transaction */}
                    {listing.is_bulky && (
                        <div style={{ marginBottom: 28 }}>
                            <div className="glass-card" style={{ padding: 20, borderColor: 'rgba(242,101,34,0.2)', background: 'var(--bg-warm)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                    <span style={{ fontSize: '1.3rem' }}>🚚</span>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Need help moving?</div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Book a U-Haul pickup directly from Marcus</div>
                                    </div>
                                </div>

                                {!showBooking ? (
                                    <button className="btn btn-primary" onClick={() => setShowBooking(true)} style={{ width: '100%' }}>
                                        🚛 Book U-Haul Delivery →
                                    </button>
                                ) : bookingConfirmed ? (
                                    <div style={{ textAlign: 'center', padding: 12 }}>
                                        <div style={{ fontSize: '1.3rem', marginBottom: 6 }}>✅</div>
                                        <div style={{ fontWeight: 600, marginBottom: 4 }}>Delivery Booked!</div>
                                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                                            Pickup Truck · {deliveryDate} · {deliveryTime} window
                                        </div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
                                            📍 U-Haul University District — 0.8 mi from campus
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, marginBottom: 10 }}>
                                            <div className="glass-card" style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10, background: 'white' }}>
                                                <span style={{ fontSize: '1.3rem' }}>🛻</span>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>8&apos; Pickup Truck</div>
                                                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Perfect for furniture · U-Haul U-District (0.8 mi)</div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontWeight: 800, color: 'var(--orange-500)', fontFamily: 'Outfit', fontSize: '0.95rem' }}>$19.95</div>
                                                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>per hour</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group" style={{ marginBottom: 8 }}>
                                            <label style={{ fontSize: '0.78rem' }}>Delivery Date</label>
                                            <input type="date" className="form-input" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} style={{ fontSize: '0.85rem' }} />
                                        </div>
                                        <div className="form-group" style={{ marginBottom: 10 }}>
                                            <label style={{ fontSize: '0.78rem' }}>Time Window</label>
                                            <select className="form-input" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} style={{ fontSize: '0.85rem' }}>
                                                <option value="">Select time range</option>
                                                <option value="8 AM – 10 AM">8 AM – 10 AM</option>
                                                <option value="10 AM – 12 PM">10 AM – 12 PM</option>
                                                <option value="12 PM – 2 PM">12 PM – 2 PM</option>
                                                <option value="2 PM – 4 PM">2 PM – 4 PM</option>
                                                <option value="4 PM – 6 PM">4 PM – 6 PM</option>
                                            </select>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleBookDelivery}>
                                                Confirm Booking · Est. $29.95
                                            </button>
                                            <button className="btn btn-ghost" onClick={() => setShowBooking(false)}>Cancel</button>
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 6, textAlign: 'center' }}>
                                            Booked through Marcus · No redirect to external sites
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Reviews */}
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 14 }}>Seller Reviews</h3>
                        {reviews.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No reviews yet.</p>
                        ) : (
                            reviews.map((review) => (
                                <div key={review.id} className="review-card">
                                    <div className="review-header">
                                        <img src={review.reviewer_avatar} alt="" className="review-avatar" />
                                        <div className="review-meta">
                                            <h4>{review.reviewer_name}</h4>
                                            <span>{new Date(review.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                    {review.showed_up && (
                                        <div style={{ marginTop: 6, fontSize: '0.72rem', color: 'var(--green)', fontWeight: 500 }}>✓ Showed up on time</div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="detail-sidebar">
                    <div className="seller-card">
                        <div className="seller-header">
                            <img src={listing.seller_avatar} alt="" className="seller-avatar" />
                            <div className="seller-info">
                                <h3>{listing.seller_name} {listing.seller_is_verified && '✅'}</h3>
                                <p>{listing.seller_university || 'University of Washington'}</p>
                            </div>
                        </div>
                        <div className="seller-stats">
                            <div className="seller-stat">
                                <span className={`value ${getTrustScoreClass(listing.seller_trust_score)}`}>{listing.seller_trust_score}</span>
                                <span className="label">Trust</span>
                            </div>
                            <div className="seller-stat">
                                <span className="value" style={{ color: 'var(--green)' }}>{listing.seller_show_up_rate}%</span>
                                <span className="label">Show-up</span>
                            </div>
                            <div className="seller-stat">
                                <span className="value" style={{ color: 'var(--blue)' }}>{listing.seller_is_verified ? '✓' : '—'}</span>
                                <span className="label">Verified</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                        <button className="btn btn-primary btn-lg" style={{ width: '100%' }}>💬 Message Seller</button>
                        <button className="btn btn-secondary" style={{ width: '100%' }}>💾 Save Listing</button>
                        <button className="btn btn-ghost" style={{ width: '100%' }}>🚩 Report</button>
                    </div>

                    <Link href={`/profile/${listing.seller}`} style={{ textDecoration: 'none' }}>
                        <div className="glass-card" style={{ padding: 14, textAlign: 'center', cursor: 'pointer' }}>
                            <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                                View {listing.seller_name}&apos;s full profile & Trust QR →
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
