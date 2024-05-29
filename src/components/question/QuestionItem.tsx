import React from "react";

import { IAnswer } from "../../models/IAnswer";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addQuestionAnswer,
  removeQuestionById,
} from "../../store/reducers/EditQuizSlice";
import { Answer } from "../answer/Answer";

interface QuestionItemProps {
  questionId: number;
}

const QuestionItem: React.FC<QuestionItemProps> = React.memo(
  ({ questionId, ...rest }) => {
    const dispatch = useAppDispatch();

    const questionIndex = useAppSelector((state) =>
      state.editQuizSlice.quiz.questions.findIndex((i) => i.id === questionId)
    );

    const question = useAppSelector(
      (state) => state.editQuizSlice.quiz.questions[questionIndex]
    );

    const handleRemoveQuestionById = () => {
      dispatch(removeQuestionById(question.id));
    };

    const handleAddAnswer = () => {
      const newAnswer: IAnswer = {
        id: question.answers.length
          ? question.answers[question.answers.length - 1].id + 1
          : 1,
        text: "",
        isTrue: false,
      };

      dispatch(
        addQuestionAnswer({ questionId: question.id, answer: newAnswer })
      );
    };

    return (
      <>
        <div className="mb-0 divider">Answers</div>
        <div className="flex flex-col gap-1">
          {question.answers.map((item, key) => {
            return (
              <Answer {...{ questionId: questionId, ...item }} key={key} />
            );
          })}
        </div>

        <div className="my-0 divider"></div>

        <div className="flex flex-row justify-end">
          <div className="flex flex-row justify-end w-full gap-2">
            <button
              onClick={handleRemoveQuestionById}
              className="btn btn-error"
            >
              Delete
            </button>
            <button className="btn btn-primary" onClick={handleAddAnswer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              New answer
            </button>
          </div>
        </div>
      </>
    );
  }
);

export default QuestionItem;
