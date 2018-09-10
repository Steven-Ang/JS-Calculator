const View = (function() {
  const ViewSelectors = {
    calculator: ".calculator",
    numDisplay: ".display",
    keysList: ".calculator-keys"
  };

  return {
    setDisplay: () => {
      document.querySelector(ViewSelectors.numDisplay).innerText = 0;
    },
    changeDisplay: function(e) {
      const numDisplay = document.querySelector(ViewSelectors.numDisplay);
      
      if (!ViewSelectors.keysList.dataset.action) {
        numDisplay.innerText = e.target.value;
      }
    }
  }
})();