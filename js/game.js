const wrapper = document.querySelector(".circles-parent-wrapper");
const footer = document.querySelector(".player-footer");
const timeAndMoves = document.querySelectorAll(".timer-moves-container");
const mobileMenu = document.querySelector(".menu");
const timerDisplay = document.querySelector(".timer");
const movesDisplay = document.querySelector(".moves");
const resume = document.querySelector(".resume");
const result = document.querySelector(".result");
const menuParent = document.querySelector(".menu-parent");
const restartGameFromResults = document.querySelectorAll(".restart_game");
const setupNewGameFromResults = document.querySelectorAll(".setup_new_game");
const boxTime = document.querySelector(".box_time ");
const boxScore = document.querySelector(".box_score");
const playersWrapper = document.querySelector(".players-wrapper");
const body = document.body;

let arrayofIcons = [
  "balance",
  "brain",
  "chess",
  "gamepad",
  "gem",
  "globe",
  "graduation",
  "grin",
  "gym",
  "hand",
  "palette",
  "paw",
  "physics",
  "poo",
  "rugby",
  "snowboarding",
  "toilet",
  "tree",
];

let gameDescription = JSON.parse(localStorage.getItem("description"));

function displayCircles() {
  let size = gameDescription.Size[0] * gameDescription.Size[2];
  let arrayOfCircles = [];
  let parent = document.createElement("div");

  if (size == 16) {
    parent.classList.add("circle_container-for-4");

    for (let i = 1; i <= size; i++) {
      let child = document.createElement("div");
      child.classList.add("circle-for-4");
      arrayOfCircles.push(child);
    }
  } else {
    parent.classList.add("circle_container-for-6");
    for (let i = 1; i <= size; i++) {
      let child = document.createElement("div");
      child.classList.add("circle-for-6");
      arrayOfCircles.push(child);
    }
  }

  let arrayOfIconedCircles = [];

  if (gameDescription.Theme == "Numbers") {
    for (let i = 1; i <= 2; i++) {
      for (let j = 0; j < size / 2; j++) {
        const child = arrayOfCircles[j].cloneNode(true);
        child.classList.add(`${arrayofIcons[j]}`);
        const paragraph = document.createElement("p");
        paragraph.innerHTML = j + 1;
        child.appendChild(paragraph);
        arrayOfIconedCircles.push(child);
      }
    }
  } else {
    for (let i = 1; i <= 2; i++) {
      for (let j = 0; j < size / 2; j++) {
        const child = arrayOfCircles[j].cloneNode(true);
        child.classList.add(`${arrayofIcons[j]}`);
        let image = document.createElement("img");
        image.src = `../assets/memory-icons/${arrayofIcons[j]}.png`;
        image.classList.add("icon-for-circles");
        child.appendChild(image);
        arrayOfIconedCircles.push(child);
      }
    }
  }

  for (let i = arrayOfIconedCircles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayOfIconedCircles[i], arrayOfIconedCircles[j]] = [
      arrayOfIconedCircles[j],
      arrayOfIconedCircles[i],
    ];
  }

  arrayOfIconedCircles.forEach((circle) => {
    circle.children[0].style.transform = "rotate(90deg)";
    parent.appendChild(circle);
  });

  wrapper.appendChild(parent);

  const circles = parent.querySelectorAll(".circle-for-4, .circle-for-6");
  circles.forEach((circle) => {
    Array.from(circle.children).forEach((child) => {
      // child.style.opacity = "0";
      // child.style.visibility = "hidden";
    });
  });
}

displayCircles();

//////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////

if (gameDescription.Players > 1) {
  for (let i = 0; i < gameDescription.Players; i++) {
    const player = document.createElement("div");
    player.classList.add("player");

    player.innerHTML = `
    <p class="player1">P<span class="layer">layer</span> ${i + 1}</p>
    <span class="score">0</span>
    <p class="CURRENT-TURN">CURRENT TURN</p>
    <div class="arrow"></div>`;

    if (gameDescription.Players == 2) {
      playersWrapper.style.justifyContent = "center";
    }
    playersWrapper.appendChild(player);
    footer.appendChild(playersWrapper);
  }
} else {
  timeAndMoves.forEach((element) => {
    element.style.display = "flex";
    footer.style.justifyContent = "center";
    playersWrapper.style.width = "0px";
  });
}

