'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getListings } from '@/lib/api';
import { DUMMY_LISTINGS, CATEGORY_ICONS, CATEGORY_LABELS } from '@/lib/dummyData';

function getTrustScoreClass(score) {
    if (score >= 85) return 'trust-score-high';
    if (score >= 65) return 'trust-score-medium';
    return 'trust-score-low';
}

function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return `${Math.floor(days / 30)}mo ago`;
}

export default function MarketplacePage() {
    const [listings, setListings] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await getListings();
            if (data && data.results) {
                setListings(data.results);
            } else {
                setListings(DUMMY_LISTINGS);
            }
            setLoading(false);
        }
        load();
    }, []);

    const filteredListings = listings.filter((l) => {
        const matchesSearch =
            !search ||
            l.title.toLowerCase().includes(search.toLowerCase()) ||
            l.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'all' || l.category === category;
        return matchesSearch && matchesCategory;
    });

    const categories = ['all', ...Object.keys(CATEGORY_LABELS)];

    return (
        <div className="page-container">
            <div className="section-header fade-in">
                <h1>Marketplace</h1>
                <p style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }}></span>
                    {listings.length} verified listings from trusted students
                </p>
            </div>

            {/* Search */}
            <div className="search-bar fade-in">
                <div className="search-input-wrapper">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search furniture, textbooks, electronics..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Category Filters */}
            <div className="filter-chips fade-in" style={{ marginBottom: 24 }}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`filter-chip ${category === cat ? 'active' : ''}`}
                        onClick={() => setCategory(cat)}
                    >
                        {cat === 'all' ? '🏷️ All' : `${CATEGORY_ICONS[cat] || '📦'} ${CATEGORY_LABELS[cat] || cat}`}
                    </button>
                ))}
            </div>

            {/* Listings Grid */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
                    Loading marketplace...
                </div>
            ) : filteredListings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
                    No listings match your search. Try a different keyword or category.
                </div>
            ) : (
                <div className="grid-listings stagger">
                    {filteredListings.map((listing) => (
                        <Link href={`/listing/${listing.id}`} key={listing.id} style={{ textDecoration: 'none' }}>
                            <div className="listing-card">
                                <div className="listing-card-image">
                                    {listing.image_url ? (
                                        <img src={listing.image_url} alt={listing.title} />
                                    ) : (
                                        CATEGORY_ICONS[listing.category] || '📦'
                                    )}
                                    <div className="listing-card-badges">
                                        {listing.is_fair_price && (
                                            <span className="badge badge-fair">✓ Fair Price</span>
                                        )}
                                        {listing.demand_level === 'hot' && (
                                            <span className="badge badge-hot">🔥 Hot</span>
                                        )}
                                        {listing.demand_level === 'warm' && (
                                            <span className="badge badge-warm">🌡️ Warm</span>
                                        )}
                                        {listing.is_promoted && (
                                            <span className="badge badge-promoted">⚡ Boosted</span>
                                        )}
                                    </div>
                                </div>
                                <div className="listing-card-body">
                                    <div className="listing-card-title">{listing.title}</div>
                                    <div className="listing-card-price">${parseFloat(listing.price).toLocaleString()}</div>
                                    {listing.ai_suggested_price_low && (
                                        <div style={{ fontSize: '0.72rem', color: 'var(--green)', marginBottom: 6, fontWeight: 500 }}>
                                            AI Range: ${parseFloat(listing.ai_suggested_price_low).toFixed(0)} – ${parseFloat(listing.ai_suggested_price_high).toFixed(0)}
                                        </div>
                                    )}
                                    <div className="listing-card-meta">
                                        <div className="listing-card-seller">
                                            <img src={listing.seller_avatar} alt="" />
                                            <span>{listing.seller_name}</span>
                                            {listing.seller_is_verified && <span title="Verified">✅</span>}
                                            <span className={`trust-score ${getTrustScoreClass(listing.seller_trust_score)}`}>
                                                {listing.seller_trust_score}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 6, display: 'flex', justifyContent: 'space-between' }}>
                                        <span>📍 {listing.location}</span>
                                        <span>{timeAgo(listing.created_at)}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
