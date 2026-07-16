import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import ProjectForm from "../../components/projects/ProjectForm";
import ProjectGrid from "../../components/projects/ProjectGrid";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import useProjects from "../../hooks/useProjects";

export default function Projects() {

  const {
  projects,
  loading,
  loadProjects,
} = useProjects();

  const [open, setOpen] = useState(false);

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Projects
            </h1>

            <p className="mt-2 text-slate-500">
              Manage all your projects
            </p>

          </div>

          <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>

              <Button className="rounded-xl px-6 py-6">

                + New Project

              </Button>

            </DialogTrigger>

            <DialogContent className="max-w-2xl">

              <DialogHeader>

                <DialogTitle>

                  Create New Project

                </DialogTitle>

              </DialogHeader>

              <ProjectForm
                refresh={() => {

                  loadProjects();

                  setOpen(false);

                }}
              />

            </DialogContent>

          </Dialog>

        </div>

        <ProjectGrid
  projects={projects}
  loading={loading}
  refresh={loadProjects}
/>

      </div>

    </DashboardLayout>

  );

}