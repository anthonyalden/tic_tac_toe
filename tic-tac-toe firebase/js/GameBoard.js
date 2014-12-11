angular
	.module('ticTacToeApp')
	.factory('GameBoard',GameBoardFunc);

	GameBoardFunc.$inject=['$firebase'];

	function GameBoardFunc($firebase) {

		var TILE_STATES = ['unselected-tile', 'O','X'];
		var playerNumber = 0;

		var GameBoard = function( numTiles ) {
			var numSquaresUsed=0;
			var gameWon=false;
			this.gameWinner="";
			self = this;
			//firebase object
			self.tilesObject=getSquaresObject();
			
			numTiles = numTiles;
			// this.tiles = new Array( numTiles );
			this.toggleTile = toggleTile;
			this.getTileState = getTileState;
			this.resetGame = resetGame;
			this.newPlayers = newPlayers;

			
			function getSquaresObject(){
				var tilesArray=[];
				var ref = new Firebase("https://presidents.firebaseio.com/squares");
				
				var squares = $firebase(ref).$asObject();
				for(var i = 0; i < numTiles; i++){
					tilesArray[i]="";
				}
				console.log("before save of init squarearray");
				squares.squareArray=tilesArray;

				squares.$save();
				return squares;
			}


			function toggleTile(num, player1, player2) {



				// if (player2.name ==="" || player2.name===""){
				// 	alert("You must enter Player names!!");
				// 	return;
				// }
				if(gameWon || numSquaresUsed===9){
					return;
				}

				
				if(self.tilesObject.squareArray[num] !="" ) {
					alert("This Box Is Occupied.  Choose Another Box.");
					return;
				}
				if (playerNumber % 2 === 0) {
					self.tilesObject.squareArray[num]=TILE_STATES[2];
					self.tilesObject.$save();

					numSquaresUsed++;
					
					if (checkForWinner(self.tilesObject.squareArray[num], self.tilesObject.squareArray)){
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
					self.tilesObject.squareArray[num]=TILE_STATES[1];
					self.tilesObject.$save();
					// this.tiles[num]=TILE_STATES[1];
					numSquaresUsed++;
					if (checkForWinner(self.tilesObject.squareArray[num], self.tilesObject.squareArray)){
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

			function resetGame (){
				
				numSquaresUsed = 0;
				gameWon = false;
				this.gameWinner = "";
				playerNumber = 0;

				for (var i=0; i<self.tilesObject.squareArray.length; i++) {
				self.tilesObject.squareArray[i] = "";
				
				}
				self.tilesObject.$save();
			}

			function newPlayers(player1,player2){
				player1.name="";
				player1.score=0;
				player2.name ="";
				player2.score = 0;
				resetGame();
			}

			function getTileState( num ) {
				return self.tilesObject.squareArray[num];
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
			
			// for (var i=0; i<this.tiles.length; i++) {
			// 	this.tiles[i] = "";
			// }

			// for (var i=0; i<self.tilesObject.squareArray.length; i++) {
			// 	self.tilesObject.squareArray[i] = "";

			// }
			// tilesObject.$save;
		}

	


		return GameBoard;
	}