angular
	.module('ticTacToeApp')
	.factory('GameBoard',GameBoardFunc);

	GameBoardFunc.$inject=['$firebase'];

	function GameBoardFunc($firebase) {

		var SQUARE_STATES = ['unselected-tile', 'O','X'];
		var playerNumber = 0;
		// var gb=this;
		// gb.$firebase=$firebase;


		var GameBoard = function( numTiles ) {
			var numSquaresUsed=0;
			var gameWon=false;
			self =  this;
			self.gameWinner="";
			self.tilesObject=getSquaresObject();

			// for(var i = 0; i < numTiles; i++){
			// 		// self.tiles.$add(0);
			// 		self.tiles[i]=0;
			// 	}
				// self.tilesObject.$save();
				// self.keys=self.tiles.$getIndex();
				// console.log("keys "+self.keys);		
			
			self.numTiles = numTiles;
			// self.tiles = new Array( numTiles );
			self.playSquare = playSquare;
			self.getTileState = getTileState;
			self.resetGame = resetGame;
			self.newPlayers = newPlayers;
			self.keys =[];




			function getSquaresObject(){
				var tilesArray=[];
				var ref = new Firebase("https://presidents.firebaseio.com/squares");
				
				var squares = $firebase(ref).$asObject();
				for(var i = 0; i <9; i++){
					// self.tiles.$add(0);
					tilesArray[i]=0;
				}
				console.log("before save of init squarearray");
				squares.squareArray=tilesArray;

				squares.$save();
				return squares;
			}



			function playSquare(num, player1, player2) {


				// if (player2.name ==="" || player2.name===""){
				// 	alert("You must enter Player names!!");
				// 	return;
				// }
				// if(gameWon || numSquaresUsed===9){
				// 	return;
				// }

				// if(self.tiles[num] !=0 ) {
				// 	alert("This Box Is Occupied.  Choose Another Box.");
				// 	return;
				// }
				if (playerNumber % 2 === 0) {
					self.tilesObject.squareArray[num]=SQUARE_STATES[2];
					console.log("self tiles"+self.tiles.tilesArray);
					self.tilesObject.$save();
					// numSquaresUsed++;
					
					// if (checkForWinner(self.tiles[num], self.tiles)){
					// 	self.gameWinner=player1.name;
					// 	// declareWinner(player1.name);
					// 	player1.score++;
					// 	gameWon=true;
					// }
					// if (numSquaresUsed ===9){
					// this.gameWinner="CATS GAME";
					// return false;
					// }
				}
				if (playerNumber % 2 != 0) {
					self.tilesObject.squareArray[num]=SQUARE_STATES[1];
					self.tilesObject.$save();
					// self.tiles.$save(self.tiles);
					// numSquaresUsed++;
					// if (checkForWinner(self.tiles[num], self.tiles)){
					// 	self.gameWinner=player2.name;
					// 	// declareWinner(player2.name);
					// 	player2.score++;
					// 	gameWon=true;
					// }
					// if (numSquaresUsed ===9){
					// self.gameWinner="CATS GAME";
					// return false;
					// }

				}
				
				playerNumber++;
				
				// this.tiles[num] = (this.tiles[num] + 1) % TILE_STATES.length;
			}

			function resetGame (){
				
				numSquaresUsed = 0;
				gameWon = false;
				self.gameWinner = "";
				playerNumber = 0;

				for (var i=0; i<self.tiles.length; i++) {
					console.log("reset ");
				self.tiles[i] = "";
				}
			}

			function newPlayers(player1,player2){
				player1.name="";
				player1.score=0;
				player2.name ="";
				player2.score = 0;
				resetGame();
			}

			function getTileState( num ) {
				// return this.tiles[num];
				console.log("gettileState "+ self.tilesObject.squareArray[num]);
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
				self.gameWinner=playerName;
				console.log("in declarewinner "+self.gameWinner);
				
				
			}
			
			
				// self.tiles[i] = "";
		
			
		}

	


		return GameBoard;
	}