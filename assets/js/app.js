const App = (function(Model, View) {
  const output = document.querySelector(View.getSelectors().numDisplay);

  const loadEventListeners = function() {
    // Get selectors
    const ViewSelectors = View.getSelectors();

    // Num buttons
    const numBtns = document.querySelectorAll(ViewSelectors.num);

    // Operators buttons
    const operatorsBtns = document.querySelectorAll(ViewSelectors.operators);

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
    switch(operator) {
      case "clear":
        clearDisplay();
        resetArr();
        break;
      case "appendMinus":
        appendMinus();
        break;
      case "modulo":
        appendToArr("%", output.innerText);
        break;
      case "divide":
        appendToArr("/", output.innerText);
        break;
      case "times":
        appendToArr("*", output.innerText);
        break;
      case "minus":
        appendToArr("-", output.innerText);
        break;
      case "plus":
        appendToArr("+", output.innerText);
        break;
      case "calculate":
        calculate();
        break;
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
    if (output.innerText !== "0") {
      if (parseInt(output.innerText) > 0) {
        output.innerText = `-${output.innerText}`;
      } else {
        let split = output.innerText.split("");
        split.shift();
        output.innerText = `${split.join("")}`;
      }
    }
  }

  const appendToArr = (symbol, firstVal) => {
    if (output.innerText !== "0") {
      if (Model.getData().length >= 3) {
        if (firstVal !== "0") {
          Model.pushToData(firstVal);
        }
        Model.pushToData(symbol);
        // Clear the display
        clearDisplay();
      } else {
        // Push to the array
        Model.pushToData(firstVal);
        // Clear the display
        clearDisplay();
        Model.pushToData(symbol);
      }
    }
  }

  const calculate = () => {
    if (Model.getData().length >= 2) {
      Model.pushToData(output.innerText);
      View.setDisplay(Model.calculate());
      resetArr();
    }
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