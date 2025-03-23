import { signToken } from "@/lib/joseToken";
import { sendVerificationEmail } from "@/lib/nodeMailer";
import { Auth } from "@/models/auth";
import { User } from "@/models/user";

//crea o encuentra un usuario y envia un codigo al Email
export async function createOrFindUser(email: string, password: string) {
  const newCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000; // codigo aleatorio
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
        password: password,
       
      },
  });

  const [auth, authCreated] = await Auth.findOrCreate({
    where: { userId:user.get("id") },
    defaults: {
        email,
        verificationCode: newCode,
        codeUsed: false,
        userId: user.get("id")
      },
  });
  

  if (created && authCreated) {
    console.log("CREADO"); 
    sendVerificationEmail(email,newCode) 
  }else if(auth){
   generateNewCode(newCode,email)
  }

}


export async function generateNewCode(code:number,email:string){
  await Auth.update(
    { codeUsed: false, verificationCode: code },
    {
      where: {
        email
      },
    },
  );

  sendVerificationEmail(email,code)
}

export const validateCode = async (code: number, email: string) => {
  const validate = await Auth.findOne({ where: { verificationCode: code } });
  if (!validate) {
    return { error: "❌ Código incorrecto" };
  }

  const authId = validate.get("id") as string;
  await changeStatusCode(email);

  const token = await signToken(authId);
  return { token }; // Devuelve el token si el código es válido
};


export const changeStatusCode = async (email: string) => {
  await Auth.update(
    { codeUsed: true },
    {
      where: {
        email: email,
      },
    }
  );
};