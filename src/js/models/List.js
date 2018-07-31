import uniqid from 'uniqid';

export default class List {
    constructor () {
        this.items = [];
    }

    addItem(ingredient) {
        const newItem = {
            id: uniqid(),
            ingredient
        };
        this.items.push(newItem);
        return newItem;
    }

    delItem(id) {
        for (let ind in this.items) {
            if (this.items[ind].id === id) return this.items.splice(ind, 1);
        }
    }

    loadList() {
        let list = localStorage.getItem('shopList');
        if (list) this.items = JSON.parse(list);
    }

    saveList() {
        localStorage.setItem('shopList', JSON.stringify(this.items));
    }

}