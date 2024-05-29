import { IAnswer } from "./IAnswer";

export interface IAnswerWithQuestionId extends IAnswer {
  questionId: number;
}
