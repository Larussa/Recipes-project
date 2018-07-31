import {elements} from './base';

export const clearLikeList = () => elements.likesList.innerHTML = '';

const renderLikeItem = recipe => {
    const markup = `
        <li>
            <a class="likes__link" href="#${recipe.recipe_id}">
                <figure class="likes__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${recipe.title}</h4>
                    <p class="likes__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.likesList.insertAdjacentHTML('afterbegin', markup);
};

export const renderLikeList = list => {
    list.forEach(recipe => renderLikeItem(recipe));
};