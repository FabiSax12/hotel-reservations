export const PENDING_INVITATIONS_SECTION_STYLES = {
  section: "rounded-xl bg-white border border-gray-200 shadow-sm p-6",
  title: "text-lg font-semibold text-gray-900 mb-4",
  headerRow: "flex items-center justify-between",
  content: "min-w-150",
  emptyState: "flex h-full w-full flex-col items-center justify-center gap-4 text-center",
  actionsCell: "flex gap-2",
  resendButton: "text-blue-600 hover:text-blue-700",
  revokeButton: "text-red-600 hover:text-red-700",
} as const;
