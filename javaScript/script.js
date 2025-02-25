

let catmaindiv = document.getElementById("cats-main-div");
let mealsHeadDiv = document.getElementById("meal-head-div");
let mealsInnerDiv = document.getElementById("mealsInner-div");
let catClose = document.getElementById("cat-close")
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

            mealsInnerDiv.innerHTML="";
            catClose.innerHTML="";
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
                                  <img  class="mealCard-img" src="${obj.strMealThumb}" alt="${obj.strMealThumb}" >
                                  <h6 class="mealTitle" >${obj.strMeal}</h6>
                       `;
                mealsInnerDiv.appendChild(mealCardDiv);
            });

        })
    })
}
fetchData();
