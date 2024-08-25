// This class will handle tracking input, and will try to make all of the controllers have a uniform button placement.

// Currently supported controllers:
// PS5


// Buttons go 1 through 14
class Controller {
    constructor(controller_id, controller_index) {
        // This might be useful for detecting controller type???
        this.controller_id = controller_id;

        this.controller_index = controller_index;
        this.left_pressed = false;
        this.right_pressed = false;
        this.up_pressed = false;
        this.down_pressed = false;
        this.controller_type = "";

        this.bottom_button_pressed = false;
        this.controller_vender = "";

        this.left_trigger_pressed = false;
        this.right_trigger_pressed = false;

        this.left_trigger_axis = 0;
        this.right_trigger_axis = 0;

        this.left_stick_pressed = false;
        this.left_stick_axis_y = 0;
        this.left_stick_axis_x = 0;

        this.right_stick_pressed = false;
        this.right_stick_axis_y = 0;
        this.right_stick_axis_x = 0;

        this.button1_pressed = false; // This is the equivalent of the X button on the ps5
        this.button2_pressed = false; // This is the equivalent of the O button on the ps5
        this.button3_pressed = false; // This is the equivalent of the △ button on the ps5
        this.button4_pressed = false; // This is the equivalent of the □ button on the ps5

        this.logo_button_pressed = false;

        this.start_pressed = false;
        this.select_pressed = false;
        this.center_pressed = false; // I dont know if this will work.

        this.left_bumper_pressed = false;
        this.right_bumper_pressed = false;

        switch (this.controller_id.split("-")[0]) {
            case "054c": {
                this.controller_vender = "Sony/Playstation";
                break;
            }

            default: {
                this.controller_vender = "Unknown";
                break;
            }
        }

        switch (this.controller_id.split("-")[1]) {
            case "0ce6": {
                this.controller_type = "PS5";
                break;
            }

            default: {
                this.controller_type = "unknown";
            }
        }
    }

    controller_input(gamepad) {
        const BUTTONS = gamepad.buttons;

        if (this.controller_type == "PS5") {
            // The wierd thing about the ps5 is that for some god forsaken reason they dicided
            // Woah theres directional buttons on the left! How should we do it
            // bind. all. four. of. them. into. one. axis.
            // So now we have abritary numbers we have to use to check if those are pushed down.
            // Thank you Sony.
            this.button1_pressed = BUTTONS[1].pressed; // X
            this.button2_pressed = BUTTONS[2].pressed; // O
            this.button3_pressed = BUTTONS[3].pressed; // Triangle
            this.button4_pressed = BUTTONS[0].pressed; // Square
            this.left_bumper_pressed = BUTTONS[4].pressed;
            this.right_bumper_pressed = BUTTONS[5].pressed;
            this.left_trigger_pressed = BUTTONS[6].pressed;
            this.right_trigger_pressed = BUTTONS[7].pressed;
            this.select_pressed = BUTTONS[8].pressed;
            this.start_pressed = BUTTONS[9].pressed;
            this.left_stick_pressed = BUTTONS[10].pressed;
            this.right_stick_pressed = BUTTONS[11].pressed;
            this.logo_button_pressed = BUTTONS[12].pressed;
            this.center_pressed = BUTTONS[13].pressed;


            // Axis 
            // Starting with Sony stupid dpad thing
            let up_dpad = -1;
            let up_right_dpad = -0.7142857142857143;
            let right_dpad = -0.4285714285714286
            let down_right_dpad = -0.1428571428571429;
            let down_dpad = 0.1428571428571428;
            let down_left_dpad = 0.4285714285714286; // Just the positve of right dpad. Leaving it like this for anyone else who wants to use it.
            let left_dpad = 0.7142857142857142;
            let left_up_dpad = 1;

            switch (gamepad.axes[9]) {
                case up_dpad: {
                    this.up_pressed = true;
                    this.right_pressed = false;
                    this.left_pressed = false;
                    this.down_pressed = false;
                    break;
                }
                
                case up_right_dpad: {
                    this.up_pressed = true;
                    this.right_pressed = true;
                    this.left_pressed = false;
                    this.down_pressed = false;
                    break;
                }

                case right_dpad: {
                    this.up_pressed = false;
                    this.right_pressed = true;
                    this.left_pressed = false;
                    this.down_pressed = false;
                    break;
                }

                case down_right_dpad: {
                    this.up_pressed = false;
                    this.right_pressed = true;
                    this.left_pressed = false;
                    this.down_pressed = true;
                    break;
                }

                case down_dpad: {
                    this.up_pressed = false;
                    this.right_pressed = false;
                    this.left_pressed = false;
                    this.down_pressed = true;
                    break;
                }

                case down_left_dpad: {
                    this.up_pressed = false;
                    this.right_pressed = false;
                    this.left_pressed = true;
                    this.down_pressed = true;
                    break;
                }

                case left_dpad: {
                    this.up_pressed = false;
                    this.right_pressed = false;
                    this.left_pressed = true;
                    this.down_pressed = false;
                    break;
                }

                case left_up_dpad: {
                    this.up_pressed = true;
                    this.right_pressed = false;
                    this.left_pressed = true;
                    this.down_pressed = false;
                    break;
                }

                default: {
                    this.up_pressed = false;
                    this.right_pressed = false;
                    this.left_pressed = false;
                    this.down_pressed = false;
                    break;
                }
            }

            // Axes 6 7 8 10 11 all do nothing. Constantly 0.
            this.left_stick_axis_x = gamepad.axes[0];
            this.left_stick_axis_y = gamepad.axes[1];

            this.right_stick_axis_x = gamepad.axes[2];
            this.right_stick_axis_y = gamepad.axes[5];

            this.left_trigger_axis = gamepad.axes[3];
            this.right_trigger_axis = gamepad.axes[4];
        }
    }

    update_index(index) {
        this.controller_index = index;
    }
}