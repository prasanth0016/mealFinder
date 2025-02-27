

let catmaindiv = document.getElementById("cats-main-div");
let mealsHeadDiv = document.getElementById("meal-head-div");
let mealsInnerDiv = document.getElementById("mealsInner-div");
let mealsDiv = document.getElementById("meals-div");
let catClose = document.getElementById("cat-close");

let mealIngredientsMainDiv = document.getElementById("mealIngredients-main-div");

let mealCardImages = [];

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
                                  <img  class="mealCard-img" src="${obj.strMealThumb}" alt="${obj.strMealThumb}" >
                                  <h6 class="mealTitle" >${obj.strMeal}</h6>
                       `;
            mealsInnerDiv.appendChild(mealCardDiv);
        });
        mealCardImages = Array.from(document.getElementsByClassName("mealCard-img"))
        mealDetails();

    })
})


// SPECIFIC MEAL DETAILS 

function mealDetails() {
    mealCardImages.forEach((ele) => {
        ele.addEventListener('click', async (event) => {
            let mealId = event.target.dataset.mealid;
            let imgs = event.target.dataset.img;
            mealIngredientsMainDiv.innerHTML="";
            let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
            url += mealId
            let specificMealApi;
            try {
                let response = await fetch(url);
                specificMealApi = await response.json();
            } catch (error) {
                console.log("fetching specific meal details:", error);
            }
            specificMealApi.meals.forEach((obj)=>{

                let firstDiv = document.createElement("div");
                firstDiv.classList.add("firstDiv")
                firstDiv.innerHTML = `
            <div class="mealDetailImg">
                <img class="mealDetailImg" src="${imgs}" alt="${imgs}">
            </div>
            <div class="firstTwo">
               <h4 style="color:orange;">${obj.strMeal}</h4>
               <h5>CATEGORY: ${obj.strCategory}</h5>
               <h6>source: ${obj.strSource}</h6>
               <h6>Tags:<span style="border:2px solid white; background-color:orange; color:white;">${obj.strTags}</span></h6>
               <div class="firstTwo-ingred">
                  <h4>Ingredients:</h4>
                  <div>${obj.strIngredient1}</div>
                  <div>${obj.strIngredient2}</div>
                  <div>${obj.strIngredient3}</div>
                  <div>${obj.strIngredient4}</div>
                  <div>${obj.strIngredient5}</div>
                  <div>${obj.strIngredient6}</div>
                  <div>${obj.strIngredient7}</div>
                  <div>${obj.strIngredient8}</div>
                  <div>${obj.strIngredient9}</div>
                  <div>${obj.strIngredient10}</div>
               </div>
            </div>
            `;
                mealIngredientsMainDiv.appendChild(firstDiv);
            
            })


        })
    })
}

