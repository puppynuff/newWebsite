let downloaded_apps = [];

class app_store {
    constructor() {
        this.application_list = [];

        const _APP_STORE_WINDOW = new RWM_Window("App Store", {
            width: 800,
            height: 800,
            min_width: 400,
            min_height: 400,
            top_color: "#181818",
            icon_url: "/photos/application_images/app_store.svg"
        });

        this.application_list.push(
            /* {
             This was cancelled.
             name: "Mayhaps Motel, The Dating Sim",
             description: "The official Mayhaps Motel Dating Sim! (2/14/24!)",
             icon_url: "/photos/application_images/mayhaps.webp",
             name_location: "210px",
             files: ["/js/packages/rwm/applications/mayhaps_motel/index.js"]
        }*/
       
        {
            name: "Controller Tester",
            description: "This is made for my next game attempt",
            icon_url: "/photos/application_images/controller.svg",
            name_location: "210px",
            files: ["/js/packages/rwm/applications/controller_testing/controller_testing.js"]
        });
        
        this.renderWindow();
    }

    renderWindow() {
        const WINDOW_HOLDER = document.createElement("div");
        WINDOW_HOLDER.style.width = "100%";
        WINDOW_HOLDER.style.height = "95%";
        WINDOW_HOLDER.style.top = "50px";
        WINDOW_HOLDER.style.position = "absolute";

        const HOLDER = document.getElementById("AppStore_holder_div");

        WINDOW_HOLDER.style.display = "flex";
        WINDOW_HOLDER.style.flexDirection = "column";
        WINDOW_HOLDER.style.flexWrap = "wrap";
        WINDOW_HOLDER.style.overflowY = "scroll";
        WINDOW_HOLDER.style.gap = "20px";
        WINDOW_HOLDER.style.alignItems = "center";



        for(let i = 0; i < this.application_list.length; i++) {
            WINDOW_HOLDER.appendChild(application_generator(this.application_list[i].name, this.application_list[i].description, this.application_list[i].icon_url, this.application_list[i].name_location, this.application_list[i].files));
        }

        HOLDER.style.overflowX = "hidden";
        HOLDER.style.overflowY = "hidden";
        WINDOW_HOLDER.style.overflowX = "hidden";

        HOLDER.appendChild(WINDOW_HOLDER);
    }
}


function application_generator(name, description, icon, text_pos, files) {
    const BORDER = document.createElement("div");
    BORDER.style.width = "500px";
    BORDER.style.height = "230px";
    BORDER.style.backgroundColor = "white";
    BORDER.style.borderRadius = "5px";

    let image_element = document.createElement("img");
    image_element.src = icon;

    BORDER.appendChild(image_element);
    image_element.width = 200;
    image_element.height = 230;
    image_element.style.borderTopLeftRadius = "5px";
    image_element.style.borderBottomLeftRadius = "5px";

    let name_element = document.createElement("pre");
    name_element.textContent = name;
    name_element.style.position = "relative";
    name_element.style.top = "-230px";
    name_element.style.left = text_pos;
    name_element.style.fontSize = "large";

    let description_element = document.createElement("p");

    description_element.style.position = "relative";
    description_element.style.top = "-230px";
    description_element.style.left = "210px";
    description_element.textContent = description;
    description_element.style.width = "250px";
    description_element.style.height = "150px";

    let download_button = document.createElement("button");

    if(downloaded_apps.includes(name)) download_button.textContent = "Downloaded!";
    else download_button.textContent = "download";
    download_button.style.position = "relative";
    download_button.style.top = "-250px";
    download_button.style.left = "300px";

    download_button.onclick = () => {
        if(downloaded_apps.includes(name)) return;

        download_button.textContent = `Downloading 0%`;

        for(let i = 0; i < files.length; i++) {
            const SCRIPT = document.createElement("script");
            SCRIPT.src = files[i];
            document.head.appendChild(SCRIPT);
        }

        downloaded_apps.push(name);

        download_button.textContent = "Downloaded!";
    }

    download_button.style.borderRadius = "0px";
    download_button.style.background = "none";

    BORDER.appendChild(name_element);
    BORDER.appendChild(description_element);
    BORDER.appendChild(download_button)

    return BORDER;
}
