// This module constructs the cocktail of the day widget and its functionality

import { fetchAlcoholicCocktails, fetchNonAlcoholicCocktails, fetchIDLookup } from "./fetchCocktails.js";
import { displayFullCocktail } from "./displayCocktail.js";
import seedrandom from "https://cdn.skypack.dev/seedrandom@3.0.5";

const DATELEGEND = document.querySelector('#date');
const COCKTAILOFTHEDAY = document.querySelector('#cocktailoftheday');

function chooseRandomCocktail(date, rawData) { 
    let rng = seedrandom(date);
    const randomID = rawData.drinks[Math.floor(rng() * rawData.drinks.length)].idDrink;
    return randomID;
}

function addDatePicker(dateStr) {
    const dateForm = document.createElement('form');
    dateForm.action = window.location.href;;
    dateForm.id = 'dateForm';

    dateForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let url = new URL(window.location.href);
        url.searchParams.set('date', dateInput.value.toString());
        window.location.href = url.href;
    });

    const pElementDate = document.createElement('p');

    const labelDate = document.createElement('label');
    labelDate.htmlFor = 'dateInput';
    labelDate.innerHTML = 'Choose your own date:'

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'dateInput';
    dateInput.value = dateStr;

    const pElementBtn = document.createElement('p');
    const dateBtn = document.createElement('input');
    dateBtn.type = 'submit';
    dateBtn.id = 'dateBtn';
    dateBtn.value = 'Change Date';
    
    pElementDate.appendChild(labelDate);
    pElementDate.appendChild(dateInput);
    dateForm.appendChild(pElementDate);
    
    pElementBtn.appendChild(dateBtn);
    dateForm.appendChild(pElementBtn);

    COCKTAILOFTHEDAY.appendChild(dateForm);
}

function displayDate(dateStr) {
    DATELEGEND.textContent = dateStr;
}

async function cocktailsOfTheDay() {
    let url = new URL(window.location.href);
    const dateStr = url.searchParams.get('date') || dateStringFormat(new Date());

    displayDate(dateStr);
    
    const rawDataAlcoholic = await fetchAlcoholicCocktails();
    const rawDataNonAlcoholic = await fetchNonAlcoholicCocktails();
    
    const alcoholicID = chooseRandomCocktail(dateStr, rawDataAlcoholic);
    const nonAlcoholicID = chooseRandomCocktail(dateStr, rawDataNonAlcoholic);
    
    const alcoholicCocktailData = await fetchIDLookup(alcoholicID);
    const nonAlcoholicCocktailData = await fetchIDLookup(nonAlcoholicID);
    
    displayFullCocktail(COCKTAILOFTHEDAY, alcoholicCocktailData.drinks[0]);
    displayFullCocktail(COCKTAILOFTHEDAY, nonAlcoholicCocktailData.drinks[0]);
    addDatePicker(dateStr);
}

function dateStringFormat(date) {
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
}

function main() {
    cocktailsOfTheDay();
}

main();