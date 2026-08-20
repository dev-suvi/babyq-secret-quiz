'use client';

import { useState } from 'react';

const guests = {
  'adamjones123@hotmail.co.uk': { name: 'Adam', word: 'BOARDING PASS' },
  'ashutosh.saxena23@gmail.com': { name: 'Ashu', word: 'GATE' },
  'faizamuskan.fm@gmail.com': { name: 'Muski', word: 'SUNSCREEN' },
  'gupta.sweta2403@gmail.com': { name: 'Sweta', word: 'HOTEL' },
  'kanishkakul0106@gmail.com': { name: 'Kan', word: 'COMPASS' },
  'likhithagompa@gmail.com': { name: 'Likhi', word: 'SOUVENIR' },
  'namratagupta188@gmail.com': { name: 'Nammie', word: 'BACKPACK' },
  'naveenmeher07@gmail.com': { name: 'Chintu', word: 'SECURITY' },
  'nikhiljain2112@gmail.com': { name: 'Nikhil', word: 'TRAIL' },
  'nvbadrinarayanan@gmail.com': { name: 'Badri', word: 'RUNWAY' },
  'rahulaneja687@gmail.com': { name: 'Rahul', word: 'MAP' },
  'rohit3864@gmail.com': { name: 'Ro', word: 'FLIP-FLOPS' },
  'sayan.chanda.2020@gmail.com': { name: 'Sayan', word: 'DEPARTURE' },
  'shafeeq.rahman01@gmail.com': { name: 'Shifu', word: 'BOOTS' },
  'shivisaggi@gmail.com': { name: 'Shivi', word: 'CAMERA' },
  'vrindagrover10@gmail.com': { name: 'Vrinda', word: 'SUNGLASSES' },
  'shanky442@gmail.com': { name: 'Ankur', word: 'LUGGAGE' },
  'pragyarch@gmail.com': { name: 'Pragya', word: 'WATER BOTTLE' },
  'suvarnamondal27@gmail.com': { name: 'Suvi', word: 'HIKING POLE' },
};

const questions = [
  { q: 'You’re heading somewhere new. What’s your energy?', a: ['I have a plan and a backup plan.', 'I know roughly what’s happening.', 'No plan. Maximum vibes.'] },
  { q: 'Pick your completely essential travel superpower.', a: ['Never getting lost.', 'Never forgetting anything.', 'Always finding the best food.'] },
  { q: 'The group needs someone to take charge. You…', a: ['Already have. Obviously.', 'Will help if required.', 'Suddenly become very busy. 👀'] },
];
const examples = [
  { word: 'JHUMKA', clues: ['You might wear me to a wedding.', 'I sparkle.', 'You’ll find me beside your face.'] },
  { word: 'SHAH RUKH KHAN', clues: ['I’m known for romance.', 'Arms wide open is kind of my thing.', 'You’d probably associate me with Bollywood.'] },
];

export default function Home() {
  const [email,setEmail]=useState(''); const [guest,setGuest]=useState(null); const [error,setError]=useState(''); const [loading,setLoading]=useState(false); const [step,setStep]=useState(0); const [revealed,setRevealed]=useState(false); const [returning,setReturning]=useState(false);
  async function enter(e){e.preventDefault();const id=email.trim().toLowerCase();const match=guests[id];if(!match){setError('Hmm… we can’t find that email on the BabyQ guest list. Check the email address your invite was sent to and try again. 👀');return;}setLoading(true);setError('');try{const response=await fetch('/api/guest-status',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:id})});const data=await response.json();if(!response.ok)throw new Error(data.error);setGuest({...match,email:id});if(data.completed){setReturning(true);setRevealed(true);}}catch{setError('We couldn’t check your secret just now. Please try again in a moment.');}finally{setLoading(false);}}
  async function choose(){if(step===questions.length-1){try{await fetch('/api/guest-status',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:guest.email,action:'complete'})});}catch(error){console.error('Could not save completion:',error);}setRevealed(true);}else setStep(current=>current+1);}
  function goHome(){setEmail('');setGuest(null);setError('');setLoading(false);setStep(0);setRevealed(false);setReturning(false);window.scrollTo({top:0,behavior:'smooth'});}
  if(!guest)return <main className="shell"><section className="card hero"><div className="eyebrow">BABYQ • TOP SECRET</div><div className="bigEmoji">🤫</div><h1>A little mystery<br/>before BabyQ</h1><p>Enter the email address your BabyQ invite was sent to. We have something waiting for you. 👀</p><form className="emailForm" onSubmit={enter}><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email address" required autoComplete="email"/><button type="submit" disabled={loading}>{loading?'Checking…':'Continue →'}</button></form>{error&&<p className="formError">{error}</p>}<small>One guest. One email. One secret.</small></section></main>;
  if(!revealed){const current=questions[step];return <main className="shell"><section className="card quiz"><div className="eyebrow">HELLO {guest.name.toUpperCase()}! 👋</div><p className="introLine">Before we give you your secret word, we have a few very important questions…</p><div className="progressText">QUESTION {step+1} OF {questions.length}</div><div className="progress"><span style={{width:`${((step+1)/questions.length)*100}%`}}/></div><h2>{current.q}</h2><div className="answers">{current.a.map((answer,index)=><button className="answer" key={answer} onClick={choose}><span>{String.fromCharCode(65+index)}</span>{answer}</button>)}</div><p className="hint">Go with your first instinct. Overthinking is suspicious. 👀</p></section></main>}
  return <main className="shell"><section className="card mission"><div className="eyebrow">{guest.name.toUpperCase()} • YOUR BABYQ SECRET</div><div className="bigEmoji">{returning?'👋':'✨'}</div><p className="analysisLine">{returning?`Welcome back, ${guest.name}! Here’s your secret word again.`:'Very interesting… your answers have been carefully analysed.*'}</p><h1>Your secret word is</h1><div className="identity">{guest.word}</div>{!returning&&<small>*They absolutely have not. 😂</small>}<div className="ruleBox"><h2>🤫 Your mission for now</h2><p>Create <strong>2–4 clues</strong> that describe your secret word without actually saying the word.</p><p>Come to BabyQ with your clues ready. You’ll find out what they’re for on the day. 👀</p></div><div className="examples"><h2>Need an example?</h2><p className="muted">These examples have nothing to do with your secret word.</p>{examples.map(example=><div className="example" key={example.word}><span>IF YOUR WORD WAS {example.word}</span>{example.clues.map(clue=><p key={clue}>💡 “{clue}”</p>)}</div>)}</div><div className="tips"><h2>The only rules</h2><div className="rulesList"><p>🤐 Don’t reveal your actual word to anyone.</p><p>📱 Don’t show anyone this screen.</p><p>🧠 Come prepared with your 2–4 clues.</p></div></div><div className="finale"><strong>Keep your word somewhere safe.</strong><br/>That’s all you get to know for now. See you at BabyQ. 😈</div><button className="ghost" type="button" onClick={goHome}>← Back to home</button></section></main>;
}
