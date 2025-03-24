import { signToken } from "@/lib/joseToken";
import { sendVerificationEmail } from "@/lib/nodeMailer";
import { Auth } from "@/models/auth";
import { User } from "@/models/user";

export async function createOrFindUser(email, password) {
  const newCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  try {
    const [user, _] = await User.findOrCreate({
      where: { email },
      defaults: { password: password || null },
    });
    console.log(_);
    

    const [auth, authCreated] = await Auth.findOrCreate({
      where: { userId: user.get("id") },
      defaults: { email, verificationCode: newCode, codeUsed: false, userId: user.get("id") },
    });

    if (!authCreated) {
      // Si el registro de autenticación ya existe, actualiza el código
      await Auth.update({ verificationCode: newCode, codeUsed: false }, { where: { userId: user.get("id") } });
    }

    await sendVerificationEmail(email, newCode);

    return { user, auth };
  } catch (error) {
    console.error("Error en createOrFindUser:", error);
    throw error;
  }
}

export async function generateNewCode(code, email) {
  try {
    await Auth.update({ codeUsed: false, verificationCode: code }, { where: { email } });
    await sendVerificationEmail(email, code);
  } catch (error) {
    console.error("Error en generateNewCode:", error);
    throw error;
  }
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
  return { token };
};

export const changeStatusCode = async (email) => {
  await Auth.update({ codeUsed: true }, { where: { email } });
};