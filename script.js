const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['img/monster-1.png', 'img/monster-2.png', 'img/monster-3.png'];

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
function fireLaser() {
  let laser = createLaserElement();
  playArea.appendChild(laser);
  moveLaser(laser);
  
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

//Função que move o tiro
function moveLaser(laser) {
  let laserInterval = setInterval(() => {
    let xPosition = parseInt(laser.style.left);

    if (xPosition === 340) { // até que parte da tela o tiro chega
      laser.remove();
    } else {
      laser.style.left = `${xPosition + 8}px`;
    }
  }, 10);
}

// Função para criar os inimigos aleatoriamente
function createAliens() {
  let newAlien = document.createElement('img');
  let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; // sorteia o inimigo entre as imgs
  newAlien.src = alienSprite;
  newAlien.classList.add('alien'); // classe criada
  newAlien.classList.add('alien-transition'); //classe da animação
  newAlien.style.left = '370px';
  newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
  playArea.appendChild(newAlien);
  moveAlien(newAlien);
}

window.addEventListener('keydown', flyShip); // Movimenta a nave