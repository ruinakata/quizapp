// // (function () {

// //   window.Quizzy = window.Quizzy || {};

// //   Quizzy.QuizPresenter = function ($view, questions) {

// //     var $startForm = $('form.start', $view);
// //     var $questionForm = $('form.quiz-question', $view);
// //     var $finalResults = $('.final-results', $view);
// //     var quiz;

// //     $startForm.on('submit', function(e) {
// //       e.preventDefault();

// //       quiz = new Quizzy.Quiz(questions, this.playerName.value);

// //       $startForm.hide();
// //       displayNextQuestion();
// //     });

// //     $questionForm.on('submit', function(e) {
// //       e.preventDefault();
// //       var answer = $('input[name=answer]:checked', this).val();
// //       var result = quiz.submitAnswer( parseInt(answer) );

// //       var responseText = null;
// //       if (result.isCorrect) {
// //         responseText = "Correct!";
// //       }
// //       else {
// //         responseText = "The correct answer is: " + result.answerText;
// //       }
// //       $('.answered label', this).text(responseText);

// //       // Show results
// //       $('.awaiting-answer', this).hide();
// //       $('.answered', this).show();
// //     });

// //     $('.answered button', $questionForm).on('click', function(e) {
// //       e.preventDefault();

// //       if ( quiz.isDone() ) {
// //         displayFinalResults();
// //       }
// //       else {
// //         displayNextQuestion();
// //       }
// //     });


// //     var displayNextQuestion = function () {
// //       var question = quiz.getCurrentQuestion();

// //       // Show question content
// //       $('.content', $questionForm).text(question.content);

// //       // Build and show options
// //       var optionsHtml = "";
// //       for (var i = 0; i < question.options.length; i += 1) {
// //         optionsHtml += '<input type="radio" name="answer" value="' + i + '">' + question.options[i] + '<br />';
// //       }
// //       $('.options', $questionForm).html(optionsHtml);

// //       // Show question form
// //       $('.answered', $questionForm).hide();
// //       $('.awaiting-answer', $questionForm).show();
// //       $questionForm.show();
// //     };

// //     var displayFinalResults = function () {
// //       $questionForm.hide();

// //       var scoreText = quiz.playerName + "'s score: " + quiz.getScore() + " / " + quiz.getTotalQuestionCount();
// //       $('.score', $finalResults).text(scoreText);

// //       $finalResults.show();
// //     };

// //   };

// // })();


// // var name;
// //  $('#startquiz').on('click', function (){
// //       //append quiz titles
// //       var name = $("#playerName").val();
// //       console.log(name)
// //       console.log("hi")
// //     }

// $(document).ready(function() {
  
//   $("#startquiz").on('click', function(e){
//     e.preventDefault(); 
//     name = $("#playerName").val();
//     $(".quiz-app").hide();
//   });



// });


// var View = {
//   QuizView: function(templatedata) {
//     // $(button).on('click', ) // make the html tags for the true answer etc.
//       //append quiz titles
//       console.log("in quizview")
//       for (var i=0; i<quizzesarray.length; i++){
//         $("#quizbox").append("<p data-quiz-id= " + parseInt(quizzesarray[i].id) + ">" + quizzesarray[i].title + "</p>")
//     }
//       $("[data-quiz-id]").on('click', function(){
//       var id = $(this).attr('data-quiz-id');
//       console.log("quiz was clicked")
//       $("#quizbox").empty();
//       Presenter.getQuestions(id);
//       // $("#quizbox").append(question);

//   });
//   },
//   QuestionView : function(questionmodel, questionnum) {
//     // $() // make the html tags
//     // var tftemplate = [
//     // '<p>' + question 
//     // ]
//     // var multipletemplate = 
//     // var blanktemplate = 
//     console.log("in question view")
//     var template = [
//       '<p>',
//       questionmodel[questionnum].question,
//       '</p><br>'
//     ].join(",")
//     console.log(template)
//     $("#quizbox").append(template);
//   }
// };

