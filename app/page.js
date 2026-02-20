'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* Hero + Signup Section */}
      <section className="hero" style={{ paddingTop: 80 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 16px',
          background: 'var(--bg-warm)',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.82rem',
          fontWeight: 500,
          color: 'var(--orange-600)',
          marginBottom: 20,
          border: '1px solid rgba(242,101,34,0.12)',
        }}>
          🎓 Trusted by 60,000+ students across 12 campuses
        </div>

        <h1>
          Your Campus,
          <br />
          Your <span className="highlight">Market</span>
        </h1>
        <p>
          Buy, sell, and sublease with .edu-verified trust. Fair prices powered by AI.
          A portable reputation that follows you everywhere.
        </p>

        {/* Quick Signup — Above fold */}
        {!submitted ? (
          <div className="glass-card" style={{
            padding: 24,
            maxWidth: 480,
            margin: '0 auto 20px',
            textAlign: 'left',
          }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 12 }}>
              Join Marcus — it takes 30 seconds
            </div>
            <div className="form-group" style={{ marginBottom: 10 }}>
              <select
                className="form-input"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                style={{ fontSize: '0.85rem' }}
              >
                <option value="">Select your university</option>
                <option value="UW">University of Washington</option>
                <option value="Stanford">Stanford University</option>
                <option value="MIT">MIT</option>
                <option value="UCLA">UCLA</option>
                <option value="NYU">New York University</option>
                <option value="UT">UT Austin</option>
                <option value="UMich">University of Michigan</option>
                <option value="GaTech">Georgia Tech</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                className="form-input"
                placeholder="your.name@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, fontSize: '0.85rem' }}
              />
              <button
                className="btn btn-primary"
                onClick={() => { if (email && university) setSubmitted(true); }}
                style={{ flexShrink: 0 }}
              >
                Get Started →
              </button>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 6 }}>
              Only .edu emails accepted · Free to join · Cancel anytime
            </div>
          </div>
        ) : (
          <div className="glass-card" style={{
            padding: 24,
            maxWidth: 480,
            margin: '0 auto 20px',
            textAlign: 'center',
            borderColor: 'var(--green)',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>✅</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Check your inbox!</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Verification link sent to <strong style={{ color: 'var(--orange-500)' }}>{email}</strong>
            </p>
            <Link href="/marketplace" className="btn btn-primary" style={{ marginTop: 12 }}>
              Browse Marketplace →
            </Link>
          </div>
        )}

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">60K+</span>
            <span className="hero-stat-label">Verified Students</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">$18M</span>
            <span className="hero-stat-label">GMV Year 1</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">88%</span>
            <span className="hero-stat-label">Would Use Marcus</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">0%</span>
            <span className="hero-stat-label">Fraud Rate</span>
          </div>
        </div>
      </section>

      {/* Visual Assets Banner */}
      <section style={{
        maxWidth: 1200,
        margin: '20px auto 0',
        padding: '0 24px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'relative', paddingTop: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=400&fit=crop" alt="Students studying" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--orange-600)' }}>📚 Textbooks</div>
          </div>
          <div style={{ position: 'relative', paddingTop: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop" alt="Furniture" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--orange-600)' }}>🪑 Furniture</div>
          </div>
          <div style={{ position: 'relative', paddingTop: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop" alt="Electronics" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--orange-600)' }}>💻 Electronics</div>
          </div>
          <div style={{ position: 'relative', paddingTop: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=400&fit=crop" alt="Subleases" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--orange-600)' }}>🏠 Subleases</div>
          </div>
        </div>
      </section>

      {/* How Marcus Works */}
      <section style={{ maxWidth: 1200, margin: '56px auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: -1 }}>How Marcus works</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Three steps to trusted campus trading</p>
        </div>
        <div className="features-grid stagger" style={{ padding: 0 }}>
          <div className="feature-card" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: -12, right: 16, width: 28, height: 28, borderRadius: '50%', background: 'var(--orange-500)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>1</div>
            <div className="feature-icon">🎓</div>
            <h3>Verify your .edu</h3>
            <p>Sign up with your university email. Instant verification builds your starting TrustScore and unlocks the marketplace.</p>
          </div>
          <div className="feature-card" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: -12, right: 16, width: 28, height: 28, borderRadius: '50%', background: 'var(--orange-500)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>2</div>
            <div className="feature-icon">🤖</div>
            <h3>Set a fair price</h3>
            <p>Our AI analyzes your item and campus demand to suggest transparent, fair pricing. No guessing, no overpaying.</p>
          </div>
          <div className="feature-card" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: -12, right: 16, width: 28, height: 28, borderRadius: '50%', background: 'var(--orange-500)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>3</div>
            <div className="feature-icon">🤝</div>
            <h3>Trade with trust</h3>
            <p>Meet up, complete the deal, and build your portable Trust QR. Your reputation follows you across platforms.</p>
          </div>
        </div>
      </section>

      {/* Trust Architecture */}
      <section style={{ maxWidth: 1200, margin: '0 auto 56px', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}>
          <div className="glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              background: 'var(--green-bg)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'var(--green)',
              marginBottom: 14,
              width: 'fit-content',
            }}>
              ✓ Our Innovation
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: -0.5, marginBottom: 10 }}>
              Trust QR — Your Portable Campus Reputation
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16, fontSize: '0.9rem' }}>
              No other campus marketplace has portable reputation. Your Trust QR works
              everywhere — paste it in group chats, text it to a buyer, tape it to a flyer.
              Scan to see verified student status, TrustScore, show-up rate, and reviews.
            </p>
            <Link href="/trust-qr" className="btn btn-primary" style={{ width: 'fit-content' }}>
              See how it works →
            </Link>
          </div>
          <div style={{
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=440&fit=crop"
              alt="Students collaborating on campus"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              right: 16,
              background: 'rgba(255,255,255,0.93)',
              backdropFilter: 'blur(12px)',
              borderRadius: 'var(--radius-md)',
              padding: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--orange-500), var(--orange-400))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.9rem',
              }}>95</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>Marcus Wright · Trust QR</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>100% show-up · 47 transactions · &lt;15 min response</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ maxWidth: 1200, margin: '0 auto 56px', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: -0.5 }}>Why students switch to Marcus</h2>
        </div>
        <div className="features-grid stagger" style={{ padding: 0 }}>
          <div className="glass-card" style={{ padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--orange-500)', marginBottom: 6, fontFamily: 'Outfit, sans-serif' }}>62%</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>of FB Marketplace users encountered scams or no-shows</p>
          </div>
          <div className="glass-card" style={{ padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--orange-500)', marginBottom: 6, fontFamily: 'Outfit, sans-serif' }}>71%</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>of students had at least one negative resale experience</p>
          </div>
          <div className="glass-card" style={{ padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--orange-500)', marginBottom: 6, fontFamily: 'Outfit, sans-serif' }}>65%</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>call Trust QR a &quot;game-changer&quot; for campus resale</p>
          </div>
          <div className="glass-card" style={{ padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--orange-500)', marginBottom: 6, fontFamily: 'Outfit, sans-serif' }}>$2.7B</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>lost to social media scams since 2021 (FTC data)</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '48px 24px 64px', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: -1, marginBottom: 10 }}>
          Ready to trade with trust?
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 20, fontSize: '1rem' }}>
          Join thousands of verified students on Marcus.
        </p>
        <Link href="/auth" className="btn btn-primary btn-lg">
          🎓 Sign Up with .edu Email
        </Link>
      </section>
    </>
  );
}
