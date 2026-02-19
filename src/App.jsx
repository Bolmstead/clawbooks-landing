import { useEffect, useRef, useState } from "react";
import "./App.css";

const logoSrc = `${import.meta.env.BASE_URL}logo.png`;
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
        <a href="#" className="logo" aria-label="ClawBooks home">
          <img className="logo-image logo-image-nav" src={logoSrc} alt="" />
          <span className="app-title">ClawBooks</span>
        </a>
        <div className="nav-links">
          <a href="#who-its-for">Who It's For</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#interfaces">Interfaces</a>
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
          <a href="#who-its-for" onClick={close}>Who It's For</a>
          <a href="#features" onClick={close}>Features</a>
          <a href="#how-it-works" onClick={close}>How It Works</a>
          <a href="#interfaces" onClick={close}>Interfaces</a>
          <a href="#cta" className="btn-primary" onClick={close}>Get Early Access</a>
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
  const labels = ["Scanning inbox…", "AI extracting data…", "✓ Ready for approval"];
  return (
    <div className="mock-dashboard">
      <div className="mock-header">
        <div className="mock-dots">
          <span /><span /><span />
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
          <span className="mock-label">Received via</span>
          <span className="mock-value">📧 Email</span>
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
            ClawBooks helps bookkeepers and accountants move faster in
            QuickBooks by turning incoming bills into ready-to-review work,
            catching costly issues early, and keeping approvals in your hands.
          </p>
          <div className="hero-actions">
            <a href="#cta" className="btn-primary btn-lg">Get Early Access →</a>
            <a href="#how-it-works" className="btn-ghost btn-lg">See How It Works</a>
          </div>
          <p className="hero-note">
            Built for faster close, cleaner books, and less manual follow-up
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
  const logos = [
    "QuickBooks Online",
    "Gmail",
    "Telegram",
    "Chrome Extension",
    "Dashboard",
    "OpenClaw AI",
  ];
  return (
    <div className="logo-bar">
      <span className="logo-bar-label">Works with</span>
      <div className="logo-bar-items">
        {logos.map((l) => (
          <span key={l} className="logo-pill">{l}</span>
        ))}
      </div>
    </div>
  );
}

