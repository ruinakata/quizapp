
var everyones = []
var sorted;
var scoreboard;
var counter;
var score;

/////////////////////MODULE////////////////////////////////////////////////////////////////////////////
var BL = (function(){

	// this part is not accessible from console bc wrapped in anonymous fxn
	counter = 0;
	score = 0;
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
  	$("#true").css("display", "none")
	};
	var hidefalse = function(){
  	$("#false").css("display", "none")
	};
	var showtruefalse = function(){
		$("#true").css("display", "block")
		$("#false").css("display", "block")
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
		$("#next").css("display", "none");
		$("#name").css("display", "block")
		$("#namesubmit").css("display", "block")
		$("#again").css("display", "none")
	};

	initial();

	$("#namesubmit").on('click', function(){
		 name = $("#name").val();
		$("#quizbox").html("<h3>" + question + "</h3>");
		showtruefalse();
		$("#next").css("display", "block");
		$("#name").css("display", "none");
		$("#namesubmit").css("display", "none");
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
			$("#result").css("display", "block");
			$("#next").css("display", "none");
		};
	});

// when they press the results button /////////////
	$("#result").on('click', function(){
		hidetrue();
		hidefalse();
		$("#result").css("display", "none")
		$("#again").css("display", "block")
		$("#make").css("display", "block")
		$("#scoreboarddiv").css("display", "none")
		$("#quizbox").html("<h3>" + name + " , Your score is: " + score + "</h3>")
		everyones.push({name: name, score: score})
	
		topscorer = _.max(everyones, function(x) {
				return x.score; });
		sorted = _.sortBy(everyones, function(x){ return x.score; });
		var l = sorted.length
		var firstplace = sorted[l-1]
		var secondplace = sorted[l-2]
		var thirdplace = sorted[l-3]

		$("#again").css("display", "block") 
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


// when they press make quiz ////////////////////////////////////////////////////////////////////////////
	$("#make").on('click', function(){
		$("#makequiz").show();
		$("#container").hide();
		quizmakecounter = 0;
		$("#quizform").hide();
	});

// when they enter the name of quiz//////////////////
var quizmakecounter;
var nameofquiz;
var quizanswer;
var newquiz = [];
// newquiz = ["How to eat", {}, {},..]

	$("#nameenter").on('click', function(){
		$("#quizform").show();
		$("#nameform").hide();
		nameofquiz = $("#quizname").val();
		newquiz.push(nameofquiz);
		$("#quiznameheader").append(nameofquiz);
		quiznum = quizmakecounter + 1
		$("#quiznameheader").append("<h3> Question number: " + quiznum + "</h3>")
	});
	
	// newquiz = ["nameofquiz"]

///quiz making /////////////////////////////////////////////////
	$("#quiztrue").on('click', function(){
		$("#quizfalse").css('background-color', 'white')
		$("#quiztrue").css('background-color', '#3866F2')
		quizanswer = true;
	});

	$("#quizfalse").on('click', function(){
		$("#quiztrue").css('background-color', 'white')
		$("#quizfalse").css('background-color', '#3866F2')
		quizanswer = false;
	});

	$("#enter").on('click', function(){
		var onequiz = {}
		onequiz["id"] = quizmakecounter + 1
		onequiz["q"] = $("#quizq").val();
		onequiz["answer"] = quizanswer
		onequiz["right"] = 0
		onequiz["total"] = 0
		newquiz.push(onequiz)
		quizmakecounter += 1

	});














