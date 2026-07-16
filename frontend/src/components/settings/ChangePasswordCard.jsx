import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import { changePassword } from "../../services/profileService";

export default function ChangePasswordCard() {

  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
  });

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await changePassword(form);

      toast.success("Password Changed Successfully");

      setForm({
        old_password: "",
        new_password: "",
      });

    } catch (err) {

      toast.error(
        err?.response?.data?.detail ||
        "Password Change Failed"
      );

    }

  }

  return (

    <div className="rounded-3xl bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">

        Change Password

      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <Input
          type="password"
          placeholder="Old Password"
          value={form.old_password}
          onChange={(e)=>
            setForm({
              ...form,
              old_password:e.target.value,
            })
          }
        />

        <Input
          type="password"
          placeholder="New Password"
          value={form.new_password}
          onChange={(e)=>
            setForm({
              ...form,
              new_password:e.target.value,
            })
          }
        />

        <Button
          type="submit"
          className="w-full"
        >

          Change Password

        </Button>

      </form>

    </div>

  );

}