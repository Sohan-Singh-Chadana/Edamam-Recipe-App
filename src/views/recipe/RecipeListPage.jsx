import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, Loader, PageTitle, Select } from "../../components/common";
import { useDispatch, useSelector } from "react-redux";
import { selectAllRecipes } from "../../redux/store/recipesSlice";
import { fetchTypesRecipes } from "../../redux/utils/typeUtils";
import {
  getTypesRecipesError,
  getTypesRecipesNexPage,
  getTypesRecipesStatus,
} from "../../redux/store/typesSlice";
import { scrollToTop } from "../../utils/scrollToTop";
import { STATUS } from "../../utils/status";
import { RecipeList } from "../../components/recipe";

const RecipeListPage = () => {
  const tempData = useParams();
  const [typeData, setTypeData] = useState(tempData);
  const dispatch = useDispatch();
  const recipes = useSelector(selectAllRecipes);
  const recipesStatus = useSelector(getTypesRecipesStatus);
  const recipesError = useSelector(getTypesRecipesError);
  const nextPageLink = useSelector(getTypesRecipesNexPage);

  useEffect(() => {
    if (typeData && typeData.typeName) {
      dispatch(fetchTypesRecipes({ typeData, nextPageLink }));
    }
  }, [typeData, nextPageLink, dispatch]);

  const handleSelection = (event) => {
    setTypeData((prevData) => {
      return {
        ...prevData,
        typeName: event.target.value,
      };
    });
  };

  useEffect(() => scrollToTop(), []);

  return (
    <main className="recipe-list-page custom-min-h pt-[4px]">
      <section>
        <PageTitle titleData={typeData} />
        <div className="container">
          <div className="breadcrumb-select-wrapper">
            <Breadcrumb breadcrumbData={typeData} />
            <Select typeData={typeData} handleSelection={handleSelection} />
          </div>
        </div>

        <div className="recipes-list">
          <div className="container">
            {STATUS.LOADING === recipesStatus ? (
              <Loader />
            ) : STATUS.FAILED === recipesStatus ? (
              <div>{recipesError}</div>
            ) : (
              <RecipeList recipes={recipes} />
            )}

            {nextPageLink?.length > 0 && (
              <div className="next-button">
                <button
                  className="next-page-btn"
                  type="button"
                  onClick={() => {
                    // dispatch(fetchTypesRecipes({ typeData: {}, nextPageLink }))
                    if (nextPageLink) {
                      dispatch(fetchTypesRecipes({ typeData, nextPageLink }));
                    } else {
                      console.error("Next page link is missing.");
                    }
                  }}
                  // disabled={true}
                >
                  Next Page
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecipeListPage;
