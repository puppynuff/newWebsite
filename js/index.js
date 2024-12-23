document.addEventListener('DOMContentLoaded', () => {
    const HASHED_EMAIL = CryptoJS.SHA256('puppynuff@gmail.com'.toLowerCase());
    const GRAVATAR_URL = `https://www.gravatar.com/avatar/${HASHED_EMAIL}?size=1920`;

    document.getElementById('avatar').src = GRAVATAR_URL;
})
window.onresize = (ui_event) => {
    if(window.innerWidth <= 700) {
        document.getElementById("starting-div").classList.remove('unloaded');
        document.getElementById("starting-div").classList.add('loaded');
    }
}


function ruby_clicked() {
    window.location.href = "./ruby_v1.html"
}

