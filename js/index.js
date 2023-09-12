const theme = document.querySelectorAll(".theme");
const numbers = document.querySelectorAll(".number");
const gridSize = document.querySelectorAll(".grid-size");

////////////////////////////////////////////

///////////////////////////////////////////

let objOfPlayers = { Theme: "Numbers", Players: "1", Size: "4x4" };
localStorage.setItem("description", JSON.stringify(objOfPlayers));

function takeMeaningFromBoxesAndChangeColor(e) {
  let words =
    e.currentTarget.parentElement.previousElementSibling.innerHTML.split(" ");
  lastWord = words[words.length - 1];
  let meaning = e.currentTarget.innerHTML;

  objOfPlayers[lastWord] = meaning;
  localStorage.setItem("description", JSON.stringify(objOfPlayers));

  let siblings = Array.from(e.currentTarget.parentElement.children);
  siblings.forEach((element) => {
    element.style.background = "#BCCED9";
  });

  e.currentTarget.style.background = "#304859";
}

///////////////////////////////////////

//////////////////////////////////////

theme.forEach((element) => {
  element.addEventListener("click", takeMeaningFromBoxesAndChangeColor);
});

numbers.forEach((element) => {
  element.addEventListener("click", takeMeaningFromBoxesAndChangeColor);
});

gridSize.forEach((element) => {
  element.addEventListener("click", takeMeaningFromBoxesAndChangeColor);
});
