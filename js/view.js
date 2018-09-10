const View = (function() {
  const ViewSelectors = {
    calculator: ".calculator",
    numDisplay: ".display",
    keysList: ".calculator-keys"
  };

  return {
    setDisplay: () => {
      // Set the value to 0
      document.querySelector(ViewSelectors.numDisplay).innerText = 0;
    },
    getSelectors: () => {
      return ViewSelectors;
    }
  }
})();