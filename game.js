var level = 0;

var detect = false;

var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

$("h2").hide();

function nextSequence() {
    $("h2").hide();
    $("#control").text("End Game");
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    console.log(randomNumber);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").on("click", function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
})

function playSound(name) {
    var audio = new Audio("/sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

$(document).on("keydown", function(){
    $("#level-title").text("Level "+level);
    if(detect===false)
    {
        nextSequence();
    }
    detect = true;
})

$("#control").on("click", function(){
    $("#level-title").text("Level "+level);
    if(detect===false)
    {
        nextSequence();
        detect = true;
    }
    else{
        startOver();
        $("#level-title").text("Press A key to Start");
    }
})

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        // Game End
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    $("h2").text("You reached : Level " + level);
    $("h2").show();
    $("#control").text("Restart Game");
    level = 0;
    detect = false;
    gamePattern = [];
    userClickedPattern = [];
}