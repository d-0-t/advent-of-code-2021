/*
Day 2: Dive!
https://adventofcode.com/2021/day/2
*/

console.clear();
let test = [ "forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2" ];

function movement(array) {
  let horizontal = 0;
  let depth = 0;            // Depth is the same as aim, so I won't make a new variable
  let depthWithAim = 0;

  let i = 0;
  while (i < array.length) {
    let direction = array[i].split(" ");
    direction[1] = Number(direction[1]);

    switch(direction[0]) {
      case "forward":
        horizontal += direction[1];
        depthWithAim += depth*direction[1];
        break;
      case "down": 
        depth += direction[1];
        break;
      case "up":
        depth -= direction[1];
        break;
      default: break;
    }
    i++;
  }
  return [ horizontal, depth, depthWithAim ];
}


fetch("data/02.txt")
.then(response => response.text())
.then(data => {
  let dataArray = data.split("\r\n");
  let result = movement(dataArray);
  console.log( "Horizontal: " + result[0] + ", Depth = Aim: " + result[1]);
  // A = Horizontal * Depth
  console.log( "A = " + result[0] * result[1] );
  // B = Horizontal * Depth corrected with aim
  console.log( "B = " + result[0] * result[2] );
});