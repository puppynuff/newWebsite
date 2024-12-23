//* Kokabiel 
//* December 22 2024

//? Typedefs
/**
 * @typedef { import('./terminal').Terminal}
 */

class Line {
    #starting_text
    #text;
    #terminal;
    #custom_css;
    #isPassword
    #cursor
    /**
     * @type {boolean}
     */
    #editable;
    /**
     * @type {string}
     */
    #id;

    /**
     *
     * @param {string} text
     * @param {Terminal} terminal
     * @param {CSSStyleDeclaration | undefined } custom_css
     * @param {string} cursor
     * @param {boolean} isPassword
     * @param {string} starting_text 
     * 
     * @returns {string}
     */

    //! Use the "temp_text_holder" variable to hold a password you want to render.
    //! THIS IS NOT SECURE. DONT USE REAL PASSWORDS.
    constructor(text, terminal, custom_css, cursor = "", isPassword = false, starting_text = "") {
        this.#text = text;
        this.#terminal = terminal;
        this.#editable = true;
        this.#custom_css = custom_css;
        this.#isPassword = isPassword;
        this.#starting_text = starting_text;
        this.#cursor = cursor

        //? This is used for input prompts, as to keep updating it without updating the text around it. 
        this.temp_text_holder = "";

        /**
            * @type {number} 
        */
        this.#id = this.#generate_id();
    }

    //? I want to make this work with changing colors mid line again.
    //? I wanted to just have something that sets a <pre> tag with the color, but I dont know when I would put the end.
    build() {
        let element = document.createElement("pre");
        //* I want different rendering for both non-passwords and passwords
        if(!this.#isPassword) {
            //! Currently this does nothing.
            //! Need to make color codes and everything.
            this.#format_text();
            
            //? I dont know if this will work. 
            //? The goal is to have the format function (above) add in tags for custom coloring.
            element.innerHTML = `<pre>${this.#starting_text + this.#text + this.#cursor}</pre>`;
            
        } else {
            let pass_text = "";
            //! This assumes you are storing the password in the "temp_text_holder" variable.
            //! THIS IS OBVIOUSLY NOT SECURE. DO NOT USE ANY REAL PASSWORDS PLEASE.
            for(let i = 0; i < this.temp_text_holder.length; i++) {
                pass_text += "*";
            }

            element.text = this.#starting_text + pass_text + this.#cursor;
        }
        if (this.#custom_css) element = this.#setStyles(element, this.#custom_css);
        else {
            element.style.color = "white";
            element.style.margin = "0";
        }

        this.#terminal.mother_element.appendChild(element);
        this.#terminal.addLine(this);

        this.element = element;
    }

    /**
     * Just adds the style options onto the element.
     * 
     * @param {HTMLPreElement} element 
     * @param {CSSStyleDeclaration} styles
     * 
     * @returns {HTMLPreElement} 
     */
    #setStyles(element, styles) {
        for(let style in styles) {
            element.style[style] = styles[style];
        }

        return element;
    }
    
    //? Used to mark that the line is no longer in use, so that I can remove it being edited.
    finished() {
        this.#editable = false;
    }


    isEditable() {
        return this.#editable;
    }

    /**
     * This is mostly used for the current line
     * 
     * @param {string | undefined} new_text 
     * @returns {undefined}
     */
    modifyText(new_text) {
        if (!this.#editable) return;
        if(!new_text) new_text = this.temp_text_holder;
        this.#text = new_text

        //? I forgot to change this.
        //? Dont remove the sart text or cursor from this
        this.element.innerHTML = "<pre>" + this.#starting_text + this.#text + this.#cursor + "</pre>";
    }

    /**
     * This is mostly used for the current line
     * 
     * @param {string} new_starting_text 
     * @returns {undefined}
     */
    modifyStartingText(new_starting_text) {
        if (!this.#editable) return;
        this.#starting_text = new_starting_text;
        this.element.innerHTML = "<pre>" + this.#starting_text + this.#text + this.#cursor + "</pre>";
    }

    remove() {
        this.element.remove();
    }

    // TODO Actually make this function a thing.
    #format_text() {

    }

    getIsPassword() {
        return this.#isPassword()
    }


    /**
     * @returns {string}
     */
    getID() {
        return this.#id;
    }

    /**
     * ? This is how I am going to allow editing of old text for programs.
     * ? The constructor will return an ID, and it will be used to grab this.
     * ? The default length is going to be 25, so there is 1.2436428680229494e+49 possible IDS.
     * ? There will never be a repeat statistically
     * 
     * @returns {string}
     */
    #generate_id() {
        const ID_CHARACTERS = "1234567890abcdefhijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=<>?,./:\";'[]{}`~'";
        
        let id = "";

        for(let i = 0; i < 25; i++) {
            id += ID_CHARACTERS[Math.floor(Math.random() * (ID_CHARACTERS.length))]
        }
        
        return id;
    }
}
