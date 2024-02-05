//* Shiro - 12/22/23

applications.clear = (_command, _args, TERMINAL) => {
    TERMINAL.clearLines();
}

applications.header = (_command, args, TERMINAL) => {
    if(!args[1]) args = ["", "white"];
    for(let i = 0; i < openingHeader.length; i++) {
        new Line(openingHeader[i], args[1], TERMINAL, {
            color: args[1],
            margin: "0",
            fontSize: "xx-small"
        }).build();
    }

    return;
}

applications.help = (_command, args, TERMINAL) => {
    new Line("clear :   Clears the console", "white", TERMINAL).build();
    new Line("header:   Shows the header", "white", TERMINAL).build();
    new Line("rpm   :   Ruby Package Manager", "white", TERMINAL).build();
}

applications.setup = (_command, args, TERMINAL) => {
    if(!args[1]) return new Line("Missing args! do \"stup help\" to get options!", "white", TERMINAL).build();

    if(args[1] == "desktop") {
        new Line("setup desktop: Automatically sets up the desktop environment for you!", "white", TERMINAL).build();
        new Line("rpm install rwm", "white", TERMINAL).build();
        applications.rpm("", ["", "install", "rwm"], TERMINAL).then(async () => {
            await sleep(50);

            applications.rwm("", [], TERMINAL)
        });
        return;
    }
}

function sleep(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
