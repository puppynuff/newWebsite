//* Shiro - 12/22/23

applications.clear = (_command, _args, TERMINAL) => {
    TERMINAL.clearLines();
}

applications.header = (_command, args, TERMINAL) => {
    if(!args[1]) args = ["", "white"];
    for(let i = 0; i < opening_header.length; i++) {
        new Line(opening_header[i], args[1], TERMINAL, {
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


/**
 *
 * @param {string} command
 * @param {Array<string>} _args
 * @param {Terminal} TERMINAL
 */
applications.ls = (_command, _args, TERMINAL) => {
    for(let [KEY, VALUE] of Object.entries(active_filesystem[TERMINAL.current_path].getPaths())) {
        if(VALUE.getType() == "directory") KEY += "/";
        new Line(KEY, "white", TERMINAL).build();
    }
}


applications.cd = (command, args, TERMINAL) => {
    let current_path = TERMINAL.current_path;

    if(args[1] == "..") {
        if(TERMINAL.current_path.split("/").pop() == "") {
            return TERMINAL.current_path = "/";
        }

        let split_path = TERMINAL.current_path.split("/");
        split_path.pop();
        split_path = split_path.join("/");

        if(split_path == "") {
            TERMINAL.current_path = "/";
            return;
        }

        TERMINAL.current_path = split_path;
        return;
    }

    if(args[1].endsWith("/")) args[1] = args[1].slice(0, -1);

    if(current_path != "/") {
        current_path = current_path + `/${args[1]}`;
    } else {
        current_path = current_path + args[1];
    }

    if(active_filesystem[current_path]) {
        TERMINAL.current_path = current_path;
        return;
    }

    new Line("No such directory", "red", TERMINAL).build();
    return;
}

// Allow this to take full directories too.
applications.cat = (_command, args, TERMINAL) => {
    const CAT_FILE = active_filesystem[TERMINAL.current_path].getPaths()[args[1]];

    if(!CAT_FILE) return new Line("File does not exist!", "red", TERMINAL).build();

    new Line(CAT_FILE.getContent(), "white", TERMINAL).build();
}

let in_eval = false;
let LOG_TERMINAL = undefined;

applications.evalJS = (command, args, TERMINAL) => {
    in_eval = true;
    LOG_TERMINAL = TERMINAL;
    if(command.replace("evalJS ", "").startsWith("\"")) {
        command = command.replace("evalJS ", "");
        eval(command.substring(1, command.length - 1));

        in_eval = false;
        return;
    }


    if(!active_filesystem[TERMINAL.current_path].getPaths()[args[1]]) {
        in_eval = false;
        return new Line("No detected js (Make sure its encased with quotes), and no such file.", "red", TERMINAL).build();
    }
    eval(active_filesystem[TERMINAL.current_path].getPaths()[args[1]].getContent());

    in_eval = false;
    return;
}

let log = console.log;

console.log = (content) => {
    if(in_eval) {
        if(!LOG_TERMINAL) return;

        new Line(content.toString(), "white", LOG_TERMINAL).build();
    } else {
        log(content);
    }
}
