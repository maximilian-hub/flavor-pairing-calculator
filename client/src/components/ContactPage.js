import React from "react";
import InfoSection from "./InfoSection.js";
import InfoPage from "./InfoPage.js";

export default function ContactPage() {
  return (
    <InfoPage className="info-page">
      <InfoSection header="Contact" active="true">
        <h3>Email me:</h3>
        <div className="email-form-container">
          <form className="email-form" action="">
            <div>
              <label htmlFor="email">email:</label>
              <input type="text" name="email" placeholder="you@whatever.com" />
            </div>

            <div>
              <label htmlFor="extension">subject:</label>
              <select name="extension" id="">
                <option value="">--- Select an Option ---</option>
                <option value="leads">Job Leads</option>
                <option value="bug-report">Bug Report</option>
                <option value="feature-request">Feature Request</option>
                <option value="advice">Advice</option>
                <option value="nice-words">Encouragement/Praise</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message">your message:</label>
              <textarea type="text" id="user-message" name="message" />
            </div>

            <input type="submit" value="Submit" rows="10" />
          </form>
        </div>
      </InfoSection>
    </InfoPage>
  );
}
