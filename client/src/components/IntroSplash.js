import React, { useState } from "react";

export default function IntroSplash(props) {
  const [active, setActive] = useState(true);

  return (
    <>
      <div id="splash-overlay" className={active ? "active" : "inactive"}>
        <div id="splash-main">
          Welcome, new user! Please allow me to uh, show you around, show you
          how everything works around here. What this does, what buttons to
          press, how to read the results, and all that.
          <div id="splash-button" onClick={() => setActive(false)}>
            Let me in!
          </div>
        </div>
      </div>
    </>
  );
}
