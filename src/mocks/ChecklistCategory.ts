import { ChecklistCategory } from "../types/CheckListTypes";

const checklistData: ChecklistCategory[] = [
  {
    titleId: "shopping123",
    titleName: "My Shopping",
    createdAt: "2025-04-01T10:00:00Z",
    lastItemAdded: "milk",
    items: [
      {
        itemId: "item001",
        name: "Milk",
        status: "Todo",
      },
      {
        itemId: "item002",
        name: "Eggs",
        status: "Done",
      },
      {
        itemId: "item003",
        name: "Bread",
        status: "Todo",
      },
    ],
  },
  {
    titleId: "work456",
    titleName: "Work Tasks",
    createdAt: "2025-03-28T09:15:00Z",
    lastItemAdded: "new item added",
    items: [
      {
        itemId: "item004",
        name: "Finish React Native App",
        status: "Todo",
      },
      {
        itemId: "item005",
        name: "Code Review PR #42",
        status: "Done",
      },
      {
        itemId: "item006",
        name: "Deploy Backend to Staging",
        status: "Todo",
      },
    ],
  },
];

export default checklistData;
