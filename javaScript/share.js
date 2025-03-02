export async function searchMeal() {

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