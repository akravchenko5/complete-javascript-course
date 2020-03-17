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

const boxes = document.querySelectorAll('.box');


//ES5
/*
var boxesArr = Array.prototype.slice.call(boxes);

boxesArr.forEach(function(cur) {
  cur.style.backgroundColor = 'dodgerblue';
});
*/

//ES6
const boxesArr = Array.from(boxes);
boxesArr.forEach(cur => cur.style.backgroundColor = 'dodgerblue');

for (const cur of boxesArr){
  if (cur.className.includes('blue')){
    continue;
  }
  cur.textContent = 'I changed to blue!';
}
