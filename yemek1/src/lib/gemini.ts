import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const TURKISH_DISHES = [
  'Karnıyarık',
  'İmam Bayıldı',
  'Mantı',
  'Mercimek Çorbası',
  'Kuru Fasulye',
  'İskender Kebap',
  'Patlıcan Musakka',
  'Zeytinyağlı Dolma',
  'Lahmacun',
  'Pide',
  'Menemen',
  'Çiğ Köfte',
  'Ali Nazik',
  'Hünkar Beğendi',
  'Kısır'
];

export async function getRecipeRecommendations(ingredients: string[], preferences: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Randomly select a Turkish dish if no ingredients are specified
    const suggestedDish = ingredients.length === 0 
      ? TURKISH_DISHES[Math.floor(Math.random() * TURKISH_DISHES.length)]
      : null;

    const prompt = `${suggestedDish 
      ? `Lütfen ${suggestedDish} tarifini ver.`
      : `Bana şu malzemelerle yapılabilecek bir Türk yemek tarifi öner: ${ingredients.join(', ')}.`
    }
    ${preferences ? `Kullanıcı tercihleri: ${preferences}` : ''}
    
    Lütfen şu formatta yanıt ver:
    {
      "name": "Tarif adı",
      "ingredients": ["Malzeme 1 ve miktarı", "Malzeme 2 ve miktarı"],
      "instructions": ["Adım 1", "Adım 2"],
      "prepTime": "Hazırlık süresi",
      "cookTime": "Pişirme süresi",
      "difficulty": "Zorluk seviyesi (Kolay/Orta/Zor)",
      "nutritionInfo": {
        "calories": "Kalori (100g için)",
        "protein": "Protein miktarı",
        "carbs": "Karbonhidrat miktarı",
        "fat": "Yağ miktarı"
      }
    }
    
    Lütfen tüm değerleri Türkçe olarak ver ve tarifi detaylı açıkla.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean and parse the response
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('Recipe generation error:', error);
    throw error;
  }
}