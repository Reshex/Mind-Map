export default function isValidPassword(password: string) {
  const minLength = 8;
  const hasNumber = /[0-9]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);

  return password.length >= minLength && hasNumber && hasUppercase;
}
