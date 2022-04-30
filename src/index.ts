import express from "express";
import { readFileSync } from "fs";

const app = express();

let questions:any[] = JSON.parse(readFileSync(__dirname + "/data/questions.json", "utf-8"));
let chances:any[] = JSON.parse(readFileSync(__dirname + "/data/chances.json", "utf-8"));
let questionsCopy:any[] = [], chancesCopy:any[] = [];

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.set("view cache", true);

app.use((req, res, next) => {
	if (req.method === "GET") {
    	res.set('Cache-control', "public, no-cache, must-revalidate, max-age=31536000, stale-while-revalidate=0"); // 1 year
	} else {
		res.set('Cache-control', "no-store");
	};

	next();
})

app.get("/", (req, res) => {
	res.render("index", { title: "Strona główna" });
});


app.get("/pytanie", (req, res) => {
	let question:any;
	
	if (!questions.length) { questions = questionsCopy; questionsCopy = [] }
	const i = Math.floor(Math.random() * questions.length);
	question = questions.splice(i, 1)[0]
	questionsCopy.push(question)
	
	res.render("pytanie", { title: "Pytanie", question: question });
});

app.get("/szansa", (req, res) => {
	let chance:any;
	
	if (!chances.length) { chances = chancesCopy; chancesCopy = [] }
	const i = Math.floor(Math.random() * chances.length);
	chance = chances.splice(i, 1)[0]
	chancesCopy.push(chance)

	res.render("szansa", { title: "Szansa", chance: chance });
});

app.get("/kostka", (req, res) => {
	res.render("kostka", { title: "Rzut kostką" });
});

app.get("/zasady", (req, res) => {
	res.render("zasady", { title: "Zasady gry" });
});

app.use(express.static(__dirname + "/public", { setHeaders: (res, path, stat) => { res.set('Cache-control', "public, no-cache, must-revalidate, max-age=31536000, stale-while-revalidate=0")}}));

app.use((req, res) => {
	res.status(404).send("404 not found");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Listening on http://127.0.0.1:${PORT}, happy ruining your life while trying to fix bugs :)`);
});
