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


    document.getElementById("mayhaps_game_window_div").appendChild(text_holder);
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
        TEXT_ELEM.style.fontSize = text_array[i].color ?? "";
        TEXT_ELEM.style.fontFamily = "\'Public Pixel\', sans-serif";

        TEXT_HOLDER.appendChild(TEXT_ELEM);
    }
}
