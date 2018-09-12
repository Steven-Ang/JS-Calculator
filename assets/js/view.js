const View = (function() {
  const ViewSelectors = {
    calculator: ".calculator",
    num: ".num",
    operators: "[data-action]",
    numDisplay: ".display",
    keysList: ".calculator-keys"
  };

  return {
    clearDisplay: () => {
      // Set the value to 0
      document.querySelector(ViewSelectors.numDisplay).innerText = 0;
    },
    setDisplay: (calc) => {
      // Set the value
      document.querySelector(ViewSelectors.numDisplay).innerText = calc;
    },
    getSelectors: () => {
      return ViewSelectors;
    }
  }
})();