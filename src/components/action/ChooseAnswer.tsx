import { IQuiz } from "../../models/IQuiz";
import { CheckboxAnswer } from "./CheckboxAnswer";
import { RadioAnswer } from "./RadioAnswer";
import { useAppSelector } from "../../hooks/redux";

interface ChooseAnswerProps {
  quiz: IQuiz;
}

const ChooseAnswerComponent = ({ quiz, ...rest }: ChooseAnswerProps) => {
  const { page } = useAppSelector((state) => ({
    page: state.actionSlice.page,
  }));

  return (
    <div className="flex flex-col gap-2">
      {quiz.questions[page - 1].answers.filter((i) => i.isTrue).length === 1
        ? quiz.questions[page - 1].answers.map((item, key) => {
            return (
              <RadioAnswer
                key={key}
                {...{ questionId: quiz.questions[page - 1].id, ...item }}
              />
            );
          })
        : quiz.questions[page - 1].answers.map((item, key) => {
            return (
              <CheckboxAnswer
                key={key}
                {...{ questionId: quiz.questions[page - 1].id, ...item }}
              />
            );
          })}
    </div>
  );
};

export const ChooseAnswer = ChooseAnswerComponent;
