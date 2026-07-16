import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import TaskGrid from "../../components/tasks/TaskGrid";
import TaskForm from "../../components/tasks/TaskForm";
import useTasks from "../../hooks/useTasks";
export default function Tasks() {
  const {
    tasks,
    loading,
    loadTasks,
  } = useTasks();
  const [open, setOpen] = useState(false);

  return (

    <DashboardLayout>

      <div className="space-y-8 px-2 lg:px-0">

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h1 className="text-4xl font-bold text-slate-800">

                Tasks

              </h1>

              <p className="mt-2 text-slate-500">

                Manage and organize all project tasks

              </p>

            </div>

            <Dialog open={open} onOpenChange={setOpen}>

              <DialogTrigger asChild>

                <Button className="h-12 rounded-xl bg-blue-600 px-8 text-white hover:bg-blue-700">

                  + New Task

                </Button>

              </DialogTrigger>

              <DialogContent className="max-w-3xl rounded-2xl">

                <DialogHeader>

                  <DialogTitle className="text-2xl">

                    Create New Task

                  </DialogTitle>

                </DialogHeader>

                <TaskForm
  closeDialog={() => setOpen(false)}
  refresh={loadTasks}
/>

              </DialogContent>

            </Dialog>

          </div>

        </div>

         <TaskGrid
  tasks={tasks}
  loading={loading}
  refresh={loadTasks}
/>

      </div>

    </DashboardLayout>

  );

}