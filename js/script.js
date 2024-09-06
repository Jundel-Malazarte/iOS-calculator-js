// JavaScript Calculator

const display = document.getElementById("display");

function appendToDisplay(value) {
    // Prevent adding more than one decimal point in a number
    if (value === '.' && display.value.includes('.')) return;

    // Prevent starting with multiple operators
    if (display.value === '' && ['+', '-', 'x', '÷'].includes(value)) return;

    // Prevent adding consecutive operators
    const lastChar = display.value.slice(-1);
    if (['+', '-', 'x', '÷'].includes(lastChar) && ['+', '-', 'x', '÷'].includes(value)) {
        display.value = display.value.slice(0, -1) + value;
        return;
    }

    // Append the value to the display
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        // Replace 'x' and '÷' with '*' and '/' for evaluation
        let expression = display.value.replace(/x/g, '*').replace(/÷/g, '/');

        // Use Function constructor to evaluate the expression safely
        display.value = new Function('return ' + expression)();
        
        // Handle division by zero
        if (display.value === Infinity || Number.isNaN(display.value)) {
            display.value = "Error";
        }
    } catch (error) {
        // If an error occurs, display "Error"
        display.value = "Error";
    }
}
