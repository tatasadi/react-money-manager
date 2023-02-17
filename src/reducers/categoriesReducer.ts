export interface Category {
  id: string;
  name: string;
}

export interface CategoriesState {
  selectedTab: string;
  categoriesIncome: Category[];
  categoriesExpense: Category[];
  currentEditingId: string;
}

export enum CategoriesActions {
  UpdateSelectedTab,
  UpdateCategory,
  UpdateCurrentEditingId,
}

export default function categoriesReducer(state: CategoriesState, action) {
  switch (action.type) {
    case CategoriesActions.UpdateSelectedTab:
      return { ...state, selectedTab: action.payload };
    case CategoriesActions.UpdateCategory:
      switch (action.payload.categoryType) {
        case "income":
          return state.categoriesIncome.map((c) =>
            c.id === action.payload.id
              ? { ...c, name: action.payload.newName }
              : c
          );
        case "expense":
          return state.categoriesExpense.map((c) =>
            c.id === action.payload.id
              ? { ...c, name: action.payload.newName }
              : c
          );
      }
    case CategoriesActions.UpdateCurrentEditingId:
      return { ...state, currentEditingId: action.payload };
    default:
      throw new Error("Unhandled categories action " + action.type);
  }
}
