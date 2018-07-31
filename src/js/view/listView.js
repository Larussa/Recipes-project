import {elements} from './base';

export const removeList = (itemId) => {
    let el = elements.shopList.querySelector(`.shopping__item[data-id="${itemId}"]`);
    el.remove();
};

export const renderList = (listItem) => {
    const markup = `
      <li class="shopping__item" data-id="${listItem.id}">
      <p class="shopping__description">${listItem.ingredient}</p>
      <button class="shopping__delete btn-tiny">
          <svg>
              <use href="img/icons.svg#icon-circle-with-cross"></use>
          </svg>
      </button>
    </li>
  `;

    elements.shopList.insertAdjacentHTML('beforeend', markup);
};

export const renderListNew = list => list.forEach(item => renderList(item));