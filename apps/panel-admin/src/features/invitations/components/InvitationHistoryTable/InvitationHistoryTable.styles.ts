export const INVITATION_HISTORY_TABLE_STYLES = {
  content: "min-w-150",
  emptyState: "flex h-full w-full flex-col items-center justify-center gap-4 text-center",
  emptyStateIcon: "size-6 text-muted",
  emptyStateText: "text-sm text-muted",
  actionsCell: "flex gap-2",
  resendButton:
    "flex items-center gap-1 rounded-md px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
  resendIcon: "size-4",
} as const;
