/// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import LikesList from './models/Likes';
import List from './models/List';

import {elements, renderLoader, clearLoader} from './view/base';
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import * as likesView from './view/likesView';
import * as listView from './view/listView';

const state = {};

// create LikeList object
state.likes = new LikesList();
// create ShoppingList object
state.list = new List();

// Search Controller
const controlSearch = async () => {
    // 1 get value from input
    const query = searchView.getSearchInputValue();
    if (query) {
        // 2 new Search
        state.search = new Search(query);
        // 3 prepare UI
        searchView.clearForm();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        // 4 do search
        await state.search.getResult();

        if (state.search.result && state.search.result.length){
            // 5 save last result
            state.search.saveResult();
            // 6 render result
            searchView.renderResult(state.search.result);
        } // else message could be displayed....

        clearLoader(elements.searchRes);
    }
};

// Recipe Controller
const controlRecipe = async () => {
    // get id from location.hash
    const id = window.location.hash.replace('#', '');
    if (id) {
        if (state.search) searchView.highLightSelected(id);
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        state.recipe = new Recipe(id);
        await state.recipe.getRecipe();

        clearLoader();
        const LikeList = (state.likes.getLikeIndex(state.recipe.result.recipe_id) > -1);
        // render
        recipeView.renderRecipe(state.recipe.result, LikeList);
        addLikeListener(LikeList);
        addShopListener();
    }
};

    // Shopping list controller
    const controlShopList = () => {

    state.recipe.result.ingredients.forEach(item => {
        let added = state.list.addItem(item);
        listView.renderList(added);
    });
    state.list.saveList();

};

const addShopListener = () => {
    document.querySelector('.recipe__btn').addEventListener('click', controlShopList);
};

// Likes Controller
const controlLikes = () => {
    likesView.clearLikeList();
    state.likes.loadList();
    likesView.renderLikeList(state.likes.list);
};

const addLikeListener = LikeList => {
    document.querySelector('.recipe__love').addEventListener('click', () => toggleLikeList(LikeList));
};

const toggleLikeList = LikeList => {
    if (LikeList) {
        state.likes.removeRecipe(state.recipe.result.recipe_id);
    } else {
        state.likes.addRecipe(state.recipe.result);
    }

    state.likes.saveList();
    recipeView.clearRecipe();
    recipeView.renderRecipe(state.recipe.result, !LikeList);

    addLikeListener(!LikeList);
    addShopListener();

    likesView.clearLikeList();
    likesView.renderLikeList(state.likes.list);
};

// Set events
elements.searchFrom.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResult(state.search.result, goToPage);
    }
});

elements.shopList.addEventListener('click', e => {
    const deleteBtn = e.target.closest('.shopping__delete');
    if (deleteBtn) {
        const listItem = deleteBtn.closest('.shopping__item');
        if (listItem && listItem.dataset.id) {
            // remove from model data
            state.list.delItem(listItem.dataset.id);
            // save
            state.list.saveList();
            // remove from markup
            listView.removeList(listItem.dataset.id);
        }
    }
});

window.addEventListener('hashchange', controlRecipe);

window.addEventListener('load', () => {
    controlLikes();
    controlRecipe();

    // init list
    state.list.loadList();
    listView.renderListNew(state.list.items);

    // init last search
    state.search = new Search();
    if (state.search.loadLastResult()) {
        // if was saved then render last search
        searchView.renderResult(state.search.result);
    }
});

