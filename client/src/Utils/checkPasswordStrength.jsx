const checkPasswordStrength = (password) => {
  const strongRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/
  );

  const mediumRegex = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );

  let score = 0;

  if (!password) return "";

  // Check password length
  if (password.length > 8) score += 1;

  // Contains lowercase
  if (/[a-z]/.test(password)) score += 1;

  // Contains uppercase
  if (/[A-Z]/.test(password)) score += 1;

  // Contains numbers
  if (/\d/.test(password)) score += 1;

  // Contains special characters
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (true) {
    case score >= 4 && strongRegex.test(password):
      return "Password is strong.";
    case score >= 3:
      return "Password is of medium strength";
    default:
      return "Password is very weak, kindly add numbers, symbols";
  }
};

export default checkPasswordStrength;
