const App = (function(Model, View) {
  return {
    init: () => {
      View.setDisplay();

      console.log("Initializing App");
    }
  }
})(Model, View);

App.init();