// BUDGET CONTROLLER
const budgetController = (function(){

  const Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val){
      let newItem, ID;

      // create new id
      if (data.allItems[type].length > 0){
        ID = data.allItems[type][data.allItems[type].length -1].id + 1;
      } else {
        ID =  0;
      }

      // create newItem base on inc or exp type
      if (type === 'exp'){
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc'){
        newItem = new Income(ID, des, val);
      };
      // store newItem to the data structure
      data.allItems[type].push(newItem);
      // return newItem
      return newItem;
    },

    testing: function(){
      console.log(data);
    }
  };

})();

// UI CONTROLLER
const UIController = (function(){

  const DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list'
  }

  return {

    getDOMStrings: function() {
      return DOMStrings;
    },

    clearFields: function() {
      let fields, fieldsArray;
      fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue); //list type stored in fields
      // fields.slice() will not work as the fields is NOT an array, but list

      // Array is a constructor for all arrays, methods are inherit from prototype properties of Array constructor
      // So to get an array from the list we need to use something like below, and it will return us an array
      fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach(function(current, index, array) { // we can pass up to 3 parameters and then can access to them
        current.value = '';
      });
      fieldsArray[0].focus(); //focus back to 'add description' field
    },

    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
      };
    },
    addListItem: function(obj, type){ // adding item to UI
      // create HTML string with placeholder text
      let html, newHTML, element;

      if (type === 'inc'){
        element = DOMStrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp'){
        element = DOMStrings.expenseContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // replace placeholder text with some actual data
      newHTML = html.replace('%id%', obj.id);
      newHTML = newHTML.replace('%description%', obj.description);
      newHTML = newHTML.replace('%value%', obj.value);

      // insert html into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
    }
  };

})();

// GLOBAL APP CONTROLLER
const controller = (function(budgetCtrl, UICtrl){

  const setupEventListeners = function(){
    const DOM = UICtrl.getDOMStrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem); // not calling ctrlAddItem, using as callback function
    
    document.addEventListener('keypress', function(event){
      if (event.keyCode === 13 || event.which === 13){
        event.preventDefault();
        ctrlAddItem();
      };
    });
  };

  const updateBudget = function() {

    // 1. Calculate the budget

    // 2. Return budget

    // 3. Display the budget on the UI

  };

  const ctrlAddItem = function() {

    let input, newItem;
    // 1. Get the field input data
    input = UICtrl.getInput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0){
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);


      // 3. Add the item to UI
      UICtrl.addListItem(newItem, input.type);

      // 4. Clear the fields
      UICtrl.clearFields();

      // 5. Calculate and update budget
      updateBudget();
    }
  };

  return {
    init: function (){
      console.log('Application has started');
      setupEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();