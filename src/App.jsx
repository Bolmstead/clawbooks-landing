import { useEffect, useRef, useState } from "react";
import "./App.css";

const logoSrc = `${import.meta.env.BASE_URL}clawbooks-logo.png`;
const markSrc = `${import.meta.env.BASE_URL}favicon.svg`;

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const close = () => setMenuOpen(false);
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <div className="logo">
          <img
            className="logo-image logo-image-nav"
            src={logoSrc}
            alt="ClawBooks"
          />
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
        </div>
        <a href="#cta" className="btn-primary nav-cta">
          Get Early Access
        </a>
        <button
          className="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
        >
          <span className={menuOpen ? "bar open" : "bar"} />
          <span className={menuOpen ? "bar open" : "bar"} />
          <span className={menuOpen ? "bar open" : "bar"} />
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#features" onClick={close}>
            Features
          </a>
          <a href="#how-it-works" onClick={close}>
            How It Works
          </a>
          <a href="#cta" className="btn-primary" onClick={close}>
            Get Early Access
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function MockDashboard() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 3), 2000);
    return () => clearInterval(t);
  }, []);
  const steps = ["scanning", "extracting", "ready"];
  const labels = [
    "Scanning inbox…",
    "AI extracting data…",
    "✓ Ready for approval",
  ];
  return (
    <div className="mock-dashboard">
      <div className="mock-header">
        <div className="mock-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="mock-title">ClawBooks Dashboard</span>
      </div>
      <div className="mock-invoice">
        <div className="mock-invoice-row">
          <span className="mock-label">From</span>
          <span className="mock-value">Acme Design Co.</span>
        </div>
        <div className="mock-invoice-row">
          <span className="mock-label">Invoice #</span>
          <span className="mock-value">INV-1042</span>
        </div>
        <div className="mock-invoice-row">
          <span className="mock-label">Amount</span>
          <span className="mock-value accent">$2,450.00</span>
        </div>
        <div className="mock-invoice-row">
          <span className="mock-label">Category</span>
          <span className="mock-value">Web Design Services</span>
        </div>
      </div>
      <div className={`mock-status ${steps[step]}`}>
        <div className="mock-pulse" />
        <span>{labels[step]}</span>
      </div>
      <div className="mock-actions">
        <button className="mock-approve">✓ Approve</button>
        <button className="mock-reject">✕ Reject</button>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" />
      <div className="container hero-inner">
        <div className="hero-text">
          <div className="hero-badge">Powered by OpenClaw AI</div>
          <h1 className="hero-headline">
            Your AI Accountant.
            <br />
            <span className="gradient-text">Zero Busywork.</span>
          </h1>
          <p className="hero-sub">
            ClawBooks watches your inbox, reads every invoice with AI, and posts
            to QuickBooks — you just tap <strong>Approve</strong> on Telegram.
          </p>
          <div className="hero-actions">
            <a href="#cta" className="btn-primary btn-lg">
              Get Early Access →
            </a>
            <a href="#how-it-works" className="btn-ghost btn-lg">
              See How It Works
            </a>
          </div>
          <p className="hero-note">
            Pricing coming soon · Join the waitlist for launch access
          </p>
        </div>
        <div className="hero-visual">
          <MockDashboard />
        </div>
      </div>
    </section>
  );
}

// ─── Logo Bar ────────────────────────────────────────────────────────────────

