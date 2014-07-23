

$(document).ready(function() {
  
  $("#startquiz").on('click', function(e){
    e.preventDefault(); 
    name = $("#playerName").val();
    $(".quiz-app").hide();
  });

});


var View = {
  QuizView: function(templatedata) {
    // $(button).on('click', ) // make the html tags for the true answer etc.
    //append quiz titles
    console.log("in quizview")
    for (var i=0; i<quizzesarray.length; i++){
      $("#quizbox").append("<p data-quiz-id= " + parseInt(quizzesarray[i].id) + ">" + quizzesarray[i].title + "</p>")
    }
    $("[data-quiz-id]").on('click', function(){
      // debugger
      var id = $(this).attr('data-quiz-id');
      console.log("quiz was clicked")
      $("#quizbox").empty();
      Presenter.getQuestions(id);
    });
  },

  QuestionView : function(questionmodel) {
    // var tftemplate = [
    // '<p>' + question 
    // ]
    // var multipletemplate = 
    // var blanktemplate = 
    console.log("in question view")

    var questiontemplate = [
      '<p>',
      questionmodel.question,
      '</p><br>'
    ].join("")
    $("#quizbox").append(questiontemplate);
  }
};

var quiztemplatedata;
var questiontemplatedata;
var index = 1;
var quizzesarray = []
var questionsarray = []

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
    var me = this;
    this.getQuizzes(function() {
      me.renderQuizList();
    });
  },
  renderQuizList : function() {
    var $quizListContainer = $('#quiz-list-container');
    for (var i in this.quizzes) {
      var $quizListItem = $('<p data-quiz-id="' + this.quizzes[i].id + '">' + this.quizzes[i].title + '</p>');
      $quizListContainer.append($quizListItem);
    }
  }
 // renderQuizView: new View.QuizView(quiztemplatedata),
 // renderQuestionView: new View.QuestionView(questiontemplatedata)
};



function QuizModel(data) {
  var me = this;
  this.title = data.title;
  this.id    = data.id;
  console.log("in quizmodel constructor")
  // Presenter.getQuestions(this.id, function(quizQuestions) {
  //   me.questions = makeQuestionModels(quizQuestions);
  //   for (var i in me.questions) {
  //     View.QuestionView(me.questions[i]);
  //   }
  // });
}


function QuestionModel(data) {
    this.question = data.question;
    this.answer = data.answer;
    this.choices = data.choices;
    this.id = data.id;
    this.question_type = data.question_type;
    this.times_answered = data.times_answered;
    this.correct_answers = data.correct_answers;
    console.log("in questionModel constructor")
}






//Presenter.getQuizzes -> Model.makeQuestionModel -> returns quizzesarray to 
// to Presenter.getQuizzes... which calls Presenter.renderQuizView -> 









