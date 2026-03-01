// Get elements
var form = document.getElementById("food-form");
var foodNameInput = document.getElementById("food-name");
var calorieInput = document.getElementById("calories");
var foodList = document.getElementById("food-list");
var totalCaloriesDisplay = document.getElementById("total-calories");
var resetBtn = document.getElementById("reset-btn");

// Load saved data
var foods = JSON.parse(localStorage.getItem("foods")) || [];

// Save to localStorage
function saveData() {
  localStorage.setItem("foods", JSON.stringify(foods));
}
