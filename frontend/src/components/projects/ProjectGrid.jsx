import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { updateProject } from "../../services/projectService";

import { deleteProject } from "../../services/projectService";
import {
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiFolder,
} from "react-icons/fi";
import toast from "react-hot-toast";
export default function ProjectGrid({
  projects,
  loading,
  refresh,
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const [editForm, setEditForm] = useState({
  name: "",
  description: "",
});
  const filteredProjects = projects.filter((project) =>
  project.name.toLowerCase().includes(search.toLowerCase())
);
  async function handleDelete(id) {

    if (!window.confirm("Delete this project?")) return;

    try {

  await deleteProject(id);

  toast.success("Project Deleted Successfully");

   refresh()

} catch (err) {

  console.log(err);

  toast.error(
    err?.response?.data?.detail || "Failed to Delete Project"
  );

}

  }
  function handleEdit(project) {

  setSelectedProject(project);

  setEditForm({
    name: project.name,
    description: project.description,
  });

  setOpen(true);

}

async function handleUpdate(e) {

  e.preventDefault();

  try {

  await updateProject(selectedProject.id, editForm);

  toast.success("Project Updated Successfully");

  setOpen(false);

  refresh()

} catch (err) {

  console.log(err);

  toast.error(
    err?.response?.data?.detail || "Project Update Failed"
  );

}

}
  if (loading) {

    return (
      <h2 className="text-lg font-semibold">
        Loading Projects...
      </h2>
    );

  }

  return (

      <div>

    <div className="mb-8">

      <input
        type="text"
        placeholder="Search Projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 outline-none focus:border-blue-500"
      />

    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {filteredProjects.length === 0 && (
  <div className="col-span-full rounded-3xl bg-white p-12 text-center shadow-lg">

    <h2 className="text-2xl font-bold text-slate-700">
      No Projects Found
    </h2>

    <p className="mt-2 text-slate-500">
      Try a different search keyword.
    </p>

  </div>
)}
      {filteredProjects.map((project) => (

        <div
          key={project.id}
          className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
        >

          <div className="flex items-start justify-between">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-blue-100 p-3">

                <FiFolder
                  size={24}
                  className="text-blue-600"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold">

                  {project.name}

                </h2>

                <p className="text-sm text-slate-500">

                  Project #{project.id}

                </p>

              </div>

            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

              Active

            </span>

          </div>

          <p className="mt-6 text-slate-600">

            {project.description}

          </p>

          <div className="mt-8 flex items-center justify-between">

            <div className="flex items-center gap-2 text-slate-500">

              <FiCalendar />

              <span>

                {project.deadline || "No Deadline"}

              </span>

            </div>

            <div className="flex gap-3">

              <Button
              onClick={() => handleEdit(project)}
              className="rounded-xl bg-yellow-500 text-white hover:bg-yellow-600"
               >

              <FiEdit2 size={18} />

              </Button>

              <button
                onClick={() => handleDelete(project.id)}
                className="rounded-xl bg-red-600 p-3 text-white"
              >

                <FiTrash2 />

              </button>

            </div>

          </div>

        </div>

      ))}

    </div>
    <Dialog open={open} onOpenChange={setOpen}>

  <DialogContent className="max-w-lg">

    <DialogHeader>

      <DialogTitle>

        Edit Project

      </DialogTitle>

    </DialogHeader>

    <form
      onSubmit={handleUpdate}
      className="space-y-5"
    >

      <input
        className="w-full rounded-xl border border-slate-300 p-3 outline-none"
        value={editForm.name}
        onChange={(e) =>
          setEditForm({
            ...editForm,
            name: e.target.value,
          })
        }
      />

      <textarea
        rows={4}
        className="w-full rounded-xl border border-slate-300 p-3 outline-none"
        value={editForm.description}
        onChange={(e) =>
          setEditForm({
            ...editForm,
            description: e.target.value,
          })
        }
      />

      <Button className="w-full">

        Save Changes

      </Button>

    </form>

  </DialogContent>

</Dialog>
    </div>
  );

}