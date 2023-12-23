//* Shiro - 12/22/23

applications.clear = (_command, _args, TERMINAL) => {
    TERMINAL.clearLines();
}

applications.header = (_command, args, TERMINAL) => {
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