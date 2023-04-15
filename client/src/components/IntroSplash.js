import React, { useState } from "react";

export default function IntroSplash(props) {
  const [active, setActive] = useState(true);

  return (
    <>
      <div id="splash-overlay" className={active ? "active" : "inactive"}>
        <div id="splash-main">
          Welcome! This site lets you look up delicious pairing suggestions for
          whatever combination of stuff you have on hand. Here's how to use it:
          <br />
          <br />
          <div className="tut-image-wrapper">
            <div id="tut-searchbar" />
          </div>
          <i>
            Type a flavor here, and hit Enter to add it to the search. Your
            current search will appear in the first box, and the results will
            appear in the second box.
          </i>
          <br />
          <br />
          <div className="tut-image-wrapper">
            <div id="tut-autocomplete" />
          </div>
          <i>
            Scroll, or use the arrow keys to navigate autosuggestions. Hit Enter
            to add the highlighted suggestion to your search.
          </i>
          <br />
          <br />
          <div className="tut-image-wrapper">
            <div id="tut-removebutton" />
          </div>
          <i>Click the trash can next to a search item to remove it.</i>
          <br />
          <br />
          <div className="tut-image-wrapper">
            <div id="tut-addbutton" />
          </div>
          <i>
            Click the arrow next to a result item, to add it to your search.
          </i>
          <br />
          <br />
          <div className="tut-image-wrapper">
            <div id="tut-randombutton" />
          </div>
          <i>Click the dice to add a random ingredient to your search.</i>
          <br />
          <br />
          <ul>
            <li>good pairings</li>
            <li>
              <b>great pairings</b>
            </li>
            <li>
              <b>CLASSIC PAIRINGS</b>
            </li>
            <li>
              <b>*HOLY GRAIL PAIRINGS</b>
            </li>
            <i>
              Results are formatted according to the popularity of the pairing.
            </i>
          </ul>
          <div id="splash-button" onClick={() => setActive(false)}>
            Let me in!
          </div>
        </div>
      </div>
    </>
  );
}
