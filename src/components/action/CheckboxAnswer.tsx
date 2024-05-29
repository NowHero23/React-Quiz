import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IAnswerWithQuestionId } from "../../models/IAnswerWithQuestionId";
import { addAnswer, removeAnswer } from "../../store/reducers/ActionSlice";

interface CheckboxAnswerProps extends IAnswerWithQuestionId {}

const CheckboxAnswerComponent = (answer: CheckboxAnswerProps) => {
  const dispatch = useAppDispatch();

  const { isSelected } = useAppSelector((state) => ({
    isSelected:
      state.actionSlice.answers.findIndex(
        (i) => i.id === answer.id && i.questionId === answer.questionId
      ) !== -1,
  }));

  const handleSelectAnswer = () => {
    isSelected ? dispatch(removeAnswer(answer)) : dispatch(addAnswer(answer));
  };
  return (
    <label className="flex flex-row gap-4 p-3 rounded-md bg-base-300">
      <input
        type="checkbox"
        onClick={handleSelectAnswer}
        onChange={() => {}}
        checked={isSelected}
        defaultChecked={isSelected}
        className="checkbox checkbox-primary"
      />

      <p>{answer.text}</p>
    </label>
  );
};

export const CheckboxAnswer = React.memo(CheckboxAnswerComponent);
