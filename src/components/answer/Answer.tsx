import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IAnswer } from "../../models/IAnswer";
import {
  removeQuestionAnswerById,
  updateQuestionAnswerIsTrue,
  updateQuestionAnswerText,
} from "../../store/reducers/EditQuizSlice";

interface AnswerProps extends IAnswer {
  questionId: number;
}

export default function AnswerComponent({
  id,
  questionId,
  ...rest
}: AnswerProps) {
  const dispatch = useAppDispatch();

  const questionIndex = useAppSelector((state) =>
    state.editQuizSlice.quiz.questions.findIndex((i) => i.id === questionId)
  );
  const index = useAppSelector((state) =>
    state.editQuizSlice.quiz.questions[questionIndex]?.answers.findIndex(
      (i) => i.id === id
    )
  );
  const answer = useAppSelector(
    (state) => state.editQuizSlice.quiz.questions[questionIndex].answers[index]
  );

  const handleRemoveAnswer = () => {
    dispatch(removeQuestionAnswerById({ questionId, answerId: id }));
  };

  const handleAnswerIsTrue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateQuestionAnswerIsTrue({
        questionId,
        answerId: id,
        isTrue: !answer.isTrue,
      })
    );
  };
  const handleAnswerText = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateQuestionAnswerText({
        questionId,
        answerId: id,
        text: e.target.value,
      })
    );
  };
  return (
    <div className="flex flex-row items-center gap-2">
      <input
        type="checkbox"
        className="checkbox"
        defaultChecked={answer.isTrue}
        onChange={handleAnswerIsTrue}
      />
      <label className="w-full form-control">
        {/* <div className="label">
          <span className="label-text">Answer {id}</span>
        </div> */}
        <input
          value={answer.text}
          onChange={handleAnswerText}
          type="text"
          placeholder="Answer"
          className="w-full input input-bordered"
        />
      </label>
      <button className="btn btn-error" onClick={handleRemoveAnswer}>
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
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

export const Answer = React.memo(AnswerComponent);
