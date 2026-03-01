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
          <a href="#features">What It Does</a>
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
          <a href="#features" onClick={close}>What It Does</a>
          <a href="#how-it-works" onClick={close}>How It Works</a>
          <a href="#interfaces" onClick={close}>Interfaces</a>
          <a href="#cta" className="btn-primary" onClick={close}>Get Early Access</a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Mockup ────────────────────────────────────────────────────────────

function HeroMockup() {
  const [step, setStep] = useState(0);
  const [demoType, setDemoType] = useState("entry");
  
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 3), 2500);
    return () => clearInterval(t);
  }, []);
  
  const steps = ["analyzing", "processing", "ready"];
  const labels = ["Analyzing emails & attachments...", "Processing transactions...", "✓ Ready for review"];
  
  const entryData = {
    date: "2026-02-28",
    desc: "Acme Design Co. - INV-1042",
    debit: "2,450.00",
    credit: "2,450.00",
    account: "Accounts Payable"
  };
  
  const emailDraft = {
    to: "john@acmebusiness.com",
    subject: "February 2026 Financial Summary",
    body: "Hi John,\n\nHere's your monthly financial summary..."
  };
  
  const adjustData = {
    reason: "Prepaid expense allocation",
    impact: "+$500 Net Income",
    account: "Prepaid Expenses → Supplies"
  };

  return (
    <div className="hero-mockup">
      <div className="mock-header">
        <div className="mock-dots">
          <span /><span /><span />
        </div>
        <span className="mock-title">ClawBooks Dashboard</span>
      </div>
      
      <div className="mock-tabs">
        <button className={demoType === "entry" ? "active" : ""} onClick={() => { setDemoType("entry"); setStep(0); }}>Journal Entry</button>
        <button className={demoType === "email" ? "active" : ""} onClick={() => { setDemoType("email"); setStep(0); }}>Client Email</button>
        <button className={demoType === "adjust" ? "active" : ""} onClick={() => { setDemoType("adjust"); setStep(0); }}>Adjustment</button>
      </div>
      
      <div className="mock-content">
        {demoType === "entry" && (
          <div className="mock-entry">
            <div className="mock-entry-header">
              <span className="mock-entry-icon">📄</span>
              <span>Invoice from Acme Design Co.</span>
            </div>
            <div className="mock-entry-body">
              <div className="mock-row"><span>Date:</span><strong>{entryData.date}</strong></div>
              <div className="mock-row"><span>Description:</span><strong>{entryData.desc}</strong></div>
              <div className="mock-row"><span>Debit:</span><strong>${entryData.debit}</strong></div>
              <div className="mock-row"><span>Credit:</span><strong>${entryData.credit}</strong></div>
              <div className="mock-row"><span>Account:</span><strong>{entryData.account}</strong></div>
            </div>
          </div>
        )}
        
        {demoType === "email" && (
          <div className="mock-email">
            <div className="mock-email-header">
              <span className="mock-email-icon">✉️</span>
              <span>Draft email for client</span>
            </div>
            <div className="mock-email-body">
              <div className="mock-row"><span>To:</span><strong>{emailDraft.to}</strong></div>
              <div className="mock-row"><span>Subject:</span><strong>{emailDraft.subject}</strong></div>
              <div className="mock-email-text">{emailDraft.body}</div>
            </div>
          </div>
        )}
        
        {demoType === "adjust" && (
          <div className="mock-adjust">
            <div className="mock-adjust-header">
              <span className="mock-adjust-icon">⚙️</span>
              <span>Suggested adjustment</span>
            </div>
            <div className="mock-adjust-body">
              <div className="mock-row"><span>Reason:</span><strong>{adjustData.reason}</strong></div>
              <div className="mock-row impact"><span>Impact:</span><strong>{adjustData.impact}</strong></div>
              <div className="mock-row"><span>Entry:</span><strong>{adjustData.account}</strong></div>
            </div>
          </div>
        )}
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
            Your AI Bookkeeper.
            <br />
            <span className="gradient-text">Does the work. You approve.</span>
          </h1>
          <p className="hero-sub">
            ClawBooks reads your emails, invoices, and bank feeds — then drafts 
            journal entries, client emails, and adjustments for you. Just review 
            and approve.
          </p>
          <div className="hero-actions">
            <a href="#cta" className="btn-primary btn-lg">Get Early Access →</a>
            <a href="#how-it-works" className="btn-ghost btn-lg">See How It Works</a>
          </div>
          <p className="hero-note">
            Bookkeepers: stop doing data entry. Start doing actual accounting.
          </p>
        </div>
        <div className="hero-visual">
          <HeroMockup />
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
    "Small firms handling 20+ client books",
    "Finance teams that need faster monthly close",
  ];
  const problems = [
    "Hours spent manually entering transactions",
    "Drafting the same client emails every month",
    "Missing recurring transactions and adjustments",
    "No time left for actual accounting work",
    "Slow monthly close kills your productivity",
  ];
  return (
    <section className="section" id="who-its-for" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in ${inView ? "visible" : ""}`}>
          <div className="section-tag">Who It&apos;s For</div>
          <h2>Built for bookkeepers who'd rather do accounting than data entry</h2>
        </div>
        <div className={`info-grid-two fade-in ${inView ? "visible" : ""}`}>
          <div className="feature-card">
            <h3>Who benefits most</h3>
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
      title: "Reads everything",
      desc: "Processes invoices from email, bank transactions, receipts, and PDFs. No manual data entry needed.",
    },
    {
      icon: "✍️",
      title: "Drafts journal entries",
      desc: "Creates ready-to-post entries with proper accounts, descriptions, and categorization.",
    },
    {
      icon: "✉️",
      title: "Writes client emails",
      desc: "Drafts monthly summaries, follow-ups, and requests — you approve before sending.",
    },
    {
      icon: "⚙️",
      title: "Spots adjustments",
      desc: "Identifies prepaid expenses, accruals, and recurring items that need attention.",
    },
    {
      icon: "🛡️",
      title: "Catches errors",
      desc: "Flags duplicates, unusual amounts, and potential issues before they hit the books.",
    },
    {
      icon: "✅",
      title: "You stay in control",
      desc: "Approve everything from dashboard, Telegram, or QuickBooks. Full audit trail included.",
    },
  ];
  return (
    <section className="section" id="features" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in ${inView ? "visible" : ""}`}>
          <div className="section-tag">What It Does</div>
          <h2>Your AI teammate that handles the busywork</h2>
          <p className="section-sub">
            ClawBooks does the grunt work. You focus on quality control and client relationships.
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

