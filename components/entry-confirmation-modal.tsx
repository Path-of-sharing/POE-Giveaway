interface EntryConfirmationModalProps {
  participantName: string;
  redditName?: string;
  redditProfileLink?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function EntryConfirmationModal({
  participantName,
  redditName,
  redditProfileLink,
  onConfirm,
  onCancel,
}: EntryConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Confirm Your Entry
        </h2>

        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          Please review your entry details before submitting. You won't be able to edit this information once submitted.
        </p>

        <div className="mb-6 space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase">
              POE Name
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {participantName}
            </p>
          </div>

          {redditName && (
            <div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase">
                Reddit Username
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {redditName}
              </p>
            </div>
          )}

          {redditProfileLink && (
            <div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase">
                Reddit Profile Link
              </p>
              <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400 break-all">
                {redditProfileLink}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Confirm Entry
          </button>
        </div>
      </div>
    </div>
  );
}
