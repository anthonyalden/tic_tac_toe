angular
	.module("ticTacToeApp")
	.controller("TicTacToeController", TicTacToeControllerFunc);

	TicTacToeControllerFunc.$inject = ['GameBoard', 'Player', '$firebase'];
	// TicTacToeControllerFunc.$inject = ['Player'];



function TicTacToeControllerFunc(GameBoard, Player, $firebase) {
	this.gameName = "TicTacToe";

	var self=this;

	var ref = new Firebase("https://presidents.firebaseio.com/squares");
	var tilesArray=[];
	var squares = $firebase(ref).$asObject();
	var playerId;
	squares.$loaded(function () {

			playerId=squares.numPlayers;
			// if (squares.currentPlayer%2 === 0) {
			// 	if (squares.numPlayers%2 ===0){
			// 		squares.numPlayers = squares.numPlayers+1
			// 		squares.$save();
			// 		playerId = squares.numPlayers;
			// 	}
			// 	else{
			// 		playerId = squares.numPlaers;
			// 	}

			// }

			// if(squares.currentPlayer%2 != 0 ){
			// 	if (squares.numPlayers%2 != 0){
			// 		squares.numPlayers=squares.numPlayers+1;
			// 		squares.$save;
			// 		playerId = squares.numPlayers;
			// 	}
			// 	else{
			// 		playerId=squares.numPlayers;
			// 	}
			// }
			// playerId = squares.numPlayers;


			// if ( playerId < 1){
			// squares.numPlayers = squares.numPlayers +1;
			// }
			// else
			// {
			// 	squares.numPlayers = 0;
			// }
			squares.numPlayers=squares.numPlayers+1;
			squares.$save();
			self.activeBoard = new GameBoard(9, squares, playerId);

	});

	// if (!squares.playerId){
	// 	squares.playerId = 0;
	// }
	// else {
	// 	squares.playerId = squares.playerId +1;
	// }

	// for(var i = 0; i < 9; i++){
	// 				tilesArray[i]="";
	// 			}
	// squares.squareArray=tilesArray;
	// squares.playerNumber=0;



	// squares.$save();
	
	
	
	this.currentPlayer1 = new Player("X");
	this.currentPlayer2 = new Player("O");
	

	// this.currentPlayer1.playerNum= self.squares.playerId;







	

}

