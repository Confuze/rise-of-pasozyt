import express, { Application } from "express";
import { readFileSync } from "fs";

const app: Application = express();

const questions = JSON.parse(readFileSync(__dirname + "/data/questions.json", "utf-8"));

console.log(questions);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index", { questions });
});

app.use((req, res) => {
	res.status(404).send("404 not found");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}, happy ruining your life while trying to fix bugs :)`);
});
