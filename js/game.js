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
        child.textContent = j + 1;
        arrayOfIconedCircles.push(child);
      }
    }
  } else {
    for (let i = 1; i <= 2; i++) {
      for (let j = 0; j < size / 2; j++) {
        const child = arrayOfCircles[j].cloneNode(true);
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

  arrayOfIconedCircles.forEach((element) => {
    parent.appendChild(element);
  });

  wrapper.appendChild(parent);
  const circles = document.querySelectorAll(".circle-for-6");
  circles.forEach((circle) => {
    console.log(circle);
    circle.textContent = "";
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
