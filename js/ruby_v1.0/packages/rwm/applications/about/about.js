function about_taskbar_handler() {
    const ABOUT_APPLICATION_BORDER = document.getElementById("AboutShiro_border_div");

    if(ABOUT_APPLICATION_BORDER != undefined) {
        ABOUT_APPLICATION_BORDER.hidden = !ABOUT_APPLICATION_BORDER.hidden;
    }
    const _ABOUT_WINDOW = new RWM_Window("About Shiro", {
        width: 800,
        height: 800,
        min_width: 400,
        min_height:400,
        top_color: "#181818",
        icon_url: "/photos/shemightbeshiro/me_picrew.png"
    });


    const APPLICATION_BORDER = document.getElementById("AboutShiro_holder_div");

    const IFRAME = document.createElement("iframe");

    IFRAME.src = "/";
    IFRAME.height = "100%";
    IFRAME.width = "100%";

    APPLICATION_BORDER.appendChild(IFRAME);
}
