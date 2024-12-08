import { createAsyncThunk } from "@reduxjs/toolkit";
import { APP_ID, APP_KEY } from "../../api/apiConstants";
import fetchData from "../../api/axios";
import {
  extractRecipeData,
  extractSingleRecipeData,
} from "../../utils/helpers";

/**
 * Fetch recipes with caching
 */
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (queryText = "chicken") => {
    if (!queryText.trim()) {
      throw new Error("Query text cannot be empty.");
    }

    // Check if data is cached
    const cachedData = localStorage.getItem(queryText);

    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        return extractRecipeData(parsedData); // Ensure consistency
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        console.warn("Failed to parse cached data. Fetching new data...");
      }
    }

    try {
      const { data } = await fetchData(
        `?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${queryText}`
      );
      const recipesData = extractRecipeData(data);

      // Cache the fetched data
      localStorage.setItem(queryText, JSON.stringify(data));

      return recipesData;
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
      throw new Error("Failed to fetch recipes. Please try again later.");
    }
  }
);

/**
 * Fetch search or paginated recipes
 */
export const fetchSearchRecipe = createAsyncThunk(
  "recipes/fetchSearchRecipes",
  async ({ queryText, nextPageLink }) => {
    if (!queryText?.trim() && !nextPageLink) {
      throw new Error("Invalid query or nextPageLink provided.");
    }

    const cacheKey = nextPageLink || `search_${queryText.trim()}`;

    // Check for cached data in localStorage
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        // console.info("Serving cached data for:", cacheKey);
        return extractRecipeData(parsedData); // Ensure consistency
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        console.warn("Failed to parse cached data. Fetching new data...");
      }
    }

    try {
      const endpoint = nextPageLink
        ? nextPageLink
        : `?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${queryText}`;

      const { data } = await fetchData(endpoint);

      // Save the fetched data to localStorage for future use
      localStorage.setItem(cacheKey, JSON.stringify(data));

      return extractRecipeData(data);
    } catch (error) {
      console.error("Error fetching search recipes:", error.message);
      throw new Error("Failed to search recipes. Please try again later.");
    }
  }
);

export const fetchSingleRecipe = createAsyncThunk(
  "recipe/fetchSingleRecipes",
  async (recipeId) => {
    if (!recipeId) {
      throw new Error("Invalid recipe ID provided.");
    }

    const cacheKey = `recipe_${recipeId}`;

    // Check for cached data in localStorage
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        // console.info("Serving cached single recipe data for:", cacheKey);
        return parsedData;
      } catch (error) {
        console.error(error);
        console.warn(
          "Failed to parse cached recipe data. Fetching new Data....."
        );
      }
    }

    try {
      // Fetch the recipe data from the API
      const { data } = await fetchData(
        `/${recipeId}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      // Extract and process the recipe data
      let recipeData = extractSingleRecipeData(data);

      // Save the fetched recipe data to localStorage for future use
      localStorage.setItem(cacheKey, JSON.stringify(recipeData));

      return recipeData;
    } catch (error) {
      console.error("Error fetching single recipe:", error.message);
      throw new Error("Failed to fetch single recipe. Please try again later.");
    }
  }
);
