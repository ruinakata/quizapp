



// for (var i=0; i<quizzes.length; i++) {
// 	question = quizzes[i]["q"]
// 	answer = quizzes[i]["answer"]
// 	exp = quizzes[i]["exp"]
// 	$("#quizbox").text(question);
// }

var counter = 0;
var score = 0;
var	question = quizzes[counter]["q"];
var	answer = quizzes[counter]["answer"];
var	exp = quizzes[counter]["exp"];

$(function() {
	$("#quizbox").html("<h3>" + question + "</h3>");

// when they press true//////////////////////////
	$("#true").on('click', function(){
		if (answer == true) {
			alert("correct!");
			$("#quizbox").append(answer + "<br>");
			$("#quizbox").append(exp);
			score += 1;
		}
		else {
			alert("wrong :/");
			$("#quizbox").append(answer + "<br>");
			$("#quizbox").append(exp);
		}
	});

// when they press false /////////////////////////
	$("#false").on('click', function(){
		if (answer == false) {
			alert("correct!");
			$("#quizbox").append(answer + "<br>");
			$("#quizbox").append(exp);
			score += 1;
		}
		else {
			alert("wrong :/");
			$("#quizbox").append(answer + "<br>");
			$("#quizbox").append(exp);
		}
	});

// when they press the next question /////////////
	$("#next").on('click', function(){
		counter += 1;
		question = quizzes[counter]["q"]
		answer = quizzes[counter]["answer"]
		exp = quizzes[counter]["exp"]
		$("#quizbox").html("<h3>" + question + "</h3>");

		if (counter == 8) {
			$("#result").css("visibility", "visible")
			$("#next").css("visibility", "hidden");
		};
	});



});







