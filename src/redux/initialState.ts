import { CategoriesState } from "../models/CategoriesState";
import { CategoryType } from "../models/CategoryType";
import { ModalState } from "../models/ModalState";
import { TransactionsState } from "../models/TransactionsState";
import { dateToString } from "../utils";

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

export const transactionsInitialState: TransactionsState = {
  selectedTab: "all",
  modal: {
    open: false,
  },
  filterDate: dateToString(new Date()),
  transactions: [
    {
      id: "8808a818-c62f-49b4-a33a-9c7b68290e80",
      description: "Ticket to berlin",
      category: "db365832-0b17-4ce2-8797-3bc0ce8cf0b6",
      type: 1,
      amount: 69.99,
      date: "2023-01-23",
    },
    {
      id: "378bd806-0dd0-4e59-8fce-697dfe829eb2",
      description: "Burger King",
      category: "30c38c18-ce5d-49f1-b5e2-15752613214b",
      type: 1,
      amount: 65.99,
      date: "2023-01-21",
    },
    {
      id: "f93735b9-1587-4c38-8225-a22f3d81c397",
      type: 0,
      category: "48299da5-b1eb-4fd1-82d1-d58e9f3c71ed",
      description: "Salary of February",
      amount: 2100,
      date: "2023-02-28",
    },
    {
      id: "78505e90-f43f-4e2f-a2af-61a4099a1bd9",
      description: "REWE",
      category: "ff8c7256-b3ea-42ea-b092-7218c3a1cddb",
      type: 1,
      amount: 34.43,
      date: "2023-02-23",
    },
    {
      id: "f5d46f4c-148e-4669-bfea-5445dff8d202",
      description: "Lidl",
      category: "ff8c7256-b3ea-42ea-b092-7218c3a1cddb",
      type: 1,
      amount: 102.99,
      date: "2023-02-12",
    },
    {
      id: "d2b09ffe-e6ec-4743-ba51-39455bd4de04",
      description: "Lidl",
      category: "ff8c7256-b3ea-42ea-b092-7218c3a1cddb",
      type: 1,
      amount: 102.99,
      date: "2023-03-01",
    },
    {
      id: "5b08e8c7-7b6c-4e4d-92fd-8c8f93d1a127",
      type: 1,
      category: "ff8c7256-b3ea-42ea-b092-7218c3a1cddb",
      description: "Aldi",
      amount: 77.56,
      date: "2023-03-03",
    },
    {
      id: "8740e191-f619-46e3-8359-3d4bccbd1074",
      type: 0,
      category: "48299da5-b1eb-4fd1-82d1-d58e9f3c71ed",
      description: "Salary December",
      amount: 2000,
      date: "2022-12-31",
    },
    {
      id: "da80d5f5-68c0-4263-b761-a88faf4817b6",
      type: 1,
      category: "ff8c7256-b3ea-42ea-b092-7218c3a1cddb",
      description: "Lidl",
      amount: 56.32,
      date: "2022-11-02",
    },
    {
      id: "f3614991-fd39-444d-8ec1-e393d89b42a1",
      type: 1,
      category: "ff8c7256-b3ea-42ea-b092-7218c3a1cddb",
      description: "Lidl",
      amount: 85.99,
      date: "2022-12-02",
    },
    {
      id: "283da2f4-7898-4fbc-83d5-f17cd6f78fe6",
      type: 1,
      category: "ff8c7256-b3ea-42ea-b092-7218c3a1cddb",
      description: "Rewe",
      amount: 56,
      date: "2022-12-15",
    },
    {
      id: "47deb1e5-764f-4a31-b01b-59a691d7ca05",
      type: 1,
      category: "ff8c7256-b3ea-42ea-b092-7218c3a1cddb",
      description: "Aldi",
      amount: 89.65,
      date: "2022-12-21",
    },
    {
      id: "dab264b1-503c-4f2c-9a30-a4a200248e93",
      type: 1,
      category: "a992d9d0-2fb9-42dc-b012-4ba2e3df31a3",
      description: "Benzin",
      amount: 75,
      date: "2023-02-17",
    },
    {
      id: "74f687cd-eb6e-4d6e-8516-609929fb02ba",
      type: 0,
      category: "48299da5-b1eb-4fd1-82d1-d58e9f3c71ed",
      description: "Salary January",
      amount: 2000,
      date: "2023-01-31",
    },
    {
      id: "c5d9705e-b32d-4d6b-9560-b6a1c83a4d9c",
      type: 1,
      category: "e32c3003-dadf-4450-910a-151fb7e4bd6c",
      description: "Fitness",
      amount: 10,
      date: "2023-03-16",
    },
    {
      id: "2b6e5d28-ee51-4672-8a6f-9bc622acbf0e",
      type: 0,
      category: "48299da5-b1eb-4fd1-82d1-d58e9f3c71ed",
      description: "Salary November",
      amount: 2100,
      date: "2022-11-30",
    },
  ],
};
