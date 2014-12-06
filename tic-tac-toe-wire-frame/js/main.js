// global variables
        angular.module('ticTacToeApp', []);

        // var painted;
        // var content;
        // var winningCombinations;
        // var turn=0;
        // var theCanvas;
        // var c;
        // var cxt;
        // var squaresFilled=0;
        // var w;
        // var y;

        // // Instanciate Arrays
        // window.onload=function(){
        //     painted = [false,false,false,false,false,false,false,false,false];
        //     content = new Array();
        //     winningCombinations=[[0,1,2],[3,4,5],[6,7,8],
        //     [0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        //     for (var i= 0; i<8; i++) {
        //         painted[i]=false;
        //         content[i]='';
        //     }
        // } ;   

        // // game methods
        // function canvasClicked(canvasNumber) {
        //     theCanvas="canvas"+canvasNumber;
        //     c = document.getElementById(theCanvas);
        //     cxt = c.getContext("2d");

        //     if (painted[canvasNumber-1] === false){
                
        //         if (turn%2 === 0) {
        //             cxt.beginPath();
        //             cxt.moveTo(10,10);
        //             cxt.lineTo(40,40);
        //             cxt.moveTo(40,10);
        //             cxt.lineTo(10,40);
        //             cxt.stroke();
        //             // cxt.closePath();
                   
        //             content[canvasNumber-1] = 'X';
        //              // alert("content "+content[canvasNumber-1]);
        //         }
        //         else {
        //             cxt.beginPath();
        //             cxt.arc(25,25,20,0,Math.PI*2,true);
        //             cxt.stroke();
                    
        //             // cxt.clossePath();
                    
        //             content[canvasNumber-1] = 'O';
        //             // alert("content "+content[canvasNumber-1]);
                    
        //         }
        //         turn++;
               
        //         painted[canvasNumber-1] =  true;
                
        //         squaresFilled++;
        //         checkForWinners(content[canvasNumber-1]);

        //         if(squaresFilled == 9){
        //             alert("THE GAME IS OVER!!");
        //             location.reload(true);
        //         }
        //     }    
        //      else {
        //          alert("THAT SPACE IS ALREADY OCCUPIED");
        //      }

            
        // }
        //     function checkForWinners(symbol){

        //         for (var a = 0; a < winningCombinations.length; a++) {
                    
        //             if (content[winningCombinations[a][0]] === symbol && content[winningCombinations[a][1]] === symbol &&
        //                 content[winningCombinations[a][2]] === symbol) {
        //                 alert( symbol+" WON!");
        //                 playAgain();
        //             }

        //         }
        //     }

        //     function playAgain() {
        //         y=confirm("PLAY AGAIN?");
        //         if (y) {
        //             // alert("OKAY! ^^/>");
        //             location.reload(true);
        //         }
        //         else {
        //             alert("BYE BYE!");
        //         }
        //     }
        // 