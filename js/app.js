const App = (function(Model, View) {
  const loadEventListeners = function() {
    // Get selectors
    const ViewSelectors = View.getSelectors();

    // Num buttons
    const numButtons = document.querySelectorAll(".lighten-3");

    // Loop through buttons
    for (let i = 0; i < numButtons.length; i++) {
      numButtons[i].addEventListener("click", changeDisplay);
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