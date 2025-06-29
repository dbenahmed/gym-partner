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
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    console.log("invalid");
    return {
      success: false,
      message: "Name can only contain letters and spaces",
    };
  }
  if (name.length > 30) {
    return {
      success: false,
      message: "Name must be at most 30 characters",
    };
  }
  return { success: true, message: "Valid name" };
};

export const validateNameWithNumbers = (name: string): ValidationResult => {
  if (name.length < 2)
    return { success: false, message: "Name must be at least 2 characters" };
  if (!/^[a-zA-Z0-9\s]+$/.test(name))
    return {
      success: false,
      message: "Name can only contain letters, numbers, and spaces",
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
// Validation function for Fat (grams)
function validateFat(nbFat: any): ValidationResult {
  if (nbFat === undefined || nbFat === null) {
    return {
      success: false,
      message:
        "Fat value is required. Please enter the amount of fat in grams.",
    };
  }
  if (nbFat === "") {
    return {
      success: false,
      message:
        "Fat value cannot be empty. Please enter the amount of fat in grams.",
    };
  }
  const fatValue = Number(nbFat);
  if (isNaN(fatValue)) {
    return {
      success: false,
      message:
        "Fat value must be a valid number. Please enter a numeric value for fat in grams.",
    };
  }
  if (fatValue < 0) {
    return {
      success: false,
      message:
        "Fat value cannot be negative. Please enter a positive number for fat in grams.",
    };
  }
  if (!Number.isInteger(fatValue)) {
    return {
      success: false,
      message:
        "Fat value must be a whole number. Please enter an integer value for fat in grams.",
    };
  }
  if (fatValue > 1000) {
    return {
      success: false,
      message:
        "Fat value seems unusually high. Please verify the amount of fat in grams (maximum 1000g).",
    };
  }
  return { success: true, message: "Valid fat value" };
}

// Validation function for Calories (kcal)
function validateKcal(nbKcal: any): ValidationResult {
  if (nbKcal === undefined || nbKcal === null) {
    return {
      success: false,
      message:
        "Calorie value is required. Please enter the number of calories (kcal).",
    };
  }
  if (nbKcal === "") {
    return {
      success: false,
      message:
        "Calorie value cannot be empty. Please enter the number of calories (kcal).",
    };
  }
  const kcalValue = Number(nbKcal);
  if (isNaN(kcalValue)) {
    return {
      success: false,
      message:
        "Calorie value must be a valid number. Please enter a numeric value for calories (kcal).",
    };
  }
  if (kcalValue < 0) {
    return {
      success: false,
      message:
        "Calorie value cannot be negative. Please enter a positive number for calories (kcal).",
    };
  }
  if (!Number.isInteger(kcalValue)) {
    return {
      success: false,
      message:
        "Calorie value must be a whole number. Please enter an integer value for calories (kcal).",
    };
  }
  if (kcalValue > 10000) {
    return {
      success: false,
      message:
        "Calorie value seems unusually high. Please verify the number of calories (maximum 10,000 kcal).",
    };
  }
  return { success: true, message: "Valid calorie value" };
}

// Validation function for Protein (grams)
function validateProtein(nbProt: any): ValidationResult {
  if (nbProt === undefined || nbProt === null) {
    return {
      success: false,
      message:
        "Protein value is required. Please enter the amount of protein in grams.",
    };
  }
  if (nbProt === "") {
    return {
      success: false,
      message:
        "Protein value cannot be empty. Please enter the amount of protein in grams.",
    };
  }
  const protValue = Number(nbProt);
  if (isNaN(protValue)) {
    return {
      success: false,
      message:
        "Protein value must be a valid number. Please enter a numeric value for protein in grams.",
    };
  }
  if (protValue < 0) {
    return {
      success: false,
      message:
        "Protein value cannot be negative. Please enter a positive number for protein in grams.",
    };
  }
  if (!Number.isInteger(protValue)) {
    return {
      success: false,
      message:
        "Protein value must be a whole number. Please enter an integer value for protein in grams.",
    };
  }
  if (protValue > 500) {
    return {
      success: false,
      message:
        "Protein value seems unusually high. Please verify the amount of protein in grams (maximum 500g).",
    };
  }
  return { success: true, message: "Valid protein value" };
}

// Validation function for Carbohydrates (grams)
function validateCarbs(nbCarbs: any): ValidationResult {
  if (nbCarbs === undefined || nbCarbs === null) {
    return {
      success: false,
      message:
        "Carbohydrate value is required. Please enter the amount of carbohydrates in grams.",
    };
  }
  if (nbCarbs === "") {
    return {
      success: false,
      message:
        "Carbohydrate value cannot be empty. Please enter the amount of carbohydrates in grams.",
    };
  }
  const carbsValue = Number(nbCarbs);
  if (isNaN(carbsValue)) {
    return {
      success: false,
      message:
        "Carbohydrate value must be a valid number. Please enter a numeric value for carbohydrates in grams.",
    };
  }
  if (carbsValue < 0) {
    return {
      success: false,
      message:
        "Carbohydrate value cannot be negative. Please enter a positive number for carbohydrates in grams.",
    };
  }
  if (!Number.isInteger(carbsValue)) {
    return {
      success: false,
      message:
        "Carbohydrate value must be a whole number. Please enter an integer value for carbohydrates in grams.",
    };
  }
  if (carbsValue > 1000) {
    return {
      success: false,
      message:
        "Carbohydrate value seems unusually high. Please verify the amount of carbohydrates in grams (maximum 1000g).",
    };
  }
  return { success: true, message: "Valid carbohydrate value" };
}

// Master validation function to validate all fields at once
export function validateAllNutrition(
  nbFat: any,
  nbKcal: any,
  nbProt: any,
  nbCarbs: any
): ValidationResult {
  const fatResult = validateFat(nbFat);
  if (!fatResult.success) return fatResult;

  const kcalResult = validateKcal(nbKcal);
  if (!kcalResult.success) return kcalResult;

  const protResult = validateProtein(nbProt);
  if (!protResult.success) return protResult;

  const carbsResult = validateCarbs(nbCarbs);
  if (!carbsResult.success) return carbsResult;

  if (nbFat === 0 && nbKcal === 0 && nbProt === 0 && nbCarbs === 0) {
    return {
      success: false,
      message: "At least one nutrition value must be greater than zero",
    };
  }

  return { success: true, message: "All nutrition values are valid" };
}
