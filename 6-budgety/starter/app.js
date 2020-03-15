// BUDGET CONTROLLER
const budgetController = (function(){

})();

// UI CONTROLLER
const UIController = (function(){

})();

// GLOBAL APP CONTROLLER
const controller = (function(budgetCtrl, UICtrl){

  const ctrlAddItem = function() {
    // 1. Get the field input data
    // 2. Add the item to the budget controller
    // 3. Add the item to UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI
    console.log('clicked add');
  };

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem); // not calling ctrlAddItem, using as callback function

  document.addEventListener('keypress', function(event){
    if (event.keyCode === 13 || event.which === 13){
      ctrlAddItem();
    };
  });

})(budgetController, UIController);