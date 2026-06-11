"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !email.includes("@")) {
      setError(true);
      return;
    }

    setError(false);
    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setError(true);
        return;
      }

      setSuccess(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <nav>
        <div className="logo">
          Sub<span>Trackt</span>
        </div>
        <a href="#waitlist">Join Waitlist →</a>
      </nav>

      <section className="hero">
        <div className="eyebrow">Early Access</div>

        <h1>
          Stop paying for things
          <br />
          you <em>forgot</em> you subscribed to.
        </h1>

        <p className="hero-sub">
          Freelancers average ₹8,000/month in forgotten SaaS subscriptions.
          SubTrackt shows you exactly where your money goes — before renewal
          hits.
        </p>

        <div className="ticker-row">
          <div className="ticker-item">
            <div className="dot"></div> Figma{" "}
            <span className="amount">₹800/mo</span>
          </div>
          <div className="ticker-item">
            <div className="dot"></div> Notion{" "}
            <span className="amount">₹400/mo</span>
          </div>
          <div className="ticker-item">
            <div className="dot"></div> ChatGPT Plus{" "}
            <span className="amount">₹1,600/mo</span>
          </div>
          <div className="ticker-item">
            <div className="dot"></div> Adobe CC{" "}
            <span className="amount">₹4,000/mo</span>
          </div>
          <div className="ticker-item">
            <div className="dot"></div> GitHub Copilot{" "}
            <span className="amount">₹830/mo</span>
          </div>
        </div>

        <div id="waitlist">
          {!success && (
            <div className="form-wrap">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
                style={error ? { borderColor: "#ef4444" } : undefined}
              />
              <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Joining…" : "Get Early Access"}
              </button>
            </div>
          )}
          {!success && (
            <p className="form-note">
              First <strong>100</strong> signups get lifetime access at{" "}
              <strong>₹799</strong> — one time, no renewals ever.
            </p>
          )}
          <div className={`success-msg${success ? " visible" : ""}`}>
            ✓ You&apos;re on the list. We&apos;ll reach out when it&apos;s
            ready.
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section
        style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 24px" }}
      >
        <div className="features">
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <h3>Renewal alerts</h3>
            <p>
              Get notified 3 days before any subscription renews. No more
              surprise charges on your card.
            </p>
          </div>
          <div className="feature">
            <span className="feature-icon">₹</span>
            <h3>INR-first</h3>
            <p>
              Built for Indian freelancers. Track in rupees, see your monthly
              burn clearly.
            </p>
          </div>
          <div className="feature">
            <span className="feature-icon">◎</span>
            <h3>Annual cost view</h3>
            <p>
              See what ₹800/month actually means: ₹9,600/year. Kills impulse
              subscriptions fast.
            </p>
          </div>
          <div className="feature">
            <span className="feature-icon">→</span>
            <h3>No bank access needed</h3>
            <p>
              Manual tracking only. You add what you pay. No linking accounts,
              no open banking.
            </p>
          </div>
        </div>
      </section>

      <section className="proof">
        <div className="proof-label">The problem is real</div>
        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-number">
              ₹<span>8k</span>
            </span>
            <div className="stat-label">
              avg monthly sub spend
              <br />
              for a freelancer
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              <span>30</span>%
            </span>
            <div className="stat-label">
              of subscriptions unused
              <br />
              at any given time
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              <span>12</span>+
            </span>
            <div className="stat-label">
              active SaaS tools
              <br />
              average freelancer
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="logo">
          Sub<span>Trackt</span>
        </div>
        <div className="footer-note">
          Built by a freelancer, for freelancers.
        </div>
      </footer>
    </>
  );
}
