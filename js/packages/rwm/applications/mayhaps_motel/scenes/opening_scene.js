// Plan for this scene:
// Barley introduces you to the mayhaps motel, and each character welcomes you into the motel in their own way.
    // Note: Talk to hamper about their personalies before setting this in stone.


let cheats_on = false;

// Starting with barley:
function handle_scene_1() {
    let starting_text = [
        generate_line("Shiro", "This is work in progress right now."),
        generate_line("Shiro", "The motel will be open soon."),
        generate_line("Shiro", "Honestly, I don't know why I thought this was a good idea.")
    ]

    render_character("shiro", "alt_casual", "talking");

    render_text(generate_line("Shiro", "This is work in progress right now, although you can test the character changing thing."));

    callback_handle_text(starting_text, () => {
        create_buttons([
            {
                text: "alt_casual",
                text_color: "red",
                color: "red",
                onclick: show_alt_casual
            }, {
                text: "casual",
                text_color: "hotpink",
                color: "hotpink",
                onclick: show_casual
            }, {
                text: "formal",
                text_color: "purple",
                color: "purple",
                onclick: show_formal
            }, {
                text: "pajamas",
                text_color: "orange",
                color: "orange",
                onclick: show_pajamas
            }
        ]);
    })
};

let emotions = ["angry", "confused", "enamoured", "happy", "heartbroken", "idea", "love", "nervous", "question", "sad", "suprised", "talking", "thinking", "tired"];

function show_alt_casual(_click_event,emotion_number) {
    if(!emotion_number) emotion_number = 0;
    if(emotion_number == 0) remove_button_holder();

    render_character("shiro", "alt_casual", emotions[emotion_number]);

    if(emotions.length - 1 != emotion_number) {
        callback_handle_text([generate_line("Shiro:", `${emotions[emotion_number]} - Alt-Casual`)], () => {
            show_alt_casual(undefined, emotion_number + 1);
        });
    } else {
        callback_handle_text([generate_line("Shiro: ", `${emotions[emotion_number]} - Alt-Casual`),
            generate_line("Shiro:", "This be the end my friend. By bye! :3")
        ], () => {
            document.getElementById("MayhapsMotelTheDatingSim_close_button_div").click();
        })
    }
}

function show_casual(_click_event,emotion_number) {
    if(!emotion_number) emotion_number = 0;
    if(emotion_number == 0) remove_button_holder();

    render_character("shiro", "casual", emotions[emotion_number]);

    if(emotions.length - 1 != emotion_number) {
        callback_handle_text([generate_line("Shiro:", `${emotions[emotion_number]} - Casual`)], () => {
            show_casual(undefined, emotion_number + 1);
        });
    } else {
        callback_handle_text([generate_line("Shiro: ", `${emotions[emotion_number]} - Casual`),
            generate_line("Shiro:", "This be the end my friend. By bye! :3")
        ], () => {
            document.getElementById("MayhapsMotelTheDatingSim_close_button_div").click();
        })
    }
}

function show_formal(_click_event,emotion_number) {
    if(!emotion_number) emotion_number = 0;
    if(emotion_number == 0) remove_button_holder();

    render_character("shiro", "formal", emotions[emotion_number]);

    if(emotions.length - 1 != emotion_number) {
        callback_handle_text([generate_line("Shiro:", `${emotions[emotion_number]} - Formal`)], () => {
            show_formal(undefined, emotion_number + 1);
        });
    } else {
        callback_handle_text([generate_line("Shiro: ", `${emotions[emotion_number]} - Formal`),
            generate_line("Shiro:", "This be the end my friend. By bye! :3")
        ], () => {
            document.getElementById("MayhapsMotelTheDatingSim_close_button_div").click();
        })
    }
}

function show_pajamas(_click_event,emotion_number) {
    if(!emotion_number) emotion_number = 0;
    if(emotion_number == 0) remove_button_holder();

    render_character("shiro", "pajamas", emotions[emotion_number]);

    if(emotions.length - 1 != emotion_number) {
        callback_handle_text([generate_line("Shiro:", `${emotions[emotion_number]} - Pajamas`)], () => {
            show_pajamas(undefined, emotion_number + 1);
        });
    } else {
        callback_handle_text([generate_line("Shiro: ", `${emotions[emotion_number]} - Pajamas`),
            generate_line("Shiro:", "This be the end my friend. By bye! :3")
        ], () => {
            document.getElementById("MayhapsMotelTheDatingSim_close_button_div").click();
        })
    }
}
