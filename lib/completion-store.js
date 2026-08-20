function config() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error('Redis storage environment variables are not configured.');
  return { url: url.replace(/\/$/, ''), token };
}

async function command(args) {
  const { url, token } = config();
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Storage request failed (${response.status}).`);
  const data = await response.json();
  return data.result;
}

const key = (email) => `babyq:completed:${email.trim().toLowerCase()}`;

export async function getCompletion(email) {
  const value = await command(['GET', key(email)]);
  if (!value) return null;
  try { return JSON.parse(value); } catch { return { completed: true }; }
}

export async function markCompleted(email) {
  const record = { completed: true, completedAt: new Date().toISOString() };
  await command(['SET', key(email), JSON.stringify(record)]);
  return record;
}

export async function getCompletionMap(emails) {
  const entries = await Promise.all(emails.map(async (email) => [email, await getCompletion(email)]));
  return Object.fromEntries(entries);
}
