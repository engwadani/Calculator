
// Find and store the display elements for current and previous inputs
const currDisplay = document.querySelector(".curr-display"); // Current number or result displayed
const prevDisplay = document.querySelector(".prev-display"); // Previous number and operation displayed

// Find and store the buttons for numbers, operations, and special functions
const numbers = document.querySelectorAll(".number"); // Number buttons (0-9 and ".")
const operands = document.querySelectorAll(".operation"); // Operation buttons (+, -, *, /)
const clearBtn = document.querySelector(".clear"); // Button to clear all displays
const delBtn = document.querySelector(".delete"); // Button to delete the last input
const equalBtn = document.querySelector(".equal"); // Button to calculate the result

// Variable to store the selected operation (e.g., +, -, *, /)
let operation;

// Function to handle number button clicks
function appendNumber(number) {
  // Prevent adding multiple decimal points in the same number
  if (number === "." && currDisplay.innerText.includes(".")) return;
  
  // Add the clicked number to the current display
  currDisplay.innerText += number;
}

// Function to handle operation button clicks
function chooseOperation(operand) {
  // If the current display is empty, do nothing
  if (currDisplay.innerText === "") return;

  // Perform any pending calculation before setting the new operation
  compute();

  // Store the selected operation
  operation = operand;

  // Move the current number and operation to the previous display
  prevDisplay.innerText = currDisplay.innerText + " " + operand;

  // Clear the current display for the next number
  currDisplay.innerText = "";
}

// Function to clear both displays
function clearDisplay() {
  currDisplay.innerText = ""; // Clear current display
  prevDisplay.innerText = ""; // Clear previous display
}

// Function to perform the calculation based on the operation
function compute() {
  let result; // Variable to store the calculation result

  // Convert text in displays to numbers
  const previousValue = parseFloat(prevDisplay.innerText);
  const currentValue = parseFloat(currDisplay.innerText);

  // If either value is not a number, exit the function
  if (isNaN(previousValue) || isNaN(currentValue)) return;

  // Perform the operation based on the stored `operation` value
  switch (operation) {
    case "+":
      result = previousValue + currentValue; // Addition
      break;
    case "-":
      result = previousValue - currentValue; // Subtraction
      break;
    case "*":
      result = previousValue * currentValue; // Multiplication
      break;
    case "/":
      result = previousValue / currentValue; // Division
      break;
    default:
      return; // If no valid operation, exit
  }

  // Display the result in the current display
  currDisplay.innerText = result;

  // Clear the previous display since the calculation is complete
  prevDisplay.innerText = "";
}

// Add event listeners to all number buttons
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    // Call `appendNumber` with the text of the clicked number
    appendNumber(number.innerText);
  });
});

// Add event listeners to all operation buttons
operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    // Call `chooseOperation` with the text of the clicked operation
    chooseOperation(operand.innerText);
  });
});

// Add event listener to the clear button
clearBtn.addEventListener("click", () => {
  // Call `clearDisplay` to reset the calculator
  clearDisplay();
});

// Add event listener to the equals button
equalBtn.addEventListener("click", () => {
  // Call `compute` to calculate the result
  compute();
});

// Add event listener to the delete button
delBtn.addEventListener("click", () => {
  // Remove the last character from the current display
  currDisplay.innerText = currDisplay.innerText.slice(0, -1);
});