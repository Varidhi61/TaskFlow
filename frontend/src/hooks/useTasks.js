import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

export default function useTasks() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadTasks() {

    try {

      const data = await getTasks();

      setTasks(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadTasks();

  }, []);

  return {

    tasks,
    loading,
    loadTasks,

  };

}