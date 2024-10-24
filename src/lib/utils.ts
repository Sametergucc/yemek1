type ClassValue = string | number | boolean | undefined | null;
type ClassArray = ClassValue[];
type ClassDictionary = Record<string, any>;
type ClassProp = ClassValue | ClassArray | ClassDictionary;

export function cn(...inputs: ClassProp[]): string {
  const classes = inputs.filter(Boolean);
  return classes.join(' ');
}

export function validateIngredient(ingredient: string): string | null {
  if (!ingredient.trim()) {
    return 'Malzeme boş olamaz';
  }
  if (ingredient.length < 2) {
    return 'Malzeme en az 2 karakter olmalıdır';
  }
  return null;
}

export function validatePreferences(preferences: string): string | null {
  if (preferences.length > 500) {
    return 'Tercihler 500 karakterden uzun olamaz';
  }
  return null;
}