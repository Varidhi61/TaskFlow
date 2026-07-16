import {
  FiCalendar,
  FiClipboard,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import { Button } from "@/components/ui/button";

export default function TaskCard({
  task,
  onEdit,
  onDelete,
}) {
  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  const statusColor = {
    Todo: "bg-slate-100 text-slate-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Done: "bg-green-100 text-green-700",
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="rounded-2xl bg-blue-100 p-4">
            <FiClipboard
              className="text-blue-600"
              size={22}
            />
          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              {task.title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Task #{task.id}
            </p>

          </div>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusColor[task.status]
          }`}
        >
          {task.status}
        </span>

      </div>

      <p className="mt-6 text-sm leading-6 text-slate-600">
        {task.description}
      </p>

      <div className="mt-6 flex items-center justify-between">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            priorityColor[task.priority]
          }`}
        >
          {task.priority}
        </span>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <FiCalendar />
          {task.due_date}
        </div>

      </div>

      <div className="mt-8 flex justify-end gap-3">

        <Button
          size="icon"
          onClick={() => onEdit(task)}
          className="bg-yellow-500 hover:bg-yellow-600"
        >
          <FiEdit2 />
        </Button>

        <Button
          size="icon"
          onClick={() => onDelete(task.id)}
          className="bg-red-600 hover:bg-red-700"
        >
          <FiTrash2 />
        </Button>

      </div>

    </div>
  );
}