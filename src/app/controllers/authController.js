// src/lib/auth.js (o donde lo tengas)
import { signToken } from "@/lib/joseToken";
import { sendVerificationEmail } from "@/lib/nodeMailer";
import { Auth } from "@/models/auth";
import { User } from "@/models/user";

// Crea o encuentra un usuario y envía un código al Email
export async function createOrFindUser(email, password) {
  const newCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000; // Código aleatorio
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      password: password,
    },
  });

  const [auth, authCreated] = await Auth.findOrCreate({
    where: { userId: user.get("id") },
    defaults: {
      email,
      verificationCode: newCode,
      codeUsed: false,
      userId: user.get("id"),
    },
  });

  if (created && authCreated) {
    console.log("CREADO");
    await sendVerificationEmail(email, newCode);
  } else if (auth) {
    generateNewCode(newCode, email);
  }
}

export async function generateNewCode(code, email) {
  await Auth.update(
    { codeUsed: false, verificationCode: code },
    {
      where: {
        email,
      },
    }
  );

  sendVerificationEmail(email, code);
}

export const validateCode = async (code, email) => {
  const validate = await Auth.findOne({ where: { verificationCode: code } });
  const authId = validate?.get("userId");
  const validateUser = await User.findOne({ where: { id: authId } });

  const validateUserData = validateUser?.get();
  console.log(validateUserData);

  if (!validate || !validateUser) {
    return { error: "❌ Código incorrecto" };
  }

  await changeStatusCode(email);

  const token = await signToken(validateUserData);
  return { token }; // Devuelve el token si el código es válido
};

export const changeStatusCode = async (email) => {
  await Auth.update(
    { codeUsed: true },
    {
      where: {
        email: email,
      },
    }
  );
};