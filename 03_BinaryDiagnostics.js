/*
Day 3: Binary Diagnostic
https://adventofcode.com/2021/day/3
*/

console.clear();
let test = [ "00100", "11110", "10110", "10111", "10101", "01111", "00111", "11100", "10000", "11001", "00010", "01010" ];


function frequencyAtBitPosition(bitPosition, arrayToCheck, material) {
  let index = 0;
  let freqOfOne = 0;
  let freqOfZero = 0;
  let preference;
  if (material == "oxygen") {
    preference = 1;
  }
  else if (material == "co2") {
    preference = 0;
  }

  while (index < arrayToCheck.length) {
    if (arrayToCheck[index][bitPosition] == 1) {
      freqOfOne++;
    } else {
      freqOfZero++
    }
    index++;
  }
  let moreCommon = (freqOfOne > freqOfZero) ? 1 : 0;
  let lessCommon = (freqOfOne < freqOfZero) ? 1 : 0;
  
  return freqOfOne == freqOfZero ? preference
       : material == "oxygen" ? moreCommon
       : material == "co2" ? lessCommon
       : moreCommon // This final "else" defaults for the first part of the challenge
}


function arrayReducer(arrayToReduce, material, bitPosition) {
  if (bitPosition == undefined) {
    bitPosition = 0;
  }
  let newArr = [];
  let bitValue = frequencyAtBitPosition(bitPosition, arrayToReduce, material);

  let i = 0;
  while (i < arrayToReduce.length) {
    if (arrayToReduce[i][bitPosition] == bitValue) {
      newArr.push(arrayToReduce[i]);
    }
    i++;
  }
  if (bitPosition == newArr[0].length) {
    return newArr;
  }
  if (newArr.length !== 1) {
    newArr = arrayReducer(newArr, material, bitPosition+1);
  }
  return newArr;
}


function binaryDiagnostic(array) {
  let gamma = "";
  let epsilon = "";

  // PART 1 - gamma, epsilon
  let column = 0;
  while (column < array[0].length) {
    let freqAtPos = frequencyAtBitPosition(column, array);
    if (freqAtPos == 1) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
    column++;
  }
  gamma = parseInt(gamma, 2);
  epsilon = parseInt(epsilon, 2);
  
  // PART 2 - oxygen, CO2
  let oxygen = parseInt(arrayReducer(array, "oxygen"), 2);
  let co2 = parseInt(arrayReducer(array, "co2"), 2);

  return [ gamma, epsilon, oxygen, co2 ];
}


fetch("data/03.txt")
.then(response => response.text())
.then(data => {
  let dataArray = data.split("\r\n");
  let result = binaryDiagnostic(dataArray);

  // A = Gamma * Epsilon
  console.log("Gamma: " + result[0] + " Epsilon: " + result[1]);
  console.log("A = " + result[0] * result[1]);

  // B = Oxygen * CO2
  console.log("Oxygen: " + result[2] + " CO2: " + result[3]);
  console.log("B = " + result[2] * result[3]);
});