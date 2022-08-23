// Control speed of the Game of Life. (Checkout framerate, you can use slider to control the framerate )   ********
// Allow users to change the rules of survival.
// Allow users to change the rules of reproduction.
// Start/Stop the Game of life
// Multiple colors of life on the same board.
// Darken colors for stable life.
// Random initial states
// Well-known patterns of Game of Life to select from(Examples:Gosper Glider Gun, Glider, Lightweight train).
// Use Keyboard to control the cursor to place the life
// Resize board on windows resize(Check out windowsResized)
// Switching between different styles.
// Anything else that you could think of.

const unitLength = 20;
const boxColor = 150;
const strokeColor = 50;
let columns; /* To be determined by window width */
let rows; /* To be determined by window height */
let currentBoard;
let nextBoard;
let changeMode = false;
let autoMove = false;
let ele;
let button;
let slider;
let start = false;
let rand1 = 255;
let rand2 = 255;
let rand3 = 255;
const ROOT_PATH = "http://127.0.0.1:5500/Module%201%20project/logospics/";
let bg;
let bgList = [
  "./gamepics/samoyed-1-645mk070111.jpeg",
  "./gamepics/Pomeranian_Featured-Image.webp",
  "./gamepics/MQ3AMCFZ6RGXRKPZXW56IAXGYI.jpeg",
  "./gamepics/nature-3082832_1280.jpeg",
  "./gamepics/wallpaper2you_129858.jpeg",
  "./gamepics/wallpaper2you_129860.jpeg",
  "./gamepics/YUS4V2QJWRCJZJDIPX4Q7BJNDQ.jpeg",
  "./gamepics/dog_samoyed_desktop.webp",
  "./gamepics/Samoyed-FeaturedImage.webp",
  "./gamepics/istockphoto-674293178-612x612.jpeg",
  "./gamepics/Poodle-Canis-familiaris-Toy-Poodle.jpeg",
  "./gamepics/布偶貓-930x620.jpeg",
  "./gamepics/20170303_LI_布偶貓.png",
  "./gamepics/11c214ecb50c8c.png",
  "./gamepics/18d9e601c9c24a91a95d166d2752ad4d.jpeg",
  "./gamepics/59bf0bafc44dd.jpeg",
  // "https://shadergif.com/gifs/dbs5NZNhf0fihJtO2018-12-12-03h20m.gif",
];
//console.log(`${ROOT_PATH}${bgList[0]}`);
// let playerX = 0;
// let playerY = 0;
let textArea = document.querySelector("#textInput");
let gamesubmit = document.querySelector("#gameSubmit");
let result = document.querySelector("#result");
let bgNum;
let changePattern = false;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// let sound = document.querySelector("#sound");
// window.addEventListener("load", function (event) {
//   sound.currentTime = 0;
//   sound.play();
// });

function setup() {
  /* Set the canvas to be under the element #canvas*/

  const canvas = createCanvas(windowWidth - 155, windowHeight - 100);
  canvas.parent(document.querySelector("#canvas"));

  /*Calculate the number of columns and rows */
  columns = floor((displayWidth - 40) / unitLength);
  rows = floor((displayHeight - 20) / unitLength);

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [random(0, 1)];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }
  // Now both currentBoard and nextBoard are array of array of undefined values.
  init(); // Set the initial values of the currentBoard and nextBoard
}

/**
 * Initialize/reset the board state
 */
