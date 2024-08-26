class RubyFile {
    #content;
    #locked;
    #name;
    #type;

    constructor(name, locked, content) {
        this.#content = content;

        // This basically means if this needs elevated perms to access.
        this.#locked = locked;

        this.#type = "file";

        this.#name = name;
    }

    getName() {
        return this.#name;
    }

    edit_name(sudo, name) {
        if(this.#locked && !sudo) return false;

        this.#name = name;

        return true;
    }

    getType() {
        return this.#type;
    }

    getContent() {
        return this.#content;
    }

    setContent(sudo, content) {
        // Maybe I could make the sudo thing more safe, but currently I dont care because its just a website.
        if(!sudo && this.locked) return false;

        this.content = content;

        return true;
    }

    isLocked() {
        return this.#locked;
    }
}
