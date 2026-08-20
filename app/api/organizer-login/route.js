import { NextResponse } from 'next/server';

export async function POST(request) {
  const { password } = await request.json();
  const expected = process.env.Organizer_Password;

  if (!expected) {
    return NextResponse.json({ ok: false, error: 'Organizer password is not configured.' }, { status: 500 });
  }

  if (password !== expected) {
    return NextResponse.json({ ok: false, error: 'Wrong password. Nice try though. 👀' }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
