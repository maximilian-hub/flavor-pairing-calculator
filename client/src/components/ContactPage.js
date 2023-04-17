import React, { useState } from "react";
import InfoSection from "./InfoSection.js";
import InfoPage from "./InfoPage.js";

export default function ContactPage() {
  const [formState, setFormState] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("submit button clicked");

    // ask server to send email:
    const response = await fetch("/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        extention: formState.extension,
        subject: formState.subject,
        email: formState.email,
        message: formState.message,
      }),
    });

    if (response.status === 200) {
      alert("Thanks for your message! 🥰");
    } else {
      alert(response.status);
    }
  }

  function handleFormChange(event) {
    setFormState({ ...formState, [event.target.name]: event.target.value }); //TODO: learn this syntax
  }

  return (
    <InfoPage className="info-page">
      <InfoSection header="Contact" active="true">
        <div id="contact-links">
          <a
            href="https://www.linkedin.com/in/maximilian-spedale/"
            target="_blank"
          >
            <i className="fa-brands fa-linkedin linkedin" title="LinkedIn">
              <div className="icon-bg"></div>
            </i>
          </a>
          <a href="https://github.com/maximilian-hub" target="_blank">
            <i className="fa-brands fa-square-github github" title="GitHub">
              <div className="icon-bg"></div>
            </i>
          </a>
          <a href="https://www.twitter.com/max__fpc" target="_blank">
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
                <option value="db">Database Suggestion</option>
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
