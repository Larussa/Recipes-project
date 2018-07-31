import {elements} from './base';

export const getSearchInputValue = () => elements.searchInput.value;

export const clearForm = () => elements.searchFrom.reset();

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highLightSelected = id => {
    const resultsArr = document.querySelectorAll('.results__link');
    resultsArr.forEach(el => el.classList.remove('results__link--active'));
    const resultLink = document.querySelector(`.results__link[href*="${id}"]`);
    if (resultLink) resultLink.classList.add('results__link--active');
};

const renderRecipe = (recipe) => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('afterbegin', markup);
};

const createButtonMarkup = (page, type) => {
    const gotoPage = type === 'next' ? page + 1 : page - 1;
    return `
        <button class="btn-inline results__btn--${type}" data-goto="${gotoPage}">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'next' ? 'right' : 'left' }"></use>
            </svg>
            <span>Page ${gotoPage}</span>
        </button>
    `;
};

const renderButton = (page, numResult, resPerPage) => {
    const pageCount = Math.ceil(numResult / resPerPage);
    let button;

    if (page === 1 && pageCount > 1) {
        // button-next only
        button = createButtonMarkup(page, 'next');
    } else if (page < pageCount) {
        // both buttons
        button = `
            ${createButtonMarkup(page, 'prev')}
            ${createButtonMarkup(page, 'next')}
        `;
    } else if (page === pageCount) {
        // button-prev only
        button = createButtonMarkup(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResult = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    renderButton(page, recipes.length, resPerPage);
};