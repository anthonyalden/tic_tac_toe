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
			this.restGame = restGame;
			this.newPlayers = newPlayers;

			function toggleTile(num, player1, player2) {



				if (player2.name ==="" || player2.name===""){
					alert("You must enter Player names!!");
					return;
				}
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
						this.gameWinner=player1.name;
						player1.score++;
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
						this.gameWinner=player2.name;
						player2.score++;
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

			function restGame (){
				
				numSquaresUsed = 0;
				gameWon = false;
				this.gameWinner = "";
				playerNumber = 0;

				for (var i=0; i<this.tiles.length; i++) {
				this.tiles[i] = "";
				}
			}

			function newPlayers(player1,player2){
				player1.name="";
				player1.score=0;
				player2.name ="";
				player2.score = 0;
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