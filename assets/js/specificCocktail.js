// This module construct the page for when a specific cocktail is searched for
// Only accessible through clicking one of the searchresults when searching for either name, ingredient or glass 

import { displayFullCocktail } from "./displayCocktail.js";
import { fetchIDLookup } from "./fetchCocktails.js";

const SPECIFICCOCKTAIL = document.querySelector('#specificCocktail');

function cocktailNotFound(drinkId) {
    const pElement = document.createElement('p');
    pElement.id = 'somethingWrong';

    pElement.innerHTML = `Cocktail with id "${drinkId}" not found!`;

    SPECIFICCOCKTAIL.appendChild(pElement);
}

async function specificCocktial(drinkId) {
    const cocktailData = await fetchIDLookup(drinkId);
    if (cocktailData.drinks) {
        const drinkName = cocktailData.drinks[0]['strDrink'];
        document.title = `${drinkName} - Cocktail Compass`;
        displayFullCocktail(SPECIFICCOCKTAIL, cocktailData.drinks[0]);
    } else {
        cocktailNotFound(drinkId);    
    }
}

function getDrinkId() {
    const urlParams = new URLSearchParams(window.location.search);
    const drinkId = urlParams.get('id');

    return drinkId;
}

function main() {
    const drinkId = getDrinkId();
    if (drinkId) {
        specificCocktial(drinkId);
    } else {
        cocktailNotFound(drinkId);
    }
}

main();