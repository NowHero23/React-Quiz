import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  updateDescription,
  updateTitle,
} from "../../store/reducers/EditQuizSlice";

interface QuizDetailsProps {}

const QuizDetailsComponent: React.FC<QuizDetailsProps> = React.memo(() => {
  const dispatch = useAppDispatch();
  const { title, description } = useAppSelector((state) => ({
    title: state.editQuizSlice.quiz.title,
    description: state.editQuizSlice.quiz.description,
  }));

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateTitle(e.target.value));
  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateDescription(e.target.value));

  return (
    <div className="flex flex-col gap-2 p-2 mb-4 border rounded shadow-xl">
      <label className="w-full form-control">
        <div className="label">
          <span className="label-text">Title</span>
        </div>
        <input
          value={title}
          onChange={handleChangeTitle}
          type="text"
          placeholder="Title"
          className="w-full input input-bordered"
        />
      </label>

      <label className="w-full form-control">
        <div className="label">
          <span className="label-text">Description</span>
        </div>
        <input
          value={description}
          onChange={handleChangeDescription}
          type="text"
          placeholder="Description"
          className="w-full input input-bordered"
        />
      </label>
    </div>
  );
});

export const QuizDetails = QuizDetailsComponent;
