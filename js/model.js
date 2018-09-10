const Model = (function() {
  let calculations = [];

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
    resetData: () => {
      calculations = [];
    },
    logData: () => {
      console.log(calculations);
    }
  }
})();