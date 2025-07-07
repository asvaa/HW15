import React from "react";

// Можно заменить на SVG, если потребуется
const downIcon = "[\\/]";
const upIcon = "[/\\]";
const noneIcon = "[--]";

export type SuperSortPropsType = {
  id?: string;
  sort: string;
  value: string;
  onChange: (newSort: string) => void;
};

// Корректная функция смены состояния сортировки
export const pureChange = (sort: string, down: string, up: string) => {
  if (sort === "") return down;
  if (sort === down) return up;
  if (sort === up) return "";
  return down;
};

const SuperSort: React.FC<SuperSortPropsType> = ({
  sort,
  value,
  onChange,
  id = "hw15",
}) => {
  const up = "0" + value;
  const down = "1" + value;

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up));
  };

  // Определяем, какой icon показывать
  const icon = sort === down ? downIcon : sort === up ? upIcon : noneIcon;

  return (
    <span
      id={id + "-sort-" + value}
      onClick={onChangeCallback}
      style={{
        cursor: "pointer",
        marginLeft: 8,
        userSelect: "none",
        fontFamily: "monospace",
        fontSize: "16px",
      }}
    >
      {icon}
    </span>
  );
};

export default SuperSort;
