angular
	.module("ticTacToeApp")
	.controller("TicTacToeController", TicTacToeControllerFunc);

	TicTacToeControllerFunc.$inject = ['GameBoard', 'Player', '$firebase'];
	// TicTacToeControllerFunc.$inject = ['Player'];



function TicTacToeControllerFunc(GameBoard, Player, $firebase) {
	this.gameName = "TicTacToe";

	
	this.activeBoard = new GameBoard(9);
	
	this.currentPlayer1 = new Player("X");
	this.currentPlayer2 = new Player("O");
	

}

