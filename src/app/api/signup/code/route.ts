import { validateCode } from "@/app/controllers/authController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const { codeVal, email } = await request.json();
        const result = await validateCode(codeVal, email);
    
        if (result.error) {
          return NextResponse.json({ error: result.error }, { status: 400 });
        }
        console.log(result.token);
        
        return NextResponse.json({ token: result.token });
      } catch{
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
      }



}