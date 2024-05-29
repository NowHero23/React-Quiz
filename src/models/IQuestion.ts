import { IAnswer } from "./IAnswer";

export interface IQuestion {
  id: number;
  title: string;
  answers: IAnswer[];
  cost: number;
}
