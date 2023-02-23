import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

interface IResult {
    success: boolean;
    error: any;
    data: any
}
export class Quiz {
    constructor() {
    }
    async create(req: any, res: any) {
        try {

            const createQuiz = await prisma.quiz.create({
                data: {

                    name: req.body.name,
                    description: req.body.description,
                }
            })
            const createQuestion = await Promise.all(req.body.questions.map(async (v: any) => {
                const res = await prisma.question.create({
                    data: {
                        question: v.question,
                        quizId: createQuiz?.id,
                        answers: {
                            createMany: { data: v.answers }
                        }
                    }
                })
                return res;
            }
            ))
            res.status(200).send({ success: true, data: { ...createQuiz, question: createQuestion }, error: null })
            return;
            // }
        } catch (err) {
            res.status(400).send({ success: false, data: null, error: err })
            return;

        }
    }
    async fetch(req: any, res: any) {
        try {
            const quizes = await prisma.quiz.findUnique({
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
            })
            res.status(200).send({ success: true, data: quizes, error: null })
            return;
        }
        catch (err) {
            res.status(400).send({ success: true, data: null, error: err })
            return

        }
    }
    async getall(req: any, res: any) {
        try {
            const quizes = await prisma.quiz.findMany({
                include: {
                    questions: {
                        include: {
                            answers: true
                        }
                    }
                }
            })
            res.status(200).send({ success: true, data: quizes, error: null });
            // return;

        }
        catch (err) {
            res.status(400).send({ success: false, data: null, error: err })
            return;
        }
    }
    async remove(req: any, res: any) {

        try {
            const quizes = await prisma.quiz.delete({

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

            })
            res.status(200).send({ success: true, data: quizes, error: null })
            return;

        }
        catch (err) {
            res.status(400).send({ success: true, data: null, error: err })
            return;

        }


    }
    async update(req: any, res: any) {
        try {
            const quizes = await prisma.quiz.update({

                where: {
                    id: req.params.id
                },
                data: {
                    name: req.body.name,
                    description: req.body.description,
                }
            })
            res.status(200).send({ success: true, data: quizes, error: null })
            return;

        }
        catch (err) {
            res.status(400).send({ success: false, data: null, error: err })
            return;

        }
    }
    async postAnswer(req:any,res:any){
        const quizID = req.params.id;
        if(!quizID){
            res.status(400).send({ success: true, data: null, error: {msg:"quiz id required in parameter"} })
            return;
        }
        else if(!!quizID){
            try{
                const quizes = await prisma.question.findFirst({where:{
                    id:req.body.questionId,
                    quizId:quizID,

                },
                include:{
                    answers:{where:{
                        id:req.body.answerId
                    }}
                }
                
            })
            if(quizes){

                res.status(200).send({ success: true, data: quizes, error: null })
                return; 
            }
            res.status(400).send({ success: false, data: quizes, error: {msg:"not found"} })
            return; 
            }
            catch(err){
    res.status(400).send({ success: false, data: null, error: err })
            return;
            }
        }
   
    }
}