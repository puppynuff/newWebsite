// This file will keep track of ALL connected controllers.
// Just a general array, when a controller connect:
// Create a new controller class
// Push it into the array
// Start the loop for the controller class to update itself.

// If the controller disconnects:
// Remove the controller from the array

const CONTROLLERS = [];

window.addEventListener("gamepadconnected", (ev) => {
    CONTROLLERS.push(new Controller(ev.gamepad.id, ev.gamepad.index));
    console.log(CONTROLLERS);
});

window.addEventListener("gamepaddisconnected", (ev) => {
    // This acts wierd. If you manually turn off a ps5 controller windows thinks its still connected.
    // I do not have an xbox controller to test this with, so if this doesnt work for xbox, contact me pretty pls :]
    CONTROLLERS.splice(ev.gamepad.index, 1);

    for(let i = ev.gamepad.index; i < CONTROLLERS.length; i++) {
        CONTROLLERS[i].update_index(i);
    }
});


function handle_controllers() {
    for(let i = 0; i < CONTROLLERS.length; i++) {
        CONTROLLERS[i].controller_input(navigator.getGamepads()[CONTROLLERS[i].controller_index]);
    }

    requestAnimationFrame(handle_controllers);
}

handle_controllers();