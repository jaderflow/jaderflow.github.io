// This module contains functions to the two different ways of displaying a cocktail

export function displayFullCocktail(target, cocktailData) {
    const drinkName = cocktailData['strDrink'];
    const alcoholContent = cocktailData['strAlcoholic'];
    const glass = cocktailData['strGlass'];
    const instructions = cocktailData['strInstructions'];
    const drinkImage = cocktailData['strDrinkThumb'];
    const imageSource = cocktailData['strImageSource'];

    let ingredients = [];
    for (let i = 1; i < 16; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measurementKey = `strMeasure${i}`;

        const ingredient = cocktailData[ingredientKey];
        const measurement = cocktailData[measurementKey];

        if (ingredient) {
            const combined = `${measurement || ""} ${ingredient}`
            ingredients.push(combined);
        };
    }

    const article = document.createElement('article');
    article.className = 'cocktail';

    const header = document.createElement('header');

    const title = document.createElement('h3');
    title.textContent = drinkName;
    header.appendChild(title);

    const detailsList = document.createElement('ul');
    const alcoholContentItem = document.createElement('li');
    alcoholContentItem.innerHTML = `<p class="alcoholContent">${alcoholContent}</p>`;
    const glassItem = document.createElement('li');
    glassItem.innerHTML = `<p class="glass">${glass}</p>`;
    detailsList.appendChild(alcoholContentItem);
    detailsList.appendChild(glassItem);
    header.appendChild(detailsList);

    article.appendChild(header);

    const drinkImageSection = document.createElement('div');
    drinkImageSection.className = 'drinkImage';

    const image = document.createElement('img');
    image.src = drinkImage;
    image.alt = drinkName;
    drinkImageSection.appendChild(image);

    const imageSourceLink = document.createElement('p');
    const imageSourceAnchor = document.createElement('a');
    imageSourceAnchor.href = imageSource;
    if (imageSource) {
        imageSourceAnchor.textContent = 'Image Source';
        imageSourceLink.appendChild(imageSourceAnchor);
        drinkImageSection.appendChild(imageSourceLink);
    }

    article.appendChild(drinkImageSection);

    const ingredientsSection = document.createElement('div');
    ingredientsSection.className = 'ingredients';

    const ingredientsTitle = document.createElement('h4');
    ingredientsTitle.textContent = 'Ingredients:';
    const ingredientsList = document.createElement('ul');
    ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.textContent = ingredient;
        ingredientsList.appendChild(ingredientItem);
    });
    ingredientsSection.appendChild(ingredientsTitle);
    ingredientsSection.appendChild(ingredientsList);

    article.appendChild(ingredientsSection);

    const instructionsSection = document.createElement('div');
    instructionsSection.className = 'instructions';

    const instructionsTitle = document.createElement('h4');
    instructionsTitle.textContent = 'Instructions:';
    const instructionsParagraph = document.createElement('p');
    instructionsParagraph.textContent = instructions;
    instructionsSection.appendChild(instructionsTitle);
    instructionsSection.appendChild(instructionsParagraph);

    article.appendChild(instructionsSection);
    target.appendChild(article);
}

export function displayCocktailPreview(target, cocktailData) {
    const drinkId = cocktailData['idDrink'];
    const drinkImage = cocktailData['strDrinkThumb'];
    const drinkName = cocktailData['strDrink'];

    const article = document.createElement('article');

    const anchor = document.createElement('a');
    anchor.href = `specificCocktail.html?id=${drinkId}`;

    const image = document.createElement('img');
    image.src = drinkImage;
    image.alt = drinkName;

    const drinkTitle = document.createElement('h3');
    drinkTitle.innerHTML = drinkName;
    
    anchor.appendChild(image);
    anchor.appendChild(drinkTitle);
    article.appendChild(anchor);
    target.appendChild(article);
}