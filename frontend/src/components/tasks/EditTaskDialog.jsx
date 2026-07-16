import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { updateTask } from "../../services/taskService";
import toast from "react-hot-toast";
export default function EditTaskDialog({
  open,
  setOpen,
  task,
  refresh,
}) {

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
    due_date: "",
  });

  useEffect(() => {

    if (task) {

      setForm({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        due_date: task.due_date,
      });

    }

  }, [task]);

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await updateTask(task.id, {
        ...task,
        ...form,
      });

      toast.success("Task Updated Successfully");

      setOpen(false);

      refresh();

    } catch (err) {

      console.log(err);

      toast.error(
  err?.response?.data?.detail || "Task Update Failed"
);

    }

  }

  if (!task) return null;

  return (

    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogContent className="max-w-xl rounded-3xl">

        <DialogHeader>

          <DialogTitle className="text-2xl">

            Edit Task

          </DialogTitle>

        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <Input
            value={form.title}
            placeholder="Task Title"
            onChange={(e)=>
              setForm({
                ...form,
                title:e.target.value,
              })
            }
          />

          <textarea
            rows={4}
            value={form.description}
            placeholder="Description"
            className="w-full rounded-xl border border-slate-300 p-3 outline-none"
            onChange={(e)=>
              setForm({
                ...form,
                description:e.target.value,
              })
            }
          />

          <div className="grid grid-cols-2 gap-4">

            <select
              className="rounded-xl border p-3"
              value={form.priority}
              onChange={(e)=>
                setForm({
                  ...form,
                  priority:e.target.value,
                })
              }
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <select
              className="rounded-xl border p-3"
              value={form.status}
              onChange={(e)=>
                setForm({
                  ...form,
                  status:e.target.value,
                })
              }
            >
              <option>Todo</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>

          </div>

          <Input
            type="date"
            value={form.due_date}
            onChange={(e)=>
              setForm({
                ...form,
                due_date:e.target.value,
              })
            }
          />

          <div className="flex justify-end gap-3 pt-3">

            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </Button>

          </div>

        </form>

      </DialogContent>

    </Dialog>

  );

}