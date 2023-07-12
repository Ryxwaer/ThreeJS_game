const settingsBtn = document.getElementById("settings-btn");
const menuBar = document.getElementById("menu-bar");

const missPenaltyInput = document.getElementById("miss-penalty-input");
const incrementBtn = document.querySelector(".increment");
const decrementBtn = document.querySelector(".decrement");

let missPenalty = 5;

missPenaltyInput.addEventListener("change", () => {
  missPenalty = missPenaltyInput.value;
});

incrementBtn.addEventListener("click", () => {
  missPenalty = missPenaltyInput.value = parseInt(missPenaltyInput.value) + 1;
});

decrementBtn.addEventListener("click", () => {
  missPenalty = missPenaltyInput.value = parseInt(missPenaltyInput.value) - 1;
});

settingsBtn.addEventListener("click", () => {
  menuBar.classList.toggle("menu-bar-active");
});

let startTime = Date.now();
let intervalID = 0;

function startTimeCount() {
  startTime = Date.now();
  intervalID = setInterval(function () {
    const elapsedTime = Date.now() - startTime;
    document.getElementById("time").innerHTML =
      " Time elapsed: " + (elapsedTime / 1000).toFixed(1) + "s";
  }, 100);
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let score = 0;
let dificultyLevel = 0;

const brightColors = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
];

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

const renderer = new THREE.WebGLRenderer();

// create a new raycaster
const raycaster = new THREE.Raycaster();

// Get the elements
const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");
const playerName = document.getElementById("player-name");

let freePlay = false;

function toggleFreePlay() {
  freePlay = !freePlay;
  changeScoreBy(-1 * score);
  dificultyLevel = 0;
  createNewCube();
}

// Close the popup when the X is clicked
closePopup.onclick = function () {
  popup.style.display = "none";
  changeScoreBy(-1 * score);
  dificultyLevel = 0;
  document.getElementById("total-spawned").innerHTML = dificultyLevel;
  createNewCube();
  clearInterval(intervalID);
  document.getElementById("time").innerHTML =
      " Time elapsed: 0.0s";
};

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);

scene.add(cube);
updateCoordinatesUI();

camera.position.z = 5;

// handle the click event on the canvas<li>Menu item 3</li>
document.addEventListener("mousedown", onDocumentMouseDown, false);

function onDocumentMouseDown(event) {
  const upperBar = document.getElementById("upper-bar");
  const upperBarHeight = upperBar.getBoundingClientRect().height;
  const menuBar = document.getElementById("menu-bar").getBoundingClientRect();

  // check if mouse is over UI
  if (
    event.clientY < upperBarHeight ||
    event.clientX < menuBar.left + menuBar.width
  ) {
    return;
  }

  const mouse = new THREE.Vector3();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -((event.clientY - upperBarHeight) / window.innerHeight) * 2 + 1;
  mouse.z = 0.5;

  // update the cube's matrixWorld property
  cube.updateMatrixWorld();

  // set the raycaster's origin and direction
  raycaster.set(
    camera.position,
    mouse.clone().unproject(camera).sub(camera.position).normalize()
  );

  // check for intersections
  const intersects = raycaster.intersectObject(cube);

  if (intersects.length > 0) {
    cubeClicked();
  } else {
    cubeMissed();
  }
}

function cubeClicked() {
  dificultyLevel++;
  document.getElementById("total-spawned").innerHTML = dificultyLevel;
  changeScoreBy(+1);
  createNewCube();
}

function cubeMissed() {
  if (freePlay) {
    changeScoreBy(-1 * missPenalty);
  } else if (dificultyLevel > 0 && popup.style.display != "block") {
    // Show player score
    const scoreDisplay = document.getElementById("score-display");
    scoreDisplay.innerHTML = score;
    const timeDisplay = document.getElementById("time-display");
    const elapsedTime = Date.now() - startTime;
    timeDisplay.innerHTML = (elapsedTime / 1000).toFixed(1) + "s";
    popup.style.display = "block";
  }
}

function createNewCube() {
  cube.scale.x = 1;
  cube.scale.y = 1;
  cube.scale.z = 1;
  cube.material.color.set(getRandomBrightColor());
  cube.position.x = Math.random() * 4 - 2;
  cube.position.y = Math.random() * 3 - 1.5;
  cube.position.z = Math.random() * 2;
  updateCoordinatesUI();
  
  if (dificultyLevel == 1) {
    startTimeCount();
    $("#title").hide();
  }
}

function changeScoreBy(value) {
  score = Math.max(score + value, 0); // prevent going into negative numbers
  document.getElementById("score").innerHTML = "Score: " + score;
}

function getRandomBrightColor() {
  const index = Math.floor(Math.random() * brightColors.length);
  return brightColors[index];
}

// infinite loop
const animate = function () {
  requestAnimationFrame(animate);

  let value = 0.01 + dificultyLevel / 1000;

  cube.rotation.x += value;
  cube.rotation.y += value;

  if (cube.scale.x > 0.01) {
    value /= 4;
    cube.scale.x -= value;
    cube.scale.y -= value;
    cube.scale.z -= value;
  } else {
    cubeMissed();
    createNewCube();
  }

  renderer.render(scene, camera);
};

function updateCoordinatesUI() {
  document.getElementById("x-coord").innerHTML =
    " " + cube.position.x.toFixed(2);
  document.getElementById("y-coord").innerHTML =
    " " + cube.position.y.toFixed(2);
  document.getElementById("z-coord").innerHTML =
    " " + cube.position.z.toFixed(2);
}

animate();
