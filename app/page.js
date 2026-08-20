'use client';

import { useState } from 'react';

const demoIdentity = 'JHUMKA';

export default function Home() {
  const [revealed, setRevealed] = useState(false);

  if (!revealed) {
    return (
      <main className="shell">
        <section className="card hero">
          <div className="eyebrow">BABYQ • TOP SECRET</div>
          <div className="bigEmoji">🤫</div>
          <h1>Find Your<br/>People</h1>
          <p>You have been given a secret identity. At BabyQ, five other people belong with you — but nobody knows who.</p>
          <button onClick={() => setRevealed(true)}>Show me how it works →</button>
          <small>Keep your identity secret. The chaos is intentional.</small>
        </section>
      </main>
    );
  }

  return (
    <main className="shell">
      <section className="card mission">
        <div className="eyebrow">EXAMPLE MISSION • NOT YOUR REAL IDENTITY</div>
        <div className="bigEmoji">🎬</div>
        <h1>Your secret identity is</h1>
        <div className="identity">{demoIdentity}</div>

        <div className="ruleBox">
          <h2>🤐 Keep it secret</h2>
          <p>Do not say your word and do not show anyone this screen. Before the party, think of <strong>2–3 clues</strong> that describe your identity without giving it away.</p>
        </div>

        <div className="example">
          <span>FOR EXAMPLE</span>
          <p>“You might wear me to a wedding, I sparkle, and you’ll probably notice me when someone dances.”</p>
        </div>

        <div className="tips">
          <h2>Need clue inspiration?</h2>
          <div className="chips"><span>Where would you find it?</span><span>What is it associated with?</span><span>When would you use it?</span></div>
        </div>

        <div className="missionSteps">
          <h2>🎯 Your mission at BabyQ</h2>
          <p>Talk to people. Give your clues. Listen to theirs.</p>
          <p>Somewhere at the party are <strong>5 people</strong> whose secret identities have something in common with yours.</p>
          <p>Find your people and work out the hidden category that connects all six of you.</p>
        </div>

        <div className="warning">⚠️ Someone who sounds like they belong with you might actually be from another team.</div>
        <div className="finale">When your group thinks you’ve cracked it, choose <strong>ONE person</strong> to reveal your category to the organizers. 🔓</div>

        <button className="ghost" onClick={() => setRevealed(false)}>← Back</button>
        <small className="organizerHint">The real identities and categories stay secret until game day.</small>
      </section>
    </main>
  );
}
