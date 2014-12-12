angular
	.module('ticTacToeApp')
	.factory('Player', PlayerFunc);

	function PlayerFunc(){

		var Player = function (PlayerId){
			
			this.name="";
			this.player=PlayerId;
			this.playerNum=0;
			this.score=0;
			this.setName=setName;
			this.getName=getName;

			function setName(name){
				this.name=name;
				
			}

			function getName(){
				console.log("in getname"+ this.name);
				return this.name;
			}

			function updateScore(){
				this.score++;
			}
		}

		return Player;
	}