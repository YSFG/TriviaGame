var panel = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
  question : '1. What studio created the movie "Zootopia?',
  answers : ['A. Dreamworks',
         'B. Warner Brothers',
         'C. Disney',
         'D. Fox'],
 correctAnswer : 'C. Disney',
  image :  "assets/images/question1.gif"
}, 

{
  question : '2. Who is the lead actress doing the voice of Jody Hopps?',
  answers : ['A. Ginnifer Goodwin',
         'B. Jenny Slate',
         'C. Shakira',
         'D. Kristen Bell'],
 correctAnswer : 'A. Ginnifer Goodwin',
  image :  "assets/images/judyhopps.gif"
}, 

{
  question : '3. What is the movie titles name in the UK?',
  answers : ['A. Zootopia',
         'B. Zootropolis',
         'C. Zoomania',
         'D. Zootopie'],
  correctAnswer : 'B. Zootropolis',
  image : "assets/images/question3.gif"
}, 

{
  question : '4. Who was the villain in the movie?',
  answers : ['A. Assistant Mayor Bellwether',
         'B. Judy Hopps',
         'C. Nick Wilde',
         'D. Flash'],
  correctAnswer : 'A. Assistant Mayor Bellwether',
  image : "assets/images/question4.gif"
}, 

{
  question : '5. What are the animals working in the DMV?',
  answers : ['A. Elephants',
         'B. Rhinos',
         'C. Foxes',
         'D. Sloths'],
  correctAnswer : 'D. Sloths',
  image : "assets/images/SLOTH.gif"
}, 

{
  question : '6. What was the biggest problem that most of the characters in the movie were struggling with?',
  answers : ['A. The city is being attacked by giant monsters',
         'B. Prejudice and discrimination between species' ,
         'C. The meter maid were giving out to many parking tickets',
         'D. high taxes'],
  correctAnswer : 'B. Prejudice and discrimination between species',
  image : "assets/images/question6.gif"
}, 

{
 question : '7. Who was Officer Hopps partner at the end of the movie?',
 answers : ['A. Gazelle',
         'B. Chief Bogo ',
         'C. Nick Wilde',
         'D. None of the above'],
  correctAnswer : 'C. Nick Wilde',
  image : "assets/images/question7.gif"
}, 

{
  question : '8. What was the cause for the predator species to revert to their primitive state?',
  answers : ['A. Fish',
         'B. Carrots',
         'C. Blueberries',
         'D. Night Howlers'],
  correctAnswer : 'D. Night Howlers',
  image : "assets/images/question8.gif"

},

{

  question : '9. Where is Judy Hopps from?',
  answers : ['A. The Meadowlands',
         'B. Savanna Square',
         'C. Bunny Burrow',
         'D. Tundra Town'],
  correctAnswer : 'C. Bunny Burrow',
  image : "assets/images/question9.gif"
},

{

 question : '10. Who sang the theme song of the movie "Try everything"?',
  answers : ['A. Shakira',
         'B. Katy Perry.',
         'C. Gwen Stefani',
         'D. Madonna'],
  correctAnswer : 'A. Shakira',
  image : "assets/images/question10.gif"

}];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,
 

  loadQuestion: function() {
    timer = setInterval(game.countdown, 1000);
    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i] + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  results: function() {
    clearInterval(timer);
    panel.html("<h2>All done, heres how you did!</h2>");
    $("#counter-number").text(game.counter);

    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(enter) {
    clearInterval(timer);
    if ($(enter.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html("<h2>Incorrect!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {
    clearInterval(timer);
    game.correct++;
    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  
  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },
 
  timeUp: function() {
    clearInterval(timer);
    $("#counter-number").html(game.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});