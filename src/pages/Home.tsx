import React, { useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import { QuizCard } from "../components/quiz/QuizCard";
import { useAppSelector } from "../hooks/redux";
import { IQuiz } from "../models/IQuiz";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY_QUIZZES } from "../store/reducers/QuizSlice";

const Home = () => {
  const quizzes: IQuiz[] = useAppSelector((state) => state.quizSlice.quizzes);
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY_QUIZZES);

  useEffect(() => {
    setItem(quizzes);
  }, [quizzes, setItem]);
  return (
    <main className="flex justify-center w-full h-full py-4">
      <div className="container flex flex-col items-center min-h-full px-5">
        <h1 className="w-full mt-2 mb-4 text-2xl text-center">
          Welcome to React-quiz
        </h1>

        <div className="flex flex-col justify-center w-full h-full max-w-5xl min-w-max">
          {/* {quizzes.length !== 0 && (
            <label className="flex items-center gap-2 mb-4 input input-bordered">
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          )} */}

          <div className="flex flex-col gap-6 p-4 mb-4">
            {quizzes.length === 0 && (
              <div className="w-full px-2 py-5 my-3 text-xl rounded shadow-xl bg-info text-info-content">
                Quiz Cards not found :{"("}
              </div>
            )}

            {quizzes.map((item) => (
              <QuizCard key={item.id} {...{ quiz: item }} />
            ))}
          </div>

          <Link to={"/create"} className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
