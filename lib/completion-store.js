import { createClient } from 'redis';

let clientPromise;

async function getClient() {
  const url = process.env.REDIS_URL;
  if (!url) throw new Error('REDIS_URL is not configured.');
  if (!clientPromise) {
    const client = createClient({ url });
    client.on('error', (error) => console.error('Redis client error:', error));
    clientPromise = client.connect().then(() => client).catch((error) => { clientPromise = undefined; throw error; });
  }
  return clientPromise;
}

// Sayan uses v2 so his previous test completion is ignored and he can run the flow again.
const key = (email) => {
  const normalized = email.trim().toLowerCase();
  const version = normalized === 'sayan.chanda.2020@gmail.com' ? 'v2:' : '';
  return `babyq:completed:${version}${normalized}`;
};

export async function getCompletion(email) {
  const client = await getClient();
  const value = await client.get(key(email));
  if (!value) return null;
  try { return JSON.parse(value); } catch { return { completed: true }; }
}

export async function markCompleted(email) {
  const client = await getClient();
  const record = { completed: true, completedAt: new Date().toISOString() };
  await client.set(key(email), JSON.stringify(record));
  return record;
}

export async function getCompletionMap(emails) {
  const client = await getClient();
  const values = await client.mGet(emails.map(key));
  return Object.fromEntries(emails.map((email, index) => {
    const value = values[index];
    if (!value) return [email, null];
    try { return [email, JSON.parse(value)]; } catch { return [email, { completed: true }]; }
  }));
}
