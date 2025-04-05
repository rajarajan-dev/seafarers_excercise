// Define possible status values (union type)
type ItemStatus = "Todo" | "Done";

// Interface for a checklist item (e.g., "Milk", "Finish React Native App")
interface ChecklistItem {
  itemId: string;
  name: string;
  status: ItemStatus;
}

// Interface for a checklist category (e.g., "My Shopping", "Work Tasks")
interface ChecklistCategory {
  titleId: string;
  titleName: string;
  createdAt: string;
  lastItemAdded: string;
  items: ChecklistItem[];
}

// Export all types for reuse
export type { ItemStatus, ChecklistItem, ChecklistCategory };
