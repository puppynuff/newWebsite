//* Developed by Kokabiel
//* December 22 2024

//! I am returning to the class idea because I want this to be readable.

//? TypeDefs
/**
 * @typedef {import("./lines").Line}
 * @typedef {import("./terminal").Terminal}
 */

//? Global Variables
/**
 * @var {string}
 */
let TYPING_LINE_ID = ""; //Ignore VS Code. It always says I already declared this for some reason.


/**
 * @var {Line}
 */
let CURRENT_LINE;

/**
 * @var {string}
 */
const CURSOR = "-";


/**
 * @var {Terminal}
 */
let TERMINAL = undefined;

//? I want to make as little event listeners as possible.
//? I have never, and I mean ***Never*** had "removeEventListener" work.



/**
 * 
 * @param {string} line_text
*/

function handleInput(line_text) {
    if(TERMINAL.isPaused()) return;
    
    let typing_line = new Line("", TERMINAL, undefined, CURSOR, false, `${line_text}`);
    typing_line.temp_text_holder = "";
    
    typing_line.build();
    
    TYPING_LINE_ID = typing_line.getID();
    CURRENT_LINE = typing_line;
    document.addEventListener("keydown", (key => inputEvent(key)))
}


/** 
 * @param {KeyboardEvent} key 
 */
function inputEvent(key) {
    if(!CURRENT_LINE) return;
    switch(key.key) {
        case "Backspace": {
            if(CURRENT_LINE.isEditable() == false) return;
            //! This only goes to the last space. If there is no last space then it clears the entire text
            if(key.ctrlKey) {

                if(!CURRENT_LINE.temp_text_holder.includes(" ")) {
                    CURRENT_LINE.temp_text_holder = "";
                    CURRENT_LINE.modifyText();
                    return;
                }

                CURRENT_LINE.temp_text_holder =  CURRENT_LINE.temp_text_holder.substr(0, CURRENT_LINE.temp_text_holder.lastIndexOf(" "));
                CURRENT_LINE.modifyText();
                return;
            }

            CURRENT_LINE.temp_text_holder = CURRENT_LINE.temp_text_holder.slice(0, -1);

            //! If this is for passwords this line only reloads it
            //! Otherwise this will rebuild the entire line.
            CURRENT_LINE.modifyText();
            return;
        }

        case "Enter": {
            if(CURRENT_LINE.isEditable() == false) return;

            CURRENT_LINE.finished();

            console.log(CURRENT_LINE.temp_text_holder);

            // TODO Implement the command running function
            return;
        }

        default: {
            if(key.key.length > 1) return;

            CURRENT_LINE.temp_text_holder += key.key;
            CURRENT_LINE.modifyText();
            return;
        }
    }
}


/**
 * This just runs the command from the list of applications that it has
 * 
 * @param {string} command 
 */
function runCommand(command) {
    let args = command.split(" ");
    if(applications[[args[0]]]) {
        (applications[args[0]])(command, args, TERMINAL);
        // TODO Make this a recursive loop.
        return;
    }

    new Line(`Command not found, ${args[0]}`, TERMINAL).build();

    if(TERMINAL.isPaused()) return;
    // TODO Make this a recursive loop.
    return;
}

async function setup() {
    TERMINAL = new Terminal(document.body, "/");


    new Line("This is work in progress right now.", TERMINAL).build();
    new Line("Please give me time!", TERMINAL).build();

    TERMINAL.unpause();


    handleInput("This is a test: Feel free to type. <br>");
}