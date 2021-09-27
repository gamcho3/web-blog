import { hash, compare } from "bcryptjs";

export const hashPassword = (password) => {
  const hashedPassword = hash(password, 12);
  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};