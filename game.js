var colour = ["green", "red", "yellow", "blue"];
var game = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function() {
  if (!started) {
    started = true;
    nextSequence();
  }
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  var randomnumber = Math.floor(Math.random() * 4);
  var randomChosenColour = colour[randomnumber];
  game.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  animatePress(userChosenColour);
  playSound(userChosenColour);

  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length -1);
});


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === game[currentLevel]) {
      console.log("success");

      if (userClickedPattern.length === level) {
        setTimeout(function(){nextSequence()}, 1000);
      }
    }
    else {
    var wrong= new Audio("sounds/wrong.mp3");
    wrong.play();

    $('body').addClass("game-over");
    setTimeout(function(){$('body').removeClass("game-over");},200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
    }
  }


function startOver(){
  level=0;
  game=[];
  started=false;
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $('#' + currentColour).addClass("pressed");
  setTimeout(function() {
    $('#' + currentColour).removeClass("pressed");
  }, 100);
}
