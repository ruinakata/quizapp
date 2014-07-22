// (function () {

//   window.Quizzy = window.Quizzy || {};

//   Quizzy.QuizPresenter = function ($view, questions) {

//     var $startForm = $('form.start', $view);
//     var $questionForm = $('form.quiz-question', $view);
//     var $finalResults = $('.final-results', $view);
//     var quiz;

//     $startForm.on('submit', function(e) {
//       e.preventDefault();

//       quiz = new Quizzy.Quiz(questions, this.playerName.value);

//       $startForm.hide();
//       displayNextQuestion();
//     });

//     $questionForm.on('submit', function(e) {
//       e.preventDefault();
//       var answer = $('input[name=answer]:checked', this).val();
//       var result = quiz.submitAnswer( parseInt(answer) );

//       var responseText = null;
//       if (result.isCorrect) {
//         responseText = "Correct!";
//       }
//       else {
//         responseText = "The correct answer is: " + result.answerText;
//       }
//       $('.answered label', this).text(responseText);

//       // Show results
//       $('.awaiting-answer', this).hide();
//       $('.answered', this).show();
//     });

//     $('.answered button', $questionForm).on('click', function(e) {
//       e.preventDefault();

//       if ( quiz.isDone() ) {
//         displayFinalResults();
//       }
//       else {
//         displayNextQuestion();
//       }
//     });


//     var displayNextQuestion = function () {
//       var question = quiz.getCurrentQuestion();

//       // Show question content
//       $('.content', $questionForm).text(question.content);

//       // Build and show options
//       var optionsHtml = "";
//       for (var i = 0; i < question.options.length; i += 1) {
//         optionsHtml += '<input type="radio" name="answer" value="' + i + '">' + question.options[i] + '<br />';
//       }
//       $('.options', $questionForm).html(optionsHtml);

//       // Show question form
//       $('.answered', $questionForm).hide();
//       $('.awaiting-answer', $questionForm).show();
//       $questionForm.show();
//     };

//     var displayFinalResults = function () {
//       $questionForm.hide();

//       var scoreText = quiz.playerName + "'s score: " + quiz.getScore() + " / " + quiz.getTotalQuestionCount();
//       $('.score', $finalResults).text(scoreText);

//       $finalResults.show();
//     };

//   };

// })();




var View = {
  QuizView: function(templatedata) {
    // $(button).on('click', ) // make the html tags for the true answer etc.
    $('#startquiz').on('click', function (){
      //append quiz titles
      console.log("hi")
      for (var i=0; i<quizzesarray.length; i++){
        $(".content").append("<p>" + quizzesarray[i].title + "</p>")
      }
    })
  },
  QuestionView : function(templatedata) {
    // $() // make the html tags
  }
};

var quiztemplatedata;
var questiontemplatedata;
var index = 1;
var quizzesarray = []

var Presenter = {

  //AJAX request return quizzes data
  getQuizzes: function(){ 
    $.ajax({
      url: '/quizzes',
      type: 'GET',
      success: function (data) {
        // data is an array of quiz objects
        var length = data.length
        quiztemplatedata = Model.makeQuizModel(data, length);
        //returns quiztemplatedata
      }
    })
  },
  //AJAX request return all questions data
  getQuestions: function (quizid) {
    $.ajax({
      url: '/quizzes/' + quizid + '/questions',
      type: 'GET',
      success: function (data) {
        var length = data.length
        questiontemplatedata = Model.makeQuestionModel(data, length);

      }
    })
  }, 

 renderQuizView: new View.QuizView(quiztemplatedata),
 renderQuestionView: new View.QuestionView(questiontemplatedata)
};


var Model = {
  // uses data retrieved from getQuizzes makes an object {quiztitle: , } and returns
  makeQuizModel: function (data, length) {
    for (var i=0; i<length; i++) {
      var title = data[i].title
      var id = data[i].id
      quizzesarray.push({
        title: title,
        id: id
      })
    }
    console.log(quizzesarray)
    console.log("quiz model made")
    return quizzesarray
  },

  // uses data retrieved from getQuestions makes an object {question: , answer: ,...} and returns
  makeQuestionModel: function (data, length) {
    return {
      question: data[index].question,
      answer: data[index].answer,
      question_id: data[index].id, 
      quiz_id: data[index].quiz_id,
      correct_answers: data[index].correct_answers,
      times_answered: data[index].times_answered
    }
  }
};



















