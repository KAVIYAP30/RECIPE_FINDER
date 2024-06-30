import React, { useEffect, useState } from 'react';

function TN() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://mocki.io/v1/67388493-9487-48a0-bddc-11ff227c316e')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Log entire data
        if (Array.isArray(data)) { // Check if data is an array directly
          setRecipes(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-500">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search recipes..."
          className="mb-4 p-2 border rounded"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
                <div className="text-gray-600 mb-2">
                  <strong>Ingredients:</strong>
                  <ul className="list-disc ml-5">
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-gray-600">
                  <strong>Cooking Instructions:</strong>
                  <ol className="list-decimal ml-5">
                    {recipe.instructions.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No recipes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TN;
