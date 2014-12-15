angular
	.module("ticTacToeApp")
	.controller("TicTacToeController", TicTacToeControllerFunc);

	TicTacToeControllerFunc.$inject = ['GameBoard', 'Player', '$firebase'];
	// TicTacToeControllerFunc.$inject = ['Player'];



function TicTacToeControllerFunc(GameBoard, Player, $firebase) {
	this.gameName = "TicTacToe";

	var self=this;

	// setup firebase
	var ref = new Firebase("https://presidents.firebaseio.com/squares");
	var tilesArray=[];
	var squares = $firebase(ref).$asObject();
	var playerId;


	squares.$loaded(function () {

			// playerId used to ID player as either player 1 or Player 2 and
			// kept track of in database.  Acceptable values are 0 and 1.  NumPlayers is either 0 or 1
			playerId=squares.numPlayers;


			// if both players are true and new one logs on someting is wrong
			// so set both players to false and start over againg.
			if (squares.player1 === true && squares.player2 === true) {
				squares.reset = true;
				squares.player1 = false;
				squares.player2 = false;
				squares.$save();
			}

			if (squares.player1 === true && squares.player2 === false){
				playerId = 1;
				squares.player2 = true;
				squares.playerName2 = "";
			}

			if (squares.player2 === true && squares.player1 === false){
				playerId = 0;
				squares.player1 = true;
				squares.playerName1 = "";
			}

			if (squares.player1 === false && squares.player2 === false){
				playerId = 0;
				squares.player1 = true;
				squares.playerName1 = "";
			}

			squares.playerScore1 = 0;
			squares.playerScore2 = 0;

			// if (squares.player1  === true){
			// 	// this is payer #2
			// 	playerId = 1;
			// 	squares.player2 = true;
			// 	squares.playerName2="";
			// 	squares.playerScore1=0;
			// 	squares.playerScore2=0;
			// 	squares.$save();
			// }
			// else if (squares.player2 === true){
			// 	// this is player #1
			// 	playerId = 0;
			// 	squares.player1 = true;
			// 	squares.playerName1="";
			// 	squares.playerScore1=0;
			// 	squares.playerScore2=0;
			// 	squares.$save();
			// }

			// if (squares.player1 === false){
			// 	// this is player #1
			// 	playerId = 0;
			// 	squares.player1 = true;
			// 	squares.playerName1="";
			// 	squares.playerScore1=0;
			// 	squares.playerScore2=0;
			// 	squares.$save();
			// } 
			// else if (squares.player2 === false){
			// 	// this is player #2
			// 	playerId = 1;
			// 	squares.player2 = true;
			// 	squares.playerName2="";
			// 	squares.playerScore1=0;
			// 	squares.playerScore2=0;
			// 	squares.$save();
			// }
			// reset gotFrist so that the message who goes first on screen does not show
			squares.goesFirst=false;
			// set all boxes to empty
			squares.squareArray = ["","","","","","","","",""];
			squares.$save();
			
			// set up a new game board
			self.activeBoard = new GameBoard(9, squares, playerId);

	});  // end $load function

	// set up the players
	// only player one is in use at this time
	this.currentPlayer1 = new Player("X");
	this.currentPlayer2 = new Player("O");

} // end tictactoeControllerFucn

