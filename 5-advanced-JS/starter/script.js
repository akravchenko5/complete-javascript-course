(function(){ // IIFE

  function Question(question, answers, correctAnswer){ //function construction
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }

  Question.prototype.displayQuestion = function() { //Question prototype
    console.log(this.question); // 
    for(let i = 0; i < this.answers.length; i++){ // displaying all answers
      console.log(i + ': ' + this.answers[i]);
    }
  };

  Question.prototype.checkAnswer = function (ans, callback) { // checkAnswer prototype
    let sc; // variable for result of callback (keepScore) function

    if ( ans === this.correctAnswer ) {
      console.log('Correct answer!!');
      sc = callback(true); // calling keepScore function
    } else {
      console.log('Wrong answer, please try again.');
      sc = callback(false); // calling keepScore function
    }

    this.overallScore(sc); // displaying overallScore by using overallScore prototype
  };

  Question.prototype.overallScore = function (score) { // overall Score prototype
    console.log('Your current score is: ' + score);
    console.log('============================');
  }
  // creating question objects by using Question constructor
  const q1 = new Question('Do you think that JS is difficult or fun?', ['fun', 'difficult'], 0);
  const q2 = new Question('What is the name of the course teacher?', ['John', 'Jonas', 'Emily'], 1);
  const q3 = new Question('How many steps does Execution Context\'s Creation Phase has?', [1, 2, 3], 2); 

  const allQuestions  = [q1, q2, q3];

  function score() { //function score, using the closure functionality 
    let sc = 0; // always accessible thanks to closure
    return function(correct) { // returning function
      if (correct) {
        sc++;
      }
      return sc; // return 'sc' variable as a result fo anonymous function
    }
  }

  let keepScore = score(); // keepScore is a function with 'sc' variable available due to closure
  
  

  function nextQuestion () { // infinitive loop logic, until user enters 'exit' keyword
    let n = Math.floor(Math.random() * allQuestions.length); // random number from 0-2
    allQuestions[n].displayQuestion(); // using prototype properties of Question constructor

    let answer  = prompt('Please answer the question..');

    if (answer !== 'exit') {
      allQuestions[n].checkAnswer(parseInt(answer), keepScore); // using prototype of Question constructor, passing keepScope function to checkAnswer() method of prototype
      nextQuestion(); // recursive calling
    } 
  }

  nextQuestion(); // calling function

}) ();