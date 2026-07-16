import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
} from "react-icons/fi";

import toast from "react-hot-toast";

import useProfile from "../../hooks/useProfile";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { updateProfile } from "../../services/profileService";
export default function SettingsCard() {
const {
  profile,
  loading,
  loadProfile,
} = useProfile();

const [form, setForm] = useState({
  name: "",
  email: "",
});

useEffect(() => {

  if (profile) {

    setForm({
      name: profile.name,
      email: profile.email,
    });

  }

}, [profile]); 



async function handleUpdate(e) {

  e.preventDefault();

  try {

    await updateProfile(form);

    toast.success(
      "Profile Updated Successfully"
    );

    loadProfile();

  } catch (err) {

    console.log(err);

    toast.error(
      err?.response?.data?.detail ||
      "Profile Update Failed"
    );

  }

}

if (loading) {

  return (

    <div className="rounded-3xl bg-white p-8 shadow-sm">

      Loading...

    </div>

  );

}
  return (
  <div className="rounded-3xl bg-white p-8 shadow-sm">

  <h2 className="mb-8 text-2xl font-bold">

    Profile Settings

  </h2>

  <form
    onSubmit={handleUpdate}
    className="space-y-6"
  >

    <div>

      <label className="mb-2 block text-sm font-medium text-slate-600">

        Full Name

      </label>

      <Input
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

    </div>

    <div>

      <label className="mb-2 block text-sm font-medium text-slate-600">

        Email

      </label>

      <Input
        type="email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

    </div>

    <div>

      <label className="mb-2 block text-sm font-medium text-slate-600">

        Password

      </label>

      <Input
        value="********"
        disabled
      />

    </div>

    <Button
      type="submit"
      className="w-full"
    >

      Save Changes

    </Button>

  </form>

</div>
    
  );

}