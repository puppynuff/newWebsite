//* Shiro - 12/22/23
let open_windows = [];


// At some point I need to make a desktop environment file thing.
// But for now this will work.
const TASKBAR = new Taskbar();
applications.rwm = (_command, _args, TERMINAL) => {
    TERMINAL.stop();

    document.body.style.overflow = "hidden";

    document.getElementsByTagName("html")[0].style.overflow = "hidden";

    const BACKGROUND_DIV = document.createElement("div");

    BACKGROUND_DIV.style.width = "100%";
    BACKGROUND_DIV.style.height = "100%";
    BACKGROUND_DIV.style.padding = "0";
    BACKGROUND_DIV.style.margin = "0";
    BACKGROUND_DIV.style.backgroundImage = "url(/photos/desktop.png)";
    BACKGROUND_DIV.style.backgroundPosition = "center";
    BACKGROUND_DIV.style.backgroundSize = "cover";


    // background_div.style.backgroundColor = "black";
    BACKGROUND_DIV.id = "background-div";

    document.body.innerHTML = "";
    document.body.appendChild(BACKGROUND_DIV);

    const TASK_BAR_DIV = document.createElement("div");
    TASK_BAR_DIV.style.backgroundColor = "rgba(100, 100, 100, 0.2)";
    TASK_BAR_DIV.style.height = "50px";
    TASK_BAR_DIV.style.width = "100%";
    TASK_BAR_DIV.style.position = "fixed";
    TASK_BAR_DIV.style.top = `${window.innerHeight - 50}px`;
    TASK_BAR_DIV.id = "rwm_task_bar";

    BACKGROUND_DIV.appendChild(TASK_BAR_DIV);

    window.onresize = (_ev) => {TASK_BAR_DIV.style.top = `${window.innerHeight - 50}px`};

    TASKBAR.addApplication("app_store", "/photos/application_images/app_store.svg", () => {
        if(document.getElementById("AppStore_border_div")) return document.getElementById("AppStore_border_div").hidden = !document.getElementById("AppStore_border_div").hidden;

        new app_store();
    });

    TASKBAR.addApplication("about_shiro", "/photos/shemightbeshiro/me_picrew.png", about_taskbar_handler);

    // Work on windows next.
    document.addEventListener("mousemove", (ev) => {
        for(let i = 0; i < open_windows.length; i++) {
            if(open_windows[i].resizing) {
                console.log(open_windows[i].resizing);
                open_windows[i].handleResize(ev);
                continue;
            }

            if(!open_windows[i].should_move) continue;
            open_windows[i].handleMovement(ev);
        }
    })
}
