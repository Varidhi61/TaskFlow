import { useState } from "react";
import { createProject } from "../../services/projectService";
import toast from "react-hot-toast";
export default function ProjectForm({ refresh }) {

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Active",
    deadline: ""
  });

  async function handleSubmit(e) {

  e.preventDefault();

  try {

    await createProject(form);

    toast.success("Project Created Successfully");

    setForm({
      name: "",
      description: "",
      status: "Active",
      deadline: ""
    });

    refresh();

  } catch (error) {

    console.log(error);

    toast.error(
      error?.response?.data?.detail || "Failed to Create Project"
    );

  }

}
  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <input
        className="w-full rounded-lg border p-3"
        placeholder="Project Name"
        value={form.name}
        onChange={(e)=>setForm({...form,name:e.target.value})}
      />

      <textarea
        className="w-full rounded-lg border p-3"
        placeholder="Description"
        value={form.description}
        onChange={(e)=>setForm({...form,description:e.target.value})}
      />

      <input
        type="date"
        className="w-full rounded-lg border p-3"
        value={form.deadline}
        onChange={(e)=>setForm({...form,deadline:e.target.value})}
      />

      <button
        className="rounded-lg bg-blue-600 px-6 py-3 text-white"
      >
        Create Project
      </button>

    </form>

  );

}