function init() {
  //For run and stop
  //loop();

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = 0;
      nextBoard[i][j] = 0;
    }
  }
  currentBoard[0][0] = 100;
}
function initrandom() {
  loop();
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = random() > 0.8 ? 1 : 0;
      nextBoard[i][j] = 0;
    }
  }

  currentBoard[0][0] = 100;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function draw() {
  background(bg || 230);

  // background(255);

  generate();
  // for (let i = 0; i < columns; i++) {
  //   for (let j = 0; j < rows; j++) {
  //     if (changeMode) {
  //     } else {
  //     }
  //   }
  // }

  if (changeMode) {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        // if (currentBoard[i][j] == 100) {
        //   fill(255, 0, 0);
        //   rect(i * unitLength, j * unitLength, unitLength, unitLength, 0);
        // if (currentBoard[i][j] == 1) {
        //   fill(255, 255, 255, 100);
        // } else if (currentBoard[i][j] == 2) {
        //   fill(255, 255, 255, 75);
        // } else if (currentBoard[i][j] == 3) {
        //   fill(255, 255, 255, 50);
        // } else if (currentBoard[i][j] == 4) {
        //   fill(255, 255, 255, 25);
        // } else if (currentBoard[i][j] == 0) {
        //   fill(255, 255, 255);
        //   // fill(175, 100, 220);
        // } else {
        //   fill(255, 255, 255, 0);
        // }

        switch (currentBoard[i][j]) {
          case 1:
            fill(255, 255, 255, 100);
            break;
          case 2:
            fill(255, 255, 255, 75);
            break;
          case 3:
            fill(255, 255, 255, 50);
            break;
          case 4:
            fill(255, 255, 255, 25);
            break;
          case 0:
            fill(255, 255, 255);
            break;
          default:
            fill(255, 255, 255, 0);
            break;
        }

        stroke(strokeColor);
        rect(i * unitLength, j * unitLength, unitLength, unitLength, 4);
      }
    }
  } /*if (!changeMode)*/ else {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        // if (currentBoard[i][j] == 100) {
        // fill(255, 0, 0);
        // rect(i * unitLength, j * unitLength, unitLength, unitLength, 0);
        if (currentBoard[i][j] == 1) {
          fill(random(150, 255), random(170, 255), random(170, 255));
        } else if (currentBoard[i][j] == 2) {
          fill(random(150, 200), random(150, 200), random(150, 200));
        } else if (currentBoard[i][j] == 3) {
          fill(random(120, 170), random(120, 170), random(120, 170));
        } else if (currentBoard[i][j] == 4) {
          fill(random(60, 150), random(60, 150), random(60, 150));
        } else if (currentBoard[i][j] == 0) {
          fill(255, 255, 255);
          // fill(175, 100, 220);
        } else {
          fill(random(0, 80), random(0, 80), random(0, 100));
        }

        stroke(strokeColor);
        rect(i * unitLength, j * unitLength, unitLength, unitLength, 10);
      }
    }
  }
}
let framerate1 = document.querySelector("#framerate");
slider = document.querySelector("#slider");
framerate1.innerHTML = `Framerate: ${slider.value}`;
slider.addEventListener("input", function () {
  framerate1.innerHTML = `Framerate: ${slider.value}`;
  frameRate(slider.valueAsNumber);
});

// // let buttons = document.querySelectorAll(".button")
// // for (let button of buttons) {
// //   button.addEventListener('click', closeModal)
// // }
// // function closeModal(event) {
// //   // close the modal
// //  if( event.target.classlist.contains("game")){

// }
// // }

// closeModal()
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function generate() {
  //Loop over every single box on the board
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // Count all living members in the Moore neighborhood(8 boxes surrounding)
      let neighbors = 0;
      for (let i of [-1, 0, 1]) {
        for (let j of [-1, 0, 1]) {
          if (i == 0 && j == 0) {
            // the cell itself is not its own neighbor
            continue;
          }
          // The modulo operator is crucial for wrapping on the edge
          if (
            currentBoard[(x + i + columns) % columns][(y + j + rows) % rows] > 0
          ) {
            neighbors += 1;
          }
          // neighbors +=
          //   currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
        }
      }

      let loneliness = loneNum.valueAsNumber || 2;
      let survival = surNum.valueAsNumber || 3;
      let reproduction = reproNum.valueAsNumber || 3;
      // Rules of Life
      // if (currentBoard[x][y] == 100) {
      //   nextBoard[x][y] = currentBoard[x][y];
      if (currentBoard[x][y] > 0 && neighbors < loneliness) {
        // Die of Loneliness
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] > 0 && neighbors > survival) {
        // Die of Overpopulation
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 0 && neighbors == reproduction) {
        // New life due to Reproduction
        nextBoard[x][y] = 1;
      } else {
        // Stasis
        if (currentBoard[x][y] == 0) {
          nextBoard[x][y] = currentBoard[x][y];
        } else {
          nextBoard[x][y] = currentBoard[x][y] + 1;
        }
      }
    }
  }

  // Swap the nextBoard to be the current Board
  [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

/**
 * When mouse is dragged
 */
function mouseDragged() {
  /**
   * If the mouse coordinate is outside the board
   */
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }
  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);
  currentBoard[x][y] = 1;
  fill(random(255), random(255), random(255));
  stroke(strokeColor);
  rect(x * unitLength, y * unitLength, unitLength, unitLength, 10);
}

