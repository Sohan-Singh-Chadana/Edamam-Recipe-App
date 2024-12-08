import { createAsyncThunk } from "@reduxjs/toolkit";
import { APP_ID, APP_KEY } from "../../api/apiConstants";
import { extractRecipeData } from "../../utils/helpers";
import fetchData from "../../api/axios";

export const fetchTypesRecipes = createAsyncThunk(
  "recipes/type/fetchRecipes",
  async (obj, { rejectWithValue }) => {
    const { typeData, nexPageLink } = obj;
    const cacheKey = typeData
      ? `${typeData.typeOf}_${typeData.typeName}`
      : nexPageLink; // Unique cache key

    try {
      // Check cache
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData); // Return cached data
      }

      // Fetch from API
      let recipesData = null;
      if (typeData && Object.keys(typeData).length > 0) {
        const { data } = await fetchData(
          `?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&${typeData.typeOf}Type=${typeData.typeName}`
        );
        recipesData = extractRecipeData(data);
      } else if (nexPageLink) {
        const { data } = await fetchData(nexPageLink);
        recipesData = extractRecipeData(data);
      } else {
        throw new Error("Invalid parameters for fetching recipes.");
      }

      // Cache data
      if (recipesData) {
        localStorage.setItem(cacheKey, JSON.stringify(recipesData));
      }

      return recipesData;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return rejectWithValue(
        "Failed to fetch recipes. Please try again later."
      );
    }
  }
);
