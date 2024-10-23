import React from 'react';
import { Clock, ChefHat, Gauge } from 'lucide-react';

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  difficulty: string;
  nutritionInfo: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">{recipe.name}</h2>
        
        <div className="flex items-center gap-4 mb-6 text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>Hazırlık: {recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5" />
            <span>Pişirme: {recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            <span>Zorluk: {recipe.difficulty}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-3">Malzemeler</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-3">Besin Değerleri</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Kalori</p>
                <p className="font-semibold">{recipe.nutritionInfo.calories}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Protein</p>
                <p className="font-semibold">{recipe.nutritionInfo.protein}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Karbonhidrat</p>
                <p className="font-semibold">{recipe.nutritionInfo.carbs}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Yağ</p>
                <p className="font-semibold">{recipe.nutritionInfo.fat}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-red-600 mb-3">Hazırlanışı</h3>
          <ol className="space-y-3">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-700 font-semibold">
                  {index + 1}
                </span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}