function LogoBar() {
  const logos = ["QuickBooks", "iCloud Mail", "Gmail", "Telegram", "OpenClaw"];
  return (
    <div className="logo-bar">
      <span className="logo-bar-label">Works with</span>
      <div className="logo-bar-items">
        {logos.map((l) => (
          <span key={l} className="logo-pill">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Features ────────────────────────────────────────────────────────────────

function Features() {
  const [ref, inView] = useInView();
  const features = [
    {
      icon: "📧",
      title: "Email Monitoring",
      desc: "Watches your inbox 24/7 for invoices, bills, and receipts. iCloud, Gmail, or any IMAP account.",
    },
    {
      icon: "🤖",
      title: "AI Extraction",
      desc: "Reads every invoice and extracts vendor, amount, line items, and due dates automatically.",
    },
    {
      icon: "✅",
      title: "Human Approval",
      desc: "Get a Telegram message before anything posts. Review and approve or reject in seconds. You stay in control.",
    },
    {
      icon: "📊",
      title: "QuickBooks Sync",
      desc: "Approved transactions post directly to your QB account with full audit log and idempotency protection.",
    },
  ];
  return (
    <section className="section" id="features" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in ${inView ? "visible" : ""}`}>
          <div className="section-tag">Features</div>
          <h2>Everything your accountant does, automated</h2>
          <p className="section-sub">
            From inbox to QuickBooks in seconds, with you approving every step.
          </p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`feature-card fade-in ${inView ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ────────────────────────────────────────────────────────────

function HowItWorks() {
  const [ref, inView] = useInView();
  const steps = [
    {
      n: "01",
      title: "Invoice arrives in your email",
      desc: "ClawBooks monitors your connected inbox and detects new invoices automatically.",
    },
    {
      n: "02",
      title: "AI reads and proposes a transaction",
      desc: "Our AI extracts all fields and builds a QuickBooks transaction with confidence scoring.",
    },
    {
      n: "03",
      title: "You approve on Telegram in seconds",
      desc: "Tap Approve and it posts instantly. Tap Reject and it's discarded. Full audit trail either way.",
    },
  ];
  return (
    <section className="section section-dark" id="how-it-works" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in ${inView ? "visible" : ""}`}>
          <div className="section-tag">How It Works</div>
          <h2>Three steps. That's it.</h2>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`step fade-in ${inView ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="step-num">{s.n}</div>
              <div className="step-content">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              {i < steps.length - 1 && <div className="step-connector" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Telegram Mockup ─────────────────────────────────────────────────────────

function TelegramMockup() {
  const [ref, inView] = useInView();
  const [approved, setApproved] = useState(null);
  return (
    <section className="section" ref={ref}>
      <div className="container mockup-section">
        <div className={`mockup-text fade-in ${inView ? "visible" : ""}`}>
          <div className="section-tag">Approval Flow</div>
          <h2>Approve invoices right from Telegram</h2>
          <p>
            No dashboards to log into. No emails to reply to. Just a tap, and
            it's done.
          </p>
          <ul className="mockup-list">
            <li>✓ Instant notification on every new invoice</li>
            <li>✓ Full invoice details in the message</li>
            <li>✓ One-tap approve or reject</li>
            <li>✓ Confirmation when posted to QuickBooks</li>
          </ul>
        </div>
        <div
          className={`phone-wrap fade-in ${inView ? "visible" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          <div className="phone">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="tg-header">
                <div className="tg-avatar">
                  <img src={markSrc} alt="ClawBooks logo mark" />
                </div>
                <div>
                  <div className="tg-name">ClawBooks</div>
                  <div className="tg-status">bot</div>
                </div>
              </div>
              <div className="tg-messages">
                <div className="tg-msg">
                  <div className="tg-msg-title">📄 New Invoice Detected</div>
                  <div className="tg-msg-row">
                    <span>From</span>
                    <strong>Acme Design Co.</strong>
                  </div>
                  <div className="tg-msg-row">
                    <span>Amount</span>
                    <strong className="accent">$2,450.00</strong>
                  </div>
                  <div className="tg-msg-row">
                    <span>Category</span>
                    <strong>Web Design</strong>
                  </div>
                  <div className="tg-msg-row">
                    <span>Due</span>
                    <strong>Mar 1, 2026</strong>
                  </div>
                  {approved === null && (
                    <div className="tg-btns">
                      <button
                        className="tg-approve"
                        onClick={() => setApproved(true)}
                      >
                        ✓ Approve
                      </button>
                      <button
                        className="tg-reject"
                        onClick={() => setApproved(false)}
                      >
                        ✕ Reject
                      </button>
                    </div>
                  )}
                  {approved === true && (
                    <div className="tg-confirmed">✅ Posted to QuickBooks!</div>
                  )}
                  {approved === false && (
                    <div className="tg-rejected">❌ Invoice rejected</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTA() {
  const [ref, inView] = useInView();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="section cta-section" id="cta" ref={ref}>
      <div className="cta-glow" />
      <div className={`container cta-inner fade-in ${inView ? "visible" : ""}`}>
        <h2>Start automating your books today</h2>
        <p>Join the waitlist. Be first when we launch.</p>
        {!submitted ? (
          <form
            className="cta-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">
              Get Early Access →
            </button>
          </form>
        ) : (
          <div className="cta-thanks">
            🎉 You're on the list! We'll be in touch soon.
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-logo">
          <img
            className="logo-image logo-image-footer"
            src={logoSrc}
            alt="ClawBooks"
          />
          <span className="footer-tagline">AI accounting for modern teams</span>
        </div>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="https://openclaw.ai">Built on OpenClaw</a>
        </div>
        <div className="footer-copy">
          © 2026 ClawBooks. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoBar />
      <Features />
      <HowItWorks />
      <TelegramMockup />
      <CTA />
      <Footer />
    </>
  );
}
