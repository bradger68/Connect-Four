// tasks to do:
  // 1. ask players their names and assign their colors.
  // 2. make the buttons change to red or blue.
  // 3. create a function that changes the button colors when you click them.
  // 4. keep track of what color the next button is going to be.
  // 5. create a function that finds what the bottom-most available space in a column is.
  // 6. create a function that checks if someone won, including horizontally, vertically, and diagonally.
  // 7. check that the game is over; either the board is filled and no one won, or someone wins.
  // 8. create game logic.


// 1. Asking names.
var player1 = prompt("Player 1: What is your name? You will be blue.");
var player1Color = "rgb(56, 190, 247)";

var player2 = prompt("Player 2: What is your name? You will be red.");
var player2Color = "rgb(247, 81, 95)";

var game_on = true;
var table = $('table tr')

// function that reports a win.
// this function is not necessary and is just for convenience while debugging.
function reportWin(rowNum, colNum){
  console.log("You won starting at this row, column");
  console.log(rowNum);
  console.log(colNum);
}

// this one changes the color of the buttons.
function changeColor(rowIndex, colIndex, color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

// function that reports back current color of a particular button.
function returnColor(rowIndex, colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// this function will check the bottom-most gray button.
// this starts at the bottom row and moves up the column. That's just how it is I suppose.
// so this for loop starts at the bottom row and continues up until it gets
// to row 0 (row >-1) counting backwards by 1.
// the rgb 128 128 128 is trying to find the first gray button available.
function checkBottom(colIndex){
  var colorReport = returnColor(5, colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row, colIndex);
    if (colorReport === 'rgb(128, 128, 128)'){
      return row;
    }
  }
}

// this is a kind of color match function to see if someone won.
// so it is seeing if the colors match AND is making sure they aren't gray.
function colorMatchCheck(one, two, three, four){
  return (one === two && one === three && one === four && one!== 'rgb(128, 128, 128)' && one!== undefined);
}


// win checks. check horizontal, vertical, and diagonal.
// Check for Horizontal Wins
// returns true if it finds a horizontal win but does nothing if not true.
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        console.log('horiz');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vertical');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
// first for loop checks for diagonals with positive slopes.
// second for loop checks for diagonals with negative slopes.
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// now to create the game logic.
// this is the part that will tell the game to change things when you click on them.
// this starts with player 1.
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1+ " it is your turn. Pick a column to drop a chip in.")

$('button').on('click', function(){
  var col = $(this).closest('td').index();
  var bottomAvail = checkBottom(col);
  changeColor(bottomAvail, col, currentColor);
  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    $('h1').text(currentName + " wins!")
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
  }

  // if there is no win or tie
  currentPlayer = currentPlayer *-1;
  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName + ", it is your turn.")
    currentColor = player1Color;
  } else {
    currentName = player2;
    $('h3').text(currentName + ", it is your turn.")
    currentColor = player2Color;
  }
})
