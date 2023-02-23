"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("joi"));
const AnswerSchema = Joi.object().keys({
    answer: Joi.any().required(),
    isCorrect: Joi.boolean().required()
});
const QuestionSchema = Joi.object().keys({
    question: Joi.string().required(),
    isMandatory: Joi.boolean().required(),
    answers: Joi.array().items(AnswerSchema)
});
class QuizValidator {
    constructor() { }
    //************************ VALIDATE QUIZ CREATE DATA ***********************//
    validateQuizData(data) {
        const Quizschema = Joi.object().keys({
            // REQURIED 
            name: Joi.string().required(),
            description: Joi.string().required(),
            questions: Joi.array().items(QuestionSchema).required(),
        });
        return Quizschema.validate(data);
    }
    validateAnswer(data) {
        const Quizschema = Joi.object().keys({
            // REQURIED 
            questionId: Joi.string().required(),
            answerId: Joi.string().required(),
        });
        return Quizschema.validate(data);
    }
}
exports.default = QuizValidator;
