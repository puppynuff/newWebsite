let current_div = "intro_div";
let changing = false;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function change_div(new_div) {
    if(changing) return;

    if(new_div == "big_text") {
        document.body.style.overflow = "scroll";
    } else {
        document.body.style.overflow = "hidden";
    }

    changing = true;
    const LAST_DIV = document.getElementById(current_div);
    const NEW_DIV = document.getElementById(new_div);

    if(LAST_DIV.style.opacity != "0")  {
        while(Number(LAST_DIV.style.opacity) != 0) {
            LAST_DIV.style.opacity = `${Number(LAST_DIV.style.opacity) - 0.01}`;
            await sleep(10);
        }

        LAST_DIV.style.visibility = "hidden";
    }

    NEW_DIV.style.visibility = "visible"

    while(Number(NEW_DIV.style.opacity) != 1) {
        NEW_DIV.style.opacity = `${Number(NEW_DIV.style.opacity) + 0.01}`;
        await sleep(10);
    }

    current_div = new_div;

    changing = false;
}

document.onkeyup = (ev) => {
    // Stop spacebar from pressing buttons.
    if(ev.which === 32) {
        ev.preventDefault();
    }
}
