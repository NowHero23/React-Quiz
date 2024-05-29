import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorageItem } from "../../helpers/localStorageFc";
import { IQuiz } from "../../models/IQuiz";
import { IAnswer } from "../../models/IAnswer";
import { IQuestion } from "../../models/IQuestion";

interface QuizState {
  quizzes: IQuiz[];
}
//getLocalStorageItem(LOCAL_STORAGE_KEY_QUIZZES) ||
export const LOCAL_STORAGE_KEY_QUIZZES = "quizzesState";
const initialState: QuizState = {
  quizzes: getLocalStorageItem(LOCAL_STORAGE_KEY_QUIZZES) || [
    {
      id: 1,
      title: "quiz1",
      description: "desc1",
      questions: [
        {
          id: 1,
          title: "2+2=?",
          answers: [
            { id: 1, text: "1", isTrue: false },
            { id: 2, text: "2", isTrue: false },
            { id: 3, text: "3", isTrue: false },
            { id: 4, text: "4", isTrue: true },
          ],
          cost: 1,
        },
        {
          id: 2,
          title: "2*2=?",
          answers: [
            { id: 1, text: "1", isTrue: false },
            { id: 2, text: "2", isTrue: false },
            { id: 3, text: "3", isTrue: false },
            { id: 4, text: "4", isTrue: true },
          ],
          cost: 1,
        },
        {
          id: 3,
          title: "2 and 4 true",
          answers: [
            { id: 1, text: "1", isTrue: false },
            { id: 2, text: "2", isTrue: true },
            { id: 3, text: "3", isTrue: false },
            { id: 4, text: "4", isTrue: true },
          ],
          cost: 2,
        },
      ],
    },
  ],
};

const QuizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<IQuiz[]>) => {
      state.quizzes.push(...action.payload);
    },
    addQuiz: (state, action: PayloadAction<IQuiz>) => {
      state.quizzes.push(action.payload);
    },
    removeQuiz: (state, action: PayloadAction<number>) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz.id !== action.payload
      );
    },
    updateQuiz: (state, action: PayloadAction<IQuiz>) => {
      const index = state.quizzes.findIndex(
        (quiz) => quiz.id === action.payload.id
      );
      if (index !== -1) {
        state.quizzes[index] = action.payload;
      }
    },

    addQuestion: (
      state,
      action: PayloadAction<{ quizId: number; question: IQuestion }>
    ) => {
      const quiz = state.quizzes.find(
        (quiz) => quiz.id === action.payload.quizId
      );
      if (quiz) {
        quiz.questions.push(action.payload.question);
      }
    },
    removeQuestion: (
      state,
      action: PayloadAction<{ quizId: number; questionId: number }>
    ) => {
      const quiz = state.quizzes.find(
        (quiz) => quiz.id === action.payload.quizId
      );
      if (quiz) {
        quiz.questions = quiz.questions.filter(
          (question) => question.id !== action.payload.questionId
        );
      }
    },
    updateQuestion: (
      state,
      action: PayloadAction<{ quizId: number; question: IQuestion }>
    ) => {
      const quiz = state.quizzes.find(
        (quiz) => quiz.id === action.payload.quizId
      );
      if (quiz) {
        const questionIndex = quiz.questions.findIndex(
          (question) => question.id === action.payload.question.id
        );
        if (questionIndex !== -1) {
          quiz.questions[questionIndex] = action.payload.question;
        }
      }
    },

    addAnswer: (
      state,
      action: PayloadAction<{
        quizId: number;
        questionId: number;
        answer: IAnswer;
      }>
    ) => {
      const quiz = state.quizzes.find(
        (quiz) => quiz.id === action.payload.quizId
      );
      if (quiz) {
        const question = quiz.questions.find(
          (question) => question.id === action.payload.questionId
        );
        if (question) {
          question.answers.push(action.payload.answer);
        }
      }
    },
    removeAnswer: (
      state,
      action: PayloadAction<{
        quizId: number;
        questionId: number;
        answerId: number;
      }>
    ) => {
      const quiz = state.quizzes.find(
        (quiz) => quiz.id === action.payload.quizId
      );
      if (quiz) {
        const question = quiz.questions.find(
          (question) => question.id === action.payload.questionId
        );
        if (question) {
          question.answers = question.answers.filter(
            (answer) => answer.id !== action.payload.answerId
          );
        }
      }
    },
    updateAnswer: (
      state,
      action: PayloadAction<{
        quizId: number;
        questionId: number;
        answer: IAnswer;
      }>
    ) => {
      const quiz = state.quizzes.find(
        (quiz) => quiz.id === action.payload.quizId
      );
      if (quiz) {
        const question = quiz.questions.find(
          (question) => question.id === action.payload.questionId
        );
        if (question) {
          const answerIndex = question.answers.findIndex(
            (answer) => answer.id === action.payload.answer.id
          );
          if (answerIndex !== -1) {
            question.answers[answerIndex] = action.payload.answer;
          }
        }
      }
    },
  },
});

export default QuizSlice.reducer;
export const {
  setQuizzes,
  addQuiz,
  removeQuiz,
  updateQuiz,
  addQuestion,
  removeQuestion,
  updateQuestion,
  addAnswer,
  removeAnswer,
  updateAnswer,
} = QuizSlice.actions;
