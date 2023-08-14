import bcrypt from "bcrypt";

// hash password

const salt = 10;
export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, salt);

export const verifyPassword = async (
  plainPasswordText: string,
  userHashedPassword: string
) => await bcrypt.compare(plainPasswordText, userHashedPassword);
