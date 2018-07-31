import {proxy, api, key} from '../config';

export default class Search {
    constructor (query) {
        this.query = query;
        this.result = {};
    }

    async getResult() {
        try {
            const res = await fetch(`${proxy}${api}/search?key=${key}&q=${this.query}`);
            const data = await res.json();
            return this.result = data.recipes;
        } catch (e) {
            console.log(e);
        }
    }

    saveResult() {
        localStorage.setItem('searchResult', JSON.stringify(this.result));
    }

    loadLastResult() {
        let result = localStorage.getItem('searchResult');
        if (result) {
            this.result = JSON.parse(result);
            return this.result;
        } else return false;
    }
}