import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from 'redis';
import { getCompletion, markCompleted } from '../../../lib/completion-store';

const allowed = new Set(['adamjones123@hotmail.co.uk','ashutosh.saxena23@gmail.com','faizamuskan.fm@gmail.com','gupta.sweta2403@gmail.com','kanishkakul0106@gmail.com','likhithagompa@gmail.com','namratagupta188@gmail.com','naveenmeher07@gmail.com','nikhiljain2112@gmail.com','nvbadrinarayanan@gmail.com','rahulaneja687@gmail.com','rohit3864@gmail.com','sayan.chanda.2020@gmail.com','shafeeq.rahman01@gmail.com','shivisaggi@gmail.com','vrindagrover10@gmail.com','shanky442@gmail.com','pragyarch@gmail.com','suvarnamondal27@gmail.com']);
let clientPromise;
async function redis(){if(!clientPromise){const client=createClient({url:process.env.REDIS_URL});client.on('error',console.error);clientPromise=client.connect().then(()=>client).catch(e=>{clientPromise=undefined;throw e;});}return clientPromise;}
function normalise(email){return String(email||'').trim().toLowerCase();}
async function isVerified(email){const cookieStore=await cookies();const token=cookieStore.get('babyq_verified')?.value;if(!token)return false;const r=await redis();return (await r.get(`babyq:verified:${token}`))===email;}
export async function POST(request){try{const {email,action='check'}=await request.json();const id=normalise(email);if(!allowed.has(id))return NextResponse.json({ok:false},{status:404});if(!(await isVerified(id)))return NextResponse.json({ok:false,error:'Email verification required.'},{status:401});if(action==='complete'){const completion=await markCompleted(id);return NextResponse.json({ok:true,completed:true,completedAt:completion.completedAt});}const completion=await getCompletion(id);return NextResponse.json({ok:true,completed:Boolean(completion?.completed),completedAt:completion?.completedAt||null});}catch(error){console.error('Guest status error:',error);return NextResponse.json({ok:false,error:'Could not check completion status.'},{status:500});}}
