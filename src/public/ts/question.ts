const result = document.querySelector(".result") as HTMLElement;
const answers = document.querySelectorAll("li");

const finished = () => {
    for (const element of answers as any) { // Had to cast it as any as typescript for whatever reason thinks NodeListOf<HTMLLIElement> can't be iterated through (thanks whoever made that)
        element.removeAttribute("onclick")
        clearInterval(interval);
    }
}

const checkAnswer = (answer:string, correct:string) => {
    const answeredLi = document.querySelector(`.${answer}`) as HTMLElement;
    const correctLi = document.querySelector(`.${correct}`) as HTMLElement;
    correctLi.style.color = "#00b200";

    finished()

    if (answer === correct) {        
        result.innerText = "Gratulacje! Poprawnie odpowiedziałeś na pytanie i możesz odebrać swoją nagrodę pieniężną."
    } else {
        result.innerText = "Niestety nie udało ci się poprawnie odpowiedzieć na to pytanie i nie dostajesz nagrody pieniężnej. Powodzenia w następnej rundzie!"
        answeredLi.style.color = "#a00000"
    }
}

let setseconds = 3000;
let interval:any = null;

const watch = () => {
    if (setseconds <= 0) { 
        finished()
        result.innerText = "Czas upłynął! Niestety nie dostajesz nagrody pieniężnej. Powodzenia w następnej rundzie!"
        return
    };

    console.log(setseconds)

    setseconds--

    let secs:Number | String = Math.floor(setseconds / 100)
    let setsecs:Number | String = setseconds % 100

    secs = secs < 10 ? "0" + secs : secs
    setsecs = setsecs < 10 ? "0" + setsecs : setsecs

    result.innerHTML = `Pozostały czas: ${secs}.${setsecs}` 
};

interval = setInterval(watch, 10)