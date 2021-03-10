var hideMenu = document.querySelector('.startmenu');
var startButton = document.querySelectorAll('.startbutton');
var gameArea = document.querySelector('.gameareaNONE');
var openUp = document.documentElement;
var countDown = document.querySelector('#countdown');
var jeromImg = document.querySelector('.jerom');
var points = document.querySelectorAll('.points');
var endGame = document.querySelector('.endmenuNONE');
var highscore = document.querySelectorAll('.highscore');
var storedInput = sessionStorage.getItem('Highscore');

if(storedInput > 0){
  for(var i = 0; i < highscore.length; i++) {
    highscore[i].innerHTML = "HIGHSCORE: " + topscore;
  }
}

function startGame(event) {
	hideMenu.classList.add('gamebegins');
	gameArea.classList.add('gamearea');
	gameArea.classList.remove('gameareaNONE');

	if (openUp.requestFullscreen) {
    openUp.requestFullscreen();
  } else if (openUp.mozRequestFullScreen) { /* Firefox */
    openUp.mozRequestFullScreen();
  } else if (openUp.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    openUp.webkitRequestFullscreen();
  } else if (openUp.msRequestFullscreen) { /* IE/Edge */
    openUp.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        location.reload();
    }
} 

function counter() {
var timeleft = 3;
var downloadTimer = setInterval(function() {
  setTimeout(function() {
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    countDown.innerHTML = "Go!";
    setTimeout(function() { countDown.classList.add('counter'); }, 1000);  
    setTimeout(function() { countDown.style.display = 'none'; }, 1500);
  } else {
    countDown.innerHTML = timeleft + "";
  }
    timeleft -= 1;
  }, 1000);
}, 1000);
}

function jeromMovement() {
  setTimeout(function() { 
      jeromImg.classList.add('jeromA'); 
      setTimeout(function() {
        jeromImg.classList.add('A');
      }, 1000);
      jeromImg.addEventListener('mouseover', function() {
        jeromImg.classList.remove('jeromA');
        jeromImg.classList.remove('jeromB');
        jeromImg.classList.remove('jeromC');
        jeromImg.classList.remove('jeromD');
        jeromImg.classList.remove('jeromE');
        jeromImg.classList.remove('jeromF');
        jeromImg.classList.remove('jeromG');
        jeromImg.classList.remove('A');
        jeromImg.classList.remove('B');
        jeromImg.classList.remove('C');
        jeromImg.classList.remove('D');
        jeromImg.classList.remove('E');
        jeromImg.classList.remove('F');
        endGame.classList.add('endmenu');
        endGame.classList.remove('endmenuNONE');
        gameArea.classList.add('body');
        gameArea.classList.remove('gamearea');
        var removal = document.querySelector('.body ul');
        removal.classList.add('ulgone');
      });
  }, 7000);
}

jeromImg.addEventListener('animationend',() => {
  if (jeromImg.classList.contains('A')) {
      jeromImg.classList.remove('jeromA');
      jeromImg.classList.remove('A');
      jeromImg.classList.add('jeromB');
      setTimeout(function() {
        jeromImg.classList.add('B');
      }, 1000);
  }
  if (jeromImg.classList.contains('B')) {
      jeromImg.classList.remove('jeromB');
      jeromImg.classList.remove('B');
      jeromImg.classList.add('jeromC');
      setTimeout(function() {
        jeromImg.classList.add('C');
      }, 1000);
  }
  if (jeromImg.classList.contains('C')) {
      jeromImg.classList.remove('jeromC');
      jeromImg.classList.remove('C');
      jeromImg.classList.add('jeromD');
      setTimeout(function() {
        jeromImg.classList.add('D');
      }, 1000);
  }
  if (jeromImg.classList.contains('D')) {
      jeromImg.classList.remove('jeromD');
      jeromImg.classList.remove('D');
      jeromImg.classList.add('jeromE');
      setTimeout(function() {
        jeromImg.classList.add('E');
      }, 1000);
  }
  if (jeromImg.classList.contains('E')) {
      jeromImg.classList.remove('jeromE');
      jeromImg.classList.remove('E');
      jeromImg.classList.add('jeromF');
      setTimeout(function() {
        jeromImg.classList.add('F');
      }, 1000);
  }
  if (jeromImg.classList.contains('F')) {
      jeromImg.classList.remove('jeromF');
      jeromImg.classList.remove('F');
      jeromImg.classList.add('jeromG');
  }
  pointCounter();
  topScore();
});

var score = 0;

function pointCounter() {
  score = score + 1;
  score + 1;
  for(var i = 0; i < points.length; i++) {
    points[i].innerHTML = "SCORE: " + score;
  }
}

if(storedInput === null || storedInput === undefined) {
  var topscore = 0;
} else {
  topscore = storedInput;
}

function topScore() {
  console.log(topscore)
  if (score >= topscore) {
    topscore = score;
    for(var i = 0; i < highscore.length; i++) {
      highscore[i].innerHTML = "HIGHSCORE: " + topscore;
    }
    sessionStorage.setItem('Highscore', topscore);
  }
}

function retry() {
  endGame.classList.add('endmenuNONE');
  endGame.classList.remove('endmenu');
  gameArea.classList.remove('body');
  score = 0;
  for(var i = 0; i < points.length; i++) {
    points[i].innerHTML = "SCORE: " + score;
  }
  countDown.innerHTML = null;
  countDown.classList.remove('counter');  
  countDown.style.display = null;
}

for(var i = 0; i < startButton.length; i++) {
  startButton[i].addEventListener('click',() => {
    startGame(); 
    jeromMovement();
    counter();
    retry();
  });
}

document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);
jeromImg.addEventListener('animationiteration',() => {
  var spaceW = screen.width - jeromImg.width; 
  jeromImg.style.left = Math.floor(Math.random() * spaceW) + "px";
  pointCounter()
  topScore();
 });
