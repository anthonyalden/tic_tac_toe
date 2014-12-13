angular
	.module('ticTacToeApp')
	.factory('GameBoard',GameBoardFunc);

	GameBoardFunc.$inject=['$firebase'];

	function GameBoardFunc($firebase) {

		var TILE_STATES = ['unselected-tile', 'O','X'];
		var playerNumber = 0;

		var GameBoard = function( numTiles , passedInObject, playerId) {
			
			// used to determine cats game
			var numSquaresUsed=0;

			// used to determine when the game has been won
			var gameWon=false;


			self = this;

			// variable to display who wins the game in html
			self.gameWinner="";
			
			
			//firebase object used to store array that holds X's and O's
			// self.tilesObject=getSquaresObject();
			self.tilesObject=passedInObject;
			
			// main click function link to html for clicking on a square
			this.toggleTile = toggleTile;
			
			// function returns constants used to display board by setting class variable in html ng-class
			this.getTileState = getTileState;
			
			// function resets game when over to set up for a new game
			this.resetGame = resetGame;
			
			// function used to reset scores and data associated with new players
			this.newPlayers = newPlayers;

			self.notYourTurn = false;
			
			self.PlayerId = playerId;

			
			// function interfaces with firebase and defines array object stored in firebase database 
			// it return 'squares' which is an array that is the main datastructure that holds the
			// X and O values associated with each board click.  It links to the variable 'tilesObject'
			// and the array that is in the object is called 'tilesObject.squareArray'.  squareArray is 
			// wrapped into the tilesObject so that firebase can save the array as an object.  FYI firebase
			// could not save arrays with contents that were modified in the middle of the array
			function getSquaresObject(){
				var tilesArray=[];
				var ref = new Firebase("https://presidents.firebaseio.com/squares");
				
				var squares = $firebase(ref).$asObject();
				for(var i = 0; i < numTiles; i++){
					tilesArray[i]="";
				}
				squares.squareArray=tilesArray;
				squares.playerNumber=0;

				squares.$save();
				return squares;
			}

			// num is the square number that iscurrently being played
			// player1 is the player1 object instantiated in the Controller
			// player2 is the player2 object instantiated in the Controller
			function toggleTile(num, player1, player2) {

				console.log ("Playerid "+playerId);
				// players must enter names to play
				// if (player1.name ==="" || player2.name===""){
				// 	alert("You must enter Player names!!");
				// 	return;
				// }
				if (playerId===0){
					self.tilesObject.playerName1="O  "+player1.name;
					self.tilesObject.$save();
				}
				else{
					self.tilesObject.playerName2="X  "+player1.name;
					self.tilesObject.$save;
				}
				




				// check to see if the game is over or a cats game and tell the user the game is over
				// if he keeps clicking on the board
				// if(self.tilesObject.gameWon || self.tilesObject.numSquaresUsed===9){
				// 	alert("This game is over.  Press New Game to start over.")
				// 	return;
				// }


				// check to see if box is already chosen and tell user if so
				if ( (self.tilesObject.playerNumber%2 === 0) && ( playerId%2  === 0) ){
					
					self.notYourTurn= true;
					// self.tilesObject.NotYourturn= true;
					// self.tilesObject.$save();
					// alert("Please wait for your turn");
					return;
				}
			
				if ( (self.tilesObject.playerNumber != 0) && ( playerId%2 != 0)){
					// self.tilesObject.notYourTurn=true;
					self.notYourTurn =true;
					// self.tilesObject.$save();
					// alert("Please wait for your turn");
					return;
				}
				self.tilesObject.currentPlayer = playerId;
				self.tilesObject.$save();

				if(self.tilesObject.squareArray[num] !="" ) {
					alert("This Box Is Occupied.  Choose Another Box.");
					return;
				}

				// logic for player number 1 that is 'X'
				if (self.tilesObject.playerNumber % 2 === 0) {
					// update array with X and save to database 

					self.tilesObject.squareArray[num]=TILE_STATES[2];
					self.tilesObject.numSquaresUsed=self.tilesObject.numSquaresUsed+1;
					// self.notYourTurn=false;
					self.tilesObject.$save();

					
					


					// check to see if this move is a winning move
					if (checkForWinner(self.tilesObject.squareArray[num], self.tilesObject.squareArray)){
						self.tilesObject.gameWinner=self.tilesObject.playerName1;
						self.tilesObject.playerScore1 = self.tilesObject.playerScore1+1;
				
						// gameWon=true;
						self.tilesObject.gameWon=true;
						self.tilesObject.$save();
						return;
					}

					// check to see if this move is a cats game
					if (self.tilesObject.numSquaresUsed ===9 && self.tilesObject.gameWon === false) {
					self.tilesObject.gameWinner="CATS GAME";
					self.tilesObject.$save();
					return false;
					}
				}

				
				// Logic for player number 2 that is 'O'
				if (self.tilesObject.playerNumber % 2 != 0) {

					// update array with O and save to database
					self.tilesObject.squareArray[num]=TILE_STATES[1];
					self.tilesObject.numSquaresUsed=self.tilesObject.numSquaresUsed+1;
					// self.notYourTurn=false;
					self.tilesObject.$save();
					
					

					// check to see if this is winning move
					if (checkForWinner(self.tilesObject.squareArray[num], self.tilesObject.squareArray)){
						self.tilesObject.gameWinner=self.tilesObject.playerName2;
						self.tilesObject.playerScore2 = self.tilesObject.playerScore2+1;
						// player2.updateScore();
						gameWon=true;
						self.tilesObject.gameWon=true;
						self.tilesObject.$save();
						return;
					}

					// check to see if this is a cats game
					// set gameWinner to CATS GAME so it 
					// prints this out as the message who wins
					if (self.tilesObject.numSquaresUsed ===9 && self.tilesObject.gameWon===false){
					self.tilesObject.gameWinner="CATS GAME";
					self.tilesObject.$save();
					return false;
					}

				}
				
				// flip flop player X and O
				if (self.tilesObject.playerNumber === 0){
					self.notYourTurn=false;
					self.tilesObject.playerNumber =1;
					self.tilesObject.$save();
					
				}
				else {
					self.notYourTurn=false;
					self.tilesObject.playerNumber =0;
					self.tilesObject.$save();
				
				}
				
				
			}


			// reset variables assocated with a game
			function resetGame (){
				
				self.tilesObject.numSquaresUsed = 0;
				self.tilesObject.gameWon = false;
				self.tilesObject.gameWinner = "";
				// self.tilesObject.playerNumber = 0;

				for (var i=0; i<self.tilesObject.squareArray.length; i++) {
				self.tilesObject.squareArray[i] = "";
				
				}
				self.tilesObject.$save();
			}


			// reset variables assoiciated with players and then reset then game
			function newPlayers(player1,player2){
				// player1.name="";
				player1.score=0;
				// player2.name ="";
				player2.score = 0;
				// console.log("player number "player1.playerNum)
				// if (!self.tilesObject.playerId){
				// 	 self.tilesObject.playerId=1;
				// 	 self.tilesObject.$save();
				// }
				// else{
					// self.tilesObject.playerId= self.tilesObject.playerId+1;
					// self.tilesObject.$save();
				// }	
				resetGame();
			}


			// return X or O or unselected for ng-class to display in html 
			function getTileState( num ) {
				return self.tilesObject.squareArray[num];
			}


			// logic to determin if there is a winner.  simply check
			// all combinations of rows and columns
			// tiles is the array datastructure holding the gamestate of X and O played
			// id is either X or O used to compare with each box.  Each line is one
			// row on the boad or one diag.
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

			
		}

	


		return GameBoard;
	}