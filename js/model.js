const Model = (function() {
  const calculations = [];

  return {
    pushToData: (calc) => {
      calculations.push(calc);
    },
    logData: () => {
      console.log(calculations);
    }
  }
})();