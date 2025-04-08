export type DocumentType = "Mandatory" | "Optional" | "AttentionRequired";
export type DocumentStatus =
  | "Done"
  | "Skipped"
  | "Submitted"
  | "Pending"
  | "Todo";

export interface DocumentItem {
  id: string;
  name: string;
  nationality: string;
  docNumber: string;
  issueDate: string;
  expiryDate: string;
  type: DocumentType;
  status: DocumentStatus;
}

export interface Category {
  id: string;
  title: string;
  documents: DocumentItem[];
}

export interface ChecklistState {
  categories: Category[];
}