/**
 * When mouse is pressed
 */
function mousePressed() {
  noLoop();
  mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
  // if (!autoMove) {
  //   noLoop();
  // } else if (autoMove) {
  //   loop();
  // }
  noLoop();
}

document.querySelector("#reset-game").addEventListener("click", function () {
  init();
  changeMode = false;
  bg = false;
  background(100);
  draw();
});

document.querySelector("#run").addEventListener("click", function (event) {
  // generate();
  loop();
});

document.querySelector("#stop").addEventListener("click", function (event) {
  // generate();
  noLoop();
});

const loneNum = document.querySelector("#loneliness");
const surNum = document.querySelector("#survival");
const reproNum = document.querySelector("#reproduction");

loneNum.addEventListener("change", function (event) {});

surNum.addEventListener("change", function (event) {});

reproNum.addEventListener("change", function (event) {});

document
  .querySelector("#background")
  .addEventListener("click", function (event) {
    bgNum = Math.floor(Math.random() * bgList.length);
    bg = loadImage(bgList[bgNum]);
    changeMode = true;
    // autoMove = true;
    //draw();

    //generate();
    loop(); //draw()
  });

gamesubmit.addEventListener("click", function (event) {
  if (bgNum == 0 || bgNum == 7 || bgNum == 8) {
    if (textArea.value == "samoyed") {
      bgNum = Math.floor(Math.random() * bgList.length);
      bg = loadImage(bgList[bgNum]);
      init();
      changeMode = true;
      alert("you are correct😆");
      draw();
      //generate();
      noLoop();
      result.innerHTML = "";
    } else {
      result.innerHTML = "you are Wrong😢";
      setInterval(function () {
        result.innerHTML = "";
      }, 2000);
    }
  } else if (bgNum == 1 || bgNum == 4 || bgNum == 5) {
    if (textArea.value == "pomeranian") {
      bgNum = Math.floor(Math.random() * bgList.length);
      bg = loadImage(bgList[bgNum]);
      init();
      changeMode = true;
      alert("you are correct😆");
      draw();
      //generate();
      noLoop();
      result.innerHTML = "";
    } else {
      result.innerHTML = "you are Wrong😢";
      setInterval(function () {
        result.innerHTML = "";
      }, 2000);
    }
  } else if (bgNum == 2 || bgNum == 6) {
    if (textArea.value == "shiba") {
      bgNum = Math.floor(Math.random() * bgList.length);
      bg = loadImage(bgList[bgNum]);
      init();
      changeMode = true;
      alert("you are correct😆");
      draw();
      //generate();
      noLoop();
      result.innerHTML = "";
    } else {
      result.innerHTML = "you are Wrong😢";
      setInterval(function () {
        result.innerHTML = "";
      }, 2000);
    }
  } else if (bgNum == 9 || bgNum == 10) {
    if (textArea.value == "poodle") {
      bgNum = Math.floor(Math.random() * bgList.length);
      bg = loadImage(bgList[bgNum]);
      init();
      changeMode = true;
      alert("you are correct😆");
      draw();
      //generate();
      noLoop();
      result.innerHTML = "";
    } else {
      result.innerHTML = "you are Wrong😢";
      setInterval(function () {
        result.innerHTML = "";
      }, 2000);
    }
  } else if (bgNum == 3) {
    if (textArea.value == "nature") {
      bgNum = Math.floor(Math.random() * bgList.length);
      bg = loadImage(bgList[bgNum]);
      init();
      changeMode = true;
      alert("you are correct😆");
      draw();
      //generate();
      noLoop();
      result.innerHTML = "";

      // result.innerHTML = "you are correct😆";
      // bgNum = Math.floor(Math.random() * bgList.length);
      // bg = loadImage(bgList[bgNum]);
      // changeMode = true;
      // draw();

      // generate();
      // noLoop();
    } else {
      result.innerHTML = "you are Wrong😢";
      setInterval(function () {
        result.innerHTML = "";
      }, 2000);
    }
  } else if (bgNum == 11 || bgNum == 12 || bgNum == 13) {
    if (textArea.value == "ragdoll") {
      bgNum = Math.floor(Math.random() * bgList.length);
      bg = loadImage(bgList[bgNum]);
      init();
      changeMode = true;
      alert("you are correct😆");
      draw();
      //generate();
      noLoop();
      result.innerHTML = "";
    } else {
      result.innerHTML = "you are Wrong😢";
      setInterval(function () {
        result.innerHTML = "";
      }, 2000);
    }
  } else if (bgNum == 14 || bgNum == 15) {
    if (textArea.value == "american shorthair") {
      bgNum = Math.floor(Math.random() * bgList.length);
      bg = loadImage(bgList[bgNum]);
      init();
      changeMode = true;
      alert("you are correct😆");
      draw();
      //generate();
      noLoop();
      result.innerHTML = "";
    } else {
      result.innerHTML = "you are Wrong😢";
      setInterval(function () {
        result.innerHTML = "";
      }, 2000);
    }
  }
});

