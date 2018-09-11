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
      if (Model.getData().length != 0) {
        modulo();
      }
    } else if (operator === "calculate") {
      if (Model.getData().length > 2) {
        calculate();
      }
    }
  }

  const clearDisplay = () => {
    // Reset the view
    let numDisplay = document.querySelector(View.getSelectors().numDisplay);
    numDisplay.innerText = "0";
    // Reset the model
    Model.resetData();
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
    let secondValue = document.querySelector(View.getSelectors().numDisplay).innerText;
    // Push to the data structure
    let updateVal = setInterval(() => {
      // Second value
      secondValue = document.querySelector(View.getSelectors().numDisplay).innerText;
      console.log(secondValue);
    }, 100);
    setTimeout(() => {
      Model.pushToData(secondValue);
      clearInterval(updateVal);
    }, 1800);
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