import { NextResponse } from 'next/server';
import { createClient } from 'redis';

let clientPromise;
async function redis(){if(!clientPromise){const client=createClient({url:process.env.REDIS_URL});client.on('error',console.error);clientPromise=client.connect().then(()=>client).catch(e=>{clientPromise=undefined;throw e;});}return clientPromise;}

export async function POST(request){try{const {email}=await request.json();const id=String(email||'').trim().toLowerCase();if(!id)return NextResponse.json({ok:true});const r=await redis();await Promise.all([r.del(`babyq:otp:${id}`),r.del(`babyq:otp:cooldown:${id}`),r.del(`babyq:otp:attempts:${id}`)]);return NextResponse.json({ok:true});}catch(error){console.error('OTP reset error',error);return NextResponse.json({ok:false},{status:500});}}
