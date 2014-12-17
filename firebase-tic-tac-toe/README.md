Tic Tac Toe
Written By Tony Alden
December 15 2014

Data structure is an array with 9 elements
Each elements hold one character either x or o

Each array elelement prints on the screen and also is used to key into ng-class to pick the color of the box and the font size for the X and O characters that print in the box

The board itself is a section that is set at 200px width to contrain the inline box of the nine tiles (boxes) which are each set at 50px.  This combination causes the nine inline boxes to roll into 3 rows of 3 boxes each so that it appears
as a grid.

The html is broken into three sctions
	header has the title and various messages that print out at the top of the page as the game is played including who the winner is.  These are active messages that change due to playing contions.

	The middle section is the board that consisits primarily of two div's, the second of which is an ng-repeat used to print the 9 playing squares and are each controlled by an ng-click and display controled by ng-class (as mentioned above).

	The footer section is used to ask the user to enter his name in an input box with a button to confirm the name entry.  Once this button is pressed, the name will appear on both playing screens and the player is assigned either X or O.  Not that an existing player will keep his X or O status and the challenger will come in as whatever the champ isn't.

The code:
	The basic code consits of two IF statements that check a playerNumber which is stored in the firebase database so that both player's programs can see it.  The playerNumber is either a 0 or a 1 and flip flops back and forth as each player takes his turn.  The two if statements keep track of who's turn it is and are used to determine if
	player X or Player O wins the game.

	Winning the Game Logic
	The game winning logic is straight forward.  Simply, it is one IF statment with 8 sets of conditions, each condition representing one winning row or diaginal on the game board.  Since the data structure used to store the gameboard is an array of nine elements that have either an X or an O, and there are three elements per row, the condtions in the IF statement are simply to && (and) the combinations that make up each row with sevearl || (or) clauses.  Thus you only need ONE if statement.  There maybe a tricker way to do this, but from a computing point of view the underling assebly code and machine execution is cannot be improved upon due to short circuiting of AND and OR statements.

	There are various variables and functions used for house keeping to track things like player names, game states, etc and are passed through the database as needed so that both player's programs have access to them when this is appropriate.

Installation:
	The following data fields and values need to be set up in the firbase database.
		gameWinner		""		used to display the name of the game winner with ng-show
		gameWon			false	keeps players from playing a won game until they start a new one
		goesFirst		false	turn on ng-show name of palyer who will go first in goesFirstName at start of game
		goesFirstName	""		name of player who will go first at begining of game
		notYourTurn		false	keeps a player from getting to take his turn when it is not his turn
		numPlayers		0		tracks number of player, for future use to limit number of palyers to 2
		numSquaresUsed	0		tracks number of squares used to figure out when a cats game occurs
		player1			false	used to determine which player already playing to assign new player role as X or O
		player2			false	used to determine which player already playing to assign new player role as X or O
		playerName1		""		stores the name of player one
		playerName2		""		stores the name of player two
		playerScore1	0		keeps track of the score for player one
		playerScore2	0		keeps track of the score for player two
		squaresArray	["","","","","","","","",""]   data structure to hold X and O as each is clicked, used for
														for ng-class to format a box and style the X and O font


Known Issues:
	There is a known issue that if the user exits his browser without pressing the exit button, the next user will not be in sync with the database and hence the champ will need to press the exit buttons and then refresh his/her pages before starting the game again.  I haven't figured out a way to fix this yet - some homework for the future.

