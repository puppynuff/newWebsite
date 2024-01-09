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
        icon_url = "/photos/no_icon.png"
    }) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.maximized = false;
        this.top_color = top_color;
        this.icon_url = icon_url;

        this.array_pos = open_windows.length;
        this.createWindow();
        open_windows.push(this);
    }


    createWindow() {
        const BORDER_DIV = document.createElement("div");
        BORDER_DIV.id = `${this.name.replace(/\W/g, "")}_border_div`;

        BORDER_DIV.style.height = `${this.height + 5}px`;
        BORDER_DIV.style.width = `${this.width + 5}px`;
        BORDER_DIV.style.backgroundColor = "#D7289D";
        BORDER_DIV.style.borderRadius = "5px";
        BORDER_DIV.style.position = "absolute";
        BORDER_DIV.style.position = "absolute";

        const HOLDER_DIV = document.createElement("div");
        HOLDER_DIV.id = `${this.name.replace(/\W/g, "")}_holder_div`;
        
        HOLDER_DIV.style.height = `${this.height}px`;
        HOLDER_DIV.style.width = `${this.width}px`;
        HOLDER_DIV.style.borderRadius = `5px`;
        HOLDER_DIV.style.backgroundColor = "black";
        HOLDER_DIV.style.position = "relative";
        HOLDER_DIV.style.left = "2px";
        HOLDER_DIV.style.top = "2px";
        
        const TOP_DIV = document.createElement(`div`);
        TOP_DIV.id = `${this.name.replace(/\W/g, "")}_top_div`;

        TOP_DIV.style.backgroundColor = `${this.top_color}`;
        TOP_DIV.style.width = `${this.width - 90}px`;
        TOP_DIV.style.height = `30px`;
        TOP_DIV.style.position = "absolute";
        TOP_DIV.style.top = `0px`;
        TOP_DIV.style.left = `0px`;
        TOP_DIV.style.borderRadius = `5px 0px 0px 0px`;
        
        const CLOSE_BUTTON = document.createElement("button");
        CLOSE_BUTTON.id = `${this.name.replace(/\W/g, "")}_close_button_div`;

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
        CLOSE_BUTTON.style.backgroundColor = `${this.top_color}`;
        CLOSE_BUTTON.style.borderRadius = `0px 5px 0px 0px`

        CLOSE_BUTTON.onclick = (_ev) => {
            const BORDER_DIV = document.getElementById(`${this.name.replace(/\W/g, "")}_border_div`);
            BORDER_DIV.remove();
            open_windows.splice(this.array_pos, 1);

            for(let i = 0; i < open_windows.length; i++) {
                open_windows[i].array_pos -= 1;
            }
        }

        const MINIMIZE_BUTTON = document.createElement("button");
        MINIMIZE_BUTTON.id = `${this.name.replace(/\W/g, "")}_minimize_button_div`;

        MINIMIZE_BUTTON.style.left = `${this.width - 90}px`;
        MINIMIZE_BUTTON.style.width = "30px";
        MINIMIZE_BUTTON.style.height = "30px";
        MINIMIZE_BUTTON.style.top = `0px`;
        MINIMIZE_BUTTON.style.background = "none";
        MINIMIZE_BUTTON.style.border = "none";
        MINIMIZE_BUTTON.style.position = "absolute";
        MINIMIZE_BUTTON.textContent = "-";
        MINIMIZE_BUTTON.style.fontSize = "20px";
        MINIMIZE_BUTTON.style.backgroundColor = `${this.top_color}`;
        MINIMIZE_BUTTON.style.color = "#D7289D";

        MINIMIZE_BUTTON.onclick = (_ev) => {
            document.getElementById(`${this.name.replace(/\W/g, "")}_border_div`).hidden = true;
        }
        
        const MAXIMIZE_BUTTON = document.createElement("button");
        MAXIMIZE_BUTTON.id = `${this.name.replace(/\W/g, "")}_maximize_button_div`;

        MAXIMIZE_BUTTON.style.left = `${this.width - 60}px`;
        MAXIMIZE_BUTTON.style.top = `0px`;
        MAXIMIZE_BUTTON.style.backgroundColor = "rgba(0, 0, 0, 0)";
        MAXIMIZE_BUTTON.style.border = "none";
        MAXIMIZE_BUTTON.style.position = "absolute";
        MAXIMIZE_BUTTON.style.backgroundColor = `${this.top_color}`;
        MAXIMIZE_BUTTON.style.height = "30px";
        MAXIMIZE_BUTTON.style.width = "30px";

        MAXIMIZE_BUTTON.onclick = (_ev) => {
            if(this.maximized) {
                this.width = this.old_width;
                this.height = this.old_height;
                this.resizeWindow();
                return;
            }

            this.old_height = this.height;
            this.old_width = this.width;
            this.maximized = true;

            this.width = document.body.clientWidth;
            this.height  = document.body.clientHeight;
            
            BORDER_DIV.style.left = "0px";
            BORDER_DIV.style.top = "0px";
            
            this.resizeWindow();
        } 
        
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
        WINDOW_TITLE.style.left = "35px";

        this.should_move = false;
        
        TOP_DIV.onmousedown = (ev) => {
            let x_difference = 0;
            if(this.maximized == true) {
                this.maximized = false;
                console.log(this.width - this.old_width);
                if(this.width - this.old_width > 0) {
                    x_difference = this.width - this.old_width;
                }
                this.width = this.old_width;
                this.height = this.old_height;
                this.resizeWindow();
            }

            this.should_move = true;

            if(ev.offsetX - x_difference <= 0) x_difference = 0;

            this.offsetX = ev.offsetX - x_difference;
            this.offsetY = ev.offsetY;
        }
        
        TOP_DIV.onmouseup = (_ev) => {
            this.should_move = false;
        }

        const WINDOW_ICON = document.createElement("img");
        WINDOW_ICON.src = this.icon_url;
        WINDOW_ICON.width = 30;
        WINDOW_ICON.height = 30;
        WINDOW_ICON.style.position = "absolute";
        WINDOW_ICON.style.left = "0px";
        WINDOW_ICON.style.top = "0px";



        const TOP_LEFT_RESIZE = document.createElement("div");
        TOP_LEFT_RESIZE.style.width = "10px";
        TOP_LEFT_RESIZE.style.height = "10px";
        TOP_LEFT_RESIZE.style.position = "absolute";
        TOP_LEFT_RESIZE.style.left = "-5px";
        TOP_LEFT_RESIZE.style.top = "-5px";
        TOP_LEFT_RESIZE.style.cursor = "nw-resize";

        const TOP_RIGHT_RESIZE = document.createElement("div");
        TOP_RIGHT_RESIZE.style.width = "10px";
        TOP_RIGHT_RESIZE.style.height = "10px";
        TOP_RIGHT_RESIZE.style.position = "absolute";
        TOP_RIGHT_RESIZE.style.left = `${this.width - 5}px`;
        TOP_RIGHT_RESIZE.style.top = "-5px";
        TOP_RIGHT_RESIZE.style.cursor = "ne-resize";

        const BOTTOM_LEFT_RESIZE = document.createElement("div");
        BOTTOM_LEFT_RESIZE.style.position = "absolute";
        BOTTOM_LEFT_RESIZE.style.left = "-5px";
        BOTTOM_LEFT_RESIZE.style.top = `${this.height - 5}px`;
        BOTTOM_LEFT_RESIZE.style.cursor = "ne-resize";
        BOTTOM_LEFT_RESIZE.style.width = "10px";
        BOTTOM_LEFT_RESIZE.style.height = "10px";

        const BOTTOM_RIGHT_RESIZE = document.createElement("div");
        BOTTOM_RIGHT_RESIZE.style.position = "absolute";
        BOTTOM_RIGHT_RESIZE.style.left = `${this.width - 5}px`;
        BOTTOM_RIGHT_RESIZE.style.top = `${this.height - 5}px`;
        BOTTOM_RIGHT_RESIZE.style.cursor = "nw-resize";
        BOTTOM_RIGHT_RESIZE.style.width = "10px";
        BOTTOM_RIGHT_RESIZE.style.height = "10px";

        BOTTOM_RIGHT_RESIZE.onmousedown = (ev) => {
            this.resize_part = "br"; //* Bottom Right
            this.resizing = true;
            this.offsetX = ev.offsetX;
            this.offsetY = ev.offsetY;
        }

        const TOP_RESIZE = document.createElement("div");
        TOP_RESIZE.style.position = "absolute";
        TOP_RESIZE.style.left = "5px";
        TOP_RESIZE.style.top = "-5px";
        TOP_RESIZE.style.width = `${this.width - 10}px`;
        TOP_RESIZE.style.height = "10px";
        TOP_RESIZE.style.cursor = "ns-resize"

        const LEFT_RESIZE = document.createElement("div");
        LEFT_RESIZE.style.position = "absolute";
        LEFT_RESIZE.style.left = "-5px";
        LEFT_RESIZE.style.top = "5px";
        LEFT_RESIZE.style.width = "10px";
        LEFT_RESIZE.style.height = `${this.height - 10}px`;
        LEFT_RESIZE.style.cursor = "ew-resize";

        const RIGHT_RESIZE = document.createElement("div");
        RIGHT_RESIZE.style.position = "absolute";
        RIGHT_RESIZE.style.left = `${this.width - 5}px`;
        RIGHT_RESIZE.style.top = "5px";
        RIGHT_RESIZE.style.width = "10px";
        RIGHT_RESIZE.style.height = `${this.height - 10}px`;
        RIGHT_RESIZE.style.cursor = "ew-resize";
        
        const BOTTOM_RESIZE = document.createElement("div");
        BOTTOM_RESIZE.style.position = "absolute";
        BOTTOM_RESIZE.style.left = "5px";
        BOTTOM_RESIZE.style.top = `${this.height - 5}px`;
        BOTTOM_RESIZE.style.width = `${this.width - 10}px`;
        BOTTOM_RESIZE.style.height = "10px";
        BOTTOM_RESIZE.style.cursor = "ns-resize"
        
        BORDER_DIV.appendChild(HOLDER_DIV);
        BORDER_DIV.appendChild(TOP_LEFT_RESIZE);
        BORDER_DIV.appendChild(TOP_RIGHT_RESIZE);
        BORDER_DIV.appendChild(BOTTOM_LEFT_RESIZE);
        BORDER_DIV.appendChild(BOTTOM_RIGHT_RESIZE);
        BORDER_DIV.appendChild(TOP_RESIZE);
        BORDER_DIV.appendChild(LEFT_RESIZE);
        BORDER_DIV.appendChild(RIGHT_RESIZE);
        BORDER_DIV.appendChild(BOTTOM_RESIZE);

        HOLDER_DIV.appendChild(CLOSE_BUTTON);
        HOLDER_DIV.appendChild(MINIMIZE_BUTTON);
        HOLDER_DIV.appendChild(MAXIMIZE_BUTTON);
        HOLDER_DIV.appendChild(TOP_DIV);
        
        MAXIMIZE_BUTTON.appendChild(MAXIMIZE_ICON);
        
        TOP_DIV.appendChild(WINDOW_TITLE);
        TOP_DIV.appendChild(WINDOW_ICON);

        document.addEventListener("mouseup", (ev) => {
            this.resizing = false;
        })
        
        document.getElementById("background-div").appendChild(BORDER_DIV);
    }

    /**
     * 
     * @param {MouseEvent} mouse_pos 
     */
    handleMovement(mouse_pos) {
        const BORDER_DIV = document.getElementById(`${this.name.replace(/\W/g, "")}_border_div`);
        BORDER_DIV.style.left = `${mouse_pos.x - this.offsetX}px`;
        BORDER_DIV.style.top = `${mouse_pos.y - this.offsetY}px`;
    }

    handleResize(ev) {
        if(!this.resizing) return;
        
        (this[this.resize_part])(ev);
    }

    resizeWindow() {
        const BORDER_DIV = document.getElementById(`${this.name.replace(/\W/g, "")}_border_div`);
        const HOLDER_DIV = document.getElementById(`${this.name.replace(/\W/g, "")}_holder_div`);
        const TOP_DIV = document.getElementById(`${this.name.replace(/\W/g, "")}_top_div`);
        const CLOSE_BUTTON = document.getElementById(`${this.name.replace(/\W/g, "")}_close_button_div`);
        const MINIMIZE_BUTTON = document.getElementById(`${this.name.replace(/\W/g, "")}_minimize_button_div`);
        const MAXIMIZE_BUTTON = document.getElementById(`${this.name.replace(/\W/g, "")}_maximize_button_div`);

        BORDER_DIV.style.width = `${this.width}px`;
        BORDER_DIV.style.height = `${this.height}px`;

        HOLDER_DIV.style.width = `${this.width - 5}px`;
        HOLDER_DIV.style.height = `${this.height - 5}px`;

        TOP_DIV.style.width = `${this.width - 90}px`;

        CLOSE_BUTTON.style.left = `${this.width - 35}px`;
        MINIMIZE_BUTTON.style.left = `${this.width - 95}px`;
        MAXIMIZE_BUTTON.style.left = `${this.width - 65}px`;
    }

    //* ------- Math for resizing windows~ ------- 
    /**
     *  Bottom Right
     * 
     * @param {MouseEvent} ev
     * 
     * @returns {Array<Number, Number>} 
     */
    br(ev)  {
        const BORDER_DIV = document.getElementById(`${this.name.replace(/\W/g, "")}_border_div`);

        console.log(this.offsetX);

        this.width = Math.abs((ev.x + this.offsetX) - Number(BORDER_DIV.style.left.replace("px","")));
        this.height = Math.abs((ev.y + this.offsetY) - Number(BORDER_DIV.style.top.replace("px", "")));

        console.log(this.width);

        this.resizeWindow();
    }
}