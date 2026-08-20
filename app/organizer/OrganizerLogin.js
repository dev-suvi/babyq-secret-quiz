'use client';

import { useState } from 'react';

export default function OrganizerLogin({ teams }) {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [completions, setCompletions] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadStatus() {
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/organizer-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || 'Could not unlock organizer mode.');
      setCompletions(data.completions || {}); setUnlocked(true);
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  }

  async function login(e) { e.preventDefault(); await loadStatus(); }
  const completedCount = Object.values(completions).filter((item) => item?.completed).length;

  if (!unlocked) return <main className="shell"><section className="card hero">
    <div className="eyebrow">BABYQ • ORGANIZERS ONLY</div><div className="bigEmoji">🔐</div><h1>Organizer<br/>HQ</h1><p>This page contains spoilers. Guests: absolutely not. 😂</p>
    <form className="emailForm" onSubmit={login}><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Organizer password" required/><button type="submit" disabled={loading}>{loading ? 'Loading…' : 'Unlock →'}</button></form>{error && <p className="formError">{error}</p>}
  </section></main>;

  return <main className="organizerShell"><section className="organizerHeader"><div className="eyebrow">BABYQ • ORGANIZER HQ</div><h1>Secret Team Dashboard 🤫</h1><p><strong>{completedCount} / 18 completed</strong> • 3 teams • couples separated</p><button className="ghost" onClick={loadStatus} disabled={loading}>{loading ? 'Refreshing…' : '↻ Refresh status'}</button></section>
    <section className="teamGrid">{teams.map((team) => <article className="teamCard" key={team.category}><div className="teamEmoji">{team.emoji}</div><h2>{team.category}</h2>{team.members.map(([name,word,email]) => { const done = completions[email]?.completed; return <div className="member" key={email}><strong>{done ? '✅' : '○'} {name}</strong><span>{word}</span></div>; })}</article>)}</section>
    <section className="card gameGuide"><div className="eyebrow">GAME DAY • KEEP SECRET</div><h2>How to reveal the game</h2><ol><li>Ask everyone to remember the secret word and clues they prepared.</li><li>Reveal that their words belong to three hidden categories.</li><li>They must mingle using clues only and find the five people in their category.</li><li>Once six people think they belong together, they work out their category.</li><li>Each group chooses ONE person to announce the answer.</li><li>After all three answers are revealed, announce the twist: the three revealers win the surprise gifts. 🎁😈</li></ol></section>
  </main>;
}
