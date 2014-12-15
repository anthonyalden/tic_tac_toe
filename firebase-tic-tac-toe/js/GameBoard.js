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

			// used to determine that player has exited game and display message if they try to continue 
			// playing after exiting the game
			var exitGame=false;


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
			this.quitGame = quitGame;
			
			// function used to reset scores and data associated with new players
			this.newPlayers = newPlayers;

			// used to display message that it is not players turn if they try to click on box when it 
			// is not their turn
			self.notYourTurn = false;
			
			// used to ID player as either X or O set to 1 or O
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

				// check to see if the game is over or a cats game and tell the user the game is over
				// if he keeps clicking on the board
				if(self.tilesObject.gameWon || self.tilesObject.numSquaresUsed===9){
					alert("This game is over.  Press New Game to start over.");
					return;
				}

				// if player has exited the game don't let him continue playing, have 
				// him refresh his browser.
				if (exitGame){
					alert("You have exited this game.  Please refresh your browser to play again.");
					return;
				}
				// check to see if box is already chosen and tell user if so
				if ( (self.tilesObject.playerNumber%2 === 0) && ( playerId%2  === 0) ){
					self.notYourTurn= true;
					return;
				}

				if ( (self.tilesObject.playerNumber !== 0) && ( playerId%2 !==0)){
					self.notYourTurn =true;
					return;
				}


				// tell user that box is occupied if he clicks on one that already has X or O
				if(self.tilesObject.squareArray[num] !== "" ) {
					alert("This Box Is Occupied.  Choose Another Box.");
					return;
				}

				// reset who goes first flag X or O so that NG-SHOW turns off the message
				self.tilesObject.goesFirst = false;


				// playserNumber is used to toggle between X and O 
				// this conditional statement selects 'X'
				if (self.tilesObject.playerNumber === 1) {
					// update array with X and save to database 
				alert("in main first X if "+ self.tilesObject.playerNumber);
					self.tilesObject.squareArray[num]=TILE_STATES[2];
					self.tilesObject.numSquaresUsed=self.tilesObject.numSquaresUsed+1;
					// self.notYourTurn=false;
					self.tilesObject.$save();

					
					// check to see if this move is a winning move
					if (checkForWinner(self.tilesObject.squareArray[num], self.tilesObject.squareArray)){
						self.tilesObject.gameWinner=self.tilesObject.playerName1;
						self.tilesObject.playerScore1 = self.tilesObject.playerScore1+1;
						self.tilesObject.gameWon = true;
						self.tilesObject.$save();
						return;
					}

					// check to see if this move is a cats game
					if (self.tilesObject.numSquaresUsed === 9 && self.tilesObject.gameWon === false) {
					self.tilesObject.gameWinner="CATS GAME";
					self.tilesObject.$save();
					return false;
					}
				} // end player 'X'

				
				
				// playserNumber is used to toggle between X and O 
				// this conditional statement selects 'O'
				if (self.tilesObject.playerNumber  === 0 ) {
					alert("in main second  O if "+ self.tilesObject.playerNumber);
					// update array with O and save to database
					self.tilesObject.squareArray[num]=TILE_STATES[1];
					self.tilesObject.numSquaresUsed=self.tilesObject.numSquaresUsed+1;
					self.tilesObject.$save();
					
					// check to see if this is winning move
					if (checkForWinner(self.tilesObject.squareArray[num], self.tilesObject.squareArray)){
						self.tilesObject.gameWinner=self.tilesObject.playerName2;
						self.tilesObject.playerScore2 = self.tilesObject.playerScore2+1;
						self.tilesObject.gameWon=true;
						self.tilesObject.$save();
						return;
					}

					// check to see if this is a cats game
					// set gameWinner to CATS GAME so it 
					// prints this out as a message to screen
					if (self.tilesObject.numSquaresUsed ===9 && self.tilesObject.gameWon===false){
					self.tilesObject.gameWinner="CATS GAME";
					self.tilesObject.$save();
					return false;
					}

				} // end player 'O'
				
				// flip flop player X and O
				if (self.tilesObject.playerNumber === 0){
					self.notYourTurn=false;
					self.tilesObject.playerNumber = 1;
					self.tilesObject.$save();
					
				}
				else {
					self.notYourTurn=false;
					self.tilesObject.playerNumber = 0;
					self.tilesObject.$save();
				
				}
				
				
			} // end toggleTile

			// used to exit the game gracefully so that the database knows which player has
			// finished playing.
			function quitGame(){
				if (playerId%2 === 0){
					self.tilesObject.player1 = false;
				}
				else {
					self.tilesObject.player2 = false;
				}

				self.tilesObject.$save();

				alert("Thank you for playing Tic Tac Toe.  You may close your browser now.");
				exitGame =  true;
			}


			// reset variables assocated with a game
			function resetGame (){

				self.tilesObject.numSquaresUsed = 0;
				self.tilesObject.gameWon = false;
				self.tilesObject.gameWinner = "";
				self.tilesObject.playerNumber = Math.floor(Math.random(0,1)*2);
				if (self.tilesObject.playerNumber === 1 ){
					self.tilesObject.goesFirst=true;
					self.tilesObject.goesFirstName = "X";
				}
				else{
					self.tilesObject.goesFirst=true;
					self.tilesObject.goesFirstName = "O";
				}
				for (var i=0; i<self.tilesObject.squareArray.length; i++) {
				self.tilesObject.squareArray[i] = "";
				
				}

				self.tilesObject.$save();
			}


			// setup variables assoiciated with new players
			function newPlayers(player1,player2){

			
				self.tilesObject.playerScore1=0;
				self.tilesObject.playerScore2 = 0;
				
				// note that player1.name is used for both players.
				if (playerId === 0 && self.tilesObject.playerNumber === 1){
					alert("playerId"+playerId);
					self.tilesObject.playerName1="X - "+player1.name;
					
				}
				else if ( playerId === 0 && self.tilesObject.playerNumber === 0){
					self.tilesObject.playerName1="X - "+player1.name;
					
				}
				else if (playerId === 1 && self.tilesObject.playerNumber === 1){
					alert("playerID in else"+playerId);
					self.tilesObject.playerName2 = "O - "+player1.name;
					
				}
				else{
					self.tilesObject.playerName2 = "O - "+player1.name;
					
				}
				self.tilesObject.$save;	
				
			} // end newPlayers


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
			} // end check for winner

			
		} // end gameBoard


		return GameBoard;

	} // end GameBoardFunc