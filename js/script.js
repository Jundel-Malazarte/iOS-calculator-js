// JavaScript Calculator

const display = document.getElementById("display");

function appendToDisplay(value){
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        // Try this code first;
        display.value = eval(display.value);
    } catch (error) {
        // If it fails, do this
        display.value = "Error"
    } 
}