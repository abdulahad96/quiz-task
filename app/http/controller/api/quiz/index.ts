import express from 'express';

import { ValidationMiddleware } from '../../../middleware/validation';
import { Quiz } from './quiz.controller';

export const quizRouter = express.Router();

let validation_controller = new ValidationMiddleware()
const quiz_controller = new Quiz();
quizRouter.post('/',validation_controller.validateCreateQuiz(), quiz_controller.create);

quizRouter.get('/quiz/:id', quiz_controller.fetch);
quizRouter.get('/all',quiz_controller.getall)
quizRouter.delete('/:id',quiz_controller.remove);
quizRouter.put('/:id',quiz_controller.update)
quizRouter.post('/answer/:id',validation_controller.validateAnswerQuiz(),quiz_controller.postAnswer)