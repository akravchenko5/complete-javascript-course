/*
// ES5
var box5 = {
  color: 'green',
  position: 1,
  clickMe: function(){
    var self = this;
    document.querySelector('.green').addEventListener('click', function(){
      var str = self.position + ': ' + self.color;
      alert(str);
    });
  }
};

box5.clickMe();

// ES6
const box6= {
  color: 'blue',
  position: 2,
  clickMe: function(){
    document.querySelector('.blue').addEventListener('click', () => {
      const str = this.position + ': ' + this.color;
      alert(str);
    });
  }
};

box6.clickMe();
*/

// ES5
/*
function Person(name){
  this.name = name;
}

Person.prototype.myFriends = function(friends) {
  var arr = friends.map(function(el){
    return this.name + ' friend with ' + el;
  }.bind(this));
  console.log(arr);
};

var friends = ['Bob', 'Jane', 'Melisa'];
new Person('John').myFriends(friends);
*/


/*
// ES6

function Person(name){
  this.name = name;
}

Person.prototype.myFriends = function(friends) {
  const arr = friends.map(el => `${this.name} friend with ${el}`);
  console.log(arr);
};

var friends = ['Bob', 'Jane', 'Melisa'];
new Person('John').myFriends(friends);
*/
/*
const boxes = document.querySelectorAll('.box');


//ES5
var boxesArr = Array.prototype.slice.call(boxes);

boxesArr.forEach(function(cur) {
  cur.style.backgroundColor = 'dodgerblue';
});


//ES6
const boxesArr = Array.from(boxes);
boxesArr.forEach(cur => cur.style.backgroundColor = 'dodgerblue');

for (const cur of boxesArr){
  if (cur.className.includes('blue')){
    continue;
  }
  cur.textContent = 'I changed to blue!';
}

*/
/*
const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');

const all = [h, ...boxes];

Array.from(all).forEach(cur => cur.style.color = 'purple');
*/

/*
const question = new Map();

question.set ('question', 'What is the official name of the latest major JS version?');

question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');

question.set('correct', 3);
question.set(true, 'Correct answer');
question.set(false, 'Wrong answer');

console.log(question.get('question'));

// for of loop with destructuring
// for( let [key, value] of question.entries()) {
//   console.log(key + ': ' + value);
// }

for( let [key, value] of question.entries()) {
  if (typeof(key) === 'number'){
    console.log(key + ': ' + value);
  }
}

const answer  = parseInt(prompt('Enter your answer..'));
console.log(question.get(answer === question.get('correct')));

*/

/*
//ES 5 - classes and inheritance
var Person = function (name, job, yearOfBirth) {
  this.name = name;
  this.job = job;
  this.yearOfBirth = yearOfBirth;
}

Person.prototype.calculateAge = function(){
  var age = new Date().getFullYear() - this.yearOfBirth;
  console.log(age);
}


var Athlete = function(name, job, yearOfBirth, olympicGames) {
  Person.call(this, name, job, yearOfBirth);
  this.olympicGames = olympicGames;
}

Athlete.prototype = Object.create(Person.prototype);

var athlete = new Athlete('alex', 'programmer', 1983, 'No olympic');

console.log(athlete.calculateAge());
*/

//ES6

// class Person {
//   constructor (name, yearOfBirth){
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//   }

//   calculateAge() {
//     const age = new Date().getFullYear() - this.yearOfBirth;
//     console.log(age);
//   }
// }


// class Athlete extends Person {
//   constructor (name, yearOfBirth, medals) {
//     super(name, yearOfBirth);
//     this.medals = medals;
//   }

//   showMedals() {
//     console.log(this.medals);
//   }
// }

// const athlete = new Athlete ('Alex', 1983, 10);

// athlete.calculateAge();
// athlete.showMedals();

class Element {
  constructor (name, buildYear){
    this.name = name;
    this.buildYear = buildYear;
  }
}

class Park extends Element {
  constructor (name, buildYear, area, treesNumber) {
    super(name, buildYear);
    this.area = area;
    this.treesNumber = treesNumber;
  }

  density() {
    return (this.treesNumber / this.area).toFixed(2);
  }

  moreThan1000 () {
    return this.treesNumber > 1000;
  }

  age () {
    return new Date().getFullYear() - this.buildYear;
  }
}

class Street extends Element {
  constructor(name, buildYear, length, size = 'normal'){
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }
  getLength() {
    return this.length;
  }
}
// all parks objects
const allParks = [];

for (let index = 0; index < 4; index++) {
  let randomArea = Math.floor(Math.random() * 200);
  let randomTree = Math.floor(Math.random() * 2000);
  allParks.push(new Park(`Park${index+1}`, 2015 + index, randomArea, randomTree));
}

//all streets objects
const allStreets = [];

for (let index = 0; index < 3; index++) {
  let sizes  = ['tiny', 'small', 'normal', 'big', 'huge'];
  let randomSize = sizes[Math.floor(Math.random() * 5)];
  let randomLength = Math.floor(Math.random() * 2000);
  allStreets.push(new Street(`Street${index+1}`, 2015 + index, randomLength, randomSize));
}


function averageAge (allParks){
  let average = 0;

  const allAges = allParks.map((el) => {
    return el.age();
  })

  for (let cur of allAges){
    average += cur;
  }
  console.log(`Our ${allParks.length} Parks has average age of: ${average / allAges.length}`);
}

function displayParkDensity(allParks){
  allParks.forEach((park) => {
    console.log(`${park.name} has a tree density of ${park.density()} per square km`);
  })
}

function isMoreThan100(allParks){
  allParks.forEach((park) => {
    if(park.moreThan1000()){
      console.log(`${park.name} has more than 1000 trees`);
    }
  })
}

function lengths (allStreets){
  let total = 0
  const allLengths = allStreets.map((el) => {
    return el.getLength();
  })

  for (let cur of allLengths){
    total += cur;
  }
  console.log(`Our ${allStreets.length} streets a total length: ${total} km, with an average ${total / allStreets.length} km`);
}

function displayAllStreets (allStreets){
  allStreets.forEach((el)=> {
    console.log(`${el.name}, build in ${el.buildYear}, is a ${el.size}`)
  })
}


console.log("---------Parks report---------")
// console.log(allParks);
averageAge(allParks);
displayParkDensity(allParks);
isMoreThan100(allParks);

console.log("---------Streets report------")
lengths(allStreets);
displayAllStreets(allStreets);

