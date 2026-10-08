import { NextResponse, type NextRequest } from 'next/server';
import { COOKIE_COMITE, empreinteCode } from '@/lib/acces-comite';

export async function POST(request: NextRequest) {
  const code = process.env.CODE_ACCES_COMITE;
  const saisi = String((await request.formData()).get('code') ?? '').trim();

  if (!code || !saisi || (await empreinteCode(saisi)) !== (await empreinteCode(code))) {
    return NextResponse.redirect(new URL('/?acces=refuse', request.url), 303);
  }

  const response = NextResponse.redirect(new URL('/', request.url), 303);
  response.cookies.set(COOKIE_COMITE, await empreinteCode(code), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 60,
  });
  return response;
}
