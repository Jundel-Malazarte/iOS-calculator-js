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

function formatNumber(number) {
    // Convert to number to handle scientific notation
    let num = Number(number);
    
    // Check if the number is too large or small
    if (Math.abs(num) >= 1e16 || (Math.abs(num) < 1e-10 && num !== 0)) {
        return num.toExponential(5);
    }
    
    // Convert to string and limit decimal places
    let str = num.toString();
    
    // Handle decimal numbers
    if (str.includes('.')) {
        // Limit to 8 decimal places
        let [integer, decimal] = str.split('.');
        decimal = decimal.slice(0, 8);
        // Remove trailing zeros
        decimal = decimal.replace(/0+$/, '');
        return decimal ? `${integer}.${decimal}` : integer;
    }
    
    return str;
}

function calculate() {
    try {
        // Replace 'x' and '÷' with '*' and '/' for evaluation
        let expression = display.value.replace(/x/g, '*').replace(/÷/g, '/');

        // Use Function constructor to evaluate the expression safely
        let result = new Function('return ' + expression)();
        
        // Handle division by zero and invalid operations
        if (result === Infinity || result === -Infinity) {
            display.value = "Not a number";
            return;
        }
        
        if (Number.isNaN(result)) {
            display.value = "Error";
            return;
        }

        // Format the result
        display.value = formatNumber(result);
        
    } catch (error) {
        display.value = "Error";
    }
}