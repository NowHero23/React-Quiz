import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addAnswer, swapAnswer } from "../../store/reducers/ActionSlice";
import { IAnswerWithQuestionId } from "../../models/IAnswerWithQuestionId";

interface RadioAnswerProps extends IAnswerWithQuestionId {}

const RadioAnswerComponent = (answer: RadioAnswerProps) => {
  const dispatch = useAppDispatch();

  const { someSelect, isSelected } = useAppSelector((state) => ({
    page: state.actionSlice.page,
    someSelect:
      state.actionSlice.answers.findIndex(
        (i) => i.questionId === answer.questionId
      ) !== -1,
    isSelected:
      state.actionSlice.answers.findIndex(
        (i) => i.id === answer.id && i.questionId === answer.questionId
      ) !== -1,
  }));

  const handleSelectAnswer = () => {
    if (!isSelected) {
      someSelect ? dispatch(swapAnswer(answer)) : dispatch(addAnswer(answer));
    }
  };

  return (
    <label className="flex flex-row justify-start gap-4 p-3 rounded-md cursor-pointer label bg-base-300">
      <input
        onChange={(e) => {
          handleSelectAnswer();
        }}
        checked={isSelected}
        value={answer.id}
        type="radio"
        className="radio radio-primary"
      />

      <p>{answer.text}</p>
    </label>
  );
};

export const RadioAnswer = React.memo(RadioAnswerComponent);
