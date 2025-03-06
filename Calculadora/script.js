
const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const calcModeBtn = document.getElementById("calc-mode");
const convertModeBtn = document.getElementById("convert-mode");
const calculationControls = document.querySelectorAll(".calculation-control");
const converterControls = document.querySelector(".converter-controls");
const convertBtn = document.getElementById("convert-btn");
const fromUnitSelect = document.getElementById("from-unit");
const toUnitSelect = document.getElementById("to-unit");

let currentInput = "";
let currentOperator = "";
let shouldClearDisplay = false;
let isCalculatorMode = true;

// Configurar modos
calcModeBtn.addEventListener("click", () => {
    setCalculatorMode(true);
});

convertModeBtn.addEventListener("click", () => {
    setCalculatorMode(false);
});

function setCalculatorMode(isCalc) {
    isCalculatorMode = isCalc;
    if (isCalc) {
        calcModeBtn.classList.add("active");
        convertModeBtn.classList.remove("active");
        calculationControls.forEach(control => control.style.display = "block");
        converterControls.style.display = "none";
    } else {
        calcModeBtn.classList.remove("active");
        convertModeBtn.classList.add("active");
        calculationControls.forEach(control => control.style.display = "none");
        converterControls.style.display = "flex";
        currentInput = "";
        currentOperator = "";
    }
    display.textContent = "0";
    shouldClearDisplay = true;
}

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent;
        if (display.textContent === "0" || shouldClearDisplay) {
            display.textContent = buttonText;
            shouldClearDisplay = false;
        } else {
            display.textContent += buttonText;
        }
    });
});


clearButton.addEventListener("click", () => {
    display.textContent = "0";
    if (isCalculatorMode) {
        currentInput = "";
        currentOperator = "";
    }
});


operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (isCalculatorMode) {
            currentOperator = button.textContent;
            currentInput = display.textContent;
            shouldClearDisplay = true;
        }
    });
});


equalsButton.addEventListener("click", () => {
    if (isCalculatorMode && currentOperator && currentInput) {
        const result = calculate(parseFloat(currentInput), currentOperator, parseFloat(display.textContent));
        display.textContent = result;
        currentInput = result;
        currentOperator = "";
        shouldClearDisplay = true;
    }
});


function calculate(num1, operator, num2) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 !== 0) {
                return num1 / num2;
            } else {
                return "Error";
            }
        default:
            return num2;
    }
}

// Funcionalidad de conversión de unidades
const conversionFactors = {
    // Base: metros
    m: {
        m: 1,
        km: 0.001,
        cm: 100,
        mm: 1000
    },
    km: {
        m: 1000,
        km: 1,
        cm: 100000,
        mm: 1000000
    },
    cm: {
        m: 0.01,
        km: 0.00001,
        cm: 1,
        mm: 10
    },
    mm: {
        m: 0.001,
        km: 0.000001,
        cm: 0.1,
        mm: 1
    }
};

// Función para convertir unidades
function convertUnits(value, fromUnit, toUnit) {
    return value * conversionFactors[fromUnit][toUnit];
}

// Botón de conversión
convertBtn.addEventListener("click", () => {
    const value = parseFloat(display.textContent);
    if (!isNaN(value)) {
        const fromUnit = fromUnitSelect.value;
        const toUnit = toUnitSelect.value;
        const result = convertUnits(value, fromUnit, toUnit);
        display.textContent = result;
        shouldClearDisplay = true;
    }
});