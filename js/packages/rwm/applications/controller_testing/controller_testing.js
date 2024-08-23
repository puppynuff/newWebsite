class controller_testing {
    constructor() {
        const _controller_testing_window = new RWM_Window("Controller Testing", {
            width: 800,
            height: 800,
            min_width: 400,
            min_height: 400,
            top_color: "#181818",
            icon_url: "/photos/application_images/controller.svg"
        })

        this.renderWindow();
    }

    renderWindow() {

    }
}

function create_taskbar_button() {
    TASKBAR.addApplication("controller_tester", "/photos/application_images/controller.svg", () => {
        const _controller_testing = new controller_testing();
    });
}

create_taskbar_button();