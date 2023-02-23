"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizRouter = void 0;
const express_1 = __importDefault(require("express"));
const validation_1 = require("../../../middleware/validation");
const quiz_controller_1 = require("./quiz.controller");
exports.quizRouter = express_1.default.Router();
let validation_controller = new validation_1.ValidationMiddleware();
const quiz_controller = new quiz_controller_1.Quiz();
exports.quizRouter.post('/', validation_controller.validateCreateQuiz(), quiz_controller.create);
exports.quizRouter.get('/quiz/:id', quiz_controller.fetch);
exports.quizRouter.get('/all', quiz_controller.getall);
exports.quizRouter.delete('/:id', quiz_controller.remove);
exports.quizRouter.put('/:id', quiz_controller.update);
exports.quizRouter.post('/answer/:id', validation_controller.validateAnswerQuiz(), quiz_controller.postAnswer);
