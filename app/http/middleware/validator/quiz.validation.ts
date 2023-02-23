import { IQuiz, IQuestion, IAnswer } from '../../models/quiz.model'
import * as Joi from "joi";

interface CreateQuiz extends IQuiz {
    name: string;
    description: string;
    question: [];
}
interface CreateQuestion extends IQuestion {
    question: string;
    answer: [];
}
interface AnswerQuestion  {
    questionId: string;
    answerId: string;
}

const AnswerSchema =Joi.object().keys({
    answer:  Joi.any().required(),
    isCorrect: Joi.boolean().required()
});
const QuestionSchema = Joi.object().keys({
    question:Joi.string().required(),
    isMandatory:Joi.boolean().required(),
    answers :Joi.array().items(AnswerSchema)  
});

export default class QuizValidator {
    constructor() { }

    //************************ VALIDATE QUIZ CREATE DATA ***********************//
    validateQuizData(data: CreateQuiz) {
        const Quizschema = Joi.object().keys({
            // REQURIED 
            name: Joi.string().required(),
            description: Joi.string().required(),
             questions: Joi.array().items(QuestionSchema).required(),
        });
        return Quizschema.validate(data);
    }
    validateAnswer(data: AnswerQuestion) {
        const Quizschema = Joi.object().keys({
            // REQURIED 
            questionId: Joi.string().required(),
            answerId: Joi.string().required(),
        
        });
        return Quizschema.validate(data);
    }

}