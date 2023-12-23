//* Shiro - 12/22/23

let packages = {
    neofetch: {
        name: "NeoFetch",
        description: "Gives info on the system (Well as much as I can get)",
        files: ["/js/packages/neofetch/neofetch.js"]
    }    
};

applications.rpm = (_command, args, TERMINAL) => {
    switch(args[1]) {
        case "install": {
            for(let i = 2; i < args.length; i++) {
                if(!packages[args[i]]) {
                    new Line(`Package '${args[i]}' not found!`, "red", TERMINAL).build();
                    continue;
                }

                let textObject = new Line(`Installing: 0/${packages[args[i]].files.length}`, "white", TERMINAL);
                textObject.build();

                for(let j = 0; j < packages[args[i]].files.length; j++) {
                    const newScript = document.createElement("script");
                    newScript.src = packages[args[i]].files[j];
                    document.head.appendChild(newScript);

                    textObject.modifyText(`Installing: ${Math.round(100 * ((j + 1)/packages[args[i]].files.length))}%`);
                }
            }

            return;
        }

        case "help": {
            new Line("rpm install [package] (Do rpm packages to see the available packages)", "red", TERMINAL).build();
            return;
        }

        case "packages": {
            for(const [KEY, VALUE] of Object.entries(packages)) {
                console.log(KEY);
                new Line(`${KEY}: ${VALUE.description}`, "white", TERMINAL).build();
            }

            return;
        }

        default: {
            new Line(`Argument ${args[1]} invalid. Try "rpm help"`, "red", TERMINAL).build();
            return;
        }
    }
};