// var quiztemplatedata;
// var questiontemplatedata;
// var index = 1;
// var quizzesarray = []
// var questionsarray = []

// var Presenter = {
//   quizzes: [],
//   //AJAX request return quizzes data
//   getQuizzes: function() { 
//     var me = this;
//     $.ajax({
//       url: '/quizzes',
//       type: 'GET',
//       success: function (data) {
//         // data is an array of quiz objects
//         console.log("quizzes got")
//         me.quizModels = Model.makeQuizModels(data);
//         View.QuizView();
//         // callback();
//       }
//     })
//   },
//   //AJAX request return all questions data
//   getQuestions: function (quizid) {
//     $.ajax({
//       url: '/quizzes/' + quizid + '/questions',
//       type: 'GET',
//       success: function (data) {
//         // data is an array of question objects 
//         console.log("questions got")
//         var length = data.length
//         console.log("sending to makequestionmodel")
//         questionmodel = Model.makeQuestionModel(data);
//         //questionmodel is an array of question objects
//         console.log("sending to questionview")
//         View.QuestionView(questionmodel, 0);
//       }
//     })
//   }, 

//   showQuizzes: function () {
//     var me = this;
//     this.getQuizzes(function() {
//       me.renderQuizList();
//     });
//   },
//   renderQuizList : function() {
//     var $quizListContainer = $('#quiz-list-container');
//     for (var i in this.quizzes) {
//       var $quizListItem = $('<p data-quiz-id="' + this.quizzes[i].id + '">' + this.quizzes[i].title + '</p>');
//       $quizListContainer.append($quizListItem);
//     }
//   }
//  // renderQuizView: new View.QuizView(quiztemplatedata),
//  // renderQuestionView: new View.QuestionView(questiontemplatedata)
// };


// var Model = {
//   // uses data retrieved from getQuizzes makes an object {quiztitle: , } and returns
//   makeQuizModels: function (data) {
//     var length = data.length;
//     for (var i=0; i<length; i++) {
//       // quizzesarray.push({
//       //   title: title,
//       //   id: id
//       // });
//       var quiz = new QuizModel({ title: data[i].title, id: data[i].id });
//       quizzesarray.push(quiz);
//     }
//     console.log(quizzesarray)
//     console.log("quiz model made")
//     return quizzesarray
//   },

//   // uses data retrieved from getQuestions makes an object {question: , answer: ,...} and returns
//   makeQuestionModel: function (data) {
//     var length = data.length;
//     for (var index=0; index<length; index++) {
//       questionsarray.push({
//       question: data[index].question,
//       answer: data[index].answer,
//       question_id: data[index].id, 
//       quiz_id: data[index].quiz_id,
//       correct_answers: data[index].correct_answers,
//       times_answered: data[index].times_answered
//       }) 
//     }
//     console.log(questionsarray)
//     console.log("question model made")
//     return questionsarray
//   }
// };


// //Presenter.getQuizzes -> Model.makeQuestionModel -> returns quizzesarray to 
// // to Presenter.getQuizzes... which calls Presenter.renderQuizView -> 




// function QuizModel(data) {
//   var me = this;
//   this.title = data.title;
//   this.id    = data.id;
//   console.log("in quizmodel constructor")
//   // Presenter.getQuestions(this.id, function(quizQuestions) {
//   //   me.questions = makeQuestionModels(quizQuestions);
//   //   for (var i in me.questions) {
//   //     View.QuestionView(me.questions[i]);
//   //   }
//   // });

//   // function makeQuestionModels(data) {
//   //   var length = data.length;
//   //   for (var index = 0; index < length; index++) {
//   //     questionsarray.push({
//   //       question: data[index].question,
//   //       answer: data[index].answer,
//   //       question_id: data[index].id, 
//   //       quiz_id: data[index].quiz_id,
//   //       correct_answers: data[index].correct_answers,
//   //       times_answered: data[index].times_answered
//   //     }) 
//   //   }
//   //   console.log(questionsarray)
//   //   console.log("question model made")
//   //   return questionsarray
//   // }

// }




