import React from "react";
import InfoSection from "./InfoSection.js";
import InfoPage from "./InfoPage.js";
import { Link } from "react-router-dom";

export default function SupportPage() {
  const donateButton = (
    <>
      <form action="https://www.paypal.com/donate" method="post" target="_top">
        <input type="hidden" name="business" value="259RCYLDJJBH6" />
        <input type="hidden" name="no_recurring" value="0" />
        <input type="hidden" name="currency_code" value="USD" />
        <input
          type="image"
          src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
          border="0"
          name="submit"
          title="PayPal - The safer, easier way to pay online!"
          alt="Donate with PayPal button"
        />
        <img
          alt=""
          border="0"
          src="https://www.paypal.com/en_US/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
    </>
  );

  const supportContent = (
    <>
      If you or anyone you know is hiring a junior developer,{" "}
      <Link to="/contact">please reach out</Link>, or{" "}
      <a href="https://www.linkedin.com/in/maximilian-spedale/">
        pass along my LinkedIn and resume
      </a>
      .
      <br />
      <br />
      If you're already in the industry, I'd love to hear your feedback on [my
      resume] and/or{" "}
      <a href="https://github.com/maximilian-hub/flavor-pairing-calculator">
        my code
      </a>
      . I have a lot to learn, but I'm a good student!
      <br />
      <br />
      FPC has no ads, and is free. If I've provided value to you, and you're in
      a position to donate, I encourage you to do so below. Donations help me
      cover hosting costs, and they help me gauge whether or not I can
      financially justify additional updates.
      <br />
      <br />
      If you're broke and have no industry knowledge, you can still help out
      tremendously. Share this app with others,{" "}
      <Link to="/contact">
        give me feedback on the app, or even just shoot me a few kind words.
      </Link>
      <br />
      <br />
      Thanks for reading ❤️
    </>
  );

  return (
    <InfoPage className="info-page">
      <InfoSection header="Help Me" active="true">
        {supportContent}
        <br />
        <br />
        {donateButton}
      </InfoSection>
    </InfoPage>
  );
}
