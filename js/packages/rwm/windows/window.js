//* Shiro, 12,25,23
// Work on custructing the window, the rest will be handled by the window developer.
// Dont worry, it should end up being pretty simple to create a window.

class RWM_Window {
    /**
     * 
     * @param {string} name 
     */
    constructor(name, {
        width = 800,
        height = 800,
        top_color = "#181818",
    }) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.top_color = top_color;

        this.createWindow();
        openWindows.push(this);
    }


    createWindow() {
        const BORDER_DIV = document.createElement("div");

        BORDER_DIV.style.height = `${this.height + 5}px`;
        BORDER_DIV.style.width = `${this.width + 5}px`;
        BORDER_DIV.style.backgroundColor = "#D7289D";
        BORDER_DIV.style.borderRadius = "5px";
        BORDER_DIV.style.position = "absolute";
        BORDER_DIV.id = `${this.name.replace(/\W/g, "")}_border_div`;

        this.BORDER_DIV = BORDER_DIV;
        const HOLDER_DIV = document.createElement("div");
        this.HOLDER_DIV = HOLDER_DIV;

        HOLDER_DIV.style.height = `${this.height}px`;
        HOLDER_DIV.style.width = `${this.width}px`;
        HOLDER_DIV.style.borderRadius = `5px`;
        HOLDER_DIV.style.backgroundColor = "white";
        HOLDER_DIV.style.position = "relative";
        HOLDER_DIV.style.left = "2px";
        HOLDER_DIV.style.top = "2px";
        BORDER_DIV.style.position = "absolute";

        
        const TOP_DIV = document.createElement(`div`);
        console.log(this.top_color);
        TOP_DIV.style.backgroundColor = `${this.top_color}`;
        TOP_DIV.style.width = `${this.width}px`;
        TOP_DIV.style.height = `30px`;
        TOP_DIV.style.position = "absolute";
        TOP_DIV.style.top = `0px`;
        TOP_DIV.style.left = `0px`;
        TOP_DIV.style.borderRadius = `5px 5px 0px 0px`;
        
        const CLOSE_BUTTON = document.createElement("button");
        CLOSE_BUTTON.style.left = `${this.width - 30}px`;
        CLOSE_BUTTON.style.width = "30px";
        CLOSE_BUTTON.style.height = "30px";
        CLOSE_BUTTON.style.top = `0px`;
        CLOSE_BUTTON.style.background = "none";
        CLOSE_BUTTON.style.border = "none";
        CLOSE_BUTTON.style.position = "absolute";
        CLOSE_BUTTON.textContent = "X";
        CLOSE_BUTTON.style.fontSize = "20px";
        CLOSE_BUTTON.style.color = "#D7289D";
        
        const MINIMIZE_BUTTON = document.createElement("button");
        MINIMIZE_BUTTON.style.left = `${this.width - 90}px`;
        MINIMIZE_BUTTON.style.width = "30px";
        MINIMIZE_BUTTON.style.height = "30px";
        MINIMIZE_BUTTON.style.top = `0px`;
        MINIMIZE_BUTTON.style.background = "none";
        MINIMIZE_BUTTON.style.border = "none";
        MINIMIZE_BUTTON.style.position = "absolute";
        MINIMIZE_BUTTON.textContent = "-";
        MINIMIZE_BUTTON.style.fontSize = "20px";
        MINIMIZE_BUTTON.style.color = "#D7289D";
        
        const MAXIMIZE_BUTTON = document.createElement("button");
        MAXIMIZE_BUTTON.style.left = `${this.width - 60}px`;
        MAXIMIZE_BUTTON.style.top = `5px`;
        MAXIMIZE_BUTTON.style.backgroundColor = "rgba(0, 0, 0, 0)";
        MAXIMIZE_BUTTON.style.border = "none";
        MAXIMIZE_BUTTON.style.position = "absolute";
        
        // TODO Figure out how to change this dynamically
        //! I've tried 9 different ways they say it can be changed dynamically, and none of them work? 
        //! I don't understand why, but it wasted 50 minutes of my life trying to change the color of an SVG.
        const MAXIMIZE_ICON = document.createElement("img");
        MAXIMIZE_ICON.style.color = "#D7289D";
        MAXIMIZE_ICON.src = `/photos/maximize.svg`;
        MAXIMIZE_ICON.height = "20";
        MAXIMIZE_ICON.width = "20";
        
        const WINDOW_TITLE = document.createElement("pre");
        WINDOW_TITLE.textContent = this.name;
        WINDOW_TITLE.style.color = "#D7289D";
        WINDOW_TITLE.style.position = "absolute";
        WINDOW_TITLE.style.top = "-8px";
        WINDOW_TITLE.style.fontSize = "15px";
        WINDOW_TITLE.style.left = "5px";
        
        this.shouldMove = false;
        
        TOP_DIV.onmousedown = (ev) => {
            this.shouldMove = true;
            this.offsetX = ev.offsetX;
            this.offsetY = ev.offsetY;
            console.log(this.shouldMove);
        }
        
        TOP_DIV.onmouseup = (ev) => {
            this.shouldMove = false;
        }
        
        BORDER_DIV.appendChild(HOLDER_DIV);
        TOP_DIV.appendChild(CLOSE_BUTTON);
        TOP_DIV.appendChild(MINIMIZE_BUTTON);
        TOP_DIV.appendChild(MAXIMIZE_BUTTON);
        MAXIMIZE_BUTTON.appendChild(MAXIMIZE_ICON);
        TOP_DIV.appendChild(WINDOW_TITLE);
        HOLDER_DIV.appendChild(TOP_DIV);
        document.getElementById("background-div").appendChild(BORDER_DIV);
    }

    /**
     * 
     * @param {MouseEvent} mouse_pos 
     */
    handleMovement(mouse_pos) {
        if(this.shouldMove) {
            const BORDER_DIV = document.getElementById(`${this.name.replace(/\W/g, "")}_border_div`);
            BORDER_DIV.style.left = `${mouse_pos.x - this.offsetX}px`;
            BORDER_DIV.style.top = `${mouse_pos.y - this.offsetY}px`;
        }
    }
}