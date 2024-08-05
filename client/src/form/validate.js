import validator from "validator";

export const validateName = (name) => {
  if (name.trim() === "") {
    return "Name is required.";
  }
  return "";
};

export const validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    return "Invalid email format.";
  }
  return "";
};

export const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return "Password must contain at least one uppercase letter and one number.";
  }
  return "";
};
