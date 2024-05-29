import React from "react";

import QuestionItem from "./QuestionItem";
import { QuestionDetails } from "./QuestionDetails";
import { IQuestion } from "../../models/IQuestion";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { addQuestion } from "../../store/reducers/EditQuizSlice";

interface QuestionListProps {}

const QuestionList: React.FC<QuestionListProps> = React.memo(() => {
  const dispatch = useAppDispatch();

  const questions = useAppSelector(
    (state) => state.editQuizSlice.quiz.questions
  );

  const handleAddQuestion = () => {
    const newQuestion: IQuestion = {
      id: questions.length ? questions[questions.length - 1].id + 1 : 1,
      title: "",
      answers: [],
      cost: 1,
    };

    dispatch(addQuestion(newQuestion));
  };

  return (
    <>
      <div className="flex flex-col ">
        {questions.length === 0 && (
          <div className="w-full px-2 py-5 mb-4 text-xl rounded shadow-xl bg-info text-info-content">
            Questions not found :{"("}
          </div>
        )}
        {questions.map((question, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 p-2 mb-4 border rounded shadow-xl border-primary bg-base-100"
          >
            <QuestionDetails
              {...{
                id: question.id,
              }}
            />

            <QuestionItem
              {...{
                questionId: question.id,
              }}
            />
          </div>
        ))}
      </div>

      <button onClick={handleAddQuestion} className="btn btn-primary">
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
        New Question
      </button>
    </>
  );
});
export default QuestionList;
