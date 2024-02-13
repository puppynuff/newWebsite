/*
    * Introduction:
    *   Get the users name,
    *   explain where the user comes from,
    *   Why they are going to Mayhaps Motel
    *   Explain the amount of time they have remaining,
    *   Explain why they have to leave.
    *   Using a Narrator
*/


function introduction_scene() {
    let starting_text = [
        generate_line("Narrator:", "Welcome to the land of Mayhaps Motel."),
        generate_line("Narrator:", "You have waited a while to come here, after walking for 218 hours, since for some reason you don't want to drive.")

    ]

    render_background("url(\"/photos/application_images/mayhaps_motel_dating_sim/backgrounds/mayhaps_outside.png\")");

    callback_handle_text(starting_text, () => {
        handle_text_input("So anyways, what is your name?", (text_input) => { console.log(text_input)});
    })
}
