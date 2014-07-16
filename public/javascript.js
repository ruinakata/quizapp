
var Module = (function(){

// this part is not accessible from console bc wrapped in anonymous fxn
var counter = 0;
var score = 0;
var	question = quizzes[counter]["q"];
var	answer = quizzes[counter]["answer"];
var	exp = quizzes[counter]["exp"];

//this part is accessible from console because of this

	var incrementscore = function(){
		score += 1;
	};
	var incrementcounter = function(){
		counter += 1;
	};
	var appendanswerexp = function(){
		$("#quizbox").append("answer: " + answer + "<br>");
		$("#quizbox").append(exp);
	};
	var hidetrue = function(){
  	$("#true").css("visibility", "hidden")
	};
	var hidefalse = function(){
  	$("#false").css("visibility", "hidden")
	};

	$("#quizbox").html("<h3>" + question + "</h3>");

// when they press true//////////////////////////
	$("#true").on('click', function(){
		hidefalse();
		hidetrue();
		if (answer == true) {
			alert("correct!");
			appendanswerexp();
			incrementscore();
		}
		else {
			alert("wrong :/");
			appendanswerexp();
		}
	});

// when they press false /////////////////////////
	$("#false").on('click', function(){
		hidefalse();
		hidetrue();
		if (answer == false) {
			alert("correct!");
			appendanswerexp();
			incrementscore();
		}
		else {
			alert("wrong :/");
			appendanswerexp();
		}
	});

// when they press the next question /////////////
	$("#next").on('click', function(){
		incrementcounter();
		question = quizzes[counter]["q"]
		answer = quizzes[counter]["answer"]
		exp = quizzes[counter]["exp"]
		$("#quizbox").html("<h3>" + question + "</h3>");

		if (counter == 9) {
			$("#result").css("visibility", "visible")
			$("#next").css("visibility", "hidden");
		};
	});

// when they press the results button /////////////
$("#result").on('click', function(){
	$("#quizbox").html("<h3> Your score is: " + score + "</h3>")
});

/////////////////////////////////////////////////

return {
	incrementscore: incrementscore,
	incrementcounter: incrementcounter,
	appendanswerexp: appendanswerexp,
	hidetrue: hidetrue,
	hidefalse: hidefalse
}

})();




// accessible thru Module.incrementscore