document.querySelector("#random").addEventListener("click", function (event) {
  // Now both currentBoard and nextBoard are array of array of undefined values.
  initrandom(); // Set the initial values of the currentBoard and nextBoard
  draw();

  //generate();
  noLoop();
});

document.querySelector("#constant").addEventListener("click", function (event) {
  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [random(0, 1)];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }

  //loop();
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = 0;
      nextBoard[i][j] = 0;
    }
  }

  if (changePattern) {
    currentBoard[8][15] = 1;
    currentBoard[8][16] = 1;
    currentBoard[9][15] = 1;
    currentBoard[9][16] = 1;
    currentBoard[42][13] = 1;
    currentBoard[42][14] = 1;
    currentBoard[43][13] = 1;
    currentBoard[43][14] = 1;
    currentBoard[18][15] = 1;
    currentBoard[18][16] = 1;
    currentBoard[18][17] = 1;
    currentBoard[19][14] = 1;
    currentBoard[19][18] = 1;
    currentBoard[20][13] = 1;
    currentBoard[20][19] = 1;
    currentBoard[21][13] = 1;
    currentBoard[21][19] = 1;
    currentBoard[22][16] = 1;
    currentBoard[23][14] = 1;
    currentBoard[23][18] = 1;
    currentBoard[24][15] = 1;
    currentBoard[24][16] = 1;
    currentBoard[24][17] = 1;
    currentBoard[25][16] = 1;
    currentBoard[28][13] = 1;
    currentBoard[28][14] = 1;
    currentBoard[28][15] = 1;
    currentBoard[29][13] = 1;
    currentBoard[29][14] = 1;
    currentBoard[29][15] = 1;
    currentBoard[30][12] = 1;
    currentBoard[30][16] = 1;
    currentBoard[32][12] = 1;
    currentBoard[32][16] = 1;
    currentBoard[32][11] = 1;
    currentBoard[32][17] = 1;
  } else if (!changePattern) {
    //16 oscillator
    const x = 34;
    const y = 11;
    currentBoard[x][y] = 1;
    currentBoard[x + 1][y - 1] = 1;
    currentBoard[x + 2][y - 1] = 1;
    currentBoard[x + 3][y - 1] = 1;
    currentBoard[x + 4][y - 1] = 1;
    currentBoard[x + 4][y] = 1;
    currentBoard[x + 4][y + 1] = 1;
    currentBoard[x + 3][y + 1] = 1;
    currentBoard[x + 2][y + 2] = 1;
    currentBoard[x + 1][y + 2] = 1;
    currentBoard[x][y + 2] = 1;

    currentBoard[x + 7][y + 1] = 1;
    currentBoard[x + 9][y + 1] = 1;
    currentBoard[x + 7][y + 2] = 1;
    currentBoard[x + 10][y + 2] = 1;
    currentBoard[x + 7][y + 3] = 1;
    currentBoard[x + 10][y + 3] = 1;
    currentBoard[x + 8][y + 4] = 1;
    currentBoard[x + 10][y + 4] = 1;
    currentBoard[x + 8][y + 5] = 1;
    currentBoard[x + 9][y + 5] = 1;
    currentBoard[x + 10][y + 5] = 1;

    currentBoard[x - 2][y + 5] = 1;
    currentBoard[x - 1][y + 5] = 1;
    currentBoard[x][y + 5] = 1;
    currentBoard[x - 2][y + 6] = 1;
    currentBoard[x][y + 6] = 1;
    currentBoard[x - 2][y + 7] = 1;
    currentBoard[x + 1][y + 7] = 1;
    currentBoard[x - 2][y + 8] = 1;
    currentBoard[x + 1][y + 8] = 1;
    currentBoard[x - 1][y + 9] = 1;
    currentBoard[x + 1][y + 9] = 1;

    currentBoard[x + 6][y + 8] = 1;
    currentBoard[x + 7][y + 8] = 1;
    currentBoard[x + 8][y + 8] = 1;
    currentBoard[x + 5][y + 9] = 1;
    currentBoard[x + 4][y + 9] = 1;
    currentBoard[x + 4][y + 10] = 1;
    currentBoard[x + 8][y + 10] = 1;
    currentBoard[x + 4][y + 11] = 1;
    currentBoard[x + 5][y + 11] = 1;
    currentBoard[x + 6][y + 11] = 1;
    currentBoard[x + 7][y + 11] = 1;
  }
  changePattern = !changePattern;

  generate();
  noLoop();
  draw();
});

