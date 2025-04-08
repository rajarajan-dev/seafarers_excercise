import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChecklistState,
  DocumentStatus,
  DocumentItem,
} from "./../types/PreDepartureDocsTypes";

const initialState: ChecklistState = {
  categories: [], // Will be populated by API or mock data
};

const preDepartureDocSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<ChecklistState["categories"]>) {
      state.categories = action.payload;
    },
    updateDocumentStatus(
      state,
      action: PayloadAction<{
        categoryId: string;
        documentId: string;
        newStatus: DocumentStatus;
      }>
    ) {
      const { categoryId, documentId, newStatus } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (!category) return;

      const doc = category.documents.find((d) => d.id === documentId);
      if (!doc) return;

      // AttentionRequired logic
      if (doc.type === "AttentionRequired" && newStatus === "Submitted") {
        doc.status = "Pending";
        return;
      }

      // Allow updates for other types
      if (doc.status === "Pending") return; // No actions allowed

      doc.status = newStatus;
    },

    validateAttentionDocument(
      state,
      action: PayloadAction<{
        categoryId: string;
        documentId: string;
        newType: "Mandatory" | "Optional";
      }>
    ) {
      const { categoryId, documentId, newType } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (!category) return;

      const doc = category.documents.find((d) => d.id === documentId);
      if (!doc) return;

      doc.type = newType;
      doc.status = "None"; // Reset so user can take action now
    },
  },
});

export const {
  setCategories,
  updateDocumentStatus,
  validateAttentionDocument,
} = preDepartureDocSlice.actions;

export default preDepartureDocSlice.reducer;
