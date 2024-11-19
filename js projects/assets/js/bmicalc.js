let age = document.getElementById("age");
let height = document.getElementById("height");
let weight = document.getElementById("weight");
let male = document.getElementById("m");
let female = document.getElementById("f");
let form = document.getElementById("form");
let resultArea = document.querySelector(".comment");

let modalContent = document.querySelector(".model-content");
let modelText = document.querySelector("#modelText");
let model = document.getElementById("myModel");
let span = document.getElementsByClassName("close")[0];

function calculate() {
    if (age.value === '' || height.value === '' || weight.value === '' || (male.checked === false && female.checked === false)) {
        model.style.display = "block";
        modelText.innerHTML = `All fields are required!`;
    } else {
        countBmi();
    }
}

function countBmi() {
    let p = [age.value, height.value, weight.value];
    if (male.checked) {
        p.push("male");
    } else if (female.checked) {
        p.push("female");
    }

    let bmi = Number(p[2]) / ((Number(p[1]) / 100) ** 2); // Correct BMI calculation

    let results = '';
    if (bmi < 18.5) {
        results = 'underweight';
    } else if (18.5 <= bmi && bmi <= 24.9) {
        results = 'Healthy';
    } else if (25 <= bmi && bmi <= 29.9) {
        results = 'Overweight';
    } else if (30 <= bmi && bmi <= 34.9) {
        results = 'obese';
    } else if (35 <= bmi) {
        results = 'extremely obese';
    }

    resultArea.style.display = "block";
    document.querySelector(".comment").innerHTML = `You are <span id="comment">${results}</span>`;
    document.querySelector("#results").innerHTML = bmi.toFixed(2);
}

// When user clicks on <span> (x), close the modal
span.onclick = function() {
    model.style.display = "none";
}

// When user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === model) {
        model.style.display = "none";
    }
}

