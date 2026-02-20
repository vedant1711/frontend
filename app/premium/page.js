'use client';

import { useState } from 'react';

export default function PremiumPage() {
    const [boostedListing, setBoostedListing] = useState(null);
    const [showBoostSuccess, setShowBoostSuccess] = useState(false);

    const handleBoost = () => {
        setShowBoostSuccess(true);
        setTimeout(() => setShowBoostSuccess(false), 3000);
    };

    return (
        <div className="page-container">
            <div className="section-header fade-in" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 36px' }}>
                <h1>Boost & Pro</h1>
                <p>Simple pricing to help you sell faster and buy smarter. No bloated subscriptions.</p>
            </div>

            {/* Two Plans */}
            <div className="pricing-grid stagger" style={{ marginBottom: 40 }}>
                {/* Boost */}
                <div className="pricing-card">
                    <div className="pricing-name">⚡ Boost a Listing</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 14 }}>
                        Push your listing to the top of the feed for 7 days. More views, faster sales.
                    </p>
                    <div className="pricing-price">
                        $1 — $3
                        <span> per listing</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16 }}>One-time fee · No recurring charges</div>

                    <ul className="pricing-features">
                        <li>Listing pinned to top of marketplace feed</li>
                        <li>Highlighted with ⚡ Boosted badge</li>
                        <li>3–5× more views on average</li>
                        <li>Featured in &quot;Hot Listings&quot; section</li>
                        <li>Boost active for 7 days</li>
                    </ul>

                    <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handleBoost}>
                        Boost a Listing · From $1
                    </button>
                    {showBoostSuccess && (
                        <div style={{ marginTop: 10, padding: '8px 14px', background: 'var(--green-bg)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(22,163,74,0.15)', fontSize: '0.82rem', color: 'var(--green)', textAlign: 'center', fontWeight: 500 }}>
                            ✅ Listing boosted! It&apos;ll appear at the top of the feed now.
                        </div>
                    )}
                </div>

                {/* Pro Seller */}
                <div className="pricing-card featured">
                    <div className="pricing-badge">Best Value</div>
                    <div className="pricing-name">🔓 Pro Seller</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 14 }}>
                        For active sellers who post regularly, and buyers who want first access.
                    </p>
                    <div className="pricing-price">
                        $2
                        <span> / week</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16 }}>Cancel anytime · Billed weekly</div>

                    <ul className="pricing-features">
                        <li>More than 2 active listings per week as a seller</li>
                        <li>Instant access to new listings as a buyer</li>
                        <li>Priority in search results</li>
                        <li>Pro seller badge on your profile</li>
                        <li>Early access to move-out season bundles</li>
                    </ul>

                    <button className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                        Start Pro · $2/week
                    </button>
                </div>
            </div>

            {/* Transaction Fee Info */}
            <div className="glass-card fade-in" style={{ padding: 24, maxWidth: 800, margin: '0 auto 32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(37,99,235,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>🏠</div>
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>Transaction Fee on High-Value Items</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 10 }}>
                            A small fee of <strong style={{ color: 'var(--orange-500)' }}>$5 — $20</strong> applies on high-value transactions
                            like subleases, large electronics, and premium furniture. This covers trust verification, dispute
                            mediation, and payment protection.
                        </p>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <div style={{ padding: '6px 12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                                Subleases: $10–$20
                            </div>
                            <div style={{ padding: '6px 12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                                Items $500+: $5
                            </div>
                            <div style={{ padding: '6px 12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                                Items under $500: Free
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div style={{ maxWidth: 660, margin: '0 auto' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, textAlign: 'center', marginBottom: 20 }}>
                    Frequently Asked Questions
                </h3>
                {[
                    {
                        q: 'How many listings can I post for free?',
                        a: 'All users can post up to 2 active listings per week for free. Need more? Go Pro for $2/week.',
                    },
                    {
                        q: 'Can I cancel Pro anytime?',
                        a: 'Yes! Cancel anytime with no penalties. Your plan stays active until the end of the billing week.',
                    },
                    {
                        q: 'Do boosts actually work?',
                        a: 'Boosted listings get 3–5× more views and appear at the top of marketplace results with a highlighted badge.',
                    },
                    {
                        q: 'Why is there a fee on subleases?',
                        a: 'Subleases are high-value transactions where trust is critical. The fee covers trust verification, dispute mediation, and payment protection — it\'s worth it for both parties.',
                    },
                ].map((faq) => (
                    <div key={faq.q} className="glass-card" style={{ padding: 18, marginBottom: 10 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 6 }}>{faq.q}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{faq.a}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
