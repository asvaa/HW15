import React from "react";
import SuperSelect from "../../../hw07/common/c5-SuperSelect/SuperSelect";
import { Pagination } from "@mui/material";
import s from "./SuperPagination.module.css";

export type SuperPaginationPropsType = {
  id?: string;
  page: number;
  itemsCountForPage: number;
  totalCount: number;
  onChange: (page: number, count: number) => void;
};

const SuperPagination: React.FC<SuperPaginationPropsType> = ({
  page,
  itemsCountForPage,
  totalCount,
  onChange,
  id = "hw15",
}) => {
  const lastPage = Math.ceil(totalCount / itemsCountForPage);

  const onChangeCallback = (event: any, value: number) => {
    onChange(value, itemsCountForPage);
  };

  const onChangeSelect = (event: any) => {
    onChange(1, +event.target.value); // сброс на первую страницу при смене числа строк
  };

  return (
    <div className={s.pagination}>
      <Pagination
        id={id + "-pagination"}
        sx={{
          marginRight: "16px",
          ".MuiPaginationItem-root": {
            borderRadius: "6px",
            minWidth: "32px",
            height: "32px",
          },
        }}
        page={page}
        count={lastPage}
        onChange={onChangeCallback}
        hideNextButton
        hidePrevButton
      />
      <span className={s.text1}>показать</span>
      <SuperSelect
        id={id + "-pagination-select"}
        value={itemsCountForPage}
        options={[
          { id: 4, value: "4" },
          { id: 7, value: "7" },
          { id: 10, value: "10" },
        ]}
        onChange={onChangeSelect}
      />
      <span className={s.text2}>строк в таблице</span>
    </div>
  );
};

export default SuperPagination;
