/*
Day 1: Sonar Sweep
https://adventofcode.com/2021/day/1
*/

console.clear();
let test = [ 199,200,208,210,200,207,240,269,260,263 ];

// A
function sonarSweepA(array) {
  let counter = 0;
  let i = 0;

  while(i < array.length) {
    if (array[i+1] > array[i]) {
      counter++;
    }
    i++;
  }
  return counter;
}

// B
function sonarSweepB(array) {
  let counter = 0;
  let threes = [];

  let i = 0;
  while(i < array.length-2) {
    threes.push(array[i]+array[i+1]+array[i+2]);
    i++;
  }

  i = 1;
  while(i < threes.length) {
    if (threes[i] > threes[i-1]) {
      counter++;
    }
    i++;
  }

  return counter;
}

fetch("data/01.txt")
.then(response => response.text())
.then(data => {
  let dataArray = data.split("\r\n");
  let i = 0;
  while (i < dataArray.length) {
    dataArray[i] = Number(dataArray[i]);
    i++;
  }
  
  let increasedCountA = sonarSweepA(dataArray)
  console.log("Count of increasing values: " + increasedCountA);

  let increasedCountB = sonarSweepB(dataArray)
  console.log("3-sliding window increase: " + increasedCountB);
});