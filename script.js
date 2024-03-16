const balance = document.querySelector("#balance");
const money_plus = document.querySelector("#money-plus");
const money_minus = document.querySelector("#money-minus");
const list = document.querySelector("#list");
const text = document.querySelector("#text");
const amount = document.querySelector("#amount");
const form = document.querySelector("#form");

// const mockData = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTransaction(e) {
    e.preventDefault();
    if (text.value === "" || amount.value === "" || amount.value <= 0) {
        alert("Please add a valid text and amount");
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: Number(amount.value)
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
    }
    text.value = "";
    amount.value = "";
}

function updateLocalStorage() {
    console.log("transactions: ", transactions)
    localStorage.setItem("transactions", JSON.stringify(transactions))
}

function generateID() {
    return Math.random() * 10000000;
}
// add existing transactions to DOM list
function addTransactionDOM(transaction) {
    const listItem = document.createElement("li");
    const sign = transaction.amount < 0 ? "-" : "+";
    listItem.classList.add(transaction.amount < 0 ? "minus" : "plus");

    listItem.innerHTML = `
        ${transaction.text}
        <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `
    list.appendChild(listItem)
}

function updateValues() {
    let total = 0;
    let income = 0;
    let expense = 0;
    for (let i = 0; i < transactions.length; i++) {
        const { amount } = transactions[i];
        if (amount > 0) {
            income += amount
        } else {
            expense += amount;
        }
        total += amount;
    };
    balance.innerText = `$${total.toFixed(2)}`;
    money_plus.innerText = `$${income.toFixed(2)}`;
    money_minus.innerText = `$${expense.toFixed(2)}`;
}

function removeTransaction(id) {
    const filteredTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].id !== id) {
            filteredTransactions.push(transactions[i]);
        }
    }
    transactions = filteredTransactions;
    updateLocalStorage();
    init();
}

function init() {
    list.innerHTML = ""
    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        addTransactionDOM(transaction);
    }
    updateValues();
}

init();

form.addEventListener("submit", addTransaction)
