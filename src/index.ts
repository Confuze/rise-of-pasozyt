import express, { Application } from "express";
import { readFileSync } from "fs";

const app: Application = express();

const questions = JSON.parse(readFileSync(__dirname + "/data/questions.json", "utf-8"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index", { title: "Strona główna" });
});

app.get("/pytanie", (req, res) => {
	res.render("pytanie", { title: "Pytanie", questions: questions });
});

app.use(express.static(__dirname + "/public"));

app.use((req, res) => {
	// res.status(404).send("404 not found");
	res.redirect("/");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Listening on http://127.0.0.1:${PORT}, happy ruining your life while trying to fix bugs :)`);
});
