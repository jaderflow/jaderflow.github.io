// This module contains helper functions for fetching information about 
// cocktails in different ways, e.g. by name, alcoholic or non-alcoholic,
// ingredients, etc.

async function mainFetch(endUrl) {
    let response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/${endUrl}`);

    try {
        let data = await response.json();
        return data;
    } catch (err) {
        return null;
    }
}

export async function fetchAlcoholicCocktails() {
    return await mainFetch('filter.php?a=Alcoholic');
}

export async function fetchNonAlcoholicCocktails() {
    return await mainFetch('filter.php?a=Non_Alcoholic');
}

export async function fetchNameSearch(name) {
    return await mainFetch('search.php?s=' + name);
}

export async function fetchIngredientSearch(ingredient) {
    return await mainFetch('filter.php?i=' + ingredient);
}

export async function fetchGlassSearch(glass) {
    return await mainFetch('filter.php?g=' + glass);
}

export async function fetchIDLookup(id) {
    return await mainFetch('lookup.php?i=' + id);
}