//////////////////////////////
mobileMenu.addEventListener("click", () => {
  menuParent.classList.add("bluredFromMenu");

  clearInterval(timerInterval);
});

resume.addEventListener("click", () => {
  timerInterval = setInterval(updateTimer, 1000);
  menuParent.classList.remove("bluredFromMenu");
});

restartGameFromResults.forEach((element) => {
  element.addEventListener("click", () => {
    window.location.reload();
  });
});

setupNewGameFromResults.forEach((element) => {
  element.addEventListener("click", () => {
    window.history.back();
  });
});

/////////////////////////////

/////////////////////////////////
if (gameDescription.Players == 1) {
  let seconds = 0;
  let minutes = 0;
  let timerInterval;

  function updateTimer() {
    seconds++;

    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }

    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

    timerDisplay.textContent = `${displayMinutes}:${displaySeconds}`;
  }

  const circles = body.querySelectorAll(".circle-for-4, .circle-for-6");
  const chosenToCancel = [];
  let countOfSucces = 0;
  let moves = 0;
  circles.forEach((circle) => {
    circle.addEventListener("click", (e) => {
      if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
      }

      //////////////////////////////////////////////////

      if (e.currentTarget.classList.contains("disabled")) {
        return;
      }
      if (e.currentTarget.classList.contains("unclickable")) {
        return;
      }
      e.currentTarget.style.background = "#FDA214";
      e.currentTarget.children[0].style.transform = "rotate(0)";
      e.currentTarget.children[0].style.opacity = "100%";
      e.currentTarget.children[0].style.transition = "all 0.3s ease-in";
      e.currentTarget.children[0].style.visibility = "visible";
      if (chosenToCancel.indexOf(e.currentTarget) < 0) {
        chosenToCancel.push(e.currentTarget);
      }

      if (chosenToCancel.length === 2) {
        if (
          chosenToCancel[0].className.split(" ")[1] ==
          chosenToCancel[1].className.split(" ")[1]
        ) {
          const matchingCircles = document.querySelectorAll(
            `.${chosenToCancel[1].className.split(" ")[1]}`
          );

          circles.forEach((element) => {
            element.classList.add("unclickable");
          });

          setTimeout(() => {
            matchingCircles.forEach((circle) => {
              circle.style.background = "#BCCED9";
              circle.style.transition = "all 0.3s ease-out";
              circle.classList.add("disabled");
            });

            circles.forEach((element) => {
              element.classList.remove("unclickable");
            });
          }, 400);
          countOfSucces++;
          moves++;
          movesDisplay.innerHTML = moves;
          chosenToCancel.length = 0;
        } else {
          chosenToCancel.forEach((element) => {
            circles.forEach((element) => {
              element.classList.add("unclickable");
            });
            setTimeout(() => {
              element.style.background = "#304859";
              element.children[0].style.opacity = "0";
              element.children[0].style.visibility = "hidden";
              circles.forEach((element) => {
                element.classList.remove("unclickable");
              });
            }, 800);
          });

          moves++;
          movesDisplay.innerHTML = moves;
          chosenToCancel.length = 0;
        }
      }
    });
  });

  circles.forEach((circle) => {
    circle.addEventListener("click", () => {
      if (countOfSucces * 2 == circles.length) {
        setTimeout(() => {
          menuParent.classList.add("bluredFromMpresult");
          clearInterval(timerInterval);
          boxTime.innerHTML = timerDisplay.textContent;
          boxScore.innerHTML = movesDisplay.textContent;
        }, 700);
      }
    });
  });
} else {
  ////////////////////////////////////////////

  /////////////////////////////////////

  function goToNextPlayer() {
    playerBoxes.forEach((box) => {
      box.classList.remove("yellowBackground");
      box.children[1].style.color = "#304859";
      box.children[2].style.display = "none";
      box.children[3].style.display = "none";
    });
    playerBoxes[currentTurn].classList.add("yellowBackground");
    playerBoxes[currentTurn].children[1].style.color = "white";
    playerBoxes[currentTurn].children[2].style.display = "inline";
    playerBoxes[currentTurn].children[3].style.display = "inline";
  }

  let arrayOfPlayers = [];

  for (let i = 0; i < gameDescription.Players; i++) {
    arrayOfPlayers.push([`Player${i}`, 0]);
  }

  let currentTurn = 0;
  const playerBoxes = playersWrapper.childNodes;

  // console.log(arrayOfPlayers);

  playerBoxes[currentTurn].classList.add("yellowBackground");
  playerBoxes[currentTurn].children[1].style.color = "white";
  playerBoxes[currentTurn].children[2].style.display = "inline";
  playerBoxes[currentTurn].children[3].style.display = "inline";

  const circles = body.querySelectorAll(".circle-for-4, .circle-for-6");
  const chosenToCancel = [];

  let countOfSucces = 0;
  circles.forEach((circle) => {
    circle.addEventListener("click", (e) => {
      if (e.currentTarget.classList.contains("disabled")) {
        return;
      }
      if (e.currentTarget.classList.contains("unclickable")) {
        return;
      }
      e.currentTarget.style.background = "#FDA214";
      e.currentTarget.children[0].style.transform = "rotate(0)";
      e.currentTarget.children[0].style.opacity = "100%";
      e.currentTarget.children[0].style.transition = "all 0.3s ease-in";
      e.currentTarget.children[0].style.visibility = "visible";
      if (chosenToCancel.indexOf(e.currentTarget) < 0) {
        chosenToCancel.push(e.currentTarget);
      }

      if (chosenToCancel.length === 2) {
        if (
          chosenToCancel[0].className.split(" ")[1] ==
          chosenToCancel[1].className.split(" ")[1]
        ) {
          const matchingCircles = document.querySelectorAll(
            `.${chosenToCancel[1].className.split(" ")[1]}`
          );

          circles.forEach((element) => {
            element.classList.add("unclickable");
          });

          setTimeout(() => {
            matchingCircles.forEach((circle) => {
              circle.style.background = "#BCCED9";
              circle.style.transition = "all 0.3s ease-out";
              circle.classList.add("disabled");
            });

            circles.forEach((element) => {
              element.classList.remove("unclickable");
            });
          }, 400);

          countOfSucces++;

          let currentScore = parseInt(
            playerBoxes[currentTurn].children[1].textContent
          );
          currentScore += 1;
          playerBoxes[currentTurn].children[1].textContent = currentScore;

          currentTurn++;
          if (currentTurn >= arrayOfPlayers.length) {
            currentTurn = 0;
          }
          
          goToNextPlayer();

          chosenToCancel.length = 0;
        } else {
          chosenToCancel.forEach((element) => {
            circles.forEach((element) => {
              element.classList.add("unclickable");
            });
            setTimeout(() => {
              element.style.background = "#304859";
              element.children[0].style.opacity = "0";
              element.children[0].style.visibility = "hidden";
              circles.forEach((element) => {
                element.classList.remove("unclickable");
              });
            }, 800);
          });
          chosenToCancel.length = 0;

          currentTurn++;
          if (currentTurn >= arrayOfPlayers.length) {
            currentTurn = 0;
          }

          goToNextPlayer();
        }
      }
    });
  });

  circles.forEach((circle) => {
    circle.addEventListener("click", () => {
      if (countOfSucces * 2 == circles.length) {
        setTimeout(() => {
          menuParent.classList.add("bluredFromResult");
          let scoresArray = [];
          for (let i = 0; i < arrayOfPlayers.length; i++) {
            scoresArray.push(playerBoxes[i].childNodes[3].textContent);
            console.log(scoresArray);
          }
        }, 700);
      }
    });
  });
}
