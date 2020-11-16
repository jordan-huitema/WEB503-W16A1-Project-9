// DOM Selectors 
const main = document.getElementById("main")
const adUserBtn = document.getElementById("add-user")
const doubleBtn = document.getElementById("double")
const showMillionairesBtn = document.getElementById("show-millionaires")
const sortBtn = document.getElementById("sort")
const calculateWealthBtn = document.getElementById("calculate-wealth")

let data = []

getRandomUser()
getRandomUser()
getRandomUser()

// Fetch random user and add the money value 

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api'); // Use fetch API
    const data = await res.json(); // returns a promise 

    const user = data.results[0]; // set results array for the first index

    const newUser = { // creating an object for newUsers
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000) // giving random amount money for the user
    };

    addData(newUser); // Add new object to data array
}

// Double users money
function doubleMoney() {
    data = data.map(user => {
        return {
            ...user,
            money: money.user * 2
        }
    })
    updateDOM()
}

// Sort users by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money)
    updateDOM()
}

// Filter non millionaires
function showMillionaires() {
    data = data.filter(user => user.money > 1000000)
    updateDOM()
}

// Calc total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0)

    const wealthEl = document.createElement('div')
    wealthEl.innerHTML = `
    <h3>
        Total Wealth
        <strong>${formatMoney(wealth)}</strong>
    </h3>`
    main.appendChild(wealthEl)
}

// Add to data array
function addData(obj) {
    data.push(obj)
    updateDOM()
}

// Replace the list with updated list
function updateDOM(providedData = data) {
    main.innerHTML = `
    <h2>
        <strong>Person </strong>
        Wealth
    </h2>`

    providedData.forEach(item => {
        const element = document.createElement('div')
        element.classList.add("person")
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney()}`
    })
    main.appendChild(element)
}

// Add commas and dollar sign to number
function formatMoney() {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

// Event Listener
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillionairesBtn.addEventListener('click', showMillionaires)
calculateWealthBtn.addEventListener('click', calculateWealth)