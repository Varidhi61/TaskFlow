import { useEffect, useState } from "react";
import api from "../../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
export default function TaskForm({
  closeDialog,
  refresh,
}) {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
    due_date: "",
    project_id: "",
    assigned_to: "",
  });

  useEffect(() => {
    loadProjects();
    loadUsers();
  }, []);

  async function loadProjects() {
  try {
    const res = await api.get("/projects");


    setProjects(res.data);

  } catch (err) {
    console.log(err);
  }
}

  async function loadUsers() {
  try {
    const res = await api.get("/users");

    

    setUsers(res.data);

  } catch (err) {
    console.log(err);
  }
} 

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      await api.post("/tasks", {
        ...form,
        project_id: Number(form.project_id),
        assigned_to: Number(form.assigned_to),
      });

      toast.success("Task Created Successfully");
      refresh();
      closeDialog();

     

    } catch (err) {
      console.log(err);
      toast.error(
  err?.response?.data?.detail || "Failed to Create Task"
);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Title */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Task Title
        </label>

        <Input
          placeholder="Enter task title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          className="h-11"
        />

      </div>

      {/* Description */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Description
        </label>

        <textarea
          rows={4}
          placeholder="Write task description..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          value={form.description}
           onChange={(e) =>
    setForm({
      ...form,
      description: e.target.value,
    })
  }
        />

      </div>

      {/* Priority + Status */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Priority
          </label>

          <select
            className="h-11 w-full rounded-xl border border-slate-300 px-3"
            value={form.priority}
            onChange={(e) =>
              setForm({
                ...form,
                priority: e.target.value,
              })
            }
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Status
          </label>

          <select
            className="h-11 w-full rounded-xl border border-slate-300 px-3"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

        </div>

      </div>

      {/* Due Date + Project */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Due Date
          </label>

          <Input
            type="date"
            value={form.due_date}
            onChange={(e) =>
              setForm({
                ...form,
                due_date: e.target.value,
              })
            }
            className="h-11"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Project
          </label>

          <select
            className="h-11 w-full rounded-xl border border-slate-300 px-3"
            value={form.project_id}
            onChange={(e) => {

    

    setForm({
      ...form,
      project_id: e.target.value,
    });

  }}
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}

          </select>

        </div>

      </div>

      {/* Assign User */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Assign User
        </label>

        <select
          className="h-11 w-full rounded-xl border border-slate-300 px-3"
          value={form.assigned_to}
          onChange={(e) => {

 

  setForm({
    ...form,
    assigned_to: e.target.value,
  });

}}
        >
          <option value="">Select User</option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}

        </select>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-3 pt-4">

        <Button
          type="button"
          variant="outline"
          onClick={closeDialog}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Create Task
        </Button>

      </div>

    </form>
  );
}