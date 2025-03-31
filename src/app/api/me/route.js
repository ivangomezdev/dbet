
import { editUser } from '@/app/controllers/meControllers';
import {  getUserIdFromToken } from '@/lib/joseToken';
import { Auth } from '@/models/auth';
import { User } from '@/models/user';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request) {
    try {
      await User.sync({ alter: true });
      await Auth.sync({ alter: true });
  
      // Extraer el token del encabezado Authorization
      const authHeader = request.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "No token provided" }, { status: 401 });
      }
      const token = authHeader.split(" ")[1]; // Extrae el token después de "Bearer"
  
      const userByToken = await getUserIdFromToken(token);
      const session = await getServerSession(authOptions);
      console.log("Session data:", session);
      if (session) {
        const user = await User.findOne({where:{email:session?.user.id}})
        return NextResponse.json({ message: "Auth OK", userData: { user } });
      }else{
        const user = await User.findOne({where:{email:userByToken?.userId.email}})
        return NextResponse.json({ message: "Auth OK", userData: { user } });
      }
      

    } catch (error) {
      console.error("Error en la ruta /api/me:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }



export async function POST(request) {
  try {
    await User.sync({ alter: true });
    const body = await request.json();
    console.log(body,"ESTO ES LO QUE LLEGA");
    
    
    await editUser(body); 
    console.log("Usuario editado con email:", body.email);
    
    return NextResponse.json({ message: "Edit OK" });
  } catch (error) {
    console.error("Error en la ruta /api/edit-user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}