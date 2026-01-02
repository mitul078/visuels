"use client"
import React, { useState } from "react"
import "./rule.scss"

const Rule = ({ onAccept }) => {
    const [accepted, setAccepted] = useState(false)

    const handleChange = (e) => {
        const value = e.target.checked
        setAccepted(value)
        onAccept?.(value)
    }

    return (
        <div className="rules-page">
            <div className="rules-card">
                <h2>📜 Rules & Regulations – Membership Plan</h2>

                <section>
                    <h3>⏳ Free Trial Period</h3>
                    <ul>
                        <li><strong>First 6 Months – Completely FREE</strong></li>
                        <li>Enjoy full access to the platform without any charges.</li>
                        <li>Explore all features, connect, and grow with confidence.</li>
                        <li>No credit card or payment required during the trial period.</li>
                    </ul>
                </section>

                <section>
                    <h3>💳 Subscription & Pricing</h3>
                    <ul>
                        <li><strong>After 6 Months – Affordable Subscription Starts</strong></li>
                        <li><strong>₹499 for 3 months</strong> (₹166/month).</li>
                        <li>Auto-renewal can be enabled or disabled anytime.</li>
                        <li>No hidden charges or surprise fees.</li>
                    </ul>
                </section>

                <section>
                    <h3>🎁 Extra Benefits for Subscribed Members</h3>

                    <h4>🚀 For Artists</h4>
                    <ul>
                        <li>Higher visibility & priority listing in search results.</li>
                        <li>Direct messaging access with interested users.</li>
                        <li>Advanced profile customization.</li>
                        <li>Verified user requests & orders.</li>
                        <li>Monthly performance insights.</li>
                        <li>Featured artist badge.</li>
                    </ul>

                    <h4>👤 For Users</h4>
                    <ul>
                        <li>Unlimited direct chat with artists.</li>
                        <li>Faster responses from priority artists.</li>
                        <li>Exclusive access to top-rated artists.</li>
                        <li>Early access to new features.</li>
                        <li>Secure transactions & order protection.</li>
                    </ul>
                </section>

                <section>
                    <h3>🔒 Platform Assurance</h3>
                    <ul>
                        <li>No spam or fake profiles.</li>
                        <li>Violations may lead to suspension.</li>
                        <li>Your data is protected & never shared.</li>
                    </ul>
                </section>

                <section>
                    <h3>🔄 Plan Flexibility</h3>
                    <ul>
                        <li>Cancel anytime without penalties.</li>
                        <li>Benefits stay until billing cycle ends.</li>
                    </ul>
                </section>

                <section>
                    <h3>⭐ Why Choose Our Platform?</h3>
                    <ul>
                        <li>Real users & genuine artists.</li>
                        <li>Simple pricing with real value.</li>
                        <li>Designed for growth & trust.</li>
                    </ul>
                </section>

                {/* Accept Rules */}
                <div className="accept-box">
                    <label>
                        <input
                            type="checkbox"
                            checked={accepted}
                            onChange={handleChange}
                        />
                        <span>
                            I have read and agree to the <strong>Rules & Regulations</strong>
                        </span>
                    </label>
                </div>

                <button className="continue-btn" disabled={!accepted}>
                    Continue
                </button>
            </div>
        </div>
    )
}

export default Rule
