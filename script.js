const displayPrev = document.querySelector("#display h3");
const displayCurrent = document.querySelector("#display h1");
const numButtons = Array.from(document.querySelectorAll("button[data-number]"));
const opButtons = Array.from(document.querySelectorAll("button[data-operator]"));

let num1 = null, num2 = null, lastOperator = null;

numButtons.forEach(btn => {
    btn.addEventListener("click", () => displayAction(btn));
});

opButtons.forEach(btn => {
    btn.addEventListener("click", () => selectOperation(btn));
});

function add(num1, num2) {
    return Math.round((num1 + num2) * 100) / 100;
}  

function subtract(num1, num2) {
    return Math.round((num1 - num2) * 100) / 100;
}

function multiply(num1, num2) {
    return Math.round((num1 * num2) * 100) / 100;
}

function divide(num1, num2) {
    return Math.round((num1 / num2) * 100) / 100;
}

function operate(lastOperator, num1, num2) {
    switch(lastOperator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

function displayAction(btn) {
    if (displayCurrent.textContent[0] == 0) {
        displayCurrent.textContent = btn.dataset.number;
    }
    else {
        displayCurrent.textContent += btn.dataset.number;
    }
}

function displayOperation(updated, cleared) {
    num2 = Number(displayCurrent.textContent);
    num1 = operate(lastOperator, num1, num2);
    updated.textContent = num1;
    if (cleared == displayPrev) {
        cleared.textContent = "";
    }
    else {
        cleared.textContent = "";
    }
}

function selectOperation(btn) {
    switch(btn.dataset.operator) {
        case "=":
            result();
            break;
        
        case "Del":
            if (displayCurrent.textContent.length <= 1) {
                displayCurrent.textContent = "";
            }
            else {
                displayCurrent.textContent = displayCurrent.textContent.slice(0, -1);
            }
            break;

        case "C":
            clear();
            break;
        
        default:
            generalOperation(btn);       
    }
}

function result() {
    if (num1 == null || displayCurrent.textContent == "") {
        return;
    }
    if (infiniteCheck()) {
        return;
    }

    displayOperation(displayCurrent, displayPrev);
    num1 = null, num2 = null;
}

function clear() {
    displayPrev.textContent = "";
    displayCurrent.textContent = "";
    lastOperator = null, num1 = null, num2 = null;
}

function generalOperation(btn) {
    if (displayCurrent.textContent == "" && num1 != null) {
        lastOperator = btn.dataset.operator;
        displayPrev.textContent = displayPrev.textContent.slice(0, -1) + lastOperator;
        return;
    }

    if (num1 == null) {
        num1 = Number(displayCurrent.textContent);
        lastOperator = btn.dataset.operator;
        displayCurrent.textContent = "";
        displayPrev.textContent = num1 + lastOperator;
    }
    
    else {
        if (infiniteCheck()) {
            return;
        }
        displayOperation(displayPrev, displayCurrent);
        lastOperator = btn.dataset.operator;
        displayPrev.textContent += lastOperator;
    }
}

function infiniteCheck() {
    if (num2 = Number(displayCurrent.textContent) == 0 && lastOperator == "/") {
        alert("That's not happening, try a different number...");
        return true;
    }
}