function windowResized() {
  resizeCanvas(windowWidth - 155, windowHeight - 100);
  //TODO?
  //unitLength = ??
}

document.querySelector("#mode").addEventListener("click", function (event) {
  changeMode = !changeMode;
  // autoMove = true;
  //draw();
  loop();
});

// gamesubmit.addEventListener("click", function (event) {
//   if (bgNum == 0 || bgNum == 7 || bgNum == 8) {
//     if (textArea.value == "samoyed") {
//       result.innerHTML == "You are correct!!!";
//     }
//   }
// });

// function keyPressed() {
//   switch (keyCode) {
//     case UP_ARROW:
//       currentBoard[playerX][playerY] = 0;
//       playerY = (playerY - 1 + rows) % rows;
//       currentBoard[playerX][playerY] = 100;
//       draw();
//       loop();
//       break;

//     case DOWN_ARROW:
//       currentBoard[playerX][playerY] = 0;
//       playerY = (playerY + 1 + rows) % rows;
//       currentBoard[playerX][playerY] = 100;
//       draw();
//       loop();
//       break;

//     case LEFT_ARROW:
//       currentBoard[playerX][playerY] = 0;
//       playerX = (playerX - 1 + columns) % columns;
//       currentBoard[playerX][playerY] = 100;
//       draw();
//       loop();

//       break;
//     case RIGHT_ARROW:
//       currentBoard[playerX][playerY] = 0;
//       playerX = (playerX + 1 + columns) % columns;
//       currentBoard[playerX][playerY] = 100;
//       draw();
//       loop();

//       break;
//     default:
//       break;
//   }
// }
