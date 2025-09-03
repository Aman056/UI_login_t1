// Validation helpers according to assignment rules

export function validateName(name) {
  if (!name) return 'Name is required';
  const re = /^[A-Za-z ]+$/;
  return re.test(name) ? '' : 'Only alphabets and spaces are allowed';
}

// Alphanumeric with special characters (limit to safe set)
export function validateUsername(username) {
  if (!username) return 'Username is required';
  const re = /^[A-Za-z0-9._@#-]{3,30}$/;
  return re.test(username) ? '' : 'Use 3-30 chars: letters, numbers, . _ @ # -';
}

export function validatePassword(password, username) {
  if (!password) return 'Password is required';
  const re = /^[A-Za-z0-9._@#-]{6,64}$/;
  if (!re.test(password)) return 'Use 6-64 chars: letters, numbers, . _ @ # -';
  if (username && password === username) return 'Password must not be same as username';
  return '';
}

export function validateConfirm(confirm, password) {
  if (!confirm) return 'Please confirm your password';
  return confirm === password ? '' : 'Passwords do not match';
}

// "Same as Google email" -> restrict to @gmail.com
export function validateEmail(email) {
  if (!email) return 'Email is required';
  const re = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
  return re.test(email) ? '' : 'Enter a valid @gmail.com address';
}

// Phone: Country code + number, digits only with optional space, e.g., +91 9876543210
export function validatePhone(phone) {
  if (!phone) return 'Phone is required';
  const re = /^\+\d{1,3}\s?\d{7,14}$/;
  return re.test(phone) ? '' : 'Use +<country code> <number>, digits only';
}
