# ThreeJS_game

This game is a 3D cube clicking game where the player's goal is to click on a randomly moving cube as many times as possible.

* The game website: https://cube.ryxwaer.com/

The game is built using JavaScript, HTML, and CSS. The player interacts with the game through a menu bar that is located at the top of the screen. The menu bar contains the following elements:

- Score: This field displays the player's current score. The score increases by 1 point for every successful click on the cube, and decreases by a set penalty value for every miss.
- Time elapsed: Displays the amount of time that has passed since the start of the game. This field updates in real-time, allowing players to keep track of their progress and measure their performance over the course of the game.
- Settings: This button opens a settings menu where the player can adjust the game's settings:
  - Dificulty level: Value of this filed affects speed of the game. As the value increases cube will spin and shrink faster.
  - X, Y, Z: These fields display the current x, y, and z coordinates of the cube.
  - Free play: This checkbox allows the player to toggle free play mode on or off. In free play mode, the score does not decrease for misses.

The game also has a 3D cube that is rendered using the Three.js library. The cube's color and position are randomly generated each time it is clicked. The cube can be clicked on by using the mouse to aim and left-clicking on the cube.

A popup is also present in the middle of the screen, it can be closed by clicking on the "X" icon on the top right corner. The popup contains fields showing the player score and input field to type player name.

Overall, this game provides a fun and engaging experience for players as they try to click on the randomly moving cube as many times as possible while also providing a simple and intuitive interface for adjusting game settings.
