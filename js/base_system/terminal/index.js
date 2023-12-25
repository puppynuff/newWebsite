//* Shiro - 12/22/23

//! I'm switching off the class idea, this is going to be one file.
// TODO Make all of the commands, and warn if the command isn't found. Package Manager will come next.

let openingHeader = `                                                                                                        
██              ▒▒▒▒                                                                                          
██            ▓▓▓▓▓▓▒▒▒▒                                    ▓▓▓▓▓▓▓▓▓▓▓▓                                      
██            ██▓▓▓▓▓▓▓▓████                            ████▓▓▓▓▓▓▓▓▓▓██                                      
██            ██▓▓▓▓▓▓▓▓▓▓▓▓▓▓                        ▓▓▓▓▓▓▓▓▓▓▓▓██▓▓▓▓▒▒                                    
██            ██▓▓▓▓▒▒██▓▓▓▓▓▓████    ████████      ██▓▓▓▓▓▓▓▓████▒▒██▓▓▓▓                                    
██            ██▓▓▓▓▒▒▒▒██▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░▓▓▓▓▓▓░░░░▓▓▓▓██▒▒▒▒▒▒██▓▓▓▓                                    
██            ██▓▓▓▓▒▒▒▒▒▒████░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▒▒▒▒▒▒██▓▓▓▓▓▓                                    
██            ██▓▓▓▓▒▒▒▒▒▒▓▓██░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▒▒▒▒▒▒██▓▓██░░                                    
██            ██▓▓▓▓▒▒▒▒▒▒▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▒▒▒▒▒▒██▓▓██                                      
██            ██▓▓▓▓▓▓▒▒▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▒▒██░░░░██                                      
██              ██░░████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░░░░░██                                      
██              ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░      ▓▓▒▒                            
██              ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓          ██  ▒▒                          
██                ▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓        ██    ▓▓                        
██                ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓        ██    ░░▒▒                      
██                ▓▓░░░░░░██████░░░░░░░░░░░░░░░░░░██████░░░░░░░░░░░░▓▓        ██        ▓▓                    
██                ██░░░░░░██████░░░░░░░░░░░░░░░░░░██████░░░░░░░░░░░░░░██      ██          ▓▓                  
██                ▓▓░░░░░░████  ░░░░░░░░░░░░░░░░░░████  ░░░░░░░░░░░░░░▓▓      ██          ▓▓                  
██              ▒▒░░░░░░░░████▓▓░░░░░░░░░░░░░░░░░░████▓▓░░░░░░░░░░░░░░░░▓▓    ██            ▓▓                
██              ▓▓░░░░░░░░████░░░░░░░░░░░░░░░░░░░░██████░░░░░░░░░░░░░░░░██    ██            ██                
██            ▓▓░░░░░░░░░░░░░░        ██▓▓      ░░░░░░░░░░░░░░░░░░░░░░░░██    ██              ██              
██            ▓▓░░░░░░░░░░            ░░░░          ░░░░░░░░░░░░░░░░░░▓▓░░  ▓▓░░              ██              
██              ▓▓░░░░                                        ░░░░░░▓▓██  ▓▓░░                  ▓▓            
██                ▓▓                ██    ██                    ░░██      ██░░░░                ██            
██                ░░▒▒              ░░▓▓▒▒░░                  ▓▓▓▓░░    ▓▓▒▒░░░░                ██            
██                    ▓▓                                  ▓▓▓▓        ▓▓░░░░░░░░░░░░    ░░  ░░░░██            
██                      ▒▒▓▓                        ▓▓▓▓▓▓████▓▓▓▓    ██░░░░░░░░░░░░░░░░░░░░░░░░██            
██                          ██████              ░░░░░░░░░░░░░░░░░░██████░░░░░░░░░░░░░░░░░░░░░░░░██            
██                            ░░██            ░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░░░░██            
██                              ██            ░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░░░░░░░░░░░░░░░░░▒▒██            
██                              ██            ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░░░░░░░░░░░░░░░▓▓              
██                              ██░░          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░░░░░░░░░░░░░▓▓                
██                              ██░░            ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░▓▓                
██                              ██░░              ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░░░░░░░▓▓                  
██                              ▓▓░░░░            ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░░░▓▓▒▒░░                  
██                              ▓▓░░░░░░          ░░░░░░░░░░░░░░      ░░░░░░░░░░▓▓▓▓▓▓                        
██                            ██░░░░░░░░          ░░░░░░░░░░░░▓▓        ░░░░░░░░▓▓                            
██                            ▓▓░░░░░░░░░░██      ░░░░░░░░░░░░▓▓      ░░░░░░░░░░▓▓                            
██                            ▓▓░░▓▓▓▓░░░░░░██████░░░░░░▓▓░░░░████████░░░░░░░░░░▓▓                            
██                            ▓▓▒▒▓▓▓▓▒▒░░▓▓    ██▒▒░░▓▓▓▓▒▒░░▓▓░░░░██░░▒▒▒▒▒▒░░▓▓                            
██                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓██      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██▓▓▓▓▓▓▓▓▓▓██                            
██                          ██▓▓▓▓▓▓▓▓▓▓▓▓        ▓▓▓▓▓▓▓▓▓▓▓▓██▓▓▓▓██▓▓▓▓▓▓▓▓▓▓██                            
██                          ██▓▓▓▓▓▓▓▓▓▓▓▓        ██▓▓▓▓▓▓▓▓▓▓██▓▓▓▓██▓▓▓▓▓▓▓▓▓▓░░                            
██                          ██▓▓▓▓▓▓▓▓▓▓▓▓        ██▓▓▓▓▓▓▓▓▓▓████  ██▓▓▓▓▓▓▓▓██                              
██                            ██████████            ██████████        ████████                                
██                                    ░░                    ░░              ░░                                
██                                                                                                            
██                                                                                                            
██                                                                                                            
            
`.split("\n");


