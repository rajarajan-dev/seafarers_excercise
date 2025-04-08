import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PreDepartureDocList from "../mocks/PreDepartureDocList"; // path as needed
import { DocumentItem, DocumentStatus } from "../types/PreDepartureDocsTypes";
import { RootState } from "./store";

// ... DocumentType, DocumentStatus, DocumentItem definitions

interface PreDepartureDocsState {
  documents: DocumentItem[];
}

const initialState: PreDepartureDocsState = {
  documents: [],
};

const preDepartureDocSlice = createSlice({
  name: "preDepartureDocs",
  initialState,
  reducers: {
    setDocuments(state, action: PayloadAction<DocumentItem[]>) {
      state.documents = action.payload;
    },
    updateDocumentStatus(
      state,
      action: PayloadAction<{ id: string; newStatus: DocumentStatus }>
    ) {
      const doc = state.documents.find((d) => d.id === action.payload.id);
      if (doc) doc.status = action.payload.newStatus;
    },
    initializeIfEmpty(state) {
      if (state.documents.length === 0) {
        const dummyDocs = PreDepartureDocList.categories[0];
        state.documents = dummyDocs.documents;
      }
    },
  },
});

export const { setDocuments, updateDocumentStatus, initializeIfEmpty } =
  preDepartureDocSlice.actions;
export default preDepartureDocSlice.reducer;

// In preDepartureDocSlice.ts or selectors.ts
export const selectAllDocuments = (state: RootState) =>
  state.preDepartureDocList.documents;
