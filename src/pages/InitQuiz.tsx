import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { clearAnswers, updatePage } from "../store/reducers/ActionSlice";
import { InitForm } from "../components/action/InitForm";

const InitQuiz = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedQuizId = useAppSelector(
    (state) => state.actionSlice.selectedQuiz.id
  );

  useEffect(() => {
    if (selectedQuizId === 0) {
      navigate("/React-Quiz/");
    }

    return () => {
      console.log("clearAnswers()");
      dispatch(clearAnswers());
      dispatch(updatePage(1));
    };
  });

  return (
    <main className="flex justify-center w-full h-full py-4">
      <div className="container flex flex-col items-center min-h-full px-5">
        <h1 className="w-full mt-2 mb-4 text-2xl text-center">
          React-quiz init Quiz {selectedQuizId}
        </h1>

        <InitForm />
      </div>
    </main>
  );
};

export default InitQuiz;
