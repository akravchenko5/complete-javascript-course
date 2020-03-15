// BUDGET CONTROLLER
const budgetController = (function(){

})();

// UI CONTROLLER
const UIController = (function(){

  const DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  }

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
      };
    },

    getDOMStrings: function() {
      return DOMStrings;
    }
  };

})();

// GLOBAL APP CONTROLLER
const controller = (function(budgetCtrl, UICtrl){

  const DOM = UICtrl.getDOMStrings();

  const ctrlAddItem = function() {

    // 1. Get the field input data
    let input = UICtrl.getInput();
    console.log(input);
    // 2. Add the item to the budget controller


    // 3. Add the item to UI


    // 4. Calculate the budget


    // 5. Display the budget on the UI

    
  };

  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem); // not calling ctrlAddItem, using as callback function

  document.addEventListener('keypress', function(event){

    if (event.keyCode === 13 || event.which === 13){
      event.preventDefault();
      ctrlAddItem();
    };

  });

})(budgetController, UIController);