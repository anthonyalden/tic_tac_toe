angular
	.module('ticTacToeApp')
	.factory('GameBoard',GameBoardFunc);

	function GameBoardFunc() {

		var TILE_STATES = ['unselected-tile', 'O','X'];
		var playerNumber = 0;

		var GameBoard = function( numTiles ) {
			var numSquaresUsed=0;
			var gameWon=false;
			this.gameWinner="";

			this.numTiles = numTiles;
			this.tiles = new Array( numTiles );
			this.toggleTile = toggleTile;
			this.getTileState = getTileState;
			

			function toggleTile(num, player1Name, player2Name ) {



				
				if(gameWon || numSquaresUsed===9){
					return;
				}

				
				if(this.tiles[num] !=0 ) {
					alert("This Box Is Occupied.  Choose Another Box.");
					return;
				}
				if (playerNumber % 2 === 0) {
					this.tiles[num]=TILE_STATES[2];

					numSquaresUsed++;
					
					if (checkForWinner(this.tiles[num], this.tiles)){
						this.gameWinner=player1Name;
						gameWon=true;
					}
					if (numSquaresUsed ===9){
					this.gameWinner="CATS GAME";
					return false;
					}
				}
				if (playerNumber % 2 != 0) {
					this.tiles[num]=TILE_STATES[1];
					numSquaresUsed++;
					if (checkForWinner(this.tiles[num], this.tiles)){
						this.gameWinner=player2Name;
						gameWon=true;
					}
					if (numSquaresUsed ===9){
					this.gameWinner="CATS GAME";
					return false;
					}

				}
				
				playerNumber++;
				
				// this.tiles[num] = (this.tiles[num] + 1) % TILE_STATES.length;
			}

			function getTileState( num ) {
				return this.tiles[num];
			}

			function checkForWinner(id,tiles) {
				
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
				
					
			
				
				return false;
			}

			function delcareWinner(playerName){
				this.gameWinner=playerName;
				console.log("in declarewinner "+this.gameWinner);
				
				
			}
			
			for (var i=0; i<this.tiles.length; i++) {
				this.tiles[i] = "";
			}
			
		}

	


		return GameBoard;
	}