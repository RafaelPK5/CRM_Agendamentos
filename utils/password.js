import bcrypt from "bcrypt";

/**
 * Gera um hash para uma senha fornecida.
 * @param {string}
 * @returns {string}
 */
export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

/**
 * Compara uma senha em texto puro com um hash.
 * @param {string}
 * @param {string}
 * @returns {boolean}
 */
export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
