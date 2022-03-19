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

const start = Date.now()
const end = start + 30000

const frame = () => {
    const elapsed = end - Date.now()

    if (elapsed <= 0) { 
        finished()
        result.innerText = "Czas upłynął! Niestety nie dostajesz nagrody pieniężnej. Powodzenia w następnej rundzie!"
        return
    };
    
    let secs: Number | String = Math.floor(elapsed / 1000)
    let setsecs: Number | String = elapsed % 100

    secs = secs < 10 ? "0" + secs : secs
    setsecs = setsecs < 10 ? "0" + setsecs : setsecs

    result.innerText = `Pozostały czas: ${secs}.${setsecs}`
}

const interval = setInterval(frame, 30)