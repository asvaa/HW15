const initState = {
  themeId: 1,
};

export type ThemeStateType = typeof initState;

type ChangeThemeIdAction = {
  type: "SET_THEME_ID";
  id: number;
};

type ThemeActions = ChangeThemeIdAction;

export const themeReducer = (
  state: ThemeStateType = initState,
  action: ThemeActions
): ThemeStateType => {
  switch (action.type) {
    case "SET_THEME_ID":
      return { ...state, themeId: action.id };
    default:
      return state;
  }
};

export const changeThemeId = (id: number): ChangeThemeIdAction => ({
  type: "SET_THEME_ID",
  id,
});
