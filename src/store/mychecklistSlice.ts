import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChecklistCategory, ChecklistItem } from "../types/CheckListTypes";
import { RootState } from "./store";

interface MyChecklistState {
  data: ChecklistCategory[];
}

const initialState: MyChecklistState = {
  data: [],
};

// Helper functions for category operations
const categoryOperations = {
  findCategory: (state: MyChecklistState, titleId: string) =>
    state.data.find((category) => category.titleId === titleId),

  addCategory: (state: MyChecklistState, category: ChecklistCategory) => {
    state.data.push(category);
  },

  removeCategory: (state: MyChecklistState, titleId: string) => {
    state.data = state.data.filter((category) => category.titleId !== titleId);
  },
};

// Helper functions for item operations
const itemOperations = {
  addItem: (state: MyChecklistState, titleId: string, item: ChecklistItem) => {
    const category = categoryOperations.findCategory(state, titleId);
    category?.items.push(item);
  },

  removeItem: (state: MyChecklistState, titleId: string, itemId: string) => {
    const category = categoryOperations.findCategory(state, titleId);
    if (category) {
      category.items = category.items.filter((item) => item.itemId !== itemId);
    }
  },

  updateItems: (
    state: MyChecklistState,
    titleId: string,
    items: ChecklistItem[]
  ) => {
    const category = categoryOperations.findCategory(state, titleId);
    if (category) {
      category.items = items;
    }
  },

  clearItems: (state: MyChecklistState, titleId: string) => {
    const category = categoryOperations.findCategory(state, titleId);
    if (category) {
      category.items = [];
    }
  },

  toggleItemStatus: (
    state: MyChecklistState,
    titleId: string,
    itemId: string
  ) => {
    const category = categoryOperations.findCategory(state, titleId);
    if (category) {
      const item = category.items.find((i) => i.itemId === itemId);
      if (item) {
        item.status = item.status === "Todo" ? "Done" : "Todo";
      }
    }
  },
};

const mychecklistSlice = createSlice({
  name: "mychecklist",
  initialState,
  reducers: {
    addCheckListCategory: (state, action: PayloadAction<ChecklistCategory>) => {
      if (action.payload.titleName)
        categoryOperations.addCategory(state, action.payload);
    },

    removeCheckListCategory: (
      state,
      action: PayloadAction<{ titleId: string }>
    ) => {
      categoryOperations.removeCategory(state, action.payload.titleId);
    },

    addCheckListItem: (
      state,
      action: PayloadAction<{ titleId: string; item: ChecklistItem }>
    ) => {
      itemOperations.addItem(
        state,
        action.payload.titleId,
        action.payload.item
      );
    },

    removeCheckListItem: (
      state,
      action: PayloadAction<{ titleId: string; itemId: string }>
    ) => {
      itemOperations.removeItem(
        state,
        action.payload.titleId,
        action.payload.itemId
      );
    },

    updateMultipleCheckListItems: (
      state,
      action: PayloadAction<{ titleId: string; items: ChecklistItem[] }>
    ) => {
      itemOperations.updateItems(
        state,
        action.payload.titleId,
        action.payload.items
      );
    },

    removeAllCheckListItems: (
      state,
      action: PayloadAction<{ titleId: string }>
    ) => {
      itemOperations.clearItems(state, action.payload.titleId);
    },

    toggleCheckListItemStatus: (
      state,
      action: PayloadAction<{
        titleId: string;
        itemId: string;
      }>
    ) => {
      itemOperations.toggleItemStatus(
        state,
        action.payload.titleId,
        action.payload.itemId
      );
    },
  },
});

// Action creators
export const {
  addCheckListCategory,
  removeCheckListCategory,
  addCheckListItem,
  removeCheckListItem,
  updateMultipleCheckListItems,
  removeAllCheckListItems,
  toggleCheckListItemStatus,
} = mychecklistSlice.actions;

// Selectors
export const selectMyCheckList = (state: RootState) => state.mycheckList;
export const selectCategoryById = (titleId: string) => (state: RootState) =>
  state.mycheckList.data.find((category) => category.titleId === titleId);

export default mychecklistSlice.reducer;
