import { NextResponse } from 'next/server';
import { getCompletionMap } from '../../../lib/completion-store';

const emails = ['adamjones123@hotmail.co.uk','ashutosh.saxena23@gmail.com','faizamuskan.fm@gmail.com','gupta.sweta2403@gmail.com','kanishkakul0106@gmail.com','likhithagompa@gmail.com','namratagupta188@gmail.com','naveenmeher07@gmail.com','nikhiljain2112@gmail.com','nvbadrinarayanan@gmail.com','rahulaneja687@gmail.com','rohit3864@gmail.com','sayan.chanda.2020@gmail.com','shafeeq.rahman01@gmail.com','shivisaggi@gmail.com','vrindagrover10@gmail.com','shanky442@gmail.com','pragyarch@gmail.com','suvarnamondal27@gmail.com'];

export async function POST(request) {
  const { password } = await request.json();
  const expected = process.env.Organizer_Password;
  if (!expected) return NextResponse.json({ ok: false, error: 'Organizer password is not configured.' }, { status: 500 });
  if (password !== expected) return NextResponse.json({ ok: false, error: 'Wrong password. Nice try though. 👀' }, { status: 401 });
  try {
    const completions = await getCompletionMap(emails);
    return NextResponse.json({ ok: true, completions });
  } catch (error) {
    console.error('Organizer completion status error:', error);
    return NextResponse.json({ ok: false, error: 'Could not load guest completion status.' }, { status: 500 });
  }
}
