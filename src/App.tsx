import React, { useState } from 'react';
import { ChefHat, Plus, X } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { getRecipeRecommendations } from './lib/gemini';
import { RecipeCard } from './components/RecipeCard';
import { Input } from './components/Input';
import { validateIngredient, validatePreferences } from './lib/utils';

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [preferences, setPreferences] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addIngredient = () => {
    const validationError = validateIngredient(currentIngredient);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIngredients([...ingredients, currentIngredient.trim()]);
    setCurrentIngredient('');
    setError(null);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.length === 0) {
      toast.error('Lütfen en az bir malzeme ekleyin');
      return;
    }

    const preferencesError = validatePreferences(preferences);
    if (preferencesError) {
      toast.error(preferencesError);
      return;
    }

    setLoading(true);
    try {
      const result = await getRecipeRecommendations(ingredients, preferences);
      setRecipe(result);
      toast.success('Tarif başarıyla oluşturuldu!');
    } catch (error) {
      toast.error('Tarif önerisi alınırken bir hata oluştu');
      console.error('Recipe error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <Toaster position="top-center" />
      
      <header className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <ChefHat className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Kırmızı Lezzetler</h1>
          </div>
          <p className="mt-2 text-brand-100">Yapay zeka destekli kişisel tarif asistanınız</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex gap-2 mb-2">
                <Input
                  label="Malzemeler"
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  placeholder="Malzeme ekleyin"
                  error={error}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                />
                <button
                  type="button"
                  onClick={addIngredient}
                  className="mt-6 bg-brand-600 text-white p-2 rounded-lg hover:bg-brand-700 transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {ingredient}
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="text-brand-600 hover:text-brand-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Tercihler ve Kısıtlamalar
              </label>
              <textarea
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="form-textarea w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                placeholder="Örn: Vejetaryen, glütensiz, az yağlı vb."
                rows={3}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Tarif Hazırlanıyor...' : 'Tarif Öner'}
            </button>
          </form>
        </div>

        {recipe && <RecipeCard recipe={recipe} />}
      </main>
    </div>
  );
}

export default App;