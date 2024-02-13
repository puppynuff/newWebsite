let scene_locations = [
    "/js/packages/rwm/applications/mayhaps_motel/scenes/introduction.js"
];

// this is just info for referring to the player, and keeping track of phases.
let user_info = {
    name: "unknown."
}


taskbar.addApplication("Mayhaps Motel: The Dating Sim", "/photos/application_images/mayhaps.webp", () => {
    const mayhaps_motel_window_border = document.getElementById("MayhapsMotelTheDatingSim_border_div");
    if(mayhaps_motel_window_border != undefined) {
        mayhaps_motel_window_border.hidden = !mayhaps_motel_window_border.hidden;
        return;
    }

    const _mayhaps_window = new RWM_Window("Mayhaps Motel: The Dating Sim", {
        width: 800,
        height: 800,
        min_width: 800,
        min_height: 800,
        top_color: "#181818",
        icon_url: "/photos/application_images/mayhaps.webp"
    });

    // Load the scenes
    for(let i = 0; i < scene_locations.length; i++){
        let scene_script = document.createElement("script");
        scene_script.src = scene_locations[i];

        document.head.appendChild(scene_script);
    }


    title_screen();
});

function title_screen() {
    const base_systems = document.createElement("script");
    base_systems.src = "/js/packages/rwm/applications/mayhaps_motel/base_systems.js"

    document.head.appendChild(base_systems);
    const game_window_holder = document.getElementById("MayhapsMotelTheDatingSim_holder_div");

    const game_window = document.createElement("div");
    game_window.id = "mayhaps_game_window_div";
    game_window.style.height = "calc(100% - 30px)";
    game_window.style.position = "absolute";
    game_window.style.top = "30px";
    game_window.style.width = "100%";

    const start_button = document.createElement("button");

    start_button.textContent = "start";
    start_button.id = "mayhaps_motel_start_button";

    start_button.onclick = () => {
        render_base_box();

        introduction_scene();
    }

    const exit_button = document.createElement("button");
    exit_button.textContent = "exit";
    exit_button.id = "mayhaps_motel_exit_button";

    exit_button.onclick = () => {
        const mayhaps_exit_button = document.getElementById(`MayhapsMotelTheDatingSim_close_button_div`);

        mayhaps_exit_button.click();
    }
    game_window.appendChild(start_button);
    game_window.appendChild(exit_button);

    game_window_holder.appendChild(game_window);
}
