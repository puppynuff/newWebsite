class Taskbar {
    constructor() {
        this.last_button_placement = 5;
    }


    /**
        * Adds an application to the task bar.
        *
        * @param {Function} fn
        * @param {String} image
    */
    addApplication(name, image, fn) {
        let buttonElement = document.createElement("button");
        let imageElement = document.createElement("img");

        buttonElement.onclick = fn;

        imageElement.src = image;

        buttonElement.style.height = "45px";
        buttonElement.style.width = "45px";
        buttonElement.style.position = "absolute";

        buttonElement.style.left = this.last_button_placement;
        buttonElement.id = `${name}_taskbar_button`;

        imageElement.width = 45;
        imageElement.height = 45;

        buttonElement.style.left = `${this.last_button_placement}px`;

        imageElement.style.borderRadius = "15px";

        buttonElement.style.background = "none";
        buttonElement.style.border = "none";

        this.last_button_placement += 60;

        buttonElement.appendChild(imageElement);

        document.getElementById("rwm_task_bar").appendChild(buttonElement);
    }
}
