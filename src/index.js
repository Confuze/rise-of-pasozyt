"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = require("fs");
var app = (0, express_1.default)();
var questions = JSON.parse((0, fs_1.readFileSync)(__dirname + "/data/questions.json", "utf-8"));
console.log(questions);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.get("/", function (req, res) {
    res.render("index", { questions: questions });
});
app.use(function (req, res) {
    res.status(404).send("404 not found");
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Listening on ".concat(PORT, ", happy ruining your life while trying to fix bugs :)"));
});
