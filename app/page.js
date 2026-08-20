'use client';

import { useMemo, useState } from 'react';

const guests = {
  'adamjones123@hotmail.co.uk': { name: 'Adam', word: 'BOARDING PASS' },
  'ashutosh.saxena23@gmail.com': { name: 'Ashutosh', word: 'SUNSCREEN' },
  'faizamuskan.fm@gmail.com': { name: 'Faiza', word: 'COMPASS' },
  'gupta.sweta2403@gmail.com': { name: 'Sweta', word: 'GATE' },
  'kanishkakul0106@gmail.com': { name: 'Kanishka', word: 'SOUVENIR' },
  'likhithagompa@gmail.com': { name: 'Likhita', word: 'TRAIL' },
  'namratagupta188@gmail.com': { name: 'Namrata', word: 'RUNWAY' },
  'naveenmeher07@gmail.com': { name: 'Naveen', word: 'FLIP-FLOPS' },
  'nikhiljain2112@gmail.com': { name: 'Nikhil', word: 'BOOTS' },
  'nvbadrinarayanan@gmail.com': { name: 'Badri', word: 'SECURITY' },
  'rahulaneja687@gmail.com': { name: 'Rahul', word: 'CAMERA' },
  'rohit3864@gmail.com': { name: 'Rohit', word: 'MAP' },
  'sayan.chanda.2020@gmail.com': { name: 'Sayan', word: 'DEPARTURE' },
  'shafeeq.rahman01@gmail.com': { name: 'Shafeeq', word: 'HOTEL' },
  'shivisaggi@gmail.com': { name: 'Shivika', word: 'WATER BOTTLE' },
  'vrindagrover10@gmail.com': { name: 'Vrinda', word: 'LUGGAGE' },
  'shanky442@gmail.com': { name: 'Ankur', word: 'SUNGLASSES' },
  'pragyarch@gmail.com': { name: 'Pragya', word: 'BACKPACK' },
};

const genericQuestions = [
  { q: 'You’re going somewhere new. What’s your energy?', a: ['I have a plan and a backup plan.', 'I know roughly what’s happening.', 'No plan. Maximum vibes.'] },
  { q: 'Pick your travel superpower.', a: ['Never getting lost.', 'Never forgetting anything.', 'Always finding the best food.'] },
  { q: 'Your group needs someone to take charge. You…', a: ['Already have.', 'Will help if required.', 'Suddenly become very busy. 👀'] },
];

const examples = [
  { word: 'JHUMKA', clues: ['You might wear me to a wedding.', 'I sparkle.', 'You’ll find me beside your face.'] },
  { word: 'SHAH RUKH KHAN', clues: ['I’m known for romance.', 'Arms wide open is kind of my thing.', 'You’d probably associate me with Bollywood.'] },
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [guest, setGuest] = useState(null);
  const [error, setError] = useState('');
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const questions = useMemo(() => genericQuestions, []);

  function enter(e) {
    e.preventDefault();
    const match = guests[email.trim().toLowerCase()];
    if (!match) {
      setError('Hmm… we can’t find that email on the BabyQ guest list. Check the address from your invite and try again. 👀');
      return;
    }
    setGuest(match);
    setError('');
    setStarted(true);
  }

  function choose() {
    if (step === questions.length - 1) setRevealed(true);
    else setStep((current) => current + 1);
  }

  if (!started) return (
    <main className="shell"><section className="card hero">
      <div className="eyebrow">BABYQ • TOP SECRET</div>
      <div className="bigEmoji">🤫</div>
      <h1>A little mystery<br/>before BabyQ</h1>
      <p>Enter the email address your BabyQ invite was sent to. We have something waiting for you. 👀</p>
      <form className="emailForm" onSubmit={enter}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email address" required autoComplete="email" />
        <button type="submit">Continue →</button>
      </form>
      {error && <p className="formError">{error}</p>}
      <small>One guest. One email. One secret.</small>
    </section></main>
  );

  if (!revealed) {
    const current = questions[step];
    return (
      <main className="shell"><section className="card quiz">
        <div className="eyebrow">HI {guest.name.toUpperCase()} 👋</div>
        <div className="progressText">QUESTION {step + 1} OF {questions.length}</div>
        <div className="progress"><span style={{ width: `${((step + 1) / questions.length) * 100}%` }}/></div>
        <h2>{current.q}</h2>
        <div className="answers">{current.a.map((answer, index) => (
          <button className="answer" key={answer} onClick={choose}><span>{String.fromCharCode(65 + index)}</span>{answer}</button>
        ))}</div>
        <p className="hint">Go with your first instinct. This is extremely scientific.*</p>
      </section></main>
    );
  }

  return (
    <main className="shell"><section className="card mission">
      <div className="eyebrow">{guest.name.toUpperCase()} • YOUR BABYQ SECRET</div>
      <div className="bigEmoji">✨</div>
      <p className="analysisLine">Very interesting… your answers have been carefully analysed.*</p>
      <h1>Your secret word is</h1>
      <div className="identity">{guest.word}</div>
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

      <div className="tips"><h2>The only rules</h2><div className="rulesList">
        <p>🤐 Don’t reveal your actual word.</p><p>📱 Don’t show anyone this screen.</p><p>🧠 Come prepared with your 2–4 clues.</p>
      </div></div>
      <div className="finale"><strong>Keep your word somewhere safe.</strong><br/>You’ll find out what all this is for at BabyQ. 😈</div>
    </section></main>
  );
}
