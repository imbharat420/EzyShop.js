export const getFindUserQuery = (login:string) => {
  if (typeof login !== 'string') throw new Error('Login must be a string');
  return login.includes('@') ? { email: login } : { username: login };
};
