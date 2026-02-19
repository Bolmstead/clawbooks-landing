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
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#interfaces">Interfaces</a>
          <a href="#automations">Automations</a>
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
          <a href="#features" onClick={close}>Features</a>
          <a href="#how-it-works" onClick={close}>How It Works</a>
          <a href="#interfaces" onClick={close}>Interfaces</a>
          <a href="#automations" onClick={close}>Automations</a>
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
            AI proposes.
            <br />
            <span className="gradient-text">Humans approve.</span>
          </h1>
          <p className="hero-sub">
            ClawBooks is an OpenClaw-powered AI copilot for QuickBooks that
            proposes bill, invoice, and journal entry actions, automates
            repetitive AP workflows, and keeps humans in control of final approvals.
          </p>
          <div className="hero-actions">
            <a href="#cta" className="btn-primary btn-lg">Get Early Access →</a>
            <a href="#how-it-works" className="btn-ghost btn-lg">See How It Works</a>
          </div>
          <p className="hero-note">
            Built local-first today · Auditability and control by default
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
    "QuickBooks via Maton",
    "OpenClaw/Alfred",
    "Telegram Bot API",
    "Gmail IMAP",
    "Gmail API",
    "REST API",
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
      title: "Multi-source intake",
      desc: "Ingests accounting work from API payloads, email events, uploaded docs, and optional watch-folder ingestion.",
    },
    {
      icon: "🧠",
      title: "OCR + parsing + AI fallback",
      desc: "Parses text, PDF, and image invoices with OCR and structured parsing, then falls back to AI interpretation when needed.",
    },
    {
      icon: "🧾",
      title: "Proposal generation",
      desc: "Creates AI proposals for bill, invoice, or journal_entry transactions with stateful queue tracking.",
    },
    {
      icon: "♻️",
      title: "Recurring intelligence",
      desc: "Detects recurring bills from vendor and amount history, with optional low-risk auto-approval under a configurable threshold.",
    },
    {
      icon: "🛡️",
      title: "Duplicate + anomaly detection",
      desc: "Flags likely duplicates in a lookback window and highlights anomaly amounts above vendor history.",
    },
    {
      icon: "📚",
      title: "Vendor learning",
      desc: "Learns vendor categorization from approvals and reuses account mappings for future proposals.",
    },
    {
      icon: "✅",
      title: "Approval controls everywhere",
      desc: "Supports manual approve/reject in Telegram, the React dashboard, and the Chrome extension in QuickBooks Online.",
    },
    {
      icon: "🔗",
      title: "Reliable QuickBooks posting",
      desc: "Posts approved proposals through the Maton gateway and can safely fall back to journal_entry posting when preferred types fail.",
    },
    {
      icon: "🗂️",
      title: "Auditability and history",
      desc: "Persists queue state and audit events, with proposal history (pending/approved/rejected) plus attachment preview/download in extension.",
    },
  ];
  return (
    <section className="section" id="features" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in ${inView ? "visible" : ""}`}>
          <div className="section-tag">Features</div>
          <h2>Comprehensive AP copilot capabilities</h2>
          <p className="section-sub">
            End-to-end from intake to proposal, approval, posting, and follow-up.
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
      title: "Intake from API, email, upload, or watch folders",
      desc: "Accounting work enters from events, document uploads, and optional watcher flows — then lands in one proposal queue.",
    },
    {
      n: "02",
      title: "AI builds a QuickBooks-ready proposal",
      desc: "OCR/parsing extracts data and AI creates bill, invoice, or journal_entry proposals with duplicate and anomaly checks.",
    },
    {
      n: "03",
      title: "Human approves, or low-risk recurring auto-approves",
      desc: "Approvals happen in Telegram, dashboard, or extension. Optional auto-approval applies only to recurring bills under threshold.",
    },
    {
      n: "04",
      title: "Post, track, and automate follow-through",
      desc: "Approved work posts to QuickBooks via Maton (with JE fallback), with audit events, digest automations, report workflows, and forecasts.",
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
            Telegram handles fast approve/reject loops, overdue follow-up
            digests, weekly summaries, and report delivery notifications.
          </p>
          <ul className="mockup-list">
            <li>✓ Approve/reject proposals instantly</li>
            <li>✓ Receive overdue follow-up digests (weekdays morning)</li>
            <li>✓ Weekly summary dispatch (Monday morning)</li>
            <li>✓ Report notifications and workflow alerts</li>
            <li>✓ End-to-end audit visibility from the same thread</li>
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
            ClawBooks supports every working style: React dashboard, Chrome
            extension in QuickBooks Online, Telegram prompts, and REST API orchestration.
          </p>
          <ul className="mockup-list">
            <li>✓ React dashboard for queue, status, and automation visibility</li>
            <li>✓ QuickBooks extension for inline approve/reject + history</li>
            <li>✓ Telegram approvals and digest notifications</li>
            <li>✓ REST API for OpenClaw/agent orchestration control</li>
            <li>✓ Attachment preview/download in extension history</li>
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

function AutomationsAndReports() {
  const [ref, inView] = useInView();
  const automationDefaults = [
    "Recurring detection enabled",
    "Duplicate detection enabled",
    "Anomaly detection enabled",
    "Overdue follow-up digests on weekday mornings",
    "Weekly summary on Monday mornings",
    "Cash-flow forecasts at 30 and 60 days",
    "Configurable document upload watcher",
  ];
  const reportWorkflows = [
    "Natural-language report dispatch: expense report, invoice summary, P&L, AR aging, weekly summary",
    "Client report-email drafts queued as approval proposals before send",
    "Approved client emails sent via Gmail API with attachments",
  ];
  return (
    <section className="section" id="automations" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in ${inView ? "visible" : ""}`}>
          <div className="section-tag">Automations + Reports</div>
          <h2>Reduce repetitive work without losing control</h2>
          <p className="section-sub">
            Automation defaults are opinionated, configurable, and still centered on reviewable approvals.
          </p>
        </div>
        <div className={`info-grid-two fade-in ${inView ? "visible" : ""}`}>
          <div className="feature-card">
            <h3>Default automation posture</h3>
            <ul className="bullet-list">
              {automationDefaults.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="feature-card">
            <h3>Report and response workflows</h3>
            <ul className="bullet-list">
              {reportWorkflows.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustAndScope() {
  const [ref, inView] = useInView();
  const trustPoints = [
    "Human-in-the-loop approvals by default",
    "Optional auto-approval only for low-risk recurring bills under threshold",
    "Audit log for created/approved/rejected/automation events",
    "Queue + state persistence for operational continuity",
  ];
  const scopeNotes = [
    "Local-first app today (localhost API + local extension connection)",
    "Chrome extension targets QuickBooks Online domains",
    "Telegram callback processing is designed to run via OpenClaw orchestration",
    "Outbound email sender handling currently uses an allowlist pattern",
  ];
  return (
    <section className="section section-dark" id="scope" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in ${inView ? "visible" : ""}`}>
          <div className="section-tag">Trust + Current Scope</div>
          <h2>Built for speed, control, and auditability</h2>
        </div>
        <div className={`info-grid-two fade-in ${inView ? "visible" : ""}`}>
          <div className="feature-card">
            <h3>Control and traceability</h3>
            <ul className="bullet-list">
              {trustPoints.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="feature-card">
            <h3>Current deployment scope</h3>
            <ul className="bullet-list">
              {scopeNotes.map((item) => <li key={item}>{item}</li>)}
            </ul>
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
          <a href="#" className="footer-logo-link" aria-label="ClawBooks home">
            <img className="logo-image logo-image-footer" src={logoSrc} alt="" />
            <span className="app-title">ClawBooks</span>
          </a>
          <span className="footer-tagline">AI accounting for modern teams</span>
        </div>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#interfaces">Interfaces</a>
          <a href="#automations">Automations</a>
          <a href="#scope">Scope</a>
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
      <AutomationsAndReports />
      <TrustAndScope />
      <CTA />
      <Footer />
    </>
  );
}
