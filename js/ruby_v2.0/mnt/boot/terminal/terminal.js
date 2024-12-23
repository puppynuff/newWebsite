//* Kokabiel 
//* December 22 2024


//? Typedefs
/**
 * @typedef {import("./lines").Line}
 */


//! This should be a self sufficient thing in the end.
//! It should only need the current path to initialize and should be able to hand the rest alone.
//! Until its an application, just like the linux kernel it should wipe elements that go off the top of the screen.

//? I am trying to stop using public variables and only use private variables when I can.
//? Just to make my life a bit easier
class Terminal {


    /**
     * @type {Array<Line>}
    */
    #lines
    /**
     * @type {boolean}
    */
    #stopped

    /**
     * @type {string}
     */
    #current_path

    /**
     * This should ALWAYS be appended to a div element.
     * @param {HTMLDivElement} mother_element 
     * @param {string} current_path 
     */
    constructor(mother_element, current_path) {
        this.mother_element = mother_element;
        this.#lines = [];
        this.#stopped = true;

        this.#current_path = current_path;
    }

    /**
     * 
     * @param {Line} line 
     */
    addLine(line) {
        this.#lines.push(line);
    }

    //! I might have to use my old answer
    //! I dont know if this will work.
    clearLines() {
        this.mother_element.children.length = 0;
        this.#lines = [];
    }

    //! This is starting stopped just so that we can get the startup sequence to show.
    //! After that we can unpause it.
    unpause() {
        this.#stopped = false;
    }

    /**
     * 
     * @returns {boolean}
     */
    isPaused() {
        return this.#stopped;
    }

    //! I dont know what this is used for anymore.
    //! Keep track. If this isnt used just delete it please.
    //! It was probably used to slow down the user though, so programs can do their thing.
    //! But when I think about it this file doesnt have a "Unstop" function in the original one.
    stop() {
        this.#stopped = true;
    }


    getPath() {
        return this.#current_path;
    }

    /**
     * 
     * @param {string} path 
     */
    setPath(path) {
        this.#current_path = path;

        return true;
    }

    /**
     * ? This is so people can get the line in the terminal to change it.
     * @param {string} line_id
     * @returns {Line | undefined} 
     */
    getLine(line_id) {
        for (let i = 0; i < this.#lines.length; i++) {
            if (this.#lines[i].getID() == line_id) {
                return this.#lines[i];
            }
        }

        return undefined;
    }
}