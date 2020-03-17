// BUDGET CONTROLLER
const budgetController = (function(){

  const Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome){
    if (totalIncome > 0){
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function(){
    return this.percentage;
  };

  const Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur){
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  const data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
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

    deleteItem: function(type, id) {
      
      let ids, index;

      ids = data.allItems[type].map(function(current){ // array of all ids
        return current.id;
      })
      index = ids.indexOf(id); // find position of passed id through all ids

      if (index !== -1){ // check if id found in ids array
        data.allItems[type].splice(index, 1); // deleting one element from data structure which
      }
    },

    calculateBudget: function() {

      // calculate total income and expenses
      calculateTotal('inc');
      calculateTotal('exp');

      // calculate budget income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // calculate percentage of spent income
      if (data.totals.inc > 0){ // if we don't have any income
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }

    },

    calculatePercentages: function(){
      data.allItems.exp.forEach(function(cur){
        cur.calcPercentage(data.totals.inc);
      })
    },

    getPercentages: function(){
      let allPercentages = data.allItems.exp.map(function(cur){
        return cur.getPercentage();
      })
      return allPercentages;
    },

    getBudget: function() { // crating budget object
      return {
        budget: data.budget,
        totalIncome: data.totals.inc,
        totalExpenses: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: function(){ // test the data structure
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
    expenseContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercentageLabel: '.item__percentage',
    dataLabel: '.budget__title--month'
  };

  const formatNumber = function(num, type){
    let numSplit, int, dec;
    /** + or - before numbers
     * exactly 2 decimals points
     * coma separated thousands
     * 2310.2351 -> + 2,310.24
     * 2000 -> + 2,000.00
     */

     num = Math.abs(num); // overwriting num variable
     num = num.toFixed(2); // two decimals, method of the Number.prototype, also doing rounding
     numSplit = num.split('.');
     int = numSplit[0];
     if(int.length > 3){
       int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); // input 2310, output 2,310
     }

     dec = numSplit[1];
     
     
     return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
  };

  let nodeListForEach = function(list, callback){
    for (let index = 0; index < list.length; index++) { // nodeList has length property
      callback(list[index], index)
    }
  };

  return {

    getDOMStrings: function() { // getting DOM classes from DOMStrings object
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
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp'){
        element = DOMStrings.expenseContainer;
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // replace placeholder text with some actual data
      newHTML = html.replace('%id%', obj.id);
      newHTML = newHTML.replace('%description%', obj.description);
      newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));

      // insert html into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
    },

    // delete element from UI
    deleteListItem: function (selectorID) {
      let el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    displayPercentages: function(percentages){
      let fields = document.querySelectorAll(DOMStrings.expensesPercentageLabel); //nodeList - in DOM tree each element is called node

      /**
      * when we call nodeListForEach function we passed function(cur, index) callback function, this function is assigned to 'callback' parameter
      * then in nodeListForEach we are looping over our list, and for each iteration the callback function get called with arguments which we
      * specified wen calling, (cur, index) arguments, so then block code inside function(cur, index) going to be executed. We will have access as
      * we passing them with callback(list[i], i). cur = list[i], index = i
       */
      nodeListForEach(fields, function(cur, index){ 
        if (percentages[index] > 0){
          cur.textContent = percentages[index] + '%';
        } else {
          cur.textContent = '--'
        }
      });
    },

    displayMonth: function() {
      let now, year, month, months;
      now = new Date();
      // let christmasDay = new Date(2020, 11, 25) - month started from 0
      year = now.getFullYear();
      month = now.getMonth();
      months = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      document.querySelector(DOMStrings.dataLabel).textContent = months[month] + ' ' + year;
    },

    changedType: function () { //change outline of inputs

      let fields = document.querySelectorAll(
        DOMStrings.inputType + ',' +
        DOMStrings.inputDescription + ',' +
        DOMStrings.inputValue
      );

      nodeListForEach(fields, function(cur){
        cur.classList.toggle('red-focus');
      });

      document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
    },

    displayBudget: function(obj){
      let type;

      obj.budget > 0 ? type = 'inc' : type = 'exp';

      document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'inc');
      document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExpenses, 'exp');
      
      if (obj.percentage > 0){
        document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent = '--';
      }
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

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem); //// not calling ctrlAddItem, using as callback function
    
    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
  };

  const updateBudget = function() {
    let budget;

    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return budget
    budget = budgetCtrl.getBudget();

    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  const updatePercentages = function() {
    let percentages;
    // 1. Calculate percentages
    budgetCtrl.calculatePercentages();

    // 2. Read percentages from budget controller
    percentages = budgetCtrl.getPercentages();

    // 3. Update UI with the new percentages
    UICtrl.displayPercentages(percentages);

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

      // 6. Calculate and update percentages
      updatePercentages();

    }
  };

  const ctrlDeleteItem = function(event) { // we passing event object as we want to know target element
    let itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; // DOM upward traversing

    if (itemID) {
      // inc-0 or exp-0 
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // 1. Delete item from data structure
      budgetCtrl.deleteItem(type, ID);

      // 2. Delete item from UI
      UICtrl.deleteListItem(itemID);

      // 3. Update and show new budget
      updateBudget();

      // 4. Calculate and update percentages
      updatePercentages();

    }

  };

  return {
    init: function (){
      console.log('Application has started');
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalIncome: 0,
        totalExpenses: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();