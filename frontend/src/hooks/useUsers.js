import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    loadUsers,
  };
}