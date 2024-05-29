import { IQuestion } from "./IQuestion";

export interface IQuiz {
  id: number;
  title: string;
  description: string;
  questions: IQuestion[];
}
