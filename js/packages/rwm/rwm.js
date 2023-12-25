//* Shiro - 12/22/23

// At some point I need to make a desktop environment file thing.
// But for now this will work.
applications.rwm = (_command, args, TERMINAL) => {
    const background_div = document.createElement("div");

    background_div.style.width = "100%";
    background_div.style.height = "100%";
    background_div.style.padding = "0";
    background_div.style.margin = "0";

    background_div.style.backgroundColor = "black";

    document.body.innerHTML = "";
    document.body.appendChild(background_div);


    const task_bar_div = document.createElement("div");
    task_bar_div.style.backgroundColor = "rgba(100, 100, 100, 0.2)";
    task_bar_div.style.height = "50px";
    task_bar_div.style.width = "100%";
    task_bar_div.style.position = "fixed";
    task_bar_div.style.top = `${window.innerHeight - 50}px`;

    window.onresize = (_ev) => {task_bar_div.style.top = `${window.innerHeight - 50}px`};

    background_div.appendChild(task_bar_div);

    // Work on windows next.

    const testing_window = new RWM_Window("Testing~");
}
