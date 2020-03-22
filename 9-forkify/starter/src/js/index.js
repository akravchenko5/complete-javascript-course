import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/**
 * Global state of out app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

// SEARCH CONTROLLER

const controlSearch = async () => {
  // 1. Get query from view
  const query = searchView.getInput();

  if (query) {
    // 2. New search object and add to state
    state.search = new Search(query);

    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);
    try {
      // 4. Search for recipes
      await state.search.getResult();

      // 5. Render result on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert('Error processing all recipes... :(');
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const button = e.target.closest('.btn-inline');
  if (button) {
    const goToPage = parseInt(button.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

// RECIPE CONTROLLER

const controlRecipe = async () => {
  // get ID from url
  const id = window.location.hash.replace('#', '');

  if (id) {
    // 1. Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    // 2. Create new recipe
    state.recipe = new Recipe(id);

    try {
      // 3. Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // 4. Calculate time and servings
      state.recipe.calcTime();
      state.recipe.calcServing();

      // 5. Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      alert('Error processing recipe ...');
    }
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
