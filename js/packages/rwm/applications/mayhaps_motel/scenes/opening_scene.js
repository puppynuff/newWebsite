// Plan for this scene:
// Barley introduces you to the mayhaps motel, and each character welcomes you into the motel in their own way.
    // Note: Talk to hamper about their personalies before setting this in stone.


// Starting with barley:
function handle_scene_1() {
    let starting_text = [
        generate_line("Shiro", "This is work in progress right now."),
        generate_line("Shiro", "The motel will be open soon."),
        generate_line("Shiro", "Honestly, I don't know why I thought this was a good idea.")
    ]

    render_text(generate_line("Shiro", "This is work in progress right now."));

    callback_handle_text(starting_text, () => {
        create_buttons([{
            text: "testing",
            color: "red",
            onclick: () => {
                remove_button_holder();
                text_path_1();
            }
        }, {
            text: "Or am I?",
            color: "blue",
            onclick: () => {
                remove_button_holder();
                text_path_2();
            }
        }]);
    })
};

function text_path_1() {
    callback_handle_text([
        generate_line("Shiro", "This is the end for this. Sorry it's so short right now.")
    ], () => {
        document.getElementById("MayhapsMotelTheDatingSim_close_button_div").click();
    })
}

function text_path_2() {
    callback_handle_text([
        generate_line("Shiro", "What do you mean I'm not?"),
        generate_line("Shiro", "Well this is the end then, I'm still developing this garbage.")
    ], () => {
        document.getElementById("MayhapsMotelTheDatingSim_close_button_div").click();
    });
}
