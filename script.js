
let num1, num2;
let operator = "";

function add(num1, num2) {
    return num1 + num2;
}  

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    num1 * num2;
}

function divide(num1, num2) {
    num1 / num2;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case "add":
            return add(num1, num2);
        case "subtract":
            return subtract(num1, num2);
        case "multiply":
            return multiply(num1, num2);
        case "divide":
            return divide(num1, num2);
    }
}