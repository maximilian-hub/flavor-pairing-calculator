import React, { useState } from "react";
import InfoSection from "./InfoSection.js";
import InfoPage from "./InfoPage.js";

export default function ContactPage() {
  const [formState, setFormState] = useState({});

  // triggered on form submission:
  async function handleSubmit(event) {
    event.preventDefault();

    // ask server to send email:
    await fetch("/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        extension: formState.extension,
        subject: formState.subject,
        email: formState.email,
        message: formState.message,
      }),
    }).catch((error) => {
      console.log("Error sending email:", error);
      alert("There was an error 😔");
    });

    alert("Thanks for the message 🥰");
    document.getElementById("email-form").reset();
  }

  function handleFormChange(event) {
    setFormState({ ...formState, [event.target.name]: event.target.value }); //TODO: learn this syntax
  }

  return (
    <InfoPage className="info-page">
      <InfoSection header="Contact" active="true">
        max.spedale@gmail.com
      </InfoSection>
    </InfoPage>
  );
}
