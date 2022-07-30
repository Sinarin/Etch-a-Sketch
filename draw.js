const body = document.querySelector('body');

makeSketchPad();

const sizeBttn = document.querySelector('.sizeBttn')
sizeBttn.addEventListener('click', resize)



//sketch.addEventListener('mouseup', stopDraw)

function resize(e) {
   let boxSize = +prompt("enter new resolution (max 100)")
   if(isNaN(boxSize) || boxSize > 100 || boxSize < 0){
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
  body.appendChild(newSketch);  
//adds drawing function
draw();
}

function draw(){
  const pixels = document.querySelectorAll('.column');
  pixels.forEach(function(pixel){
  pixel.addEventListener('mouseover', addBlack);
  });
  }

function stopDraw(){
  pixels.forEach(function(pixel){
  pixel.removeEventListener('mouseover', addBlack);
  });
  }

function addBlack(e) {
  this.classList.add('black');
}