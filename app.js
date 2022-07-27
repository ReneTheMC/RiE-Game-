//variable to hold the gamepads unique identifies
const gamepads = {};

//function to be called when a gamepad is connected
window.addEventListener("gamepadconnected", function(e) {
    console.info("Gamepad connected");
    gamepads[e.gamepad.index] = true;
});

// listener to be called when a gamepad is disconnected
window.addEventListener("gamepaddisconnected", fenction(e) {
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
    const indexs = Object.keys(gamepads);
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


// =============


// EVENT LISTENERS




// ===============SETUP FOR CANVAS RENDERING =========//

// ============ ENTITIES ============//



// =============HELPER FUNCTIONS=========//




// GUI


// KEYBOARD INTERACTION LOGIC



// ================ GAME PROCESSES ===========//



// ============= 