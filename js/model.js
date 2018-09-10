const Model = (function() {
  const calculations = [];

  return {
    pushToData: (calc) => {
      calculations.push(calc);
    },
    getData: () => {
      return calculations;
    },
    calculate: () => {
      let calc = Model.getData().join(" ");
      return eval(calc);
    },
    logData: () => {
      console.log(calculations);
    }
  }
})();