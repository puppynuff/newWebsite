class app_store {

    constructor() {
        this.applicationList = [];

        const app_store_window = new RWM_Window("App Store", {
            width: 800,
            height: 800,
            min_width: 400,
            min_height: 400,
            top_color: "#181818",
            icon_url: "/photos/application_images/app_store.svg"
        });

        this.renderWindow();
    }

    renderWindow() {
        const window_holder = document.createElement("div");
        window_holder.style.width = "100%";
        window_holder.style.height = "100%";

         const holder = document.getElementById("AppStore_holder_div");

        window_holder.style.diplay = "grid";
        window_holder.style.overflowY = "scroll";

        window_holder.appendChild(application_generator("Mayhaps Motel, The Game", "A video game based off of mayhaps motel! (Officially liscensed)", "/photos/application_images/mayhaps.webp"));
        window_holder.appendChild(application_generator(":D"));

        holder.appendChild(window_holder);
    }
}


function application_generator(name, description, icon) {
    const border = document.createElement("div");
    border.style.width = "300px";
    border.style.height = "500px";
    border.style.backgroundColor = "white";
    border.style.borderRadius = "5px";

    return border;
}
