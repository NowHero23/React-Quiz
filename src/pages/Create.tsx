import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { QuizCreateForm } from "../components/quiz/QuizCreateForm";
import { useEffect } from "react";
import { updateQuiz } from "../store/reducers/EditQuizSlice";

const Create = () => {
  const dispatch = useAppDispatch();

  const id = useAppSelector((state) => {
    const quizzes = state.quizSlice.quizzes;
    return quizzes.length === 0 ? 1 : quizzes[quizzes.length - 1].id + 1;
  });

  useEffect(() => {
    dispatch(updateQuiz({ id, title: "", description: "", questions: [] }));
  });

  return (
    <>
      <main className="flex justify-center w-full h-full py-4">
        <div className="container flex flex-col items-center min-h-full px-5 ">
          <h1 className="w-full mt-2 mb-4 text-2xl text-center">
            Create new Quiz
          </h1>

          <div className="flex flex-col w-full h-full max-w-5xl min-w-max">
            <QuizCreateForm />
          </div>
        </div>
      </main>
    </>
  );
};

export default Create;
