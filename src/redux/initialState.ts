import { CategoriesState } from "../models/CategoriesState";
import { CategoryType } from "../models/CategoryType";
import { ModalState } from "../models/ModalState";

export const categoriesInitialState: CategoriesState = {
  selectedTab: "income",
  categories: [
    {
      id: "48299da5-b1eb-4fd1-82d1-d58e9f3c71ed",
      name: "Salary",
      type: CategoryType.Income,
    },
    {
      id: "434cd88f-288f-4aa0-a0f1-af6bee4d019e",
      name: "Financial Income",
      type: CategoryType.Income,
    },
    {
      id: "09fe9af8-f9b0-4bf4-8fcf-673e1d4efc55",
      name: "Other (Income)",
      type: CategoryType.Income,
    },
    {
      id: "1e671ae1-429c-4e7f-b4a9-7fad95202bd0",
      name: "Home",
      type: CategoryType.Expense,
    },
    {
      id: "ff8c7256-b3ea-42ea-b092-7218c3a1cddb",
      name: "Supermarket",
      type: CategoryType.Expense,
    },
    {
      id: "30c38c18-ce5d-49f1-b5e2-15752613214b",
      name: "Eating Out",
      type: CategoryType.Expense,
    },
    {
      id: "b183cd0c-b5e6-46dc-844b-f49171d0d708",
      name: "Clothing",
      type: CategoryType.Expense,
    },
    {
      id: "e32c3003-dadf-4450-910a-151fb7e4bd6c",
      name: "Health",
      type: CategoryType.Expense,
    },
    {
      id: "db365832-0b17-4ce2-8797-3bc0ce8cf0b6",
      name: "Travel",
      type: CategoryType.Expense,
    },
    {
      id: "a992d9d0-2fb9-42dc-b012-4ba2e3df31a3",
      name: "Transportation",
      type: CategoryType.Expense,
    },
    {
      id: "adef755b-7a3b-41ef-806e-dee157245c6b",
      name: "Gift",
      type: CategoryType.Expense,
    },
    {
      id: "213de0f9-2d79-453d-82cc-95a1f192e58c",
      name: "Other (Expenses)",
      type: CategoryType.Expense,
    },
  ],
};

export const modalInitialState: ModalState = {
  open: false,
  title: "",
  text: "",
  actionButtonText: "",
  confirmed: false,
  hasInput: false,
};
