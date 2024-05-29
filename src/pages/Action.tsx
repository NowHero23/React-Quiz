import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { updatePage } from "../store/reducers/ActionSlice";
import { ChooseAnswer } from "../components/action/ChooseAnswer";

const Action = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  const { selectedQuiz, page, answerSelected } = useAppSelector((state) => {
    return {
      selectedQuiz: state.actionSlice.selectedQuiz,
      page: state.actionSlice.page,
      answerSelected:
        state.actionSlice.answers.findIndex(
          (i) =>
            i.questionId ===
            state.actionSlice.selectedQuiz.questions[state.actionSlice.page - 1]
              .id
        ) !== -1,
    };
  });

  const handlePrev = () => {
    if (page > 1) {
      setLoading(true);
      dispatch(updatePage(page - 1));
      navigate(`/action/${selectedQuiz.id}/${page - 1}`);
    }
  };
  const handleNext = () => {
    if (page < selectedQuiz.questions.length && answerSelected) {
      setLoading(true);
      dispatch(updatePage(page + 1));
      navigate(`/action/${selectedQuiz.id}/${page + 1}`);
    }
  };
  const handleResult = () => {
    if (page === selectedQuiz.questions.length && answerSelected) {
      navigate(`/result/${selectedQuiz.id}`);
    }
  };

  useEffect(() => {
    if (selectedQuiz.id === 0) {
      navigate("/");
    }
  });

  useEffect(() => {
    if (loading)
      setTimeout(() => {
        setLoading(false);
      }, 400);
  }, [loading]);

  return (
    <main className="flex justify-center w-full h-full py-4">
      <div className="container flex flex-col items-center min-h-full px-5">
        {selectedQuiz.id !== 0 && (
          <>
            <h1 className="w-full mt-2 mb-6 text-2xl text-center">
              {selectedQuiz?.title} {page}/{selectedQuiz?.questions.length}
            </h1>

            <div className="flex flex-col w-full rounded bg-base-200">
              {loading ? (
                <div className="flex justify-center w-full h-64">
                  <span className="loading loading-spinner loading-lg" />
                </div>
              ) : (
                <>
                  <h2 className="w-full p-5 text-2xl text-center">
                    {selectedQuiz?.questions[page - 1].title}
                  </h2>
                  <ChooseAnswer {...{ quiz: selectedQuiz, page }} />
                </>
              )}

              <div className="flex flex-row justify-between mt-4">
                <button
                  disabled={page === 1}
                  className="btn btn-neutral"
                  onClick={handlePrev}
                >
                  Back
                </button>
                {page !== selectedQuiz.questions.length ? (
                  <button
                    disabled={!answerSelected}
                    className="btn btn-neutral"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleResult}
                    disabled={!answerSelected}
                    className="btn btn-success"
                  >
                    Result
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Action;
