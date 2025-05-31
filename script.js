// Initial References
const result = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const userInp = document.getElementById("user-inp");
const categoryBtns = document.querySelectorAll(".category-btn");
let activeCategory = "all";

const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
let currentMeal = null;

// Event Listeners
searchBtn.addEventListener("click", searchMeal);
userInp.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMeal();
});

categoryBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    
    if (activeCategory === "all") {
      result.innerHTML = `
        <div class="welcome-message">
          <h2>Welcome to Recipe Book</h2>
          <p>Search for recipes or select a category to browse</p>
        </div>
      `;
    } else {
      fetchRecipesByCategory(activeCategory);
    }
  });
});

// Functions
function searchMeal() {
  let userInput = userInp.value.trim();
  
  if (userInput.length === 0) {
    result.innerHTML = `<h3 class="error-message">Please enter a dish name</h3>`;
    return;
  }
  
  fetch(`${baseUrl}search.php?s=${userInput}`)
    .then(response => response.json())
    .then(data => {
      if (data.meals === null) {
        result.innerHTML = `<h3 class="error-message">No recipes found for "${userInput}"</h3>`;
      } else {
        displayMeal(data.meals[0]);
      }
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error-message">Error fetching recipe</h3>`;
    });
}

function fetchRecipesByCategory(category) {
  fetch(`${baseUrl}filter.php?c=${category}`)
    .then(response => response.json())
    .then(data => {
      if (data.meals === null) {
        result.innerHTML = `<h3 class="error-message">No recipes found in this category</h3>`;
      } else {
        displayMealGrid(data.meals);
      }
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error-message">Error fetching recipes</h3>`;
    });
}

function displayMealGrid(meals) {
  result.innerHTML = `
    <h2 class="category-title">${activeCategory} Recipes</h2>
    <div class="meal-grid">
      ${meals.map(meal => `
        <div class="meal-card" data-id="${meal.idMeal}">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <div class="meal-info">
            <h3>${meal.strMeal}</h3>
          </div>
        </div>
      `).join("")}
    </div>
  `;
  
  // Add click event to each meal card
  document.querySelectorAll(".meal-card").forEach(card => {
    card.addEventListener("click", () => {
      fetch(`${baseUrl}lookup.php?i=${card.dataset.id}`)
        .then(response => response.json())
        .then(data => displayMeal(data.meals[0]))
        .catch(() => {
          result.innerHTML = `<h3 class="error-message">Error loading recipe details</h3>`;
        });
    });
  });
}

function displayMeal(myMeal) {
  currentMeal = myMeal;
  let ingredients = [];
  
  // Get all ingredients and measures
  for (let i = 1; i <= 20; i++) {
    if (myMeal[`strIngredient${i}`]) {
      let ingredient = myMeal[`strIngredient${i}`];
      let measure = myMeal[`strMeasure${i}`] || "";
      ingredients.push(`${measure} ${ingredient}`);
    } else {
      break;
    }
  }
  
  result.innerHTML = `
    <div class="meal-card">
      <img src="${myMeal.strMealThumb}" alt="${myMeal.strMeal}">
      <div class="meal-info">
        <h2>${myMeal.strMeal}</h2>
        <h4>${myMeal.strArea} Cuisine</h4>
        <div id="ingredient-con">
          <h3>Ingredients:</h3>
          <ul>
            ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
          </ul>
        </div>
        <button id="show-recipe">View Recipe Instructions</button>
      </div>
    </div>
    
    <div id="recipe">
      <div class="recipe-content">
        <button id="hide-recipe"><i class="fas fa-times"></i></button>
        <h2>${myMeal.strMeal}</h2>
        <h4>Instructions:</h4>
        <pre id="instructions">${myMeal.strInstructions}</pre>
      </div>
    </div>
  `;
  
  // Add event listeners for recipe buttons
  document.getElementById("show-recipe").addEventListener("click", () => {
    document.getElementById("recipe").style.display = "block";
    document.body.style.overflow = "hidden";
  });
  
  document.getElementById("hide-recipe").addEventListener("click", () => {
    document.getElementById("recipe").style.display = "none";
    document.body.style.overflow = "auto";
  });
}

// Initialize with welcome message
result.innerHTML = `
  <div class="welcome-message">
    <h2>Welcome to Recipe Book</h2>
    <p>Search for recipes or select a category to browse</p>
  </div>
`;
