import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateNickname } from "../../store/reducers/ActionSlice";

const InitFormComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { nickname, selectedQuizId } = useAppSelector((state) => ({
    nickname: state.actionSlice.nickname,
    selectedQuizId: state.actionSlice.selectedQuiz.id,
  }));

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateNickname(e.target.value));
  };
  const handleSave = () => {
    if (nickname.length > 0) {
      navigate(`/React-Quiz/action/${selectedQuizId}/1`);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full max-w-2xl gap-4 min-w-max">
      <label className="w-full form-control">
        <div className="label">
          <span className="label-text">Nickame</span>
        </div>
        <input
          value={nickname}
          onChange={handleNicknameChange}
          type="text"
          placeholder="Nickname"
          className="w-full input input-bordered"
        />
      </label>

      <button
        disabled={nickname.length < 1}
        onClick={handleSave}
        className="btn btn-primary w-[20%]"
      >
        Go
      </button>
    </div>
  );
};

export const InitForm = InitFormComponent;
