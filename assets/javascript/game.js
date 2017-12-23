$(document).ready(

function() {

$("#backgroundMusic").prop("volume", 0.05);


// Assign Characters as game objects, define properties
	var char1 = {
		name: "Yoda",
		hp: 900,
		attackPower: 10,
		defendPower: 4,
	}
	console.log (char1);

	var char2 = {
		name: "Jyn Erso",
		hp: 21,
		attackPower: 5,
		defendPower: 5,
	}
	console.log (char2);

	var char3 = {
		name: "Lando Calrissian",
		hp: 31,
		attackPower: 3,
		defendPower: 6,
	}
	console.log(char3);

	var char4 = {
		name: "Count Dooku",
		hp: 72,
		attackPower: 7,
		defendPower: 5,
	}
	console.log(char4);

//Define game variables

	var playerHP;

	var playerAttackPower;

	var defenderHP;

	var defenderAttackPower;

	var characters = [char1, char2, char3, char4];

	var enemies = [];

	var playerCharacter = "no playerCharacter selected";

	var defender = "no defender selected";

	// var defeatedDefenders = [];

	// var awaitingDefenders = [];

	var that;


//Capture player choice for game character
function chooseCharacter () {

	var playerCharacterId = that.id;
	console.log(that.id);

		switch (playerCharacterId) {
			case "yoda":
			$("#yoda").attr("id", "player");
			playerCharacter = char1;
			break;

			case "jyn":
			$("#jyn").attr("id", "player");
			playerCharacter = char2;
			break;

			case "lando":
			$("#lando").attr("id", "player");
			playerCharacter = char3;
			break;

			case "count":
			$("#count").attr("id", "player");
			playerCharacter = char4;
			break;
		}

		console.log(playerCharacter);


		for (i=0; i<characters.length; i++) {
			if (characters[i] === playerCharacter) {
				console.log(playerCharacter);
			}

			else {
				enemies.push(characters[i]);
			}

		}
		
		console.log(enemies);

		$("#playerCharacterTitle").html("You are" + " " + playerCharacter.name);
		$("#playerEnemiesTitle").html("Now choose your opponent.");
		$(".thumbnail").not(that).appendTo(".playerEnemies");
		playerHP = playerCharacter.hp;
		console.log(playerHP);
		$("#playerHealth").html("Health: " + playerHP);
		playerAttackPower = playerCharacter.attackPower;
		console.log(playerAttackPower);
		$("#playerAttackPower").html("Attack Power: " + playerAttackPower);

//close chooseCharacter function
}


//Capture player choice for defender(s)
function chooseDefender () {


	if (that.id == "player") {
		console.log("That is already your Player Character.");
	}


	else {

		var defenderId = that.id;
		console.log(that.id);

		switch (defenderId) {
			case "yoda":
			$("#yoda").attr("id", "defender");
			defender = char1;
			break;

			case "jyn":
			$("#jyn").attr("id", "defender");
			defender = char2;
			break;

			case "lando":
			$("#lando").attr("id", "defender");
			defender = char3;
			break;

			case "count":
			$("#count").attr("id", "defender");
			defender = char4;
			break;
		}

		console.log(defender);

			// $("#playerCharacterTitle").html("May the force be with you," + " " + playerCharacter.name + ".");
			$("#playerCharacterTitle").html("May the force be with you.");
			$("#playerEnemiesTitle").html("Enemies Still to Defeat");
			$(".playerDefender").append($("#defender"));
			defenderHP = defender.hp;
			$("#defenderHealth").html("Health: " + defenderHP);
			defenderAttackPower = defender.attackPower;
			$("#defenderAttackPower").html("Attack Power: " + defenderAttackPower);
			attackDefender ();
	}

	$("#playerDefenderTitle").html("Your opponent is" + " " + (defender.name || "not selected. Choose from the list below") + ".");

//close chooseDefender function
}


//Player attack to win or lose
function attackDefender () {


		$(".fight").html("<button type='button' class='btn btn-default btn-lg' id='attackMove'><span class='glyphicon glyphicon-knight' aria-hidden='true'></span> Attack This Opponent</button>");
		$(".btn").on("click", function () {

			console.log("kicking ass");
			playerHP = playerHP - defender.defendPower;
			$("#playerHealth").html("Health: " + playerHP);
			defenderHP = defenderHP - playerAttackPower;
			$("#defenderHealth").html("Health: " + defenderHP);
			playerAttackPower = playerAttackPower + playerCharacter.attackPower;
			$("#playerAttackPower").html("Attack Power: " + playerAttackPower);
			defenderAttackPower = defenderAttackPower + defender.attackPower;
			$("#defenderAttackPower").html("Attack Power: " + defenderAttackPower);
			console.log(playerHP);
			console.log(defenderHP);

			if (defenderHP <=0) {

				var defeatedEnemies = enemies.indexOf(defender);
				enemies.splice(defeatedEnemies, 1);
				console.log(enemies);

				if (enemies.length == 0) {
					console.log("This is working now. ");
					$("#playerHealth").html("You have defeated all of your opponents <br> and are now Supreme Ruler of the galaxy!");
					$(".two").hide();
					$(".three").hide();

					resetGame ();

				}

				else {

					$("#defender").attr("id", "defeated");
					$(".defeated").append($("#defeated"));
					$(".defeated").hide();
					$("#playerDefenderTitle").html("You defeated " + defender.name + " !");
					$("#defenderHealth").empty();
					$("#defenderAttackPower").empty();
					console.log("choose another defender");
					defender = "no defender selected";
					$("#try-again").hide();
					$("#attackMove").hide();
				}


			}
			
			else {
				if (playerHP <= 0){
						$("#playerHealth").html("You were defeated and are now a force ghost!");
						$(".two").hide();
						$(".three").hide();
					resetGame();
				}
			}

		})
//close attackDefender function
}


//Reset the game once player wins or loses
function resetGame () {
	$("#attackMove").hide ();
	$("#playerAttackPower").html("Click to replay.");
	$("#replay").html("<button type='button' class='btn btn-default btn-lg' id='try-again'><span class='glyphicon glyphicon-knight' aria-hidden='true'></span> Play Again</button>");
			$(".btn").on("click", function () {	
				location.reload ();
			});
//close resetGame function	
}

function playGame () {
	//Start the game
	$(".thumbnail").on('click', function () {

		that=this;

		if (playerCharacter === "no playerCharacter selected") { 
			chooseCharacter ();
		}

		else if (defender == "no defender selected") {
			chooseDefender ();
		}

	else {
		console.log("The fear of loss is a path to the dark side.");
	}

//closes thumbnail on.click function
});
//closes playGame function
}
playGame ();

//closes jQuery document.ready function
});




// TESTS

// for (j=0; j<enemies.length; j++) {
// 	if (enemies[j] === defender) {
// 	}

// 	else {
// 		defeatedDefenders.push(enemies[j]);
// 	}

// }
// console.log(enemies);



