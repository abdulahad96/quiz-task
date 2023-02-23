import expess from "express";
const app = expess();

import { quizRouter } from "../app/http/controller/api/quiz";

app.use("/quiz", (quizRouter));

export default app;