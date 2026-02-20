import './globals.css';
import ChatBot from '@/components/ChatBot';

export const metadata = {
  title: 'Marcus — Market for Campus',
  description: 'Buy, sell, and sublease with confidence on campus. .edu-verified trust, AI pricing, and portable Trust QR.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Animated Bubble Background */}
        <div className="bubble-container">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>

        {/* Navigation */}
        <nav className="navbar">
          <div className="navbar-inner">
            <a href="/" className="navbar-logo">
              <img src="/marcus-logo-nobg.png" alt="Marcus" className="navbar-logo-icon" style={{ width: 32, height: 32, objectFit: 'contain' }} />
              <span>Marcus</span>
            </a>
            <ul className="navbar-links">
              <li><a href="/marketplace">Marketplace</a></li>
              <li><a href="/trust-qr">Trust</a></li>
              <li><a href="/premium">Boost</a></li>
            </ul>
            <div className="navbar-cta">
              <a href="/auth" className="btn btn-primary btn-sm" style={{ fontSize: '0.8rem', padding: '7px 16px' }}>
                Get Started
              </a>
              <a href="/profile/1" title="My Profile">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  alt="Profile"
                  className="navbar-avatar"
                />
              </a>
            </div>
          </div>
        </nav>

        {children}

        {/* Footer */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-links">
              <a href="/marketplace">Marketplace</a>
              <a href="/trust-qr">Trust</a>
              <a href="/premium">Boost</a>
              <a href="#">About</a>
              <a href="#">Terms</a>
            </div>
            <p style={{ marginTop: 8 }}>© 2026 Marcus — Market for Campus. All rights reserved.</p>
          </div>
        </footer>

        <ChatBot />
      </body>
    </html>
  );
}
