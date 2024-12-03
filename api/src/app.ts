import express, { Application, Request, Response } from "express";
import cors from "cors";
import { registerUsers, singin } from "./controllers/userController";
import { createAnswer, createOption, createQuestionnaires, createQuestions, 
    getAnswers, getOptions, getQuestionnaires, getQuestions } from "./controllers/questionnaire.Controller";


const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
    res.send("Hola desde mi servidor con TS");
})

//usuarios
app.post("/users/create", registerUsers);
app.post("/users/login", singin);
//creacion de cuestionarios de usuarios
app.post("/questionnaires/createQuestionnaires", createQuestionnaires);
app.get("/questionnaires/getQuestionnaires", getQuestionnaires);
app.post("/questionnaires/createQuestions", createQuestions);
app.get("/questionnaires/getQuestions", getQuestions);
app.post("/questionnaires/createOption", createOption);
app.get("/questionnaires/getOptions", getOptions);
app.post("/questionnaires/createAnswer", createAnswer);
app.get("/questionnaires/getAnswers", getAnswers);


export default app;