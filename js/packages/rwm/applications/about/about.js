function about_taskbar_handler() {
    const about_application_border = document.getElementById("AboutShiro_border_div");

    if(about_application_border != undefined) {
        about_application_border.hidden = !about_application_border.hidden;
    }
    const _about_window = new RWM_Window("About Shiro", {
        width: 800,
        height: 800,
        min_width: 400,
        min_height:400,
        top_color: "#181818",
        icon_url: "/photos/shemightbeshiro/me_picrew.png"
    });


    const application_border = document.getElementById("AboutShiro_holder_div");

    const iframe = document.createElement("iframe");

    iframe.src = "/shemightbeshiro.html";
    iframe.height = "100%";
    iframe.width = "100%";

    application_border.appendChild(iframe);
}
