import {proxy, api, key} from '../config';

export default class Recipe {
    constructor (id) {
        this.id = id;
        this.result = {};
    };

    async getRecipe() {
        try {
            const res = await fetch(`${proxy}${api}/get?key=${key}&rId=${this.id}`);
            const data = await res.json();
            return this.result = data.recipe;
        } catch (e) {
            alert(e);
        }
    }
};