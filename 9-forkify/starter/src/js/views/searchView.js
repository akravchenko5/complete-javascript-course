import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
  const resultArr = Array.from(document.querySelectorAll('.results__link'));
  resultArr.forEach(el => el.classList.remove('results__link--active'));
  document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};

/**
 * 'Pasta with tomato and spinach'
 * acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
 * update accumulator / return acc + cur.length - this works in a reduce() function by a returning a value, so the value we
 * return in each iteration of this loop and call back function of reduce method will be the new accumulator
 * acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
 * acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
 * acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato']
 * acc: 18 / acc + cur.length = 24 / newTitle = ['Pasta', 'with', 'tomato']
 */

export const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = []; // we can use const because adding staff to an array is not actually mutating variable, same for objects
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      // reduce call back function which accepts two arguments, accumulator and current element
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0); // (acc, cur) // first param to the reduce method, and 0 is the second initial value for accumulator
    // return the result
    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

const renderRecipe = recipe => {
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
          <figure class="results__fig">
              <img src="${recipe.image_url}" alt="${recipe.title}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
              <p class="results__author">${recipe.publisher}</p>
          </div>
      </a>
    </li>
  `;
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto=${type == 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
  </button>
`;

// we need data-goto, so we can use this property later when we attach event handler

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage); // rounded to the NEXT Integer
  let button;

  if (page === 1 && pages > 1) {
    // Only button to the Next page
    button = createButton(page, 'next');
  } else if (page < pages) {
    // Buttons to the Previous and Next page
    button = `
      ${createButton(page, 'next')}
      ${createButton(page, 'prev')}
    `;
  } else if (page === pages && pages > 1) {
    // Only button to the Previous page
    button = createButton(page, 'prev');
  }
  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // render results of current page
  const start = (page - 1) * resPerPage; // page1 = 0, page2 = 10, page3 = 20;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe); // forEach will automatically pass current recipe to renderRecipe()

  // render pagination buttons
  renderButtons(page, recipes.length, resPerPage);
};
