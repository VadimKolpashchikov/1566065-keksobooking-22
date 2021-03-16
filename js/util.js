const debounce = function(fn, time) {
  let timeout;
  return () => {
    let self = this;
    const functionCall = () => {
      return fn.apply(self, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  }
};

const getDifferenceArray = (firstArray, secondArray, differencesArray) => {
  firstArray.forEach((element) => {
    if (!secondArray.includes(element)) {
      differencesArray.push(element)
    }
  })
};


export {debounce, getDifferenceArray};
