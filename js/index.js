document.addEventListener('DOMContentLoaded', () => {
    const hashed_email = CryptoJS.SHA256('puppynuff@gmail.com'.toLowerCase());
    const gravatar_url = `https://www.gravatar.com/avatar/${hashed_email}?size=1920`;

    document.getElementById('avatar').src = gravatar_url;
})

let loaded = false;

window.onresize = (ui_event) => {
    if(window.innerWidth <= 700) {
        document.getElementById("starting-div").classList.remove('unloaded');
        document.getElementById("starting-div").classList.add('loaded');
    }
}


function ruby_clicked() {
    window.location.href = "./ruby.html"
}