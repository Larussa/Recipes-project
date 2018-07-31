export default class LikeList   {
    constructor () {
        this.list = [];
    }

    getLikeIndex(searchId) {
        for (let index in this.list) {
            if (this.list[index].recipe_id == searchId) return index;
        }
        return -1;
    }

    addRecipe(recipe) {
        let addedIndex = this.getLikeIndex(recipe.recipe_id);
        if (addedIndex < 0) {
            this.list.unshift(recipe);
            addedIndex = this.list.indexOf(recipe);
        }
        return addedIndex;
    }

    removeRecipe(recipe_id) {
        const index = this.getLikeIndex(recipe_id);
        if (index > -1) {
            this.list.splice(index, 1);
        } else return null;
    }

    saveList() {
        localStorage.setItem('likes', JSON.stringify(this.list));
    }

    loadList() {
        const loaded = localStorage.getItem('likes');
        if (loaded) this.list = JSON.parse(loaded);
    }
}