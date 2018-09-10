const App = (function(Model, View) {
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
    let numDisplay = document.querySelector(View.getSelectors().numDisplay);
    if (numDisplay.innerText === "0") {
      numDisplay.innerText = num;
    } else {
      numDisplay.innerText += num;
    }
  }

  const operators = (e) => {
    const operator = e.target.dataset.action;
    let numDisplay = document.querySelector(View.getSelectors().numDisplay);
    // Check the type of operator
    if (operator === "clear") {
      clearDisplay();
    } else if (operator === "appendMinus" && numDisplay.innerText !== "0") {
      appendMinus();
    } else if (operator === "modulo") {
      Model.pushToData(numDisplay.innerText);
      modulo();
    }
  }

  const clearDisplay = () => {
    let numDisplay = document.querySelector(View.getSelectors().numDisplay);
    numDisplay.innerText = "0";
  }

  const appendMinus = () => {
    let numDisplay = document.querySelector(View.getSelectors().numDisplay);
    if (parseInt(numDisplay.innerText) > 0) {
      numDisplay.innerText = `-${numDisplay.innerText}`;
    } else {
      let split = numDisplay.innerText.split("");
      split.shift();
      numDisplay.innerText = `${split.join("")}`;
    }
  }

  const modulo = () => {
    // Clear the display
    document.querySelector(View.getSelectors().numDisplay).innerText = "0";
    // Add modulo symbol to data structure
    Model.pushToData("%");
    // Push to the data structure
    setTimeout(() => {
      // Second value
      const secondValue = document.querySelector(View.getSelectors().numDisplay).innerText;
      Model.pushToData(secondValue);
    }, 4000);
  }

  return {
    init: () => {
      // Set the display value to 0
      View.setDisplay();

      // Load events
      loadEventListeners();

      console.log("Initializing App");
    }
  }
})(Model, View);

App.init();