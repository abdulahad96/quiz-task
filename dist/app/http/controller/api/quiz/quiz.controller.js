"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class Quiz {
    constructor() {
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createQuiz = yield prisma.quiz.create({
                    data: {
                        name: req.body.name,
                        description: req.body.description,
                    }
                });
                const createQuestion = yield Promise.all(req.body.questions.map((v) => __awaiter(this, void 0, void 0, function* () {
                    const res = yield prisma.question.create({
                        data: {
                            question: v.question,
                            quizId: createQuiz === null || createQuiz === void 0 ? void 0 : createQuiz.id,
                            answers: {
                                createMany: { data: v.answers }
                            }
                        }
                    });
                    return res;
                })));
                res.status(200).send({ success: true, data: Object.assign(Object.assign({}, createQuiz), { question: createQuestion }), error: null });
                return;
                // }
            }
            catch (err) {
                res.status(400).send({ success: false, data: null, error: err });
                return;
            }
        });
    }
    fetch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quizes = yield prisma.quiz.findUnique({
                    where: {
                        id: req.params.id
                    },
                    include: {
                        questions: {
                            include: {
                                answers: true
                            }
                        }
                    }
                });
                res.status(200).send({ success: true, data: quizes, error: null });
                return;
            }
            catch (err) {
                res.status(400).send({ success: true, data: null, error: err });
                return;
            }
        });
    }
    getall(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quizes = yield prisma.quiz.findMany({
                    include: {
                        questions: {
                            include: {
                                answers: true
                            }
                        }
                    }
                });
                res.status(200).send({ success: true, data: quizes, error: null });
                // return;
            }
            catch (err) {
                res.status(400).send({ success: false, data: null, error: err });
                return;
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quizes = yield prisma.quiz.delete({
                    where: {
                        id: req.params.id
                    },
                    include: {
                        questions: {
                            include: {
                                answers: true
                            }
                        }
                    }
                });
                res.status(200).send({ success: true, data: quizes, error: null });
                return;
            }
            catch (err) {
                res.status(400).send({ success: true, data: null, error: err });
                return;
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quizes = yield prisma.quiz.update({
                    where: {
                        id: req.params.id
                    },
                    data: {
                        name: req.body.name,
                        description: req.body.description,
                    }
                });
                res.status(200).send({ success: true, data: quizes, error: null });
                return;
            }
            catch (err) {
                res.status(400).send({ success: false, data: null, error: err });
                return;
            }
        });
    }
    postAnswer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const quizID = req.params.id;
            if (!quizID) {
                res.status(400).send({ success: true, data: null, error: { msg: "quiz id required in parameter" } });
                return;
            }
            else if (!!quizID) {
                try {
                    const quizes = yield prisma.question.findFirst({ where: {
                            id: req.body.questionId,
                            quizId: quizID,
                        },
                        include: {
                            answers: { where: {
                                    id: req.body.answerId
                                } }
                        }
                    });
                    if (quizes) {
                        res.status(200).send({ success: true, data: quizes, error: null });
                        return;
                    }
                    res.status(400).send({ success: false, data: quizes, error: { msg: "not found" } });
                    return;
                }
                catch (err) {
                    res.status(400).send({ success: false, data: null, error: err });
                    return;
                }
            }
        });
    }
}
exports.Quiz = Quiz;
