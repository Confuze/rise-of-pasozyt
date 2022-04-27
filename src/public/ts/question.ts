const result = document.querySelector(".result") as HTMLElement;
const answers = document.querySelectorAll("li");
let finishedCalled = false;

const finished = () => {
    finishedCalled = true;
    clearTimeout(timeout);
    for (const element of answers) {
        element.removeAttribute("onclick");
        element.classList.remove("pointer");
    };
};

const checkAnswer = (answer:string, correct:string) => {
    const answeredLi = document.querySelector(`.${answer}`) as HTMLElement;
    const correctLi = document.querySelector(`.${correct}`) as HTMLElement;
    correctLi.style.color = "#00b200";

    finished();

    if (answer === correct) {        
        result.innerText = "Gratulacje! Poprawnie odpowiedziałeś na pytanie i możesz odebrać swoją nagrodę pieniężną.";
    } else {
        result.innerText = "Niestety nie udało ci się poprawnie odpowiedzieć na to pytanie i nie dostajesz nagrody pieniężnej. Powodzenia w następnej rundzie!";
        answeredLi.style.color = "#a00000";
    };
};

const start = document.timeline.currentTime!; // Think of it as Date.now(); also returns a ms value; just slightly faster.
const end = start + 30000;
let timeout:any;

const frame = async () => {
    const elapsed = Math.floor(end - document.timeline.currentTime!);
    if (finishedCalled === true) return;

    if (elapsed <= 0) { 
        finished();
        result.innerText = "Czas upłynął! Niestety nie dostajesz nagrody pieniężnej. Powodzenia w następnej rundzie!";
        return;
    };

    let secs: number | string = Math.floor(elapsed / 1000);
    let setsecs: number | string = Math.floor((elapsed % 1000) * 0.1);

    secs = secs < 10 ? "0" + secs : secs;
    setsecs = setsecs < 10 ? "0" + setsecs : setsecs;

    result.innerText = `Pozostały czas: ${secs}.${setsecs}`;

    timeout = setTimeout(() => requestAnimationFrame(frame), elapsed % 30);
};

frame();