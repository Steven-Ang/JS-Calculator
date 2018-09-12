const App = (function(Model, View) {
  const output = document.querySelector(View.getSelectors().numDisplay);

  const loadEventListeners = function() {
    // Get selectors
    const ViewSelectors = View.getSelectors();

    // Num buttons
    const numBtns = document.querySelectorAll(".lighten-3");

    // Operators buttons
    const operatorsBtns = document.querySelectorAll("[data-action]");

    // Loop through buttons
    loopElements(numBtns, changeDisplay);
    // Loop through buttons
    loopElements(operatorsBtns, operators);
  }

  const loopElements = (elements, func) => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", func);
    }
  }

  const changeDisplay = (e) => {
    let num = e.target.innerText;
    if (output.innerText === "0") {
      output.innerText = num;
    } else {
      output.innerText += num;
    }
  }

  const operators = (e) => {
    const operator = e.target.dataset.action;

    // Check the type of operator
    if (operator === "clear") {
      clearDisplay();
      Model.resetData();
    } else if (operator === "appendMinus" && output.innerText !== "0") {
      appendMinus();
    } else if (operator === "modulo") {
      if (output.innerText !== "0") {
        appendToArr("%", output.innerText);
      }
    } else if (operator === "divide") {
      if (output.innerText !== "0") {
        appendToArr("/", output.innerText);
      }
    } else if (operator === "times") {
      if (output.innerText !== "0") {
        appendToArr("*", output.innerText);
      }
    } else if (operator === "minus") {
      if (output.innerText !== "0") {
        appendToArr("-", output.innerText);
      }
    } else if (operator === "plus") {
      if (output.innerText !== "0") {
        appendToArr("+", output.innerText);
      }
    } else if (operator === "calculate") {
      if (Model.getData().length > 2) {
        calculate();
      }
    }
  }

  const clearDisplay = () => {
    // Reset the view
    output.innerText = "0";
  }

  const resetArr = () => {
    // Reset the model
    Model.resetData();
  }

  const appendMinus = () => {
    if (parseInt(output.innerText) > 0) {
      output.innerText = `-${output.innerText}`;
    } else {
      let split = output.innerText.split("");
      split.shift();
      output.innerText = `${split.join("")}`;
    }
  }

  const appendToArr = (symbol, firstVal) => {
    if (Model.getData().length >= 3) {
      Model.pushToData(symbol);
      // Clear the display
      clearDisplay();
      let secondValue = document.querySelector(View.getSelectors().numDisplay).innerText;
      // Push to the data structure
      let updateVal = setInterval(() => {
        // Second value
        secondValue = document.querySelector(View.getSelectors().numDisplay).innerText;
      }, 100);
      setTimeout(() => {
        Model.pushToData(secondValue);
        clearInterval(updateVal);
      }, 1800);
    } else {
      // Push to the array
      Model.pushToData(firstVal);
      // Clear the display
      clearDisplay();
      // Add modulo symbol to data structure
      Model.pushToData(symbol);
      let secondValue = document.querySelector(View.getSelectors().numDisplay).innerText;
      // Push to the data structure
      let updateVal = setInterval(() => {
        // Second value
        secondValue = document.querySelector(View.getSelectors().numDisplay).innerText;
      }, 100);
      setTimeout(() => {
        Model.pushToData(secondValue);
        clearInterval(updateVal);
      }, 1800);
    }
  }

  const calculate = () => {
    View.setDisplay(Model.calculate());
  }

  return {
    init: () => {
      // Set the display value to 0
      View.clearDisplay();

      // Load events
      loadEventListeners();

      console.log("Initializing App");
    }
  }
})(Model, View);

App.init();