import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux";
import { cn, count } from "../helpers/utils";
import { NavLink } from "react-router-dom";

const Result = () => {
  const data = useAppSelector((state) => state.actionSlice);
  const [progresInfo, setProgresInfo] = useState<{
    count: {
      correct: number;
      all: number;
    };
    score: number;
    maxScore: number;
    percent: number;
  }>({
    count: {
      correct: 0,
      all: 0,
    },
    score: 0,
    maxScore: 0,
    percent: 0,
  });
  const radialProgressStyles = {
    "--value": progresInfo?.percent.toFixed(0) || 0,
    "--size": "10rem",
    "--thickness": "1.5rem",
  } as React.CSSProperties;

  useEffect(() => {
    const getProgressInfo = () => {
      const correctAnswers = data.selectedQuiz.questions.map((question) => ({
        answers: question.answers.filter((ans) => ans.isTrue),
        questionId: question.id,
      }));

      const values = correctAnswers.map((currect) => {
        const selectedAnswers = data.answers.filter(
          (selected) => selected.questionId === currect.questionId
        );

        if (
          selectedAnswers.length !== currect.answers.length ||
          !selectedAnswers.every((item) => item.isTrue === true)
        )
          return 0;

        const index = data.selectedQuiz.questions.findIndex(
          (item) => item.id === currect.questionId
        );
        return data.selectedQuiz.questions[index].cost;
      });

      const score = count(values);
      const maxScore = count(
        data.selectedQuiz.questions.map((item) => item.cost)
      );
      return {
        count: {
          correct: values.filter((i) => i > 0).length,
          all: values.length,
        },
        score: count(values),
        maxScore: count(data.selectedQuiz.questions.map((item) => item.cost)),
        percent: (score / maxScore) * 100,
      };
    };
    setProgresInfo(getProgressInfo);
  }, [setProgresInfo, data]);

  return (
    <main className="flex justify-center w-full h-full py-4">
      <div className="container flex flex-col items-center max-w-3xl min-h-full px-5">
        <h1 className="w-full mt-2 mb-6 text-2xl text-center">
          Result of {data.selectedQuiz.title}
        </h1>

        <div className="flex flex-col items-center w-full p-5 rounded bg-base-200">
          <div className="flex flex-row w-full gap-5">
            <div className="flex flex-col items-center w-full gap-2 p-4 rounded max-w-60 bg-base-300">
              <div
                className={cn(
                  " radial-progress border-4 border-primary",
                  progresInfo?.percent > 66
                    ? "text-success border-success"
                    : progresInfo?.percent > 33
                    ? "text-warning border-warning"
                    : "text-error border-error"
                )}
                style={radialProgressStyles}
                role="progressbar"
              >
                {progresInfo?.percent.toFixed(0) || 0}%
              </div>
              <p>
                Score:{progresInfo?.score}/{progresInfo?.maxScore}
              </p>
              <p>
                Currect answers:{progresInfo?.count.correct}/
                {progresInfo?.count.all}
              </p>
              <NavLink to={"/"} className="w-full mt-2 btn btn-success">
                Go home
              </NavLink>
            </div>
            <div className="flex flex-col w-full gap-2">
              {data.selectedQuiz.questions.map((question, key) => {
                return (
                  <div
                    key={key}
                    className="flex flex-col w-full gap-2 p-4 rounded-md bg-base-300"
                  >
                    <h3 className="text-xl">{question.title}</h3>

                    <div className="flex flex-col gap-1">
                      {question.answers.map((answer, key2) => {
                        return (
                          <div
                            key={key2}
                            className={cn(
                              "border-base-200 rounded p-2 bg-base-200",

                              data.answers.findIndex(
                                (item) =>
                                  item.id === answer.id &&
                                  item.questionId === question.id &&
                                  !item.isTrue
                              ) !== -1 && "!bg-error",

                              answer.isTrue &&
                                "border-success border-4 text-success-content",

                              data.answers.findIndex(
                                (item) =>
                                  item.id === answer.id &&
                                  item.questionId === question.id &&
                                  item.isTrue
                              ) !== -1 && "!bg-success"
                            )}
                          >
                            {answer.text}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Result;
