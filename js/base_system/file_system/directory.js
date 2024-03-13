class directory {
    #locked;
    #paths;
    #type;
    #name;
    #previous_dir;

    constructor(locked, name) {
        this.#locked = locked;
        this.#paths = {};
        this.#type = "directory";
        this.#name = name;
    }

    getPreviousDir() {
        return this.#previous_dir;
    }

    getName() {
        return this.#name;
    }

    setName(name, sudo) {
        if(this.isLocked() && !sudo) return false;
        this.#name = name;

        return true;
    }

    getType() {
        return this.#type;
    }

    isLocked() {
        return this.#locked;
    }

    getPaths() {
        return this.#paths;
    }

    addPath(path_name, path) {
        this.#paths[path_name] = path;
    }

    setFileContent(path_name, path_content, sudo) {
        if(!this[path_name]) return;
        if(this[path_name].getType !== "file") return false;
        if(this[path_name].isLocked() == true) return false;
        return this[path_name].setContent(sudo, path_content);
    }

    setPathName(path_name, new_path_name, sudo) {
        if(!this[path_name]) return false;
        if(this[path_name].isLocked() && !sudo) return false;

        this[new_path_name] = this[path_name];

        this[path_name] = undefined;

        this[new_path_name].setName(new_path_name, sudo);

        return true;
    }

    deletePath(path_name, sudo) {
        if(!this.#paths[path_name]) return false;

        if(this.#paths[path_name].isLocked() && !sudo) return false;

        this.#paths[path_name] = undefined;

        return true;
    }
}
