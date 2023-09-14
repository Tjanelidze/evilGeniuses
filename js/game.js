const wrapper = document.querySelector(".circles-parent-wrapper");
const footer = document.querySelector(".player-footer");
const timeAndMoves = document.querySelectorAll(".timer-moves-container");
const mobileMenu = document.querySelector(".menu");
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
      child.style.opacity = "0";
    });
  });
}

displayCircles();

//////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////

if (gameDescription.Players > 1) {
  for (let i = 0; i < gameDescription.Players; i++) {
    let player = document.createElement("div");
    player.classList.add("player");

    player.innerHTML = `
    <p class="player1">P<span class="layer">layer</span>1</p>
    <span class="score">0</span>`;

    if (gameDescription.Players == 2) {
      footer.style.justifyContent = "center";
    }
    footer.appendChild(player);
  }
} else {
  timeAndMoves.forEach((element) => {
    element.style.display = "flex";
    footer.style.justifyContent = "center";
  });
}

mobileMenu.addEventListener("click", () => {
  body.classList.add("bluredFromMenu");
});

//////////////////////////////

/////////////////////////////////
const timerDisplay = document.querySelector(".timer");

let seconds = 0;
let minutes = 0;

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
let timerInterval;

const circles = body.querySelectorAll(".circle-for-4, .circle-for-6");
let chosenToCancel = [];
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
    console.log(e.currentTarget);
    e.currentTarget.style.background = "#FDA214";
    e.currentTarget.children[0].style.transform = "rotate(0)";
    e.currentTarget.children[0].style.opacity = "100%";
    e.currentTarget.children[0].style.transition = "all 0.3s ease-in";

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

        chosenToCancel.length = 0;
      } else {
        chosenToCancel.forEach((element) => {
          circles.forEach((element) => {
            element.classList.add("unclickable");
          });
          setTimeout(() => {
            element.style.background = "#304859";
            element.children[0].style.opacity = "0";
            circles.forEach((element) => {
              element.classList.remove("unclickable");
            });
          }, 800);
        });
        chosenToCancel.length = 0;
      }
    }
  });
});
