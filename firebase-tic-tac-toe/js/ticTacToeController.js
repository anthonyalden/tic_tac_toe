angular
	.module("ticTacToeApp")
	.controller("TicTacToeController", TicTacToeControllerFunc);

	TicTacToeControllerFunc.$inject = ['GameBoard', 'Player', '$firebase'];
	// TicTacToeControllerFunc.$inject = ['Player'];



function TicTacToeControllerFunc(GameBoard, Player, $firebase) {
	this.gameName = "TicTacToe";



var ref = new Firebase("https://presidents.firebaseio.com/squares");
	var tilesArray=[];			
	var squares = $firebase(ref).$asObject();
	console.log(squares);
	squares.playerId= 0;

	for(var i = 0; i < 9; i++){
					tilesArray[i]="";
				}
	squares.squareArray=tilesArray;
	squares.playerNumber=0;



	squares.$save();
	
	this.activeBoard = new GameBoard(9, squares);
	
	this.currentPlayer1 = new Player("X");
	this.currentPlayer2 = new Player("O");
	

	// this.currentPlayer1.playerNum= self.squares.playerId;







	

}

