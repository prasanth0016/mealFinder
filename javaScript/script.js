
let catmaindiv=document.getElementById("cats-main-div")
 async function fetchData(){
    let response= await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let categoriesApi= await response.json()
    categoriesApi.categories.forEach((obj)=>{
    let catdiv=document.createElement("div");
    catdiv.classList.add("catdiv")
    catdiv.innerHTML=`<h6 class="cats-title">${obj.strCategory}</h6>
    <img class="cat-img" id="img-of-cats" src="${obj.strCategoryThumb}" alt="${obj.strCategoryThumb}">
    `
    catmaindiv.appendChild(catdiv)
    })
}
fetchData();