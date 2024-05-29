import { NavLink as Link, useNavigate } from "react-router-dom";
import { IQuiz } from "../../models/IQuiz";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { QuizDetails } from "./QuizDetails";
import { updateQuiz } from "../../store/reducers/QuizSlice";
import QuestionList from "../question/QuestionList";

interface QuizFormProps extends IQuiz {
  id: number;
}

export default function QuizEditFormComponent({
  id,
  description,
  title,
  ...rest
}: QuizFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const quiz = useAppSelector((state) => state.editQuizSlice.quiz);

  const handleSave = () => {
    if (quiz.title.length > 0) {
      dispatch(updateQuiz(quiz));
      return navigate("/");
    }
  };

  const validate = () => {
    return quiz.title.length > 0 && quiz.description.length > 0;
  };

  return (
    <>
      <QuizDetails />

      <QuestionList />

      <div className="flex flex-row gap-1">
        <button
          disabled={!validate()}
          className="my-2 text-xl btn btn-success"
          onClick={handleSave}
        >
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
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
          Save
        </button>
        <Link to={"/"} className="my-2 text-xl btn btn-warning">
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
          Cancel
        </Link>
      </div>
    </>
  );
}

export const QuizEditForm = QuizEditFormComponent;
