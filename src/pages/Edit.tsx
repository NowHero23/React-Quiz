import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { IQuiz } from "../models/IQuiz";
import { QuizEditForm } from "../components/quiz/QuizEditForm";

const Edit = () => {
  const quiz: IQuiz = useAppSelector((state) => state.editQuizSlice.quiz);
  const navigate = useNavigate();

  useEffect(() => {
    if (quiz.id === 0) {
      navigate("/error/404");
    }
  });

  return (
    <>
      <main className="flex justify-center w-full h-full py-4">
        <div className="container flex flex-col items-center min-h-full px-5 ">
          <h1 className="w-full mt-2 mb-4 text-2xl text-center">
            React-quiz Edit
          </h1>

          {quiz.id > 0 && (
            <div className="flex flex-col w-full h-full max-w-5xl min-w-max">
              <QuizEditForm {...quiz} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Edit;
