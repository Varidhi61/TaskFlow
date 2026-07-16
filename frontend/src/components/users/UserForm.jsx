import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createUser } from "../../services/userService";
import toast from "react-hot-toast";
export default function UserForm({ closeDialog, refresh }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await createUser(form);

toast.success("User Created Successfully");

setTimeout(() => {

  closeDialog();

  refresh();

}, 1200);
      
    } catch (err) {

      console.log(err);

      toast.error(
  err?.response?.data?.detail || "Failed to Create User"
);

    }

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <Input
        placeholder="Full Name"
        value={form.name}
        onChange={(e)=>
          setForm({
            ...form,
            name:e.target.value,
          })
        }
      />

      <Input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e)=>
          setForm({
            ...form,
            email:e.target.value,
          })
        }
      />

      <Input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e)=>
          setForm({
            ...form,
            password:e.target.value,
          })
        }
      />

      <div className="flex justify-end gap-3">

        <Button
          type="button"
          variant="outline"
          onClick={closeDialog}
        >
          Cancel
        </Button>

        <Button type="submit">

          Create User

        </Button>

      </div>

    </form>

  );

}