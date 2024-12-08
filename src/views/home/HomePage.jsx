import { Link } from "react-router-dom";
import {
  BannerSlider,
  CategorySlider,
  Loader,
  MealSlider,
  Title,
} from "../../components/common";
import { dishTypeData } from "../../data";
import { pattern_one } from "../../utils/images";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchRecipes } from "../../redux/utils/recipeUtils";
import { useSelector } from "react-redux";
import {
  getRecipesError,
  getRecipesStatus,
  selectAllRecipes,
} from "../../redux/store/recipesSlice";
import { STATUS } from "../../utils/status";
import { RecipeList } from "../../components/recipe/index";
import { scrollToTop } from "../../utils/scrollToTop";

const HomePage = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectAllRecipes);
  const recipeStatus = useSelector(getRecipesStatus);
  const recipeError = useSelector(getRecipesError);

  // console.log(recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => scrollToTop(), []);

  return (
    <main className="home-page custom-min-h pt-[4px]">
      <BannerSlider />
      <section
        className="categories"
        style={{
          background: `url('${pattern_one}') center/cover no-repeat`,
        }}
      >
        <div className="container">
          <Title subTitle="Choose a category" mainTitle="Recipe Categories" />
        </div>
        <CategorySlider />
      </section>

      <section className="showcase-recipes">
        <div className="container">
          <Title subTitle="Some Recipes" mainTitle="Chicken Recipes" />
          {/* recipes list */}

          {STATUS.LOADING === recipeStatus ? (
            <Loader />
          ) : STATUS.FAILED === recipeStatus ? (
            <div>{recipeError}</div>
          ) : (
            <RecipeList recipes={recipes} recipesLength={12} />
          )}
        </div>
      </section>

      <section className="dishes">
        <div className="container">
          <Title subTitle="Find Dishes you love" mainTitle="Recipe Dishes" />
          <div className="dishes-list">
            {dishTypeData?.map((dish, inx) => (
              <Link
                key={inx}
                to={`recipes/dish/${dish?.type}`}
                className="dishes-item"
              >
                <img src={dish.image} alt={dish.type} />
                <p className="dishes-item-name">{dish.type}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="meals">
        <div className="container">
          <Title subTitle="Get Meal Ready" mainTitle=" Recipe Meals" />
          <MealSlider />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
