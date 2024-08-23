let downloaded_apps = [];

class app_store {
    constructor() {
        this.application_list = [];

        const _app_store_window = new RWM_Window("App Store", {
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
        const window_holder = document.createElement("div");
        window_holder.style.width = "100%";
        window_holder.style.height = "95%";
        window_holder.style.top = "50px";
        window_holder.style.position = "absolute";

        const holder = document.getElementById("AppStore_holder_div");

        window_holder.style.display = "flex";
        window_holder.style.flexDirection = "column";
        window_holder.style.flexWrap = "wrap";
        window_holder.style.overflowY = "scroll";
        window_holder.style.gap = "20px";
        window_holder.style.alignItems = "center";



        for(let i = 0; i < this.application_list.length; i++) {
            window_holder.appendChild(application_generator(this.application_list[i].name, this.application_list[i].description, this.application_list[i].icon_url, this.application_list[i].name_location, this.application_list[i].files));
        }

        holder.style.overflowX = "hidden";
        holder.style.overflowY = "hidden";
        window_holder.style.overflowX = "hidden";

        holder.appendChild(window_holder);
    }
}


function application_generator(name, description, icon, text_pos, files) {
    const border = document.createElement("div");
    border.style.width = "500px";
    border.style.height = "230px";
    border.style.backgroundColor = "white";
    border.style.borderRadius = "5px";

    let image_element = document.createElement("img");
    image_element.src = icon;

    border.appendChild(image_element);
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
            const script = document.createElement("script");
            script.src = files[i];
            document.head.appendChild(script);
        }

        downloaded_apps.push(name);

        download_button.textContent = "Downloaded!";
    }

    download_button.style.borderRadius = "0px";
    download_button.style.background = "none";

    border.appendChild(name_element);
    border.appendChild(description_element);
    border.appendChild(download_button)

    return border;
}
