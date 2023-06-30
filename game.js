

// //I create the array for the colours
var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
// //At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern=[];

//I'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
//Create a new variable called level and start at level 0.
var level = 0;



// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().


$(document).keypress(function(){
    if(!started){
        // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
            $("#level-title").text("Level 0");
            nextSequence();
            started=true
    }
});


// //Use jQuery to detect when any of the buttons are clicked and trigger a handler function.

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    //Play the sound of each botton ON click
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); 
}


function nextSequence() {
    userClickedPattern=[];
//     //THis is the algorithm for random colourButton selection and adding it to the array gamePattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  // //I add the flashing animation to the random colour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //Play the sound of each botton without click
playSound(randomChosenColour);
level++;
$("#level-title").text("Level "+level);

}

// Create a new function called animatePress(), it should take a single input parameter called currentColour.

function animatePress(currentColour){
    // Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("#"+currentColour).addClass("pressed");
    //Remove the class "pressed" with 100 ms delay
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100); 
    }


    // Create a new function called checkAnswer(), it should take one input with the name currentLevel
    function checkAnswer(currentLevel){
        if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
            // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.        
            if (userClickedPattern.length===gamePattern.length){
                setTimeout (function(){
            nextSequence(),1000 
                })
            }
     }
        else{
//1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
            var wrongSound=new Audio("sounds/wrong.mp3");
            wrongSound.play();
//2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart")
            setTimeout(function(){
                $("body").removeClass("game-over")}, 200);
            startOver();
    }

 }


    function startOver(){
        level=0;
        gamePattern=[];
        started=false;
    };
    