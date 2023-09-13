const wrapper = document.querySelector(".circles-parent-wrapper");

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
console.log(gameDescription);

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