function WhoItsFor() {
  const [ref, inView] = useInView();
  const audience = [
    "Bookkeepers and accountants using QuickBooks Online",
    "Small firms managing recurring vendor bills",
    "Finance teams that need faster close with auditability",
  ];
  const problems = [
    "Too much manual invoice review and coding",
    "Duplicate bills slipping through",
    "Slow approve/reject loops",
    "Missing follow-up on overdue payables",
    "No consistent workflow for report requests and client response drafts",
  ];
  return (
    <section className="section" id="who-its-for" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in ${inView ? "visible" : ""}`}>
          <div className="section-tag">Who It&apos;s For</div>
          <h2>Built for bookkeeping teams that need speed and control</h2>
        </div>
        <div className={`info-grid-two fade-in ${inView ? "visible" : ""}`}>
          <div className="feature-card">
            <h3>Teams that benefit most</h3>
            <ul className="bullet-list">
              {audience.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="feature-card">
            <h3>Core problems solved</h3>
            <ul className="bullet-list">
              {problems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ────────────────────────────────────────────────────────────────

function Features() {
  const [ref, inView] = useInView();
  const features = [
    {
      icon: "📥",
      title: "Invoice intake",
      desc: "Bring in bills from your inbox, uploads, and connected workflows so work lands in one place.",
    },
    {
      icon: "🗂️",
      title: "Smart categorization",
      desc: "Get draft coding suggestions for vendors and accounts that improve as you approve more work.",
    },
    {
      icon: "🧾",
      title: "Ready-to-review proposals",
      desc: "ClawBooks prepares clean, reviewable entries so you can focus on judgment instead of data entry.",
    },
    {
      icon: "♻️",
      title: "Recurring bill automation",
      desc: "Recognizes repeat vendor bills and can automate low-risk work under your rules.",
    },
    {
      icon: "🛡️",
      title: "Duplicate and anomaly alerts",
      desc: "Spot potential duplicates and unusual amounts before they get posted.",
    },
    {
      icon: "✅",
      title: "Approvals and audit trail",
      desc: "Approve or reject from dashboard, Telegram, or extension, with clear status history for every decision.",
    },
  ];
  return (
    <section className="section" id="features" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in ${inView ? "visible" : ""}`}>
          <div className="section-tag">Features</div>
          <h2>Everything you need to run AP with confidence</h2>
          <p className="section-sub">
            Less manual work, faster decisions, and more control over what gets posted.
          </p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`feature-card fade-in ${inView ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
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
      title: "Bills come in from email and uploads",
      desc: "ClawBooks pulls incoming vendor bills into one organized queue.",
    },
    {
      n: "02",
      title: "AI prepares draft entries",
      desc: "You get suggested entries with key details already filled in and ready to review.",
    },
    {
      n: "03",
      title: "You approve where you work",
      desc: "Review in QuickBooks, Telegram, or the dashboard and approve or reject in seconds.",
    },
    {
      n: "04",
      title: "Posted and tracked automatically",
      desc: "Approved items are synced and tracked with a clear history, so close is faster and cleaner.",
    },
  ];
  return (
    <section className="section section-dark" id="how-it-works" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in ${inView ? "visible" : ""}`}>
          <div className="section-tag">How It Works</div>
          <h2>Four steps. Control at every stage.</h2>
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
          <div className="section-tag">Telegram Workflow</div>
          <h2>Approval and digest workflows in Telegram</h2>
          <p>
            Stay on top of approvals without living in another dashboard.
            Telegram keeps you moving with quick decision prompts and reminders.
          </p>
          <ul className="mockup-list">
            <li>✓ Instant approve or reject prompts</li>
            <li>✓ Daily reminders for overdue follow-up</li>
            <li>✓ Weekly summary notifications</li>
            <li>✓ Clear status confirmations after decisions</li>
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
                  <div className="tg-msg-title">📋 Pending QuickBooks approval</div>
                  <div className="tg-msg-row">
                    <span>Received via</span>
                    <strong>📧 Email</strong>
                  </div>
                  <div className="tg-msg-row">
                    <span>From</span>
                    <strong>billing@acme.com</strong>
                  </div>
                  <div className="tg-msg-row">
                    <span>Subject</span>
                    <strong>Invoice INV-1042</strong>
                  </div>
                  <div className="tg-msg-row">
                    <span>Amount</span>
                    <strong className="accent">$2,450.00</strong>
                  </div>
                  <div className="tg-msg-row">
                    <span>Due</span>
                    <strong>March 1, 2026</strong>
                  </div>
                  {approved === null && (
                    <div className="tg-btns">
                      <button className="tg-approve" onClick={() => setApproved(true)}>✅</button>
                      <button className="tg-reject" onClick={() => setApproved(false)}>❌</button>
                    </div>
                  )}
                  {approved === true && (
                    <div className="tg-confirmed">✅ Approved and posted to QuickBooks!</div>
                  )}
                  {approved === false && (
                    <div className="tg-rejected">❌ Proposal rejected.</div>
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

// ─── Chrome Extension Section ────────────────────────────────────────────────

function ExtensionMockup() {
  const [ref, inView] = useInView();
  const [activeTab, setActiveTab] = useState("pending");
  const proposals = [
    { vendor: "Acme Design Co.", amount: "$2,450.00", via: "📧 Email", status: "pending" },
    { vendor: "Adobe Inc.", amount: "$54.99", via: "📧 Email", status: "pending" },
    { vendor: "Figma", amount: "$45.00", via: "📧 Email", status: "pending" },
  ];
  return (
    <section className="section section-dark" id="interfaces" ref={ref}>
      <div className="container mockup-section mockup-section-reverse">
        <div
          className={`extension-wrap fade-in ${inView ? "visible" : ""}`}
        >
          <div className="browser-chrome">
            <div className="browser-bar">
              <div className="browser-dots">
                <span /><span /><span />
              </div>
              <div className="browser-url">app.qbo.intuit.com/app/bills</div>
              <div className="browser-ext-badge">🧩 ClawBooks</div>
            </div>
            <div className="browser-content">
              <div className="qb-sidebar-mock">
                <div className="qb-page-bg">
                  <div className="qb-placeholder-line" />
                  <div className="qb-placeholder-line short" />
                  <div className="qb-placeholder-line" />
                  <div className="qb-placeholder-line short" />
                </div>
                <div className="claw-sidebar">
                  <div className="sidebar-header">
                    <img src={markSrc} alt="" className="sidebar-logo" />
                    <span className="sidebar-title">ClawBooks</span>
                    <span className="sidebar-badge">{proposals.length}</span>
                  </div>
                  <div className="sidebar-tabs">
                    <button
                      className={activeTab === "pending" ? "stab active" : "stab"}
                      onClick={() => setActiveTab("pending")}
                    >
                      Pending
                    </button>
                    <button
                      className={activeTab === "history" ? "stab active" : "stab"}
                      onClick={() => setActiveTab("history")}
                    >
                      History
                    </button>
                  </div>
                  {activeTab === "pending" && (
                    <div className="sidebar-proposals">
                      {proposals.map((p, i) => (
                        <div key={i} className="sidebar-proposal">
                          <div className="sp-vendor">{p.vendor}</div>
                          <div className="sp-meta">
                            <span className="sp-amount">{p.amount}</span>
                            <span className="sp-via">{p.via}</span>
                          </div>
                          <div className="sp-actions">
                            <button className="sp-approve">✓ Approve</button>
                            <button className="sp-reject">✕</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === "history" && (
                    <div className="sidebar-proposals">
                      <div className="sidebar-proposal approved-row">
                        <div className="sp-vendor">Notion</div>
                        <div className="sp-meta">
                          <span className="sp-amount">$16.00</span>
                          <span className="sp-approved-label">✅ Approved</span>
                        </div>
                      </div>
                      <div className="sidebar-proposal rejected-row">
                        <div className="sp-vendor">Unknown Vendor</div>
                        <div className="sp-meta">
                          <span className="sp-amount">$999.00</span>
                          <span className="sp-rejected-label">❌ Rejected</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`mockup-text fade-in ${inView ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
          <div className="section-tag">Interfaces</div>
          <h2>Works inside QuickBooks and outside it</h2>
          <p>
            Your team can work from the ClawBooks dashboard, QuickBooks extension,
            or Telegram without losing context.
          </p>
          <ul className="mockup-list">
            <li>✓ Dashboard for queue, status, and review</li>
            <li>✓ QuickBooks extension for inline approvals</li>
            <li>✓ Telegram for rapid decision-making</li>
            <li>✓ Proposal history and attachment access</li>
          </ul>
          <a
            href="#cta"
            className="btn-primary"
            style={{ display: "inline-block", marginTop: "1.5rem" }}
          >
            Get the Extension →
          </a>
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
          <a href="#" className="footer-logo-link" aria-label="ClawBooks home">
            <img className="logo-image logo-image-footer" src={logoSrc} alt="" />
            <span className="app-title">ClawBooks</span>
          </a>
          <span className="footer-tagline">AI accounting for modern teams</span>
        </div>
        <div className="footer-links">
          <a href="#who-its-for">Who It's For</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#interfaces">Interfaces</a>
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
      <WhoItsFor />
      <Features />
      <HowItWorks />
      <TelegramMockup />
      <ExtensionMockup />
      <CTA />
      <Footer />
    </>
  );
}
