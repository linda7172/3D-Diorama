'use strict';

function setRotateY(y) {
  $scene.css('transform', 'rotateX(-20deg) rotateY(' + y + 'deg)');
  $queenMove.css('transform', 'rotateY(' + -y + 'deg)');
  $kingMove.css('transform', 'rotateY(' + -y + 'deg)');
  $rabbit.css('transform', 'rotateY(' + -y + 'deg)');
  $hedge.css('transform', 'rotateY(' + -y + 'deg)');
  $alice.css('transform', 'rotateY(' + -y + 'deg)');
}

const rotateScene = function (event) {

  rY += (event.originalEvent.movementX / 4);

  setRotateY(rY);

  if (rY > 45) {
    setRotateY(45);
  };
  if (rY < -45) {
    setRotateY(-45);
  }
}

let $window = $(window);
let $scene = $('.scene');
let rY = 0;

$window.on('mousedown', function () {
  $window.on('mousemove', rotateScene);
});

$window.on('mouseup', function () {
  $window.off('mousemove', rotateScene);
});
$('.face').prop('draggable', false);


let $queenMove = $('.queen #queen');
let $kingMove = $('.king #king');
let $smallbush = $('.smallbush #smallrosebush');
let $bigbush = $('.bigbush #bigrosebush');
let $rabbit = $('.rabbit #rabbit');
let $hedge = $('.hedgehog');
let $croquet = $('.croquet');
let $hog = $('.hog');
let $alice = $('#alice');

//King
$kingMove.on('click', kingFunction);

function kingFunction() {
  if (notecheck) {
    return;
  } else {
    notecheck = true;

  }
  king.play("moustache");
  hmking.play();
  setTimeout(function () {
    hmking.pause();
    hmking.currentTime = 0;
    notecheck = false;
  }, 1000);

}

//Rabbit
$rabbit.on('click', rabbitFunction);

function rabbitFunction() {
  if (notecheck) {
    return;
  } else {

    notecheck = true;

  }
  rabbit.play("jump");
  jump.play();
  setTimeout(function () {
    jump.pause();
    jump.currentTime = 0;
    notecheck = false;
  }, 1000);
}
//Rose bushes

$smallbush.on('click', callRoses);
$bigbush.on('click', bigRose);

function callRoses() {
  smallRose();
  bigRose();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

function smallRose() {
  let sR = getRandomInt(4);
  let sT = "rose" + sR;
  if (smallrosebush.playingAnimationNames.length > 1) {
    return;
  }

  smallrosebush.play(sT);

  setTimeout(function () {
    smallrosebush.pause(sT);
  }, 950);

}


function bigRose() {
  let sR = getRandomInt(5);
  let sT = "rose" + sR;
  if (bigrosebush.playingAnimationNames.length > 4) {
    return;
  }
  bigrosebush.play(sT);

  setTimeout(function () {
    bigrosebush.pause(sT);
  }, 950);

}
//birdbox interaction
let $note = $('.birdbox');
let $musicnote = $('#note');
$note.on('click', ani);

let notecheck = false;

function ani() {
  if (notecheck) {
    return;
  } else {

    notecheck = true;

  }
  $musicnote.addClass('note');

  duck.play();

  setTimeout(function () {
    $musicnote.removeClass('note');
    duck.pause();
    duck.currentTime = 0;
    notecheck = false;
  }, 2000);
}

//Main volume on/off
$('.button').on('click', toggle);
let sound = false;

function toggle() {

  if (sound) {
    document.getElementById('volup').innerHTML = 'volume_off'
    audio.pause();
    sound = false;
  } else {
    document.getElementById('volup').innerHTML = 'volume_up'

    audio.play();
    sound = true;
  }
}

//Move hedgehog
const moveHog = function (event) {
  let tX = Math.random() * 70 + 60;
  let tZ = Math.random() * 35 + 30;

  $hog.css('transform', 'translateX(' + tX + 'px) translateZ(' + tZ + 'px) ');

}

$croquet.on('mouseover', moveHog);



//Queen speech recognition

const listen = function (event) {
  speech.start();
}

const speechStart = function (event) {

  console.log('speech recognition start');
  $beep[0].play();
  $queenMove.off('click', listen);

  window.speechSynthesis.cancel();
  subPop();

}

function subPop() {
  var subtitle = document.getElementById("queenpop");
  subtitle.classList.toggle("showspan");

}
const speechEnd = function (event) {
  console.log('speech recognition end');
  $queenMove.on('click', listen);
  subPop();

}

let currentState = 'huh';

function queenSetState(action, newState) {

  // Play animations
  queen.play(action);

  // Play sounds
  $('.' + action)[0].play();

  // Set the new state
  currentState = newState;
}

const processResult = function (event) {
  console.log(event.originalEvent.results);
  let transcript = event.originalEvent.results[0][0].transcript;
  let color = transcript.replace(/[^a-z]+/gi, '').toLowerCase();
  console.log('The roses are: ', color);


  if (color == colorList[0] && (currentState == 'huh' || currentState == 'angry')) {
    queenSetState('angry', 'angry');
  } else if (color == colorList[1] && (currentState == 'huh' || currentState == 'happy')) {
    queenSetState('happy', 'happy');
  } else if (color == colorList[0] && currentState == 'happy') {
    queenSetState('happytoangry', 'angry')
  } else if (color == colorList[1] && currentState == 'angry') {
    queenSetState('angrytohappy', 'happy')
  } else if (color != colorList && currentState == 'angry') {
    queenSetState('angrytohuh', 'huh')
  } else if (color != colorList && currentState == 'happy') {
    queenSetState('happytohuh', 'huh')
  } else {
    queenSetState('huh', 'huh')
  }

}
let speech = new webkitSpeechRecognition();
let $beep = $('#beep');
let $queen = $('#queen');
speech.lang = 'en-US';

$(speech).on('start', speechStart);
$(speech).on('end', speechEnd);
$(speech).on('result', processResult);
const colorList = ['white', 'red'];

$queen.on('click', listen);

//Cat
let $cat= $('#cheshire');
function meowSound(){
 
  meow.play();
}
$cat.on('click', meowSound);

