angular
	.module("ticTacToeApp")
	.controller("TicTacToeController", TicTacToeControllerFunc);

	TicTacToeControllerFunc.$inject = ['GameBoard'];

function TicTacToeControllerFunc(GameBoard) {
	this.gameName = "TicTacToe";

	this.activeBoard = new GameBoard( 9);
}
