import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function DeleteConfirmDialog({
  open,
  setOpen,
  title,
  message,
  onConfirm,
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-2xl">

        <DialogHeader>

          <DialogTitle className="text-xl font-bold text-red-600">
            {title}
          </DialogTitle>

        </DialogHeader>

        <p className="text-slate-600">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}