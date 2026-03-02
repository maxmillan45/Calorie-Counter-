
// getting elements from the DOM
const calorieForm = document.getElementById('calorie-form');
const foodList = document.getElementById('food-list');const totalCalDisplay = document.getElementById('total-calories');
const resetBtn = document.getElementById('reset-btn');const fetchBtn = document.getElementById('fetch-btn');

let items = JSON.parse(localStorage.getItem('calorieItems')) || [];

// Initialize App
document.addEventListener('DOMContentLoaded', renderItems);

// Form Submission
calorieForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('item-name').value;
    const calories = parseInt(document.getElementById('item-calories').value);

    addItem(name, calories);
    calorieForm.reset();
});

// Add Item
function addItem(name, calories) {
    const item = {
        id: Date.now(),
        name,
        calories
    };
    items.push(item);
    updateStorage();
    renderItems();
}

// Remove Item
function removeItem(id) {
    items = items.filter(item => item.id !== id);
    updateStorage();
    renderItems();
}

// Reset items
resetBtn.addEventListener('click', () => {
    if (confirm('Clear all entries for today?')) {
        items = [];
        updateStorage();
        renderItems();
    }
});

// Update 
function renderItems() {
    foodList.innerHTML = '';
    let total = 0;

    items.forEach(item => {
        total += item.calories;
        
        const li = document.createElement('li');
        li.className = 'food-item';
        li.innerHTML = `
            <span>${item.name} <span class="calorie-value">(${item.calories} kcal)</span></span>
            <button onclick="removeItem(${item.id})" class="remove-btn">&times;</button>
        `;
        foodList.appendChild(li);
    });    totalCalDisplay.textContent = total;
}

// LocalStorage 
function updateStorage() {
    localStorage.setItem('calorieItems', JSON.stringify(items));
}

// Fetch API
fetchBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1'); 
        if (response.ok) {
            const mockData = [
                { name: 'Oatmeal', calories: 150 },
                { name: 'Coffee', calories: 5 }
            ];
            mockData.forEach(d => addItem(d.name, d.calories));        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});