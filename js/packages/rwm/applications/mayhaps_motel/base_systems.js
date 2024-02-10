function render_base_box() {
    document.getElementById("mayhaps_motel_start_button").hidden = true;
    document.getElementById("mayhaps_motel_exit_button").hidden = true;

    let text_holder = document.createElement("div");
    text_holder.style.width = "100%";
    text_holder.style.height = "200px";
    text_holder.style.background = "rgba(245, 2, 217, 0.3)"
    text_holder.id = "mayhaps_text_holder";
    text_holder.style.position = "relative";
    text_holder.style.top = "calc(100% - 220px)";

    let character_image = document.createElement("img");
    character_image.style.right = "10px";
    character_image.style.bottom = "220px";
    character_image.style.height = "calc(100% - 220px)";
    character_image.style.position = "absolute";
    character_image.id = "mayhaps_character_image_holder";


    document.getElementById("mayhaps_game_window_div").appendChild(text_holder);
    document.getElementById("mayhaps_game_window_div").appendChild(character_image);
}

function render_character(character_name, character_outfit, character_mood) {
    let character_image = document.getElementById("mayhaps_character_image_holder");

    character_image.src = `/photos/application_images/mayhaps_motel_dating_sim/characters/${character_name}/${character_outfit}/${character_name}_${character_mood}_${character_outfit}.png`;
}

function callback_handle_text(text_portion, callback) {
    const MAYHAPS_TEXT_HOLDER = document.getElementById("mayhaps_text_holder");

    // This will keep track of where we are in the text. Starting at zero so that we only move on if the click after we run out.
    let text_spot = -1;

    MAYHAPS_TEXT_HOLDER.onclick = () => {
        text_spot += 1;

        if(text_spot == text_portion.length)
        {
            MAYHAPS_TEXT_HOLDER.onclick = () => {};
            return callback();
        }

        render_text(text_portion[text_spot]);
    }

    MAYHAPS_TEXT_HOLDER.click();
}

function create_buttons(button_data) {
    const GAME_HOLDER = document.getElementById("mayhaps_game_window_div");

    const BUTTON_HOLDER = document.createElement("div");
    BUTTON_HOLDER.style.position = "absolute";
    BUTTON_HOLDER.style.top = "25%";
    BUTTON_HOLDER.style.left = "50%";
    BUTTON_HOLDER.style.transform = "translate(-50%, -50%)";
    BUTTON_HOLDER.id = "mayhaps_button_holder";
    BUTTON_HOLDER.style.width = "50%";
    GAME_HOLDER.appendChild(BUTTON_HOLDER);

    for(let i = 0; i < button_data.length; i++) {
        const button = document.createElement("button");
        button.textContent = button_data[i].text;
        button.style.color = button_data[i].text_color ?? "white";
        button.style.background = "none";
        button.style.borderStyle = "solid";
        button.onclick = button_data[i].onclick;
        button.style.width = "calc(100% - 20px)";
        button.style.position = "relative";
        button.style.left = "10px";
        button.style.fontFamily = "\'Public Pixel\', sans-serif";
        button.style.borderColor = button_data[i].color ?? "white";

        button.onmouseenter = () => {
            button.style.borderColor = "gray";
        }

        button.onmouseleave = () => {
            button.style.borderColor = button_data[i].color ?? "white";
        }


        BUTTON_HOLDER.appendChild(button);
    }
}

// Just so its one short line, since I will be using this alot.
function remove_button_holder() {
    document.getElementById("mayhaps_button_holder").remove();
}

// To quickly make a line from a character, that doesn't need that extra decoration
function generate_line(character_name, text) {
    let generated_text = [
        {
            text: character_name,
            color: "white",
            font_size: "large"
        }, {
            text: text,
            color: "white",
            font_size: "small"
        }
    ]

    return generated_text;
}

/**
    * Renders text onto the base text box.
    *
    * @param {Array<Object> text_array
    *
    * Object:
    * {
    *   text: String,
    *   color: String,
    *   font_size: String
    * }
*/
function render_text(text_array) {
   const TEXT_HOLDER = document.getElementById("mayhaps_text_holder");

    while(TEXT_HOLDER.lastChild) {
        TEXT_HOLDER.removeChild(TEXT_HOLDER.lastChild);
    }

    for(let i = 0; i < text_array.length; i++) {
        const TEXT_ELEM = document.createElement("p");

        TEXT_ELEM.textContent = text_array[i].text;
        TEXT_ELEM.style.color = text_array[i].color;
        TEXT_ELEM.style.fontSize = text_array[i].font_size ?? "";
        TEXT_ELEM.style.fontFamily = "\'Public Pixel\', sans-serif";

        TEXT_HOLDER.appendChild(TEXT_ELEM);
    }
}
