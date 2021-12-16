const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-game');

// Movimento e tiro da nave
function flyShip(event) {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveUp();
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveDown();
  } else if (event.key === " ") {
    event.preventDefault();
    fireLaser();
  }
}

// Função de subir nave
function moveUp() {
  let topPosition = getComputedStyle(yourShip).getPropertyValue('top'); //Traz o valor em string
  if (topPosition === "0px") {
    return
  } else {
    let position = parseInt(topPosition);
    position -= 50;
    yourShip.style.top = `${position}px`;
  }
}

// Função para descer nave
function moveDown() {
  let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
  if (topPosition === "550px") {
    return
  } else {
    let position = parseInt(topPosition);
    position += 50;
    yourShip.style.top = `${position}px`;
  }
}

// Funcionalidade de tiro
function fireLaser () {
  let laser = createLaserElement();
  playArea.appendChild(laser);
  moveLaser();
  
}

// Função para criar o laser element
function createLaserElement() {
  let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
  let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
  let newLaser = document.createElement('img');
  newLaser.src = 'img/shoot.png'; //fonte da imagem
  newLaser.classList.add('laser'); // cria uma classe para a imagem
  newLaser.style.left = `${xPosition}px`;
  newLaser.style.top = `${yPosition - 10}px`;
  return newLaser;
}

window.addEventListener('keydown', flyShip); // Movimenta a nave