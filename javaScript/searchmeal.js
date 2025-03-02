

let mealsInnerDiv = document.getElementById("mealsInner-div");
let mealsHeadDiv = document.getElementById("meal-head-div");
let mealCardImages = [];
let mealIngredientsMainDiv = document.getElementById("mealIngredients-main-div");

async function searchMeal() {

    let searchBox = document.getElementById("s-box");
    let searchInput = searchBox.value;

    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    url += searchInput;
    let searchMealApi;
    try {
        let response = await fetch(url);
        searchMealApi = await response.json();
        localStorage.setItem("search", JSON.stringify(searchMealApi));

    } catch (error) {
        console.log("fetching searching meal details:", error);

    }


    window.location.href = "searchmeal.html";
    

}

// SPECIFIC MEAL DETAILS 

function mealDetails() {
    mealCardImages.forEach((ele) => {
        ele.addEventListener('click', async (event) => {

            //SCROLL TO TOP
            window.scrollTo({ top: 0, behavior: 'smooth' });

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
               <h4 class="mealName font">${obj.strMeal}</h4>
               <h5 class="font">CATEGORY: ${obj.strCategory}</h5>
               <h6 class="font">source: <a target="_blank" href="${obj.strSource}">${obj.strSource}</a></h6>
               <h6 class="font">Tags: <span class="tags">${obj.strTags === null || obj.strTags === "" ? obj.strCategory : obj.strTags}</span></h6>
               <h4 class="font">Ingredients:</h4>

               <ol class="firstTwo-ingred">
                  
                 <li> ${obj.strIngredient1 === null || obj.strIngredient1 === "" ? "..." : obj.strIngredient1}</li>
                 <li> ${obj.strIngredient2 === null || obj.strIngredient2 === "" ? "..." : obj.strIngredient2}</li>
                 <li> ${obj.strIngredient3 === null || obj.strIngredient3 === "" ? "..." : obj.strIngredient3}</li>
                 <li> ${obj.strIngredient4 === null || obj.strIngredient4 === "" ? "..." : obj.strIngredient4}</li>
                 <li> ${obj.strIngredient5 === null || obj.strIngredient5 === "" ? "..." : obj.strIngredient5}</li>
                 <li> ${obj.strIngredient6 === null || obj.strIngredient6 === "" ? "..." : obj.strIngredient6}</li>
                 <li> ${obj.strIngredient7 === null || obj.strIngredient7 === "" ? "..." : obj.strIngredient7}</li>
                 <li> ${obj.strIngredient8 === null || obj.strIngredient8 === "" ? "..." : obj.strIngredient8}</li>
                 <li> ${obj.strIngredient9 === null || obj.strIngredient9 === "" ? "..." : obj.strIngredient9}</li>
                 <li> ${obj.strIngredient10 === null || obj.strIngredient10 === "" ? "..." : obj.strIngredient10}</li>
                 <li> ${obj.strIngredient11 === null || obj.strIngredient11 === "" ? "..." : obj.strIngredient11}</li>
                 <li> ${obj.strIngredient12 === null || obj.strIngredient12 === "" ? "..." : obj.strIngredient12}</li>
                 <li> ${obj.strIngredient13 === null || obj.strIngredient13 === "" ? "..." : obj.strIngredient13}</li>
                 <li> ${obj.strIngredient14 === null || obj.strIngredient14 === "" ? "..." : obj.strIngredient14}</li>
                 <li> ${obj.strIngredient15 === null || obj.strIngredient15 === "" ? "..." : obj.strIngredient15}</li>
                 <li> ${obj.strIngredient16 === null || obj.strIngredient16 === "" ? "..." : obj.strIngredient16}</li>
                 <li> ${obj.strIngredient17 === null || obj.strIngredient17 === "" ? "..." : obj.strIngredient17}</li>
                 <li> ${obj.strIngredient18 === null || obj.strIngredient18 === "" ? "..." : obj.strIngredient18}</li>
                 <li> ${obj.strIngredient19 === null || obj.strIngredient19 === "" ? "..." : obj.strIngredient19}</li>
                 <li> ${obj.strIngredient20 === null || obj.strIngredient20 === "" ? "..." : obj.strIngredient20}</li>
                 
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
                thirdDiv.innerHTML = `
                 <h3>Instructions :</h3>
                 <p>${obj.strInstructions}</p>
                `
                mealIngredientsMainDiv.appendChild(thirdDiv);

            })
            
            getSearchMeal();
        
        })
    })
}

function getSearchMeal(){
    let localItem = localStorage.getItem("search")
    let searchMealApi = JSON.parse(localItem)
    mealsInnerDiv.innerHTML = "";

    mealsHeadDiv.innerHTML = `<h2 id="catName" class="meal-cat-name">${searchMealApi.meals[0].strCategory+","+searchMealApi.meals[1].strCategory}</h2>
    <div class="underline"></div>
 `;
    searchMealApi.meals.forEach((obj) => {
        let mealCardDiv = document.createElement("div");
        mealCardDiv.classList.add("mealCard-div");
        mealCardDiv.innerHTML = `
                          <img  class="mealCard-img" data-mealId="${obj.idMeal}" data-img="${obj.strMealThumb}" src="${obj.strMealThumb}" alt="${obj.strMealThumb}" >
                          <h6 class="mealTitle" >${obj.strMeal}</h6><span class="areaName">${obj.strArea}</span>
               `;
        mealsInnerDiv.appendChild(mealCardDiv);
    });
    mealCardImages = Array.from(document.getElementsByClassName("mealCard-img"))
            
            mealDetails();
}
window.onload = function(){
    if(document.body.id==="searchMealPage"){
        getSearchMeal();
    }
 }