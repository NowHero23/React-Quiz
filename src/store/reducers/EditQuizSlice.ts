import { IAnswer } from "../../models/IAnswer";
import { IQuestion } from "../../models/IQuestion";
import { IQuiz } from "../../models/IQuiz";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditQuizState {
  quiz: IQuiz;
}

const initialState: EditQuizState = {
  quiz: { id: 0, title: "", description: "", questions: [] },
};

const EditQuizSlice = createSlice({
  name: "editQuiz",
  initialState,
  reducers: {
    updateQuiz: (state, action: PayloadAction<IQuiz>) => {
      state.quiz = action.payload;
    },
    clearState: (state) => {
      state.quiz = { id: 0, title: "", description: "", questions: [] };
    },

    updateTitle: (state, action: PayloadAction<string>) => {
      state.quiz.title = action.payload;
    },
    updateDescription: (state, action: PayloadAction<string>) => {
      state.quiz.description = action.payload;
    },

    addQuestion: (state, action: PayloadAction<IQuestion>) => {
      state.quiz.questions.push(action.payload);
    },
    removeQuestionById: (state, action: PayloadAction<number>) => {
      const index = state.quiz.questions.findIndex(
        (i) => i.id === action.payload
      );
      if (index !== -1) state.quiz.questions.splice(index, 1);
    },
    updateQuestion: (state, action: PayloadAction<IQuestion>) => {
      const index = state.quiz.questions.findIndex(
        (i) => i.id === action.payload.id
      );
      if (index !== -1) state.quiz.questions[index] = action.payload;
    },

    updateQuestionTitle: (
      state,
      action: PayloadAction<{ questionId: number; title: string }>
    ) => {
      const index = state.quiz.questions.findIndex(
        (i) => i.id === action.payload.questionId
      );
      if (index !== -1)
        state.quiz.questions[index].title = action.payload.title;
    },
    updateQuestionCost: (
      state,
      action: PayloadAction<{ questionId: number; cost: number }>
    ) => {
      const index = state.quiz.questions.findIndex(
        (i) => i.id === action.payload.questionId
      );
      if (index !== -1) state.quiz.questions[index].cost = action.payload.cost;
    },

    addQuestionAnswer: (
      state,
      action: PayloadAction<{ questionId: number; answer: IAnswer }>
    ) => {
      const index = state.quiz.questions.findIndex(
        (i) => i.id === action.payload.questionId
      );
      if (index !== -1)
        state.quiz.questions[index].answers.push(action.payload.answer);
    },
    removeQuestionAnswerById: (
      state,
      action: PayloadAction<{ questionId: number; answerId: number }>
    ) => {
      const { questionId, answerId } = action.payload;

      const questionIndex = state.quiz.questions.findIndex(
        (i) => i.id === questionId
      );

      const answerIndex = state.quiz.questions[questionIndex].answers.findIndex(
        (i) => i.id === answerId
      );

      if (answerIndex !== -1)
        state.quiz.questions[questionIndex].answers.splice(answerIndex, 1);
    },

    updateQuestionAnswer: (
      state,
      action: PayloadAction<{ questionId: number; answer: IAnswer }>
    ) => {
      const { questionId, answer } = action.payload;

      const questionIndex = state.quiz.questions.findIndex(
        (i) => i.id === questionId
      );
      if (questionIndex !== -1) {
        const answerIndex = state.quiz.questions[
          questionIndex
        ].answers.findIndex((i) => i.id === answer.id);
        state.quiz.questions[questionIndex].answers[answerIndex] = answer;
      }
    },

    updateQuestionAnswerIsTrue: (
      state,
      action: PayloadAction<{
        questionId: number;
        answerId: number;
        isTrue: boolean;
      }>
    ) => {
      const { questionId, answerId, isTrue } = action.payload;

      const questionIndex = state.quiz.questions.findIndex(
        (i) => i.id === questionId
      );
      if (questionIndex !== -1) {
        const answerIndex = state.quiz.questions[
          questionIndex
        ].answers.findIndex((i) => i.id === answerId);
        state.quiz.questions[questionIndex].answers[answerIndex].isTrue =
          isTrue;
      }
    },

    updateQuestionAnswerText: (
      state,
      action: PayloadAction<{
        questionId: number;
        answerId: number;
        text: string;
      }>
    ) => {
      const { questionId, answerId, text } = action.payload;

      const questionIndex = state.quiz.questions.findIndex(
        (i) => i.id === questionId
      );
      if (questionIndex !== -1) {
        const answerIndex = state.quiz.questions[
          questionIndex
        ].answers.findIndex((i) => i.id === answerId);
        state.quiz.questions[questionIndex].answers[answerIndex].text = text;
      }
    },
  },
});

export default EditQuizSlice.reducer;
export const {
  updateQuiz,
  clearState,
  updateTitle,
  updateDescription,
  addQuestion,
  removeQuestionById,
  updateQuestion,
  updateQuestionTitle,
  updateQuestionCost,
  addQuestionAnswer,
  removeQuestionAnswerById,
  updateQuestionAnswer,
  updateQuestionAnswerIsTrue,
  updateQuestionAnswerText,
} = EditQuizSlice.actions;
