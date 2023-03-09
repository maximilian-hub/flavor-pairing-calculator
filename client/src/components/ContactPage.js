import React, { useState } from "react";
import InfoSection from "./InfoSection.js";
import InfoPage from "./InfoPage.js";
import { Link } from "react-router-dom";

export default function ContactPage() {
  const [formState, setFormState] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submit button clicked");

    if (window.Email) {
      window.Email.send({
        Host: "smtp.elasticemail.com",
        Username: "flavorpairingcalculator@gmail.com",
        Password: "6F010AAAD1FAE6E6765AF534F31AF46F9A1B",
        Port: 2525,
        To: "flavorpairingcalculator+" + formState.extension + "@gmail.com",
        From: "flavorpairingcalculator@gmail.com",
        Subject: formState.subject,
        Body:
          "given email: " + formState.email + "<br><br>" + formState.message,
      }).then(() => alert("email sent....?"));
    }
  }

  function handleFormChange(event) {
    setFormState({ ...formState, [event.target.name]: event.target.value }); //TODO: learn this syntax
    console.log(`formState changed:\n${JSON.stringify(formState)}`);
  }

  return (
    <InfoPage className="info-page">
      <InfoSection header="Contact" active="true">
        <div id="contact-links">
          <a href="https://www.linkedin.com">
            <i className="fa-brands fa-linkedin linkedin" title="LinkedIn">
              <div className="icon-bg"></div>
            </i>
          </a>
          <a href="https://www.github.com">
            <i className="fa-brands fa-square-github github" title="GitHub">
              <div className="icon-bg"></div>
            </i>
          </a>
          <a href="https://www.twitter.com">
            <i className="fa-brands fa-square-twitter twitter" title="Twitter">
              <div className="icon-bg"></div>
            </i>
          </a>
        </div>

        <h3>Email me:</h3>
        <div className="email-form-container">
          <form className="email-form" method="post" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">email:</label>
              <input
                type="text"
                name="email"
                placeholder="you@whatever.com"
                onChange={handleFormChange}
              />
            </div>

            <div>
              <label htmlFor="extension">purpose:</label>
              <select name="extension" id="" onChange={handleFormChange}>
                <option value="">- What is this regarding? -</option>
                <option value="leads">Job Lead</option>
                <option value="db">Database</option>
                <option value="bugreport">Bug Report</option>
                <option value="featurerequest">Feature Request</option>
                <option value="advice">Advice</option>
                <option value="encouragement">Encouragement</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="subject">subject:</label>
              <input type="text" name="subject" onChange={handleFormChange} />
            </div>

            <div>
              <label htmlFor="message">your message:</label>
              <textarea
                type="text"
                id="user-message"
                name="message"
                onChange={handleFormChange}
              />
            </div>

            <input type="submit" value="Submit" rows="10" />
          </form>
        </div>
      </InfoSection>
    </InfoPage>
  );
}
