// Global app controller

// npm i webpack-cli -- save-dev
// npm run dev
// npm run build
// npm i webpack-dev-server --save-dev
// npm i html-webpack-plugin --save-dev
// npm i babel-core babel-loader babel-preset-env --save-dev
// npm i babel-polyfill --save

async function getRecipes (query) {
    const key = '8ff9f71224823e88ef208fcfe257d364';
    try {
        const res = await fetch(`http://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${key}&q=${this.query}`);
        const data = await res.json();
        console.log(data);
    }   catch (error) {
        console.log(error);
    }
}
getRecipes('pizza');