class Terminal {
    /**
    * @param {HTMLElement} motherElement
    */
    constructor(motherElement) {
        let location_marker = document.createElement("div");
        location_marker.id = "locationMarker";
        motherElement.appendChild(location_marker)
        this.motherElement = motherElement;
        this.lines = [];
        this.locationMarker = location_marker;
    }

    addLine(line) {
        this.lines.push(line);
    }

    clearLines(){ 
        for(let i = 0; i < this.lines.length; i++) {
            this.lines[i].remove();
        }
    }
}

class Line {
    /**
     * 
     * @param {string} text
     * @param {string} color 
     * @param {Terminal} terminal
     * @param {object} customCss
    */
    constructor(text, color, terminal, customCSS) {
        this.text = text;
        this.color = color;
        this.motherElement = terminal.motherElement;
        this.terminal = terminal;
        this.editable = true;
        this.customCSS = customCSS;
    }

    build() {
        let element = document.createElement("pre");
        element.textContent = this.text;
        if(this.customCSS) element = setStyles(element, this.customCSS);
        else {
            element.style.color = this.color;
            element.style.margin = "0";
        }
        this.motherElement.appendChild(element);
        this.element = element;
        this.terminal.addLine(this);
    }

    finished() {
        this.editable = false;
    }

    /**
     * 
     * @param {string} new_text 
     */
    modifyText(new_text) {
        if(!this.editable) return;
        this.element.textContent = new_text;
    }

    remove() {
        this.element.remove();
    }
}

/**
 * 
 * @param {string} CURSOR
 * @param {Terminal} TERMINAL
 */
function handleInput(CURSOR, TERMINAL) {
    let typing_line = new Line(CURSOR, "white", TERMINAL);
    typing_line.current_text = "";

    typing_line.build();

    document.addEventListener("keydown",  (key) => inputEvent(key, typing_line, CURSOR, TERMINAL));
}

function setup() {
    let cursor = "-";

    const TERMINAL = new Terminal(document.body);

    (applications.header)("","",TERMINAL);

    new Line("Terminal doesn't autoscroll. Sorry!", "yellow", TERMINAL).build();
    new Line("Hello, welcome to RubyOS!", "white", TERMINAL).build();

    handleInput(cursor, TERMINAL);
}

// This will hold the applications, to make it easier to run.
// What it will be given is the full string, the parsed arguments, and the terminal used.
// Its a dictionary so if users add something, they can just add it to the code.
let applications = {

}

/**
 * @param {string} command
 * This is so I restart the loop, and add the warning text, ect.
 * @param {string} CURSOR
 * @param {Terminal} TERMINAL
 */
function runCommand(command, CURSOR, TERMINAL) {
    let args = command.split(" ");
    for(const [KEY, VALUE] in applications) {
        if(!applications[args[0]]) continue;
        (applications[args[0]])(command, args, TERMINAL);

        return handleInput(CURSOR, TERMINAL);
    }

    new Line(`Command not found, ${args[0]}`, "red", TERMINAL).build();
    return handleInput(CURSOR, TERMINAL);
}

function setStyles(element, styles) {
    for(var s in styles) {
        element.style[s] = styles[s];
    }

    return element;
}

function inputEvent(key, typing_line, CURSOR, TERMINAL) {
    switch(key.key) {
        case "Backspace": return backspaceEvent(key, typing_line, CURSOR);
        case "Enter" : return enterEvent(key, typing_line, CURSOR, TERMINAL);
        default: return defaultEvent(key, typing_line, CURSOR);
    }
}

function backspaceEvent(key, typing_line, CURSOR) {
    if(key.ctrlKey) typing_line.current_text = "";

    typing_line.current_text = typing_line.current_text.slice(0, -1);
    typing_line.modifyText(typing_line.current_text + CURSOR);
    return typing_line.current_text;
}

function enterEvent(_key, typing_line, CURSOR, TERMINAL) {
    if(typing_line.editable == false) return;
    typing_line.finished();
    return runCommand(typing_line.current_text, CURSOR, TERMINAL);
}

function defaultEvent(key, typing_line, CURSOR) {
    if(key.key.length > 1) return;

    typing_line.current_text += key.key;
    typing_line.modifyText(typing_line.current_text + CURSOR);
    return typing_line.current_text;
}