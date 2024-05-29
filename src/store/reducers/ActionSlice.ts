import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuiz } from "../../models/IQuiz";
import { IAnswerWithQuestionId } from "../../models/IAnswerWithQuestionId";

interface ActionSliceState {
  nickname: string;
  selectedQuiz: IQuiz;
  answers: IAnswerWithQuestionId[];
  page: number;
}

const initialState: ActionSliceState = {
  nickname: "",
  selectedQuiz: { id: 0, title: "", description: "", questions: [] },
  answers: [],
  page: 1,
};

const ActionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    clearState: (state) => {
      state = initialState;
    },
    updateNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    updateSelectedQuiz: (state, action: PayloadAction<IQuiz>) => {
      state.selectedQuiz = action.payload;
    },

    addAnswer: (state, action: PayloadAction<IAnswerWithQuestionId>) => {
      state.answers.push(action.payload);
    },
    removeAnswer: (state, action: PayloadAction<IAnswerWithQuestionId>) => {
      const { questionId, id } = action.payload;
      const index = state.answers.findIndex(
        (item) => item.questionId === questionId && item.id === id
      );
      state.answers.splice(index, 1);
    },
    swapAnswer: (state, action: PayloadAction<IAnswerWithQuestionId>) => {
      state.answers = state.answers.filter(
        (i) => i.questionId !== action.payload.questionId
      );
      state.answers.push(action.payload);
    },
    clearAnswers: (state) => {
      state.answers.length = 0;
    },

    updatePage: (state, action: PayloadAction<number>) => {
      const newPage = action.payload;
      if (state.selectedQuiz.questions.length >= newPage && newPage > 0) {
      }
      state.page = action.payload;
    },
  },
});

export default ActionSlice.reducer;
export const {
  clearState,
  updateNickname,
  updateSelectedQuiz,
  addAnswer,
  removeAnswer,
  swapAnswer,
  clearAnswers,
  updatePage,
} = ActionSlice.actions;
