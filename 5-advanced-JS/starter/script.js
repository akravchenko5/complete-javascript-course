(function(){

  function Question(question, answers, correctAnswer){
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }

  Question.prototype.displayQuestion = function() {
    console.log(this.question);
    for(let i = 0; i < this.answers.length; i++){
      console.log(i + ': ' + this.answers[i]);
    }
  };

  Question.prototype.checkAnswer = function (ans, callback) {
    let sc;

    if ( ans === this.correctAnswer ) {
      console.log('Correct answer!!');
      sc = callback(true);
    } else {
      console.log('Wrong answer, please try again.');
      sc = callback(false);
    }

    this.overalScore(sc);
  };

  Question.prototype.overalScore = function (score) {
    console.log('Your current score is: ' + score);
    console.log('============================');
  }
  
  const q1 = new Question('Do you think that JS is difficult or fun?', ['fun', 'difficult'], 0);
  const q2 = new Question('What is the name of the course teacher?', ['John', 'Jonas', 'Emily'], 1);
  const q3 = new Question('How many steps does Execution Contexts\'s Creation Phase has?', [1, 2, 3], 2); 

  const allQuestions  = [q1, q2, q3];

  function score() {
    let sc = 0;
    return function(correct) {
      if (correct) {
        sc++;
      }
      return sc;
    }
  }

  let keepScore = score();
  
  

  function nextQuestion () {
    let n = Math.floor(Math.random() * allQuestions.length);
    allQuestions[n].displayQuestion();

    let answer  = prompt('Pleser answer the question..');

    if (answer !== 'exit') {
      allQuestions[n].checkAnswer(parseInt(answer), keepScore);
      nextQuestion();
    } 
  }

  nextQuestion();

}) ();