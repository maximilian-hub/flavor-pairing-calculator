import React from "react";
import InfoSection from "./InfoSection.js";
import InfoPage from "./InfoPage.js";

const fpcContent = (
  <>
    <p>
      FPC is intended to help stimulate culinary creativity by providing fast,
      intuitive access to [a large database of flavor pairings].
    </p>
    <br />
    <p>
      FPC is an app I've been dying to have for years, and finally made time to
      build when I got serious about establishing myself in tech. It's my first
      "capstone" portfolio project, a full-stack app with a Node.js backend, a
      SQL database, and a React.js frontend. [Here's the github repo] if you're
      curious about the code.
    </p>
  </>
);

const devContent = (
  <>
    <p>
      Hi! My name's Maximilian (Max if you like), an [aspiring software
      developer] and lifelong orphan based in New Orleans.
    </p>
    <br />
    <p>
      Ten years ago, I was aimless, depressed, self-obsessed, and generally
      useless to the people around me. [I'm doing a lot better now, don't
      worry!] Cooking was the first domain I was able to develop real competence
      in. It gave me confidence in my ability to provide value for myself and
      others (and not only that, but to do it joyfully). The pride, confidence,
      satisfaction, love, and aesthetic experience/expression I was able to
      derive from cooking gave me a solid foundation of self-esteem from which
      to start building competency in other areas of my life. I'm incredibly
      grateful to it for that, and am excited to give back to it in some small
      way with this app.
    </p>
    <br />
    <p>
      Breaking into tech as a self-taught developer is an uphill climb,
      especially with a work history like mine--a collage of odd jobs, ranging
      from barista to blackjack dealer to corporate paint salesman. [I could
      really use some help.]
    </p>
  </>
);

const dataContent = (
  <>
    <p>
      Most of it came from the "Matching Flavors" section of [The Flavor Bible],
      an incredible reference of flavor pairings put together by that legendary
      gastronomic power couple, Karen & Andrew Dornenburg (no affiliation). Over
      an 8-year-long research period, they consulted dozens high-level chefs,
      food critics, and menus of successful restaurants going back to the 80s,
      and compiled everything into one volume. I recommend buying it
      immediately.
    </p>
    <br />
    <ul>
      My database largely reflects what they put out, but has been colored by my
      own opinions and biases, and altered to fit the purpose of this app. I've
      made a number of substantial changes to the data from the book:
      <br />
      <br />
      <li>
        • I wanted this app to provide a pure experience of the relationships
        between flavors. As such,{" "}
        <b>
          I've removed entries referring to cuisines, seasons, and other broad
          concepts like "acidity."
        </b>{" "}
        For my purposes, these things are too general to be considered flavors.
        My one compromise here was to leave in certain categories like "salad"
        and "beverage," because I thought it'd be nice to see them in the
        results and think "Oh, I could make a salad with these!" This filtering
        brought the number of entries from ~600 to ~500.
      </li>
      <br />
      <li>
        • Many entries in the book list pairings one way, but not the other. For
        example, "goat cheese" lists "strawberry" as a pairing, but "strawberry"
        doesn't list "goat cheese." The book may be like this to emphasize
        pairings where one flavor especially "brings out" the other, or it may
        simply be an oversight due to the incredible amount of time it would
        have taken to fix by hand. Either way, since for this app I was chiefly
        concerned with pairings that amounted to "greater than the sum of their
        parts," <b>I've expanded all one-way pairings into two-way pairings.</b>{" "}
        This expansion brought the number of entries from ~500 to ~1200.
      </li>
      <br />
      <li>
        • I was more interested in flavors as an abstraction, than in
        ingredients themselves. So where convenient,{" "}
        <b>
          I've condensed ingredients with the same general flavor into single
          entries,
        </b>{" "}
        e.g. "lemon juice," "lemon zest," and "preserved lemon" have been
        condensed into "lemon." I didn't want to miss out on useful search
        results because one flavor went with "lemon zest" and the other went
        with "lemon juice." These ingredients have their own roles to play in
        cooking, and do have slightly different flavors, but they're similar
        enough that in most cases, what tastes good with lemon juice is gonna
        taste good with lemon zest.
      </li>
    </ul>
    <br />
    <p>
      Smaller changes include adding some pairings of my own (see "instant
      ramen"), enforcing consistent phrasing, correcting spelling errors, and
      uh, introducing spelling errors. [Let me know if you find any.]
    </p>
  </>
);

const futureContent = (
  <>
    <ol>
      <li>•uhhhh</li>
      <li>•um um um</li>
      <li>•*hyperventilating*</li>
    </ol>
  </>
);

export default function AboutPage() {
  return (
    <InfoPage className="info-page">
      <InfoSection header="FPC">{fpcContent}</InfoSection>
      <InfoSection header="The Data">{dataContent}</InfoSection>
      <InfoSection header="The Developer">{devContent}</InfoSection>
      <InfoSection header="The Future">{futureContent}</InfoSection>
    </InfoPage>
  );
}
