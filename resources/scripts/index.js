const container = document.querySelector(".sketchContainer");
const submitButton = document.querySelector("#submit");
const  clearButton = document.querySelector("#clear");
const rainbowButton = document.querySelectorAll(".btn");
let colorSelection = "default";

function drawGrid(gridSize = 16) {
  let grids = gridSize ** 2;
  for (let i = 0; i < grids; i++) {
    const div = document.createElement("div");
    div.classList.add("empty-grid", "grid");
    div.setAttribute("data-color", "64");
    container.appendChild(div);
  }

  container.setAttribute(
    "style",
    `grid-template-rows: repeat(${gridSize}, 1fr);
                            grid-template-columns: repeat(${gridSize}, 1fr);`
  );
}

function clearAndDrawGrid(e) {
  let newGridSize = Math.sqrt(container.childElementCount);
  if (e.target.id === 'clear') {
  } else {
    let newGridSize = +document.querySelector('#grid-number').value;
  }

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  if (isNaN(newGridSize) || newGridSize === 0) {
    alert("Not a number! try again!");
  } else if (newGridSize > 100) {
    alert("To Big! Try a number less than 100");
  } else {
    console.log(newGridSize);
    drawGrid(newGridSize);
  }
}

function handleColor(e) {
  console.log(this.name);
  const name = this.name || "";
  if (name === "pen-color-rainbow") {
    //      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    // may have to apply directly to node because the class will overwrite all?
    //document.documentElement.style.setProperty('--fill-color', `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`)
    colorSelection = "rainbow";
  } else if (name === "pen-color-pencil") {
    colorSelection = "shader";
  }
}

function addGridColor(e) {
  if (!Array.from(e.target.classList).includes("grid")) {
    return;
  } else {
    if (colorSelection === "default") {
      //e.target.classList.add('filled-grid');
      e.target.style.backgroundColor = "rgb(64, 66, 68)";
    } else if (colorSelection == "rainbow") {
      e.target.style.backgroundColor = `rgb(
                ${randomColor()},
                ${randomColor()},
                ${randomColor()})`;
    } else if (colorSelection == "shader") {
      let rgbColor = e.target.dataset.color;
      e.target.style.backgroundColor = `rgb(${rgbColor},${rgbColor},${rgbColor})`;
      if (rgbColor >= 0) {
        e.target.setAttribute("data-color", (rgbColor -= 7));
      }
    }
  }
}

function randomColor() {
  return Math.floor(Math.random() * 255 + 1);
}

container.addEventListener("load", drawGrid());
submitButton.addEventListener("click", clearAndDrawGrid);
clearButton.addEventListener("click", clearAndDrawGrid);
container.addEventListener("mouseover", addGridColor);
rainbowButton.forEach((button) =>
  button.addEventListener("click", handleColor)
);

//grids = document.querySelectorAll('.container > div');
//grids.forEach(grid => grid.addEventListener('mouseover', addGridColor));
// buttons.forEach(button => button.addEventListener('click', anon ));
