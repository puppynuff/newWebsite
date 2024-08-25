class controller_testing {
    constructor() {
        const _CONTROLLER_TESTING_WINDOW = new RWM_Window("Controller Testing", {
            width: 800,
            height: 800,
            min_width: 400,
            min_height: 400,
            max_width: 800,
            max_height: 800,
            top_color: "#181818",
            icon_url: "/photos/application_images/controller.svg"
        })

        this.renderWindow();
    }

    async renderWindow() {
        const WINDOW_HOLDER = document.createElement("div");
        WINDOW_HOLDER.style.width = "100%";
        WINDOW_HOLDER.style.height = "95%";
        WINDOW_HOLDER.style.top = "50px";
        WINDOW_HOLDER.style.position = "absolute";

        const UNSUPPORTED_CONTROLLER_ERROR_MESSAGE = document.createElement("h1");
        UNSUPPORTED_CONTROLLER_ERROR_MESSAGE.textContent = "Unsupported controller, or no controller detected.";
        UNSUPPORTED_CONTROLLER_ERROR_MESSAGE.hidden = true;
        UNSUPPORTED_CONTROLLER_ERROR_MESSAGE.style.color = "red"; 1
        UNSUPPORTED_CONTROLLER_ERROR_MESSAGE.id = "unsupport_controller_error_message";

        const PS5_CONTROLLER_SVG = document.createElement("div");
        PS5_CONTROLLER_SVG.innerHTML = await (await fetch("/photos/application_images/controller_tester/ps5_controller.svg")).text();

        PS5_CONTROLLER_SVG.type = "image/svg+xml";
        PS5_CONTROLLER_SVG.data = "/photos/application_images/controller_tester/ps5_controller.svg";
        PS5_CONTROLLER_SVG.width = 400;
        PS5_CONTROLLER_SVG.height = 400;
        PS5_CONTROLLER_SVG.style.marginLeft = "auto";
        PS5_CONTROLLER_SVG.style.marginRight = "auto";
        PS5_CONTROLLER_SVG.style.display = "block";
        PS5_CONTROLLER_SVG.id = "ps5_controller_svg"
        PS5_CONTROLLER_SVG.style.opacity = "0%";

        const HOLDER = document.getElementById("ControllerTesting_holder_div");
        HOLDER.style.overflowX = "hidden";
        HOLDER.style.overflowY = "hidden";

        WINDOW_HOLDER.style.overflowX = "hidden";
        WINDOW_HOLDER.appendChild(PS5_CONTROLLER_SVG);
        WINDOW_HOLDER.appendChild(UNSUPPORTED_CONTROLLER_ERROR_MESSAGE);

        HOLDER.appendChild(WINDOW_HOLDER);

        this.#main_loop(this);

    }

    #main_loop() {
        // For now this will only work for the first controller in the array.
        // Later I will work on a selector, and changing controller type when I update the script to work with more controller types.
        const CONTROLLER = CONTROLLERS[0];


        const PS5_CONTROLLER_SVG = document.getElementById("ps5_controller_svg");
        const UNSUPPORTED_CONTROLLER_WARNING = document.getElementById("unsupport_controller_error_message");

        // For if they connect a controller
        if (!CONTROLLER || !["PS5"].includes(CONTROLLER.controller_type)) {
            UNSUPPORTED_CONTROLLER_WARNING.hidden = false;
            PS5_CONTROLLER_SVG.style.opacity = "0%";
            return requestAnimationFrame(() => this.#main_loop());

        }

        UNSUPPORTED_CONTROLLER_WARNING.hidden = true;
        PS5_CONTROLLER_SVG.style.opacity = "100%";
        PS5_CONTROLLER_SVG.hidden = false;

        // Now just to check if the buttons are pushed down
        // Yaaay
        const BUTTON_MAPPING = {
            button1_pressed: "x_button_ps5",
            button2_pressed: "o_button_ps5",
            button3_pressed: "triangle_button_ps5",
            button4_pressed: "square_button_ps5",
            left_bumper_pressed: "left_bumper_ps5",
            right_bumper_pressed: "right_bumper_ps5",
            left_pressed: "dpad_left_ps5",
            right_pressed: "dpad_right_ps5",
            up_pressed: "dpad_up_ps5",
            down_pressed: "dpad_down_ps5",
            center_pressed: "touchpad_ps5",
            left_stick_pressed: "left_stick_ps5",
            right_stick_pressed: "right_stick_ps5",
            start_pressed: "pause_button_ps5",
            select_pressed: "share_button_ps5",
            logo_button_pressed: "home_button"
        };
        
        for (let button in BUTTON_MAPPING) {
            document.getElementById(BUTTON_MAPPING[button]).style.fill = CONTROLLER[button] ? "red" : "white";
        }
        
        const LEFT_TRIGGER_COLORS = get_color_from_number(0, 255, 255, (CONTROLLER.left_trigger_axis + 1) / 2);
        document.getElementById("left_trigger_ps5").style.fill = `rgb(${255 - LEFT_TRIGGER_COLORS[0]}, ${255 - LEFT_TRIGGER_COLORS[1]}, ${255 - LEFT_TRIGGER_COLORS[2]})`;

        const RIGHT_TRIGGER_COLORS = get_color_from_number(0, 255, 255, (CONTROLLER.right_trigger_axis + 1) / 2);
        document.getElementById("right_trigger_ps5").style.fill = `rgb(${255 - RIGHT_TRIGGER_COLORS[0]}, ${255 - RIGHT_TRIGGER_COLORS[1]}, ${255 - RIGHT_TRIGGER_COLORS[2]})`;

        const MOVEMENT_AMOUNT_LEFT = [CONTROLLER.left_stick_axis_x * 3, CONTROLLER.left_stick_axis_y * 3];
        moveSection("left_stick_ps5", MOVEMENT_AMOUNT_LEFT[0], MOVEMENT_AMOUNT_LEFT[1]); 
        
        const MOVEMENT_AMOUNT_RIGHT = [CONTROLLER.right_stick_axis_x * 3, CONTROLLER.right_stick_axis_y * 3];
        moveSection("right_stick_ps5", MOVEMENT_AMOUNT_RIGHT[0], MOVEMENT_AMOUNT_RIGHT[1]); 


        return requestAnimationFrame(() => this.#main_loop());
    }
}

function create_taskbar_button() {
    TASKBAR.addApplication("controller_tester", "/photos/application_images/controller.svg", () => {
        if (document.getElementById("ControllerTesting_border_div")) return document.getElementById("ControllerTesting_border_div").hidden = !document.getElementById("ControllerTesting_border_div").hidden;
        new controller_testing();
    });
}

function get_color_from_number(red, green, blue, percentage) {
    const RETURN_RED = Math.round(red * percentage);
    const RETURN_GREEN = Math.round(green * percentage);
    const RETURN_BLUE = Math.round(blue * percentage);

    return [RETURN_RED, RETURN_GREEN, RETURN_BLUE];
}

function moveSection(id_string, x_offset, y_offset) {
    const DOM_ELEMENT = document.getElementById(id_string);
    if (DOM_ELEMENT) {
        let transform_attrribute = ' translate(' + x_offset + ',' + y_offset + ')';
        DOM_ELEMENT.setAttribute('transform', transform_attrribute);
    }
}
create_taskbar_button();
