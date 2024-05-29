import { memo, useState } from "react";

interface QuizTextInputProps extends React.HTMLProps<HTMLInputElement> {
  text?: string | undefined;
  label: string;
}

const QuizTextInputComponent = ({ ...rest }: QuizTextInputProps) => {
  const [text, setText] = useState(rest.text);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setText(event.target.value);

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{rest.label}</span>
      </div>
      <input
        onChange={handleChange}
        type="text"
        placeholder={rest.placeholder}
        className="input input-bordered w-full"
        {...rest}
      />
    </label>
  );
};

export const QuizTextInput = memo(QuizTextInputComponent);
//export const QuizTextInput = QuizTextInputComponent;
