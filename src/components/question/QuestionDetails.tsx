import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  updateQuestionCost,
  updateQuestionTitle,
} from "../../store/reducers/EditQuizSlice";

interface QuestionDetailsProps {
  id: number;
}

const QuestionDetailsComponent: React.FC<QuestionDetailsProps> = React.memo(
  ({ id, ...rest }) => {
    const dispatch = useAppDispatch();

    const index = useAppSelector((state) =>
      state.editQuizSlice.quiz.questions.findIndex((i) => i.id === id)
    );
    const question = useAppSelector(
      (state) => state.editQuizSlice.quiz.questions[index]
    );

    const handleQuestionTitleChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) =>
      dispatch(updateQuestionTitle({ questionId: id, title: e.target.value }));

    const handleQuestionCostIncrement = () => {
      dispatch(updateQuestionCost({ questionId: id, cost: question.cost + 1 }));
    };

    const handleQuestionCostDecrement = () => {
      if (question.cost > 1)
        dispatch(
          updateQuestionCost({ questionId: id, cost: question.cost - 1 })
        );
    };

    return (
      <>
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Question</span>
          </div>
          <input
            value={question.title}
            onChange={handleQuestionTitleChange}
            type="text"
            placeholder="Question"
            className="w-full input input-bordered"
          />
        </label>
        <div className="w-full form-control">
          <div className="label">
            <span className="label-text">Cost</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <button
              onClick={handleQuestionCostDecrement}
              className="text-lg text-center btn btn-circle"
            >
              -
            </button>
            <p>{question.cost}</p>

            <button
              onClick={handleQuestionCostIncrement}
              className="text-lg text-center btn btn-circle"
            >
              +
            </button>
          </div>
        </div>
      </>
    );
  }
);

export const QuestionDetails = QuestionDetailsComponent;
