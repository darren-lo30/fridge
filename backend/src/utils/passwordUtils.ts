import bcrypt from 'bcrypt';

const hashPassword = async (password: string) => {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);

  return bcrypt.hash(password, salt);
};

const isValidPassword = async (
  password: string,
  hash: string,
) => bcrypt.compare(password, hash);

export {
  hashPassword,
  isValidPassword,
};
