import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import SuperInputText from "../../../hw04/common/c1-SuperInputText/SuperInputText";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type SuperDebouncedInputPropsType = Omit<
  DefaultInputPropsType,
  "type"
> & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: ReactNode;
  spanClassName?: string;
  onDebouncedChange?: (value: string) => void;
  className?: string; // <-- добавить для поддержки класса
};

const SuperDebouncedInput: React.FC<SuperDebouncedInputPropsType> = ({
  onChangeText,
  onDebouncedChange,
  className,
  ...restProps
}) => {
  const [timerId, setTimerId] = useState<number | undefined>(undefined);

  const onChangeTextCallback = (value: string) => {
    onChangeText?.(value);

    if (onDebouncedChange) {
      if (timerId) {
        clearTimeout(timerId);
      }
      const newTimerId = window.setTimeout(() => {
        onDebouncedChange(value);
      }, 1500);
      setTimerId(newTimerId);
    }
  };

  return (
    <SuperInputText
      onChangeText={onChangeTextCallback}
      className={className}
      {...restProps}
    />
  );
};

export default SuperDebouncedInput;
