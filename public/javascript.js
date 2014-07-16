
var everyones = []
var sorted;
var scoreboard;
var counter;

/////////////////////MODULE////////////////////////////////////////////////////////////////////////////
var BL = (function(){

	// this part is not accessible from console bc wrapped in anonymous fxn
	 counter = 0;
	var score = 0;
	var	question = quizzes[counter]["q"];
	var	answer = quizzes[counter]["answer"];
	var	exp = quizzes[counter]["exp"];
	var name;

	//this part is accessible from console because of this

		var incrementscore = function(){
			score += 1;
		};
		var incrementcounter = function(){
			counter += 1;
		};

		var incrementrightandtotal = function (){
			quizzes[counter]["right"] += 1;
			quizzes[counter]["total"] += 1;
		};
		var incrementtotal = function (){
			quizzes[counter]["total"] += 1;
		};

		return {
			incrementscore: incrementscore,
			incrementcounter: incrementcounter,
			incrementrightandtotal: incrementrightandtotal,
			incrementtotal: incrementtotal 
		}

})();

///////////////////////////////////////////////////////////////////////////////////////////////////////
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
	var showtruefalse = function(){
		$("#true").css("visibility", "visible")
		$("#false").css("visibility", "visible")
	};



	var initial = function(){
		score = 0;
		counter = 0;
		question = quizzes[counter]["q"];
	  answer = quizzes[counter]["answer"];
	  exp = quizzes[counter]["exp"];
		hidefalse();
		hidetrue();
		$("#name").val("Enter Name");
		$("#next").css("visibility", "hidden");
		$("#name").css("visibility", "visible")
		$("#namesubmit").css("visibility", "visible")
		$("#again").css("visibility", "hidden")
	};

	initial();

	$("#namesubmit").on('click', function(){
		 name = $("#name").val();
		$("#quizbox").html("<h3>" + question + "</h3>");
		showtruefalse();
		$("#next").css("visibility", "visible");
		$("#name").css("visibility", "hidden");
		$("#namesubmit").css("visibility", "hidden");
		right = quizzes[counter]["right"];
		total = quizzes[counter]["total"];
 		scoreboard = "<h4>People got " + right + " / " + total + " right </h4>"
 		$("#scoreboarddiv").html(scoreboard)
	})
	

// when they press true//////////////////////////
	$("#true").on('click', function(){
		hidefalse();
		hidetrue();
		if (answer == true) {
			alert("correct!");
			appendanswerexp();
			BL.incrementscore();
			BL.incrementrightandtotal();
		}
		else {
			alert("wrong :/");
			appendanswerexp();
			BL.incrementtotal();
		}
	});

// when they press false /////////////////////////
	$("#false").on('click', function(){
		hidefalse();
		hidetrue();
		if (answer == false) {
			alert("correct!");
			appendanswerexp();
			BL.incrementscore();
			BL.incrementrightandtotal();

		}
		else {
			alert("wrong :/");
			appendanswerexp();
			BL.incrementtotal();
		}
	});

// when they press the next question /////////////
	$("#next").on('click', function(){
		BL.incrementcounter();
		right = quizzes[counter]["right"];
		total = quizzes[counter]["total"];
 		scoreboard = "<h4>People got " + right + " / " + total + " right </h4>"
 		$("#scoreboarddiv").html(scoreboard)

		showtruefalse();
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
		hidetrue();
		hidefalse();
		$("#result").css("visibility", "hidden")
		$("#scoreboarddiv").css('visibility', 'hidden')
		$("#quizbox").html("<h3>" + name + " , Your score is: " + score + "</h3>")
		everyones.push({name: name, score: score})
	
		topscorer = _.max(everyones, function(x) {
				return x.score; });
		sorted = _.sortBy(everyones, function(x){ return x.score; });
		var l = sorted.length
		var firstplace = sorted[l-1]
		var secondplace = sorted[l-2]
		var thirdplace = sorted[l-3]

		$("#again").css("visibility", "visible") 
		$("#quizbox").append("<h3> High Scores:</h3><br>")
		$("#quizbox").append("<h3> " + firstplace['name'] + ' ' + firstplace['score'] + "</h3>")
		if (secondplace) {
			$("#quizbox").append("<h3> " + secondplace['name'] + ' ' + secondplace['score'] + "</h3>")
		}
			else {}
		if (thirdplace){
			$("#quizbox").append("<h3> " + thirdplace['name'] + ' ' + thirdplace['score'] + "</h3>")
		}
			else {}
	});

// when they press play again//////////////////////
	$("#again").on('click', function(){
		initial();
		$("#quizbox").html("");
		$("#scoreboarddiv").html("");
	});

