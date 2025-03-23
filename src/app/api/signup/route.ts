
import { createOrFindUser } from '@/app/controllers/authController';
import { Auth } from '@/models/auth';
import { User } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    User.sync({alter:true})
    Auth.sync({alter:true})
    const body = await request.json();
    const email = body.email;
    const password = body.password
    createOrFindUser(email,password)
    
  } catch (error) {
    console.error(error);
    
  }

  
  return NextResponse.json({ message: 'Auth OK' });
}

