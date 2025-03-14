const butContainer = document.querySelector("#button-container");
const display = document.querySelector("#display");
let currValue = '';
let result = '';
const click = new Audio("click-sound.wav");

// Function to play click sound (safe check)
function playClickSound() {
  if (click.readyState >= 2) {
    click.currentTime = 0;
    click.play();
  }
}

// Function to handle inputs (numbers, operators, etc.)
function handleInput(value) {
  // Replace operator symbols with valid ones for evaluation
  if (value === "−") value = "-";
  if (value === "×") value = "*";
  if (value === "÷") value = "/";
  if (value === "•") value = ".";

  const lastChar = currValue[currValue.length - 1]; // Safe way to get last character

  // If value is a number, append it
  if (!isNaN(value)) {
    currValue += value;
  } 
  // Handle operators: replace last operator if repeated
  else if ("+-*/%.".includes(value)) {
    if (currValue === "" && value === "-") {
      currValue += value; // Allow negative sign at the beginning
    } else if ("+-*/%.".includes(lastChar)) {
      currValue = currValue.slice(0, -1) + value; // Replace last operator
    } else {
      currValue += value; // Append operator
    }
  }
  
  // Update display
  display.value = currValue || '0';
}

// Event listener for button clicks
butContainer.addEventListener("click", (event) => {
  const target = event.target;

  if (target.tagName === "BUTTON") {
    playClickSound(); // Play sound on click

    let value = target.textContent;

    if (value === 'AC') {
      currValue = '';
      display.value = '0';
    } 
    else if (value === '←') {
      currValue = currValue.slice(0, -1);
      display.value = currValue || '0';
    } 
    else if (value === '=') {
      try {
        if (currValue === '' || /[+\-*/%]$/.test(currValue)) {
          display.value = 'Error'; // Invalid input handling
        } else {
          result = eval(currValue);
          if (result === Infinity || result === -Infinity) {
            display.value = 'Infinity';
            currValue = '';
          } else {
            display.value = result;
            currValue = result.toString();
          }
        }
      } catch {
        display.value = 'Error';
        currValue = '';
      }
    } 
    else {
      handleInput(value);
    }
  }
});
