import { useState } from "react";
import toast from "react-hot-toast";
import { deleteUser } from "../../services/userService";
import DeleteConfirmDialog from "../common/DeleteConfirmDialog";
import {
  FiUser,
  FiMail,
  FiTrash2,
} from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import EditUserDialog from "./EditUserDialog";
export default function UserGrid({
  users,
  loading,
  refresh,
}) {

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete() {

  try {

    await deleteUser(deleteId);

    toast.success("User Deleted Successfully");

    setDeleteOpen(false);

    refresh();

  } catch (error) {

    console.log(error);

    toast.error(
      error?.response?.data?.detail ||
      "Failed to Delete User"
    );

  }

}
  function handleEdit(user) {

  setSelectedUser(user);

  setOpen(true);

}
  if (loading) {

    return (

      <h2 className="text-xl font-semibold">

        Loading Users...

      </h2>

    );

  }

  return (

    <div className="space-y-8">

      <input
        placeholder="Search Users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 outline-none focus:border-blue-500"
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filteredUsers.map((user) => (

          <div
            key={user.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-blue-100 p-4">

                <FiUser
                  className="text-blue-600"
                  size={24}
                />

              </div>

              <div>

                <h2 className="text-xl font-bold">

                  {user.name}

                </h2>

                <p className="text-sm text-slate-500">

                  User #{user.id}

                </p>

              </div>

            </div>

            <div className="mt-6 flex items-center gap-3">

              <FiMail className="text-slate-500" />

              <span>

                {user.email}

              </span>

            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
  onClick={() => handleEdit(user)}
  className="rounded-xl bg-yellow-500 p-3 text-white hover:bg-yellow-600"
>

  <FiEdit2 />

</button>
              <button
                onClick={() => {

  setDeleteId(user.id);

  setDeleteOpen(true);

}}
                className="rounded-xl bg-red-600 p-3 text-white hover:bg-red-700"
              >

                <FiTrash2 />

              </button>

            </div>

          </div>

        ))}

      </div>
      <EditUserDialog
  open={open}
  setOpen={setOpen}
  user={selectedUser}
  refresh={refresh}
/>

  <DeleteConfirmDialog
  open={deleteOpen}
  setOpen={setDeleteOpen}
  title="Delete User"
  message="Are you sure you want to delete this user?"
  onConfirm={handleDelete}
/>
    </div>
    

  );

}