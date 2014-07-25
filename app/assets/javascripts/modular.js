

$(document).ready(function() {
  score = 0;
  $("#startquiz").on('click', function(e){
    e.preventDefault(); 
    name = $("#playerName").val();
    $(".quiz-app").hide();
  });

});


var View = {
  QuizView: function(templatedata) {
    console.log("in quizview")
    for (var i=0; i<quizzesarray.length; i++){
      $("#quizbox").append("<p data-quiz-id= " + parseInt(quizzesarray[i].id) + ">" + quizzesarray[i].title + "</p>")
    }
    $("[data-quiz-id]").on('click', function(){
      var id = $(this).attr('data-quiz-id');
      quizid = id;
      console.log("quiz was clicked")
      $("#quizbox").empty();
      Presenter.getQuestions(id);
    });
  },

  QuestionView : function(questionmodel) {
    console.log("in question view")
////// QUESTION TEMPLATE ///////////////////////////////////////////////////
    var questiontemplate = [
      '<p>',
      questionmodel.question,
      '</p><br>'
    ].join("")
    $("#quizbox").append(questiontemplate);
//////// ANSWER TEMPLATE ///////////////////////////////////////////////////
    if (questionmodel.question_type === "boolean"){
      $("#quizbox").append(
        '<button class="boolean-answer" data-boolean="true">True</button><button class="boolean-answer" data-boolean="false">False</button>')
      $('.boolean-answer').on('click', function() {
        var useranswer = $(this).attr('data-boolean');
        Presenter.checkAnswer(questionmodel.quiz_id, questionmodel.id, useranswer);
        $(".boolean-answer").hide();
      })
    }
    else if (questionmodel.question_type === "multiple"){
      $("#quizbox").append('<form action="">')
      choicesarray = questionmodel.choices.split(";")
      for (var i=0; i<choicesarray.length; i++){
        $("#quizbox").append('<input type="radio" name="choice" value="'+ choicesarray[i] + '">'+ choicesarray[i])
      }
      $("#quizbox").append('<input class="multipleans" id="submitmultipleanswer" type="submit">')
      $("#submitmultipleanswer").on('click', function(){
        var useranswer = $('input[name="choice"]:checked').val();
        Presenter.checkAnswer(questionmodel.quiz_id, questionmodel.id, useranswer);
        $(".multipleans").hide();
      })
    }
    else if (questionmodel.question_type === "blank"){
      $("#quizbox").append('<input id="blankanswer" type="text">')
      $("#quizbox").append('<input id="submitblankanswer" type="submit">')
      $("#submitblankanswer").on('click', function(){
        var useranswer = $("#blankanswer").val();
        Presenter.checkAnswer(questionmodel.quiz_id, questionmodel.id, useranswer);
        $("#submitblankanswer").hide();
      })
    }
    $("#done").on('click', function(){
      console.log('donezo')
      // Presenter.getScore();
    })
  }
};



var quiztemplatedata;
var questiontemplatedata;
var index = 1;
var quizzesarray = []
var questionsarray = []
var useranswer;
var quizid;

var Presenter = {
  quizzes: [],
  //AJAX request return quizzes data
  getQuizzes: function() { 
    var me = this;
    $.ajax({
      url: '/quizzes',
      type: 'GET',
      success: function (data) {
        // data is an array of quiz objects
        console.log("quizzes got", data)
        // me.quizModels = Model.makeQuizModels(data);
        for (var i=0; i<data.length; i++) {
          quizzesarray.push( new QuizModel(data[i]) )
        }
        console.log("quizzesarray now has all quiz objects")
        View.QuizView();
        // callback();
      }
    })
  },
  //AJAX request return all questions data
  getQuestions: function (quizid) {
    $.ajax({
      url: '/quizzes/' + quizid + '/questions',
      type: 'GET',
      success: function (data) {
        // data is an array of question objects 
        // callback(data);
        console.log("questions got", data)
        for (var i=0; i<data.length; i++) {
          questionsarray.push ( new QuestionModel(data[i]) )
        }
        console.log("questionsarray now has all question objects for that quiz")
        for (var i=0; i<questionsarray.length; i++) {
          View.QuestionView(questionsarray[i]); 
        }
      }
    })
  }, 

  showQuizzes: function () {
    console.log("in show quizzes")
    var me = this;
    this.getQuizzes(function() {
      console.log("in get quizzes")
      me.renderQuizList();
    });
  },

  checkAnswer: function (quizid, questionid, useranswer) {
    console.log("in check answers")
    $.ajax({
      url: '/quizzes/' + quizid + '/questions/' + questionid + '/check?answer=' + useranswer,
      type: 'GET',
      success: function (data) {
        //data is either {"correct": "true"} or {"correct": "false"}
        console.log(data)
        if (data.correct === "true") {
          score += 1;
        }
      }
    })
  },

  // getScore: function (quizid){
  //   $.ajax({
  //     url: '/quizzes/' + quizid + '/questions',
  //     type: 'GET',
  //     success: function (data) {
  //       // data is an array of question objects 
  //       // callback(data);
  //       for (var i=0; i<data.length; i++) {
  //         allquestions.push (data[i])
  //       }
  //       console.log("allquestions now has all question objects for that quiz")

  //     }
  //   })
  // }

};



function QuizModel(data) {
  var me = this;
  this.title = data.title;
  this.id    = data.id;
  console.log("in quizmodel constructor")
}


function QuestionModel(data) {
    this.question = data.question;
    // this.answer = data.answer;
    this.choices = data.choices;
    this.id = data.id;
    this.question_type = data.question_type;
    this.times_answered = data.times_answered;
    this.correct_answers = data.correct_answers;
    this.quiz_id = data.quiz_id;
    console.log("in questionModel constructor")
}






//Presenter.getQuizzes -> Model.makeQuestionModel -> returns quizzesarray to 
// to Presenter.getQuizzes... which calls Presenter.renderQuizView -> 









