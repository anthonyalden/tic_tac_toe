angular
	.module('ticTacToeApp')
	.factory('GameBoard',GameBoardFunc);

	function GameBoardFunc() {

		var TILE_STATES = ['unselected-tile', 's-o','s-x'];
		var playerNumber = 0;
		var GameBoard = function( numTiles ) {

			this.numTiles = numTiles;
			this.tiles = new Array( numTiles );
			this.toggleTile = toggleTile;
			this.getTileState = getTileState;
			numSquaresUsed=0;

			function toggleTile(num, player1Name, player2Name ) {
				if (numSquaresUsed ===9){
					return
				}
				if (playerNumber % 2 === 0) {
					this.tiles[num]=TILE_STATES[2];
					if (checkForWinner(this.tiles[num], this.tiles)){
						delcareWinner(player1Name);
					}
				}
				if (playerNumber % 2 != 0) {
					this.tiles[num]=TILE_STATES[1];
					if (checkForWinner(this.tiles[num])){
						delcareWinner(player2Name);
					}
				}
				
				playerNumber++;
				numSquaresUsed++;
				// this.tiles[num] = (this.tiles[num] + 1) % TILE_STATES.length;
			}

			function getTileState( num ) {
				return this.tiles[num];
			}

			function checkForWinner(id,tiles) {
				alert("at check for winner"+tiles);
				alert(tiles[0] +"tiles[0]     " +id);
				if ( (tiles[0] === id && tiles[3] === id && tiles[6] === id) ||
					 (tiles[1] === id && tiles[4] === id && tiles[7] === id) ||
					 (tiles[2] === id && tiles[5] === id && tiles[8] === id) || 
					 (tiles[0] === id && tiles[1] === id && tiles[2] === id) ||
					 (tiles[3] === id && tiles[4] === id && tiles[5] === id) ||
					 (tiles[6] === id && tiles[7] === id && tiles[8] === id) ||
					 (tiles[0] === id && tiles[4] === id && tiles[8] === id) ||
					 (tiles[2] === id && tiles[4] === id && tiles[6] === id) ) {
					return true;
				}
				else {
					return false;
				}
			}

			function delcareWinner(playerName){
				alert(playerName+" has won the game!");
			}
			function donothing(){

			}
			
			for (var i=0; i<this.tiles.length; i++) {
				this.tiles[i] = 0;
			}
			console.log(this.tiles)
		}

	


		return GameBoard;
	}