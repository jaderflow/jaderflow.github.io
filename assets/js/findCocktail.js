// This module searches for cocktail by name, ingredient or glass. It then constructs a list of the searchresult

import { displayCocktailPreview } from "./displayCocktail.js";
import { fetchGlassSearch, fetchIngredientSearch, fetchNameSearch } from "./fetchCocktails.js";

const PAGEHEADER = document.querySelector('.pagetitle h2');
const FINDCOCKTAIL = document.querySelector('#findCocktail');
const SEARCHFORM = document.querySelector('#searchForm');
const SEARCHINPUT = document.querySelector('#Search');
const SEARCHRESULT = document.querySelector('#searchResult');

const DEFAULTID = 'name';
const VALIDIDS = ['name', 'ingredient', 'glass']
const SEARCHTERMEXAMPLES = {
    'name': 'Pina Colada, Margarita',
    'ingredient': 'Vodka, Pineapple',
    'glass': 'Shot glass, Champagne flute'
}

SEARCHFORM.addEventListener("submit", function(event) {
    event.preventDefault();

    let url = new URL(window.location.href);
    const userInput = SEARCHINPUT.value;

    if (userInput && userInput.trim() !== "") {
        url.searchParams.set('search', userInput.toString().toLowerCase());
    
        window.location.href = url.href;
    }
});

function displayNoResult(userInput, id) {
    console.log(userInput);

    const pElement = document.createElement('p');
    pElement.id = 'somethingWrong';

    pElement.innerHTML = `Sorry, there exists no cocktail with the ${id} "${userInput}"`;

    FINDCOCKTAIL.appendChild(pElement);
}

async function searchById(userInput, id) {
    let searchResultData;
    if (id == 'name') {
        searchResultData = await fetchNameSearch(userInput);
    } else if (id == 'ingredient') {
        searchResultData = await fetchIngredientSearch(userInput);
    } else {
        searchResultData = await fetchGlassSearch(userInput);
    }
    
    if (searchResultData && searchResultData.drinks) {
        for (const cocktailData of searchResultData.drinks) {
            displayCocktailPreview(SEARCHRESULT, cocktailData)
        }
    } else {
        displayNoResult(userInput, id);
    }
}

function getUserInput() {
    const urlParams = new URLSearchParams(window.location.search);
    const userInput = urlParams.get('search');

    return userInput;
}

function main() {
    const userInput = getUserInput();

    SEARCHFORM.action = window.location.href;

    let url = new URL(window.location.href);
    const urlId = url.searchParams.get('id');
    const id = VALIDIDS.includes(urlId) ? urlId : DEFAULTID;
    
    const searchByVariant = document.querySelector(`#${id}`);
    searchByVariant.className = 'selected';

    PAGEHEADER.innerHTML = `Search by ${id}`;
    SEARCHINPUT.ariaLabel = `Search for cocktail by ${id}`;
    SEARCHINPUT.placeholder = `Search... (e.g. ${SEARCHTERMEXAMPLES[id]}, etc.)`;

    if (userInput && userInput.trim() !== "") {
        searchById(userInput, id);
    }
}

main();