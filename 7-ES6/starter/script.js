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

class Person {
  constructor (name, yearOfBirth){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
  }

  calculateAge() {
    const age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
  }
}


class Athlete extends Person {
  constructor (name, yearOfBirth, medals) {
    super(name, yearOfBirth);
    this.medals = medals;
  }

  showMedals() {
    console.log(this.medals);
  }
}

const athlete = new Athlete ('Alex', 1983, 10);

athlete.calculateAge();
athlete.showMedals();