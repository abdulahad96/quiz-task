import { QuizValidator } from './validator';
var compose = require('composable-middleware');
export class ValidationMiddleware extends QuizValidator {
    constructor() {
        super();
    }
    validateCreateQuiz() {
        return (
            compose().use(async (req: any, res: any, next: any) => {
                try {
                    const { error } = await this.validateQuizData(req.body)
                    if (error) {
                        var errors = {
                            success: false,
                            msg: error.details[0].message,
                            data: error.name,
                        };
                        res.status(400).send(errors);
                        return
                    }
                    next()
                } catch (err: any) {
                    
                    res.status(400).send(err);
                    return;
                }
            })
        )
    }
    validateAnswerQuiz() {
        return (
            compose().use(async (req: any, res: any, next: any) => {
                try {
                    const { error } = await this.validateAnswer(req.body)
                    if (error) {
                        var errors = {
                            success: false,
                            msg: error.details[0].message,
                            data: error.name,
                        };
                        res.status(400).send(errors);
                        return
                    }
                    next()
                } catch (err: any) {
                    
                    res.status(400).send(err);
                    return;
                }
            })
        )
    }
} 