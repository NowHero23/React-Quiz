import React from "react";
import { NavLink as Link } from "react-router-dom";
import { IQuiz } from "../../models/IQuiz";
import { removeQuiz } from "../../store/reducers/QuizSlice";
import { useAppDispatch } from "../../hooks/redux";
import { updateQuiz } from "../../store/reducers/EditQuizSlice";
import { updateSelectedQuiz } from "../../store/reducers/ActionSlice";

interface QuizCardProps {
  quiz: IQuiz;
}

const QuizCardComponent: React.FC<QuizCardProps> = React.memo(
  ({ quiz, ...rest }) => {
    const dispatch = useAppDispatch();

    const handleEdit = () => {
      dispatch(updateQuiz(quiz));
    };
    const handleInitAction = () => {
      dispatch(updateSelectedQuiz(quiz));
    };
    return (
      <>
        <div className="rounded shadow-xl card card-compact bg-base-300">
          <div className="card-body">
            <Link
              to={`/React-Quiz/init/`}
              className="card-title hover:underline"
            >
              {quiz.title}
            </Link>
            <p>{quiz.description}</p>

            <div className="justify-between card-actions">
              <div className="flex flex-col justify-center h-full gap-1">
                <div className="flex items-center justify-end gap-1">
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
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                    />
                  </svg>
                  Questions: {quiz.questions.length}
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => {
                    dispatch(removeQuiz(quiz.id));
                  }}
                  className="btn btn-outline btn-error"
                >
                  delete
                </button>
                <Link
                  onClick={handleEdit}
                  to={`/React-Quiz/edit/`}
                  className="btn btn-ghost btn-secondary"
                >
                  edit
                </Link>
                <Link
                  onClick={handleInitAction}
                  to={`/React-Quiz/init/`}
                  className="btn btn-primary"
                >
                  Go
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export const QuizCard = QuizCardComponent;
