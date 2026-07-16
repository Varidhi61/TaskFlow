import { useState } from "react";
import useUsers from "../../hooks/useUsers";
import DashboardLayout from "../../components/layout/DashboardLayout";
import UserGrid from "../../components/users/UserGrid";
import UserForm from "../../components/users/UserForm";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Users() {
  const {
  users,
  loading,
  loadUsers,
} = useUsers();
  const [open, setOpen] = useState(false);

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Users
            </h1>

            <p className="mt-2 text-slate-500">
              Manage all registered users
            </p>

          </div>

          <Button
            onClick={() => setOpen(true)}
            className="rounded-xl bg-blue-600 px-6 py-6 hover:bg-blue-700"
          >
            + Create User
          </Button>

        </div>

        <UserGrid
  users={users}
  loading={loading}
  refresh={loadUsers}
/>

      </div>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >

        <DialogContent className="max-w-xl">

          <DialogHeader>

            <DialogTitle>

              Create New User

            </DialogTitle>

          </DialogHeader>

          <UserForm
  closeDialog={() => setOpen(false)}
  refresh={loadUsers}
/>

        </DialogContent>

      </Dialog>

    </DashboardLayout>

  );

}