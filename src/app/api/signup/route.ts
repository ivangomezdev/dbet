
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
    
    if (!email) {
      return NextResponse.json({ error: 'Email es obligatorio' }, { status: 400 });
    }

    
    const password = body.password
    createOrFindUser(email,password || null)

    return NextResponse.json({ message: 'Código enviado al correo' }, { status: 200 });
    
  } catch {
    console.error('Error en signup:');
    return NextResponse.json(
      { error: 'Error al procesar la solicitud', details:" error.message" },
      { status: 500 }
    );
  }

}

