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
        new Line("If the desktop environment doesn't load correctly, run \"rwm\"", "white", TERMINAL).build();
        applications.rpm("", ["", "install", "rwm"], TERMINAL).then(async () => {
            await sleep(50);

            applications.rwm("", [], TERMINAL)
        });
        return;
    }
}

applications.whoami = (_command, _args, TERMINAL) => {
    new Line("Hello my name is Shiro.", "hotpink", TERMINAL).build();
    new Line("You might also find me as PuppyNuff", "blue", TERMINAL).build();
    new Line("Development Background:", "red", TERMINAL).build();
    new Line("I have 3 years of experience in Javascript and Typescript, working on discord bots and multiple scrapped websites.", "white", TERMINAL).build();
    new Line("I have worked on some projects in Java, C++, Rust, C#, Python, and Ruby", "white", TERMINAL).build();
    new Line("What I do:", "red", TERMINAL).build();
    new Line("I normally work on back-end-software, for websites, bots, and sometimes AI", "white", TERMINAL).build();
    new Line("Normally if I am not working on my software, I am playing games, writing, or drawing.", "white", TERMINAL).build();
    new Line("Who Am I?", "red", TERMINAL).build();
    new Line("I'm a software engineer, and currently I haven't founded or co-founded any long term projects.", "white", TERMINAL).build();
    new Line("I would like to get a job in Computer Science, or game development.", "white", TERMINAL).build();
    new Line("I sometimes write stories, design characters, and play some competitive games.", "white", TERMINAL).build();
    new Line("I'm not the greatest at social interactions, so it might be a good idea to use tone tags and things when talking to me.", "white", TERMINAL).build();
    new Line("Fun facts:", "white", TERMINAL).build();
    new Line("1: My favorite animal is the artic fox.", "white", TERMINAL).build();
    new Line("2: My favorite band is The Red Hot chili peppers", "white", TERMINAL).build();
    new Line("3: My favorite game is A Hat in Time or Ultrakill.", "white", TERMINAL).build();

    return;

}


function sleep(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
