//Extra code

//variable to hold the gamepads unique identifies
const gamepads = {};

//function to be called when a gamepad is connected
window.addEventListener("gamepadconnected", function(e) {
    console.info("Gamepad connected");
    gamepads[e.gamepad.index] = true;
});

// listener to be called when a gamepad is disconnected
window.addEventListener("gamepaddisconnected", function(e) {
    console.info("Gamepad disconnected!");
    delete gamepads[e.gamepad.index];
})

// function to be called continuosly to read the gamepad values
function readGamepadValues(){
    // read the indexs of the connected gamepads
    const indexes = Object.keys(gamepads);

    //if there are gamepads connected, keep reading their values
    if (indexes.length > 0) {
        window.requestAnimationFrame(readGamepadValues);
    }
}

function readGamepadValues() {
    const indexes = Object.keys(gamepads);
    // read the gamepads connected to the browser
    const connectedGamepads = navigator.getGamepads();

    // traverse the list of gamepads reading the ones connected to this browser 
    for (let x = 0; x < indexes.length; x++) {
        // read the gamepad buttons
        const buttons = connectedGamepads [indexes[x]].buttons;
    }

    if (indexes.length > 0) {
        window.requestAnimationFrame(readGamepadValues);
    }
}

// ...

window.addEventListener("gamepadconnected", function(e) {
    console.info("Gamepad connected!");
    // read the values while the gamepad is connected
    readGamepadValues();
});

// function to be called when a button is pressed
function buttonPressed(id) {
    console.log(`Button ${id} was pressed`);
}

function readGamepadValues() {

    // ...

    for (let x = 0; x < indexes.length; x++) {
        const buttons = connectedGamepads[indexes[x]].buttons;

        // traverse the list of buttons
        for (let y = 0; y < buttons.length; y++) {
            // call the new function when a button is pressed
            if (buttons[y].pressed) {
                buttonPressed(y);
            }
        }
    }
}

//variable that will hold the state of the pressed buttons
const stateButtons = {};

// ...

function readGamepadValues() {

    // ...
    for (let y = 0; y < buttons.length; y++) {
        // if the button is pressed
        if (buttons[y].pressed) {
            // ...and its previous state was not pressed
            if (!stateButtons[y]) {
                // we mark it as pressed
                stateButtons[y] = true;
                // and call the buttonPressed function
                buttonPressed(y);
            }
            // if the button is NOT pressed
        } else {
            // delete the pressed state
            delete stateButtons[y];
        }
        }
    }

// variable to hold which button is active (to be pressed next)
let activeButton = 0;

//function that generates a new random button
function generateNewRandomActive() {
    // generate a new number between 0 and 3 (both included)
    activeButton = Math.floor(Math.random() * 4);
}

function buttonPressed(id) {
    // if the pressed button is the same as the active one
    if (activeButton === id) {
        // generate a new random button to press
        generateNewRandomActive();
    }
}

// ...

window.addEventListener("gamepadconnected", function(e) {
    console.info("Gamepad connected");
    gamepads[e.gamepad.index] = true;
    generateNewRandomActive();
    readGamepadValues();
});

// variable for the points and streak
let points = 0;
let streak = 0;

// ...

function buttonPressed(id){
    if (activeButton === id) {
        //add points
        streak++;
        points++;
        generateNewRandomActive();
    } else {
        streak = 0;
    }
}

function generateNewRandomActive() {
    activeButton = Math.floor(Math.random() * 4);
    // show the points and streak on the screen
    document.querySelector("#points").textContent = points;
    document.querySelector("#streak").textContent = streak;
}

function generateNewRandomActive() {
    activeButton = Math.floor(Math.random() * 4);
    document.querySelector("#points").textContent = points;
    document.querySelector("#streak").textContent = streak;
    // add the activeButton class to the drumset
    document.querySelector("#drumset").className = `drum-${activeButton}`;
}


// =============


// EVENT LISTENERS




// ===============SETUP FOR CANVAS RENDERING =========//

// ============ ENTITIES ============//



// =============HELPER FUNCTIONS=========//




// GUI


// KEYBOARD INTERACTION LOGIC



// ================ GAME PROCESSES ===========//



// ============= 
//HTML
<div>
    <div id="points"></div>
    <div id="streak"></div>
    <div id="drumset"></div>
       <!-- this is a TEST drumset. It is sorted 2-3-0-1,it may be different -->
        <div class="drum" id="drum-2"></div>
        <div class="drum" id="drum-3"></div>
        <div class="drum" id="drum-0"></div>
        <div class="drum" id="drum-1"></div>
    </div>
    <div id="video">
      <iframe width="100%" height="100%" scr="https://youtu.be/aKzajb_eDU0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  <script src="js/app.js"></script>




  //CSS
  /* set the drumset at the bottom of the page----TESTING*/
#drumset {
    position: absolute;
    bottom: 50;
    left: 0;
    width: 100%;
    text-align: center;
}

/*make gray drums rounded with a darker border */
.drum {
    width: 20vmin;
    height: 20vmin;
    background: #ccc;
    box-sizing: border-box;
    border: 1vmin solid #333;
    border-radius: 50%;
    position: relative;
    display: inline-block;
    margin-bottom: 5vmin;
}

#drum-0 {
    box-shadow: inset 0 0 0 2vmin blue;
    top: -5vmin;
}

#drum-1 {
    box-shadow: inset 0 0 0 2vmin green;
}

#drum-2 {
    box-shadow: inset 0 0 0 2vmin red;
}

#drum-3 {
    box-shadow: inset 0 0 0 2vmin yellow;
    top: -5vmin;
}

/* position the text and add a border to highlight it */
#points, #streak {
    position: absolute;
    top: 5vmin;
    right: 5vmin;
    font-size: 18vmin;
    color: #fff;
    text-shadow: 0 -1px #000, 1px -1px #000, 1px 0 #000,
                 1px 1px #000, 0 1px #000, -1px 1px #000,
                 -1px 0 #000, -1px -1px #000;
}

/* the streak will go in the middle of the screen */
#streak {
    top: 33vmin;
    right: 50vw;
    transform: translate(50%,0);
    font-size: 12vmin;
    text-align: center;
}

/* if the streak is not empty, add the word "Streak" before */
#streak:not(:empty)::before {
    content: "Streak: ";
}

#drumset.drum-0 #drum-0 { background: #00f8; }
#drumset.drum-1 #drum-1 { background: #0f08; }
#drumset.drum-2 #drum-2 { background: #f008; }
#drumset.drum-3 #drum-3 { background: #ff08; }

#video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vw;
}
