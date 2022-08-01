const body = document.querySelector('body');
let stopDraw = true;
makeSketchPad();
//on mouse up turns drawing off stopDraw = true
window.addEventListener('mouseup', stopDrawing)

const sizeBttn = document.querySelector('.sizeBttn');
sizeBttn.addEventListener('click', resize);
const rainbowBttn = document.querySelector('#rainbow');
rainbowBttn.addEventListener('click', rainbowButton);






function resize(e) {
   let boxSize = +prompt("enter new resolution (max 100)");
   if(isNaN(boxSize) || boxSize > 100 || boxSize < 0 || !boxSize){
    return alert("invalid input, please enter a number between 0-100");
   }
   const sketch1 = document.querySelector('.sketch');
   sketch1.remove();
   makeSketchPad(boxSize);
  
}

function makeSketchPad(boxSize = 16) {
  const newSketch = document.createElement('div');
  newSketch.classList.add('sketch');
  
  for(let i = 0; i < boxSize; i++){
    const row = document.createElement('div');
    row.classList.add('row');
    for(let j = 0; j < boxSize; j++){
      const column = document.createElement('div');
      column.classList.add('column');
      row.appendChild(column);
    }
    newSketch.appendChild(row);
  }
  const rainbowBttn = document.querySelector('#rainbow');
  body.insertBefore(newSketch, rainbowBttn);  
//adds drawing function
  draw();
  if(body.classList.contains('rainbow')){
    const pixels = document.querySelectorAll('.column'); 
    pixels.forEach(function(pixel){
      pixel.removeEventListener('mouseover', addBlack);
      pixel.removeEventListener('mousedown', addBlack);
      pixel.addEventListener('mouseover', rainbow);
      pixel.addEventListener('mousedown', rainbow);
  });
  }
}

function draw(){
  const pixels = document.querySelectorAll('.column');
  pixels.forEach(function(pixel){
  //allows drawing on mouse down of a drawing element
  pixel.addEventListener('mousedown', startDraw);
  pixel.addEventListener('mouseover', addBlack);
  pixel.addEventListener('mousedown', addBlack);
  });
  }

function stopDrawing(){
  stopDraw = true;
  }

  function startDraw(){stopDraw = false}

function addBlack(e) {
  if (!stopDraw)
  {this.style.cssText = 'background-color: rgb(0, 0, 0)';}
}

function rainbow(e) {
if (!stopDraw){
  let currentColor = window.getComputedStyle(this).getPropertyValue('background-color');
  console.log(currentColor);
  
 if(currentColor === 'rgb(0, 0, 0)'){}

 else if (currentColor === 'rgb(255, 255, 255)'){
  this.style.cssText = `background-color: rgb(${Math.floor(Math.random()*256)},
   ${Math.floor(Math.random()*256)},
    ${Math.floor(Math.random()*256)})`;
    const newColor = window.getComputedStyle(this).getPropertyValue('background-color')
    this.setAttribute('count', '0');
    let colorValues = newColor.slice(+newColor.indexOf('(') + 1, -1).split(",");
    console.log(colorValues)
    for(let i = 0; i < colorValues.length; i++){
      this.setAttribute(`data-${i}`, `${colorValues[i]}`);
    }
  }
  else{
    let colorValues = currentColor.slice(+currentColor.indexOf('(') + 1, -1).split(",");
    for(let i = 0; i < colorValues.length; i++){
      colorValues[i] -= this.getAttribute(`data-${i}`) * 0.1;
    }
    this.style.cssText = `background-color: rgb(${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]})`;
  }
}
}

function rainbowButton(){
  const sketch = document.querySelector('body')
  const pixels = document.querySelectorAll('.column');

  if(!sketch.classList.contains('rainbow')){
    console.log("asdfd")
  sketch.classList.add('rainbow');
  pixels.forEach(function(pixel){
    pixel.removeEventListener('mouseover', addBlack);
    pixel.removeEventListener('mousedown', addBlack);
    pixel.addEventListener('mouseover', rainbow);
    pixel.addEventListener('mousedown', rainbow);
  });
  }

  else {
    sketch.classList.remove('rainbow');
    pixels.forEach(function(pixel){
      pixel.removeEventListener('mouseover', rainbow);
      pixel.removeEventListener('mousedown', rainbow);
      pixel.addEventListener('mouseover', addBlack);
      pixel.addEventListener('mousedown', addBlack);
  });
  }
}

