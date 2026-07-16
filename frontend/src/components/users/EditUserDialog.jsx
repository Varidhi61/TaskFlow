import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { updateUser } from "../../services/userService";
import toast from "react-hot-toast";
export default function EditUserDialog({
  open,
  setOpen,
  user,
  refresh,
}) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {

    if (user) {

      setForm({
        name: user.name,
        email: user.email,
        password: "",
      });

    }

  }, [user]);

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await updateUser(user.id, form);
      toast.success("User Updated Successfully");

      setOpen(false);

      refresh();

    } catch (err) {

      console.log(err);
      toast.error(
  err?.response?.data?.detail || "User Update Failed"
);

    }

  }

  if (!user) return null;

  return (

    <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent className="max-w-lg">

        <DialogHeader>

          <DialogTitle>

            Edit User

          </DialogTitle>

        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <Input
            placeholder="Name"
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
            placeholder="New Password"
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
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit">

              Save Changes

            </Button>

          </div>

        </form>

      </DialogContent>

    </Dialog>

  );

}