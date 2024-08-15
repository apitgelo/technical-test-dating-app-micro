export const USER_EXISTS = (email: string) => {
  return `User with email ${email} already exists`;
};

export const USER_NOT_FOUND = (email: string) => {
  return `User with email ${email} not found`;
}

export const INVALID_CREDENTIALS = 'Invalid credentials';
