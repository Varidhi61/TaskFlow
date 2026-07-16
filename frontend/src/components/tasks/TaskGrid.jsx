import { useState } from "react";
import {
  deleteTask,
} from "../../services/taskService";

import toast from "react-hot-toast";

import TaskCard from "./TaskCard";
import EditTaskDialog from "./EditTaskDialog";

export default function TaskGrid({
  tasks,
  loading,
  refresh,
}) {

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  async function handleDelete(id) {

  if (!window.confirm("Delete this task?")) return;

  try {

    await deleteTask(id);

    toast.success("Task Deleted Successfully");

    refresh();

  } catch (err) {

    console.log(err);

    toast.error(
      err?.response?.data?.detail ||
      "Failed to Delete Task"
    );

  }

}
 

 

  function handleEdit(task) {

    setSelectedTask(task);

    setOpen(true);

  }

  const filteredTasks = tasks.filter((task) =>
    task.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {

    return (

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {[1,2,3].map((item)=>(

          <div
            key={item}
            className="h-64 animate-pulse rounded-3xl bg-slate-200"
          />

        ))}

      </div>

    );

  }
    return (

    <>
      <div className="space-y-8">

        {/* Search */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <input
            type="text"
            placeholder="Search Tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

        {/* Empty State */}

        {filteredTasks.length === 0 ? (

          <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

            <h2 className="text-3xl font-bold text-slate-700">
              No Tasks Found
            </h2>

            <p className="mt-3 text-slate-500">
              Create a new task or search using another keyword.
            </p>

          </div>

        ) : (

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">

            {filteredTasks.map((task) => (

              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

            ))}

          </div>

        )}

      </div>

      <EditTaskDialog
        open={open}
        setOpen={setOpen}
        task={selectedTask}
        refresh={refresh}
      />

    </>

  );

}