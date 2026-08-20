'use client';

import { useMemo, useState } from 'react';

// Demo word for now. Once the guest list is ready this will come from the
// guest's locked email assignment instead of being selected by quiz answers.
const demoWord = 'BACKPACK';

const wordQuestions = {
  BACKPACK: [
    { q: 'Your packing style?', a: ['Everything organised into little bags.', 'Throw it all in and hope it closes.', 'I pack approximately 10 minutes before leaving.'] },
    { q: 'Pick your travel personality.', a: ['I have the itinerary.', 'Where are we going again?', 'I’ll follow everyone else.'] },
    { q: 'You’re leaving the house. What do you forget?', a: ['Absolutely nothing 😌', 'My water bottle.', 'Something important, obviously.'] },
  ],
};

const examples = [
  { word: 'JHUMKA', clues: ['You might wear me to a wedding.', 'I sparkle.', 'You’ll find me beside your face.'] },
  { word: 'SHAH RUKH KHAN', clues: ['I’m known for romance.', 'Arms wide open is kind of my thing.', 'You’d probably associate me with Bollywood.'] },
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const questions = useMemo(() => wordQuestions[demoWord], []);

  function choose(answer) {
    setAnswers((current) => [...current, answer]);
    if (step === questions.length - 1) setRevealed(true);
    else setStep((current) => current + 1);
  }

  if (!started) return (
    <main className="shell"><section className="card hero">
      <div className="eyebrow">BABYQ • TOP SECRET</div>
      <div className="bigEmoji">🤫</div>
      <h1>A little mystery<br/>before BabyQ</h1>
      <p>Answer a few highly important personality questions. We have something waiting for you at the end. 👀</p>
      <button onClick={() => setStarted(true)}>I’m ready →</button>
      <small>No spoilers. No overthinking.</small>
    </section></main>
  );

  if (!revealed) {
    const current = questions[step];
    return (
      <main className="shell"><section className="card quiz">
        <div className="progressText">QUESTION {step + 1} OF {questions.length}</div>
        <div className="progress"><span style={{ width: `${((step + 1) / questions.length) * 100}%` }}/></div>
        <h2>{current.q}</h2>
        <div className="answers">{current.a.map((answer, index) => (
          <button className="answer" key={answer} onClick={() => choose(answer)}><span>{String.fromCharCode(65 + index)}</span>{answer}</button>
        ))}</div>
        <p className="hint">Go with your first instinct. This is extremely scientific.*</p>
      </section></main>
    );
  }

  return (
    <main className="shell"><section className="card mission">
      <div className="eyebrow">YOUR BABYQ SECRET</div>
      <div className="bigEmoji">✨</div>
      <p className="analysisLine">Very interesting… your answers have been carefully analysed.*</p>
      <h1>Your secret word is</h1>
      <div className="identity">{demoWord}</div>
      <small>*They absolutely have not. 😂</small>

      <div className="ruleBox">
        <h2>🤫 Your mission for now</h2>
        <p>Before BabyQ, create <strong>2–4 clues</strong> that describe your secret word without actually saying it.</p>
        <p>You’ll need your clues at the party. That’s all we’re telling you for now. 👀</p>
      </div>

      <div className="examples">
        <h2>How to make your clues</h2>
        <p className="muted">These are examples only — they have nothing to do with your secret word.</p>
        {examples.map((example) => (
          <div className="example" key={example.word}>
            <span>IF YOUR WORD WAS {example.word}</span>
            {example.clues.map((clue) => <p key={clue}>💡 “{clue}”</p>)}
          </div>
        ))}
      </div>

      <div className="tips">
        <h2>The only rules</h2>
        <div className="rulesList">
          <p>🤐 Don’t reveal your actual word.</p>
          <p>📱 Don’t show anyone this screen.</p>
          <p>🧠 Come prepared with your 2–4 clues.</p>
        </div>
      </div>

      <div className="finale"><strong>Keep your word somewhere safe.</strong><br/>You’ll find out what all this is for at BabyQ. 😈</div>
    </section></main>
  );
}
