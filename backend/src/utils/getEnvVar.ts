const getEnvVar = (key: keyof NodeJS.ProjectEnv) : string => {
  const value = process.env[String(key)];
  if (value === undefined) {
    const message = `The environment variable "${String(key)}" is undefined.`;
    throw new Error(message);
  }

  return value;
};

export default getEnvVar;
