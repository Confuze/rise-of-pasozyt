const h1 = document.querySelector(".header_title");
const timeEl = document.querySelector("#time");
let setseconds = 3000;
let interval:any = null;

const watch = () => {
    if (setseconds <= 0) { 
        return clearInterval(interval);
    };

    console.log(setseconds);

    setseconds--;

    let secs:Number | String = Math.floor(setseconds / 100);
    let setsecs:Number | String = setseconds % 100;

    secs = secs < 10 ? "0" + secs : secs;
    setsecs = setsecs < 10 ? "0" + setsecs : setsecs;

    timeEl!.innerHTML = `${secs}.${setsecs}`;
};

interval = setInterval(watch, 10)