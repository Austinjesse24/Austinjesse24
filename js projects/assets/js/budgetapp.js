let totalIncome = 0;
let categories = [];

const incomeInput = document.getElementById('income-input');
const setIncomeBtn = document.getElementById('set-income-btn');
const categoryInput = document.getElementById('category-input');
const amountInput = document.getElementById('amount-input');
const addCategoryBtn = document.getElementById('add-category-btn');
const spentInput = document.getElementById('spent-input');
const budgetTableBody = document.getElementById('budget-table-body');
const totalIncomeCell = document.getElementById('total-income');
const totalBudgetCell = document.getElementById('total-budget');
const totalSpentCell = document.getElementById('total-spent');
const remainingBudgetCell = document.getElementById('remaining-budget');

setIncomeBtn.addEventListener('click', function() {
    const income = Number(incomeInput.value);
    if (isNaN(income) || income <= 0) {
        alert('Please enter a valid income.');
        return;
    }
    totalIncome = income;
    totalIncomeCell.textContent = totalIncome;
    remainingBudgetCell.textContent = totalIncome; // Initialize remaining budget
    incomeInput.value = '';
});

addCategoryBtn.addEventListener('click', function() {
    const category = categoryInput.value.trim();
    const allocatedAmount = Number(amountInput.value);
    const spentAmount = Number(spentInput.value);

    if (category === '' || isNaN(allocatedAmount) || allocatedAmount <= 0 || isNaN(spentAmount) || spentAmount < 0) {
        alert('Please enter valid values for category, allocated amount, and spent amount.');
        return;
    }

    const newCategory = {
        name: category,
        allocated: allocatedAmount,
        spent: spentAmount
    };

    categories.push(newCategory);
    updateBudgetTable();

    categoryInput.value = '';
    amountInput.value = '';
    spentInput.value = '';
});

function updateBudgetTable() {
    budgetTableBody.innerHTML = ''; // Clear existing table rows

    let totalBudget = 0;
    let totalSpent = 0;

    categories.forEach((category, index) => {
        totalBudget += category.allocated;
        totalSpent += category.spent;

        const newRow = budgetTableBody.insertRow();
        const nameCell = newRow.insertCell();
        const allocatedCell = newRow.insertCell();
        const spentCell = newRow.insertCell();
        const actionCell = newRow.insertCell();
        const deleteBtn = document.createElement('button');

        nameCell.textContent = category.name;
        allocatedCell.textContent = category.allocated;
        spentCell.textContent = category.spent;

        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            categories.splice(index, 1);
            updateBudgetTable();
        });

        actionCell.appendChild(deleteBtn);
    });

    totalBudgetCell.textContent = totalBudget;
    totalSpentCell.textContent = totalSpent;
    remainingBudgetCell.textContent = totalIncome - totalSpent;
}
