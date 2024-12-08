export const extractIdAfterHas = (uri) => {
  let posOfHas = uri.indexOf("#");
  let extractedId = uri.slice(posOfHas + 1);
  return extractedId;
};

export const extractRecipeData = (data) => {
  let tempRecipes = data.hits.map((tempRecipe) => {
    return {
      id: extractIdAfterHas(tempRecipe.recipe.uri), // Example : recipe_3f40351ef85b4323b4c9bf654355cafe
      name: tempRecipe.recipe.label,
      image: tempRecipe.recipe.image,
      images: tempRecipe.recipe.images,
      source_url: tempRecipe.recipe.url,
      healthLabels: tempRecipe.recipe.healthLabels,
      ingredientLines: tempRecipe.recipe.ingredientLines,
      ingredients: tempRecipe.recipe.ingredients,
      calories: tempRecipe.recipe.calories,
      totalWeight: tempRecipe.recipe.totalWeight,
      totalTime: tempRecipe.recipe.totalTime,
      cuisineType: tempRecipe.recipe.cuisineType,
      dishType: tempRecipe.recipe.dishType,
      mealType: tempRecipe.recipe.mealType,
      nutrients: tempRecipe.recipe.totalNutrients,
    };
  });
  //   console.log(tempRecipes);
  return {
    data: tempRecipes,
    nextPage: data?._links?.next?.href,
  };
};

export const extractSingleRecipeData = (data) => {
  let tempRecipe = {
    id: extractIdAfterHas(data.recipe.uri), // Example : recipe_3f40351ef85b4323b4c9bf654355cafe
    name: data.recipe.label,
    image: data.recipe.image,
    images: data.recipe.images,
    source_url: data.recipe.url,
    healthLabels: data.recipe.healthLabels,
    ingredientLines: data.recipe.ingredientLines,
    ingredients: data.recipe.ingredients,
    calories: data.recipe.calories,
    totalWeight: data.recipe.totalWeight,
    totalTime: data.recipe.totalTime,
    cuisineType: data.recipe.cuisineType,
    dishType: data.recipe.dishType,
    mealType: data.recipe.mealType,
    nutrients: data.recipe.totalNutrients,
  };
  return tempRecipe;
};