// ─── How It Works ───────────────────────────────────────────────────────────

function HowItWorks() {
  const [ref, inView] = useInView();
  const steps = [
    {
      n: "01",
      title: "Connect your tools",
      desc: "Link QuickBooks, email, and bank feeds. ClawBooks starts reading automatically.",
    },
    {
      n: "02",
      title: "AI does the processing",
      desc: "It reads invoices, categorizes transactions, and identifies what needs attention.",
    },
    {
      n: "03",
      title: "You get proposals",
      desc: "Draft entries, emails, and adjustments land in your queue — ready for review.",
    },
    {
      n: "04",
      title: "One click to approve",
      desc: "Review and approve in seconds. Posted to QuickBooks with full audit history.",
    },
  ];
  return (
    <section className="section section-dark" id="how-it-works" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in ${inView ? "visible" : ""}`}>
          <div className="section-tag">How It Works</div>
          <h2>Four steps. You never touch the boring stuff.</h2>
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
          <h2>Handle bookkeeping from your phone</h2>
          <p>
            Approve entries, review emails, and respond to alerts — without opening 
            your laptop. ClawBooks meets you where you already work.
          </p>
          <ul className="mockup-list">
            <li>✓ Instant approve/reject for entries</li>
            <li>✓ Review and send drafted client emails</li>
            <li>✓ Alerts for duplicates and anomalies</li>
            <li>✓ Daily digest of what needs attention</li>
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
                  <div className="tg-msg-title">📋 Journal Entry Ready</div>
                  <div className="tg-msg-row">
                    <span>From</span>
                    <strong>Acme Design Co.</strong>
                  </div>
                  <div className="tg-msg-row">
                    <span>Amount</span>
                    <strong className="accent">$2,450.00</strong>
                  </div>
                  <div className="tg-msg-row">
                    <span>Account</span>
                    <strong>Accounts Payable</strong>
                  </div>
                  <div className="tg-msg-row">
                    <span>Type</span>
                    <strong>📄 Invoice</strong>
                  </div>
                  {approved === null && (
                    <div className="tg-btns">
                      <button className="tg-approve" onClick={() => setApproved(true)}>✅</button>
                      <button className="tg-reject" onClick={() => setApproved(false)}>❌</button>
                    </div>
                  )}
                  {approved === true && (
                    <div className="tg-confirmed">✅ Approved & posted!</div>
                  )}
                  {approved === false && (
                    <div className="tg-rejected">❌ Rejected.</div>
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
    { type: "Entry", vendor: "Acme Design", amount: "$2,450.00", status: "pending" },
    { type: "Email", vendor: "Client Update", amount: "", status: "pending" },
    { type: "Adjust", vendor: "Prepaid allocation", amount: "+$500", status: "pending" },
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
              <div className="browser-url">app.qbo.intuit.com</div>
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
                            <span className="sp-type">{p.type}</span>
                            {p.amount && <span className="sp-amount">{p.amount}</span>}
                          </div>
                          <div className="sp-actions">
                            <button className="sp-approve">✓</button>
                            <button className="sp-reject">✕</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === "history" && (
                    <div className="sidebar-proposals">
                      <div className="sidebar-proposal approved-row">
                        <div className="sp-vendor">Acme Design</div>
                        <div className="sp-meta">
                          <span className="sp-amount">$2,450.00</span>
                          <span className="sp-approved-label">✅</span>
                        </div>
                      </div>
                      <div className="sidebar-proposal approved-row">
                        <div className="sp-vendor">Monthly Summary</div>
                        <div className="sp-meta">
                          <span className="sp-type">Email</span>
                          <span className="sp-approved-label">✅</span>
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
          <h2>Works where you work</h2>
          <p>
            Full dashboard for deep work. Telegram for quick approvals. 
            QuickBooks extension for inline decisions.
          </p>
          <ul className="mockup-list">
            <li>✓ Dashboard for deep work</li>
            <li>✓ QuickBooks extension for inline review</li>
            <li>✓ Telegram for approvals on the go</li>
            <li>✓ Full history and audit trail</li>
          </ul>
          <a
            href="#cta"
            className="btn-primary"
            style={{ display: "inline-block", marginTop: "1.5rem" }}
          >
            Get Early Access →
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
        <h2>Stop doing data entry. Start doing accounting.</h2>
        <p>Join the waitlist. First 50 bookkeepers get early access.</p>
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
          <span className="footer-tagline">AI bookkeeping for modern accountants</span>
        </div>
        <div className="footer-links">
          <a href="#who-its-for">Who It's For</a>
          <a href="#features">What It Does</a>
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
