angular
	.module("ticTacToeApp")
	.controller("TicTacToeController", TicTacToeControllerFunc);

	TicTacToeControllerFunc.$inject = ['GameBoard', 'Player'];
	// TicTacToeControllerFunc.$inject = ['Player'];



function TicTacToeControllerFunc(GameBoard, Player) {
	this.gameName = "TicTacToe";

	
	this.activeBoard = new GameBoard(9);
	
	this.currentPlayer1 = new Player("X");
	this.currentPlayer2 = new Player("O");
	this.currentPlayer1.setName();
	this.currentPlayer2.setName();
	
	

	// this.currentPlayer2 = new Player("O");

}

