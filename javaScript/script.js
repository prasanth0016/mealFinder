

let catmaindiv = document.getElementById("cats-main-div");
let mealsHeadDiv = document.getElementById("meal-head-div");
let mealsInnerDiv = document.getElementById("mealsInner-div");
let mealsDiv = document.getElementById("meals-div");
let catClose = document.getElementById("cat-close");

let mealIngredientsMainDiv = document.getElementById("mealIngredients-main-div");

let mealCardImages = [];

// SIDE BAR ITEMS

let sideBarItems = Array.from(document.getElementsByClassName("sideBar-item"))
sideBarItems.forEach((ele) => {
    ele.addEventListener('click', async (event) => {
        mealsInnerDiv.innerHTML = "";
        catClose.innerHTML = "";

        let categoryName = event.target.textContent;
        let url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
        url += categoryName;

        let response = await fetch(url);
        let specificCategoryApi = await response.json();

        mealsHeadDiv.innerHTML = `<h2 class="meal-cat-name">${categoryName}</h2>
               <div class="underline"></div>
            `;

        specificCategoryApi.meals.forEach((obj) => {
            let mealCardDiv = document.createElement("div");
            mealCardDiv.classList.add("mealCard-div");
            mealCardDiv.innerHTML = `
                                  <img  class="mealCard-img" data-mealId="${obj.idMeal}" data-img="${obj.strMealThumb}" src="${obj.strMealThumb}" alt="${obj.strMealThumb}" >
                                  <h6 class="mealTitle" >${obj.strMeal}</h6>
                       `;
            mealsInnerDiv.appendChild(mealCardDiv);
        });
        mealCardImages = Array.from(document.getElementsByClassName("mealCard-img"))
        mealDetails();

    })
})

async function fetchData() {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let categoriesApi = await response.json()
    categoriesApi.categories.forEach((obj) => {
        let catdiv = document.createElement("div");
        catdiv.classList.add("catdiv");
        catdiv.innerHTML = `<h6 class="cats-title">${obj.strCategory}</h6>
    <img class="cat-img"  src="${obj.strCategoryThumb}" alt="${obj.strCategoryThumb}">
    `;
        catmaindiv.appendChild(catdiv);
    });

    // MEALS LIST ADDING
    let imgElements = Array.from(document.getElementsByClassName("cat-img"));
    imgElements.forEach((ele) => {
        ele.addEventListener('click', async (event) => {

            mealsInnerDiv.innerHTML = "";
            catClose.innerHTML = "";
            let categoryName = event.target.previousElementSibling.textContent;
            let url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
            url += categoryName;

            let response = await fetch(url);
            let specificCategoryApi = await response.json();

            mealsHeadDiv.innerHTML = `<h2 class="meal-cat-name">${categoryName}</h2>
               <div class="underline"></div>
            `;

            specificCategoryApi.meals.forEach((obj) => {
                let mealCardDiv = document.createElement("div");
                mealCardDiv.classList.add("mealCard-div");
                mealCardDiv.innerHTML = `
                                  <img  class="mealCard-img" data-mealId="${obj.idMeal}" data-img="${obj.strMealThumb}" src="${obj.strMealThumb}" alt="${obj.strMealThumb}" >
                                  <h6 class="mealTitle" >${obj.strMeal}</h6>
                       `;
                mealsInnerDiv.appendChild(mealCardDiv);
            });
            // console.log(Array.from(document.getElementsByClassName("mealCard-img")));

            mealCardImages = Array.from(document.getElementsByClassName("mealCard-img"))
            // console.log(mealCardImages);
            mealDetails();


        })
    })
}
fetchData();


// SPECIFIC MEAL DETAILS 

function mealDetails() {
    mealCardImages.forEach((ele) => {
        ele.addEventListener('click', async (event) => {
            let mealId = event.target.dataset.mealid;
            let imgs = event.target.dataset.img;
            mealIngredientsMainDiv.innerHTML = "";
            let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
            url += mealId
            let specificMealApi;
            try {
                let response = await fetch(url);
                specificMealApi = await response.json();
            } catch (error) {
                console.log("fetching specific meal details:", error);
            }
            specificMealApi.meals.forEach((obj) => {

                let firstDiv = document.createElement("div");
                firstDiv.classList.add("firstDiv")
                firstDiv.innerHTML = `
            <div class="mealDetailImg">
                <img class="mealDetailImg" src="${imgs}" alt="${imgs}">
            </div>
            <div class="firstTwo">
               <h4 class="mealName">${obj.strMeal}</h4>
               <h5>CATEGORY: ${obj.strCategory}</h5>
               <h6>source: <a target="_blank" href="${obj.strSource}">${obj.strSource}</a></h6>
               <h6>Tags: <span class="tags">${obj.strTags===null||obj.strTags===""?obj.strCategory:obj.strTags}</span></h6>
               <h4>Ingredients:</h4>

               <ol class="firstTwo-ingred">
                  <li>${obj.strIngredient1}</li>
                  <li>${obj.strIngredient2}</li>
                  <li>${obj.strIngredient3}</li>
                  <li>${obj.strIngredient4}</li>
                  <li>${obj.strIngredient5}</li>
                  <li>${obj.strIngredient6}</li>
                  <li>${obj.strIngredient7}</li>
                  <li>${obj.strIngredient8}</li>
                  <li>${obj.strIngredient9}</li>
                  <li>${obj.strIngredient10}</li>
               </ol>
            </div>
            `;
                mealIngredientsMainDiv.appendChild(firstDiv);

                let secondDiv = document.createElement("div")
                secondDiv.classList.add("secondDiv");
                secondDiv.innerHTML = `
                <div><h3 class="measure-head">Measurement :</h3></div>
                <ul class="second-second">
                <li>${obj.strMeasure1}</li>
                <li>${obj.strMeasure2}</li>
                <li>${obj.strMeasure3}</li>
                <li>${obj.strMeasure4}</li>
                <li>${obj.strMeasure5}</li>
                <li>${obj.strMeasure6}</li>
                <li>${obj.strMeasure7}</li>
                <li>${obj.strMeasure8}</li>
                <li>${obj.strMeasure9}</li>
                <li>${obj.strMeasure10}</li>
                <li>${obj.strMeasure11}</li>
                </ul>
                `
                mealIngredientsMainDiv.appendChild(secondDiv);

                let thirdDiv = document.createElement("div");
                thirdDiv.classList.add("thirdDiv");
                thirdDiv.innerHTML=`
                 <h3>Instructions :</h3>
                 <p>${obj.strInstructions}</p>
                `
                mealIngredientsMainDiv.appendChild(thirdDiv);

            })


        })
    })
}

// SEARCH BY FOOD NAME
function searchMeal(){
    console.log("meals.......");
    
}
