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
			gameWon=false;

			function toggleTile(num, player1Name, player2Name ) {



				if (numSquaresUsed ===9){
					return;
				}
				if(this.tiles[num] !=0 ) {
					alert("This Box Is Occupied.  Choose Another Box.");
					return;
				}
				if (playerNumber % 2 === 0) {
					this.tiles[num]=TILE_STATES[2];

					var c=document.getElementsByClassName("board-tile");
					
					cxt=c[num].getContext("2d");
					alert(num);
					cxt.beginPath();
					cxt.moveTo(10,10);
					cxt.lineTo(40,40);
					cxt.moveTo(40,10);
					cxt.lineTo(10,40);
					cxt.stroke();
					
					if (checkForWinner(this.tiles[num], this.tiles)){
						delcareWinner(player1Name);
						gameWon=true;
					}
					
				}
				if (playerNumber % 2 != 0) {
					this.tiles[num]=TILE_STATES[1];
					if (checkForWinner(this.tiles[num], this.tiles)){
						delcareWinner(player2Name);
						gameWon=true;
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
			
		}

	


		return GameBoard;
	}