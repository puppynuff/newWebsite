//* Shiro - 12/22/23

let packages = {
    neofetch: {
        name: "NeoFetch",
        description: "Gives info on the system (Well as much as I can get)",
        files: ["/js/ruby_v1.0/packages/neofetch/neofetch.js"]
    },
    rwm: {
        name: "RWM",
        description: "Ruby Window Manager, makes a desktop environment",
        files: [ "/js/ruby_v1.0/packages/rwm/taskbar/taskbar.js",
            "/js/ruby_v1.0/packages/rwm/rwm.js", 
            "/js/ruby_v1.0/packages/rwm/windows/window.js",
            "/js/ruby_v1.0/packages/rwm/applications/app_store/app_store.js",
            "/js/ruby_v1.0/packages/rwm/applications/about/about.js"
        ]
    },


    blahaj: {
        name: "blahaj",
        description: "Prints an ascii art of blahaj :D",
        files: ["/js/ruby_v1.0/packages/blahaj/blahaj.js"]
    }
};

applications.rpm = async (_command, args, TERMINAL) => {
    switch(args[1]) {
        case "install": return installPackages(args, TERMINAL);
        case "help": {
            new Line("rpm install [package] (Do rpm packages to see the available packages)", "red", TERMINAL).build();
            return;
        }


        case "packages": return getPackages(TERMINAL);
        default: {
            new Line(`Argument ${args[1]} invalid. Try "rpm help"`, "red", TERMINAL).build();
            return;
        }
    }
};

function installPackages(args, TERMINAL) {
    for(let i = 2; i < args.length; i++) {
        if(!packages[args[i]]) {
            new Line(`Package '${args[i]}' not found!`, "red", TERMINAL).build();
            continue;
        }

        let textObject = new Line(`Installing: 0/${packages[args[i]].files.length}`, "white", TERMINAL);
        textObject.build();

        for(let j = 0; j < packages[args[i]].files.length; j++) {
            const NEW_SCRIPT = document.createElement("script");
            NEW_SCRIPT.src = packages[args[i]].files[j];
            document.head.appendChild(NEW_SCRIPT);

            textObject.modifyText(`Installing: ${Math.round(100 * ((j + 1)/packages[args[i]].files.length))}%`);
        }
    }

    return applications[args[2]];
}

function getPackages(TERMINAL) {
    for(const [KEY, VALUE] of Object.entries(packages)) {
        console.log(KEY);
        new Line(`${KEY}: ${VALUE.description}`, "white", TERMINAL).build();
    }
}
