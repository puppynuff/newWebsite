//* Shiro - 12/22/23
let open_windows = [];


// At some point I need to make a desktop environment file thing.
// But for now this will work.
applications.rwm = (_command, args, TERMINAL) => {
    TERMINAL.stop();
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

    const task_bar_div = document.createElement("div");
    task_bar_div.style.backgroundColor = "rgba(100, 100, 100, 0.2)";
    task_bar_div.style.height = "50px";
    task_bar_div.style.width = "100%";
    task_bar_div.style.position = "fixed";
    task_bar_div.style.top = `${window.innerHeight - 50}px`;

    window.onresize = (_ev) => {task_bar_div.style.top = `${window.innerHeight - 50}px`};

    BACKGROUND_DIV.appendChild(task_bar_div);

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

    const testing_window = new RWM_Window("Testing~", {
        width: 800,
        height: 800,
        icon_url: "/photos/testing_icon.jpg"
    });
}
