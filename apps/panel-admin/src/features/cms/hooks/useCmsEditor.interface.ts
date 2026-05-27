export type SaveStatus = "idle" | "saving" | "success" | "error";

export interface UseCmsEditorOptions {
  initialValues?: Record<string, Record<string, Record<string, string>>>;
}
