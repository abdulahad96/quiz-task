

export interface IQuiz {
    id    :String,
    name   :String
    description: String
}

export interface IQuestion{
    id : String,
    question : String
    quizId : String
 
}
export interface IAnswer{

    id : String,
 
  answer  :   String
  isCorrect : Boolean
  questionId: String
}



