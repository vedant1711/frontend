'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AuthPage() {
    const [mode, setMode] = useState('signup');
    const [email, setEmail] = useState('');
    const [university, setUniversity] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="auth-container">
                <div className="auth-card fade-in" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✅</div>
                    <h2>Check your inbox!</h2>
                    <p>
                        We&apos;ve sent a verification link to <strong style={{ color: 'var(--orange-500)' }}>{email}</strong>
                    </p>
                    <div className="glass-card" style={{ padding: 14, marginTop: 16, marginBottom: 18, textAlign: 'left', background: 'var(--bg-secondary)' }}>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            <div style={{ marginBottom: 6 }}>🛡️ <strong>TrustScore</strong> starts at 50 — grows with every verified transaction</div>
                            <div style={{ marginBottom: 6 }}>🔲 <strong>Trust QR</strong> generated instantly in your profile</div>
                            <div>📦 <strong>2 free listings</strong> per week included</div>
                        </div>
                    </div>
                    <Link href="/marketplace" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                        Browse Marketplace →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card fade-in">
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{
                        width: 52, height: 52,
                        background: 'linear-gradient(135deg, var(--orange-500), var(--orange-400))',
                        borderRadius: 14,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        color: 'white',
                        marginBottom: 12,
                        boxShadow: 'var(--shadow-glow)',
                        fontWeight: 800,
                        fontFamily: 'Outfit, sans-serif',
                    }}>
                        M
                    </div>
                    <h2>{mode === 'signup' ? 'Join Marcus' : 'Welcome Back'}</h2>
                    <p style={{ fontSize: '0.88rem' }}>{mode === 'signup' ? 'Sign up with your .edu email to get verified' : 'Log in to your verified account'}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {mode === 'signup' && (
                        <div className="form-group">
                            <label>University</label>
                            <select className="form-input" value={university} onChange={(e) => setUniversity(e.target.value)} required>
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
                    )}

                    {mode === 'signup' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" className="form-input" placeholder="Alex" />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" className="form-input" placeholder="Chen" />
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label>University Email (.edu)</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="yourname@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-input" placeholder={mode === 'signup' ? 'Create a strong password' : 'Enter your password'} />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 6 }}>
                        {mode === 'signup' ? 'Verify & Create Account →' : 'Log In →'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.83rem' }}>
                    {mode === 'signup' ? (
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Already have an account?{' '}
                            <button onClick={() => setMode('login')} style={{ background: 'none', border: 'none', color: 'var(--orange-500)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>Log in</button>
                        </p>
                    ) : (
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Don&apos;t have an account?{' '}
                            <button onClick={() => setMode('signup')} style={{ background: 'none', border: 'none', color: 'var(--orange-500)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>Sign up</button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
