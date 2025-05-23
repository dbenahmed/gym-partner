type ValidationResult = { success: boolean; message: string };

export const validateUsername = (username: string): ValidationResult => {
  if (username.length <= 3)
    return {
      success: false,
      message: "Username must be at least 4 characters",
    };
  if (username.length > 20)
    return {
      success: false,
      message: "Username must be at most 20 characters",
    };

  if (!/^[a-zA-Z0-9_]+$/.test(username))
    return {
      success: false,
      message: "Username can only contain letters, numbers, and underscores",
    };
  return { success: true, message: "Valid username" };
};

export const validatePassword = (password: string): ValidationResult => {
  if (password.length < 8)
    return {
      success: false,
      message: "Password must be at least 8 characters",
    };
  return { success: true, message: "Valid password" };
};

export const validateEmail = (email: string): ValidationResult => {
  if (!email.includes("@"))
    return { success: false, message: "Email must include @" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { success: false, message: "Email format is invalid" };
  return { success: true, message: "Valid email" };
};

export const validateName = (name: string): ValidationResult => {
  if (name.length < 2)
    return { success: false, message: "Name must be at least 2 characters" };
  if (!/^[a-zA-Z\s]+$/.test(name))
    return {
      success: false,
      message: "Name can only contain letters and spaces",
    };
  if (name.length > 30) {
    return {
      success: false,
      message: "Name must be at most 30 characters",
    };
  }
  return { success: true, message: "Valid name" };
};

export const validateNumber = (num: string): ValidationResult => {
  if (!/^\d+$/.test(num))
    return { success: false, message: "Must be a valid number" };
  return { success: true, message: "Valid number" };
};
