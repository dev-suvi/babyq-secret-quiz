import { NextResponse } from 'next/server';
import { getCompletion, markCompleted } from '../../../lib/completion-store';

const allowed = new Set([
  'adamjones123@hotmail.co.uk','ashutosh.saxena23@gmail.com','faizamuskan.fm@gmail.com','gupta.sweta2403@gmail.com','kanishkakul0106@gmail.com','likhithagompa@gmail.com','namratagupta188@gmail.com','naveenmeher07@gmail.com','nikhiljain2112@gmail.com','nvbadrinarayanan@gmail.com','rahulaneja687@gmail.com','rohit3864@gmail.com','sayan.chanda.2020@gmail.com','shafeeq.rahman01@gmail.com','shivisaggi@gmail.com','vrindagrover10@gmail.com','shanky442@gmail.com','pragyarch@gmail.com'
]);

function normalise(email) { return String(email || '').trim().toLowerCase(); }

export async function POST(request) {
  try {
    const { email, action = 'check' } = await request.json();
    const id = normalise(email);
    if (!allowed.has(id)) return NextResponse.json({ ok: false }, { status: 404 });
    if (action === 'complete') {
      const completion = await markCompleted(id);
      return NextResponse.json({ ok: true, completed: true, completedAt: completion.completedAt });
    }
    const completion = await getCompletion(id);
    return NextResponse.json({ ok: true, completed: Boolean(completion?.completed), completedAt: completion?.completedAt || null });
  } catch (error) {
    console.error('Guest status error:', error);
    return NextResponse.json({ ok: false, error: 'Could not check completion status.' }, { status: 500 });
  }
}
