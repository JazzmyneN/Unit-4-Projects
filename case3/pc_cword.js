"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 3

   Crossword Puzzle Script
   
   Author: 
   Date:   
   
   Global Variables
   ================
   allLetters
      References all of the letter cells in the crossword table#crossword
   
   currentLetter
      References the letter currently selected in the puzzleLetter
      
   wordLetters
      References the across and down letters in the word(s) associated with the current letter
   
   acrossClue
      References the across clue associated with the current letter
      
   downClue
      References the down clue associated with the current letter
      
         
   Functions
   =========
   
   init()
      Initializes the puzzle, setting up the event handlers and the variable values
       
   formatPuzzle(puzzleLetter)
      Formats the appearance of the puzzle given the selected puzzle letter
      
   selectLetter(e)
      Applies keyboard actions to select a letter or modify the puzzle navigation
      
   switchTypeDirection()
      Toggles the typing direction between right and down
      
   getChar(keyNum)
      Returns the text character associated with the key code value, keyNum


*/

var allLetters;
var currentLetter;
var wordLetters;
var acrossClue;
var downClue;
var typeDirection = "right";

window.onload = init();

function init(){
   allLetters = document.querySelectorAll("table#crossword span");
   currentLetter = allLetters[0];
   var acrossID = currentLetter.dataset.clueA;
   var downID = currentLetter.dataset.clueD;
   acrossClue = document.getElementById(acrossID);
   downClue = document.getElementById(downID);

   formatPuzzle(currentLetter);

   for(var i = 0; i < allLetters.length; i++){
      allLetters[i].style.cursor = "pointer";
      allLetters[i].addEventHandler("onmousedown", formatPuzzle(e.target))
   }
   document.addEventListener("keydown", selectLetter);

   var typeImage = document.getElementById("directionImg");
   typeImage.style.cursor = "pointer";
   switchTypeDirection(typeImage);

   document.getElementById("showErrors").addEventHandler("click", function(){
      for(var i = 0; i < allLetters.length; i++){
         if(allLetters[i].textContent !== allLetters[i].dataset.letter){
            allLetters[i].style.color = "red";
            setTimeout(function(){
               allLetters.style.color = "";
            }, 3000);
         }
      }
   });

   document.getElementById("showSolution").addEventHandler("click", function(){
      for(var i = 0; i < allLetters.length; i++){
         allLetters[i] = allLetters[i].dataset.letter;
      }
   })
}

function formatPuzzle(puzzleLetter) {
   currentLetter.value = puzzleLetter;
   for(var i = 0; i < allLetters.length; i++){
      allLetters[i].style.backgroundColor = "";
   };

   acrossClue.style.color = "";
   downClue.style.color = "";

   if(currentLetter.dataset.clueA !== undefined){
      acrossClue = document.getElementById(currentLetter.dataset.clueA);
      acrossClue.style.color = "blue";
      wordLetters = document.querySelectorAll("[data-clue-A = " + currentLetter.dataset.clueA + "]");
      wordLetters.style.backgroundColor = "rgb(231, 231, 255)";
   };
   if(currentLetter.dataset.clueD !== undefined){
      downClue = document.getElementById(currentLetter.dataset.clueD);
      downClue.style.color = "red";
      wordLetters = document.querySelectorAll("[data-clue-D = " + dataset.clueD + "]");
      wordLetters.style.backgroundColor = "rgb(255, 231, 231)";
   };
   if(typeDirection === "right"){
      currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
   } else {
      currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
   };
}

function selectLetter(e){
   var leftLetter = currentLetter.dataset.left;
   var upLetter = currentLetter.dataset.up;
   var rightLetter = currentLetter.dataset.right;
   var downLetter = currentLetter.dataset.down;
   var userKey = currentLetter.keyCode;

   if(userKey === 37){
      formatPuzzle(leftLetter);
   } else if (userKey === 38){
      formatPuzzle(upLetter);
   } else if (userKey === 39 || userKey === 9){
      formatPuzzle(rightLetter);
   } else if (userKey === 40 || userKey === 13){
      formatPuzzle(downLetter);
   } else if (userKey === 8 || userKey == 46){
      currentLetter = "";
   } else if (userKey === 32) {
      switchTypeDirection();
   } else if (keyCode >= 65 && keyCode <=90) {
      currentLetter.textContent = getChar(userKey);
      if(typeDirection === "right"){
         formatPuzzle(rightLetter);
      } else {
         formatPuzzle(downLetter);
      }
   }
   e.preventDefault();
}

function switchTypeDirection() {
   var typeImage = document.getElementById("directionImg");
   if (typeDirection === "right"){
      typeDirection = "down";
      typeImage.src = "pc_right.png";
      currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
   } else {
      typeDirection = "right";
      typeImage.src = "pc_down.png";
      currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
   }
}
/*====================================================*/

function getChar(keyNum) {
   return String.fromCharCode(keyNum);
}
