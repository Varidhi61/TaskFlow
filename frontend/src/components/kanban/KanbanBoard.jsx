import { useEffect, useState } from "react";
import {
  getKanbanBoard,
  updateKanbanStatus,
} from "../../services/kanbanService";

export default function KanbanBoard() {

  const [board, setBoard] = useState({
    Todo: [],
    "In Progress": [],
    Done: [],
  });

  useEffect(() => {
    loadBoard();
  }, []);

  async function loadBoard() {

    try {

      const data = await getKanbanBoard();

      setBoard(data);

    } catch (err) {

      console.log(err);

    }

  }
  async function moveTask(id, status) {

  try {

    await updateKanbanStatus(id, status);

    loadBoard();

  } catch (err) {

    console.log(err);

    alert("Failed to update task");

  }

}
  const columns = [
    {
      title: "Todo",
      color: "bg-red-100 text-red-700",
    },
    {
      title: "In Progress",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Done",
      color: "bg-green-100 text-green-700",
    },
  ];

  return (

    <div className="grid gap-6 lg:grid-cols-3">

      {columns.map((column) => (

        <div
          key={column.title}
          className="rounded-3xl bg-white p-6 shadow-sm"
        >

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-xl font-bold">

              {column.title}

            </h2>

            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${column.color}`}>

              {board[column.title]?.length}

            </span>

          </div>

          <div className="space-y-4">

            {board[column.title]?.map((task) => (

              <div
                key={task.id}
                className="rounded-2xl border border-slate-200 p-4 transition hover:shadow-md"
              >

                <h3 className="font-semibold">

                  {task.title}

                </h3>

                <p className="mt-2 text-sm text-slate-500">

                  {task.description}

                </p>

                <div className="mt-4 flex items-center justify-between">
                <div className="mt-5">

  {column.title === "Todo" && (

    <button
      onClick={() => moveTask(task.id, "In Progress")}
      className="w-full rounded-xl bg-yellow-500 py-2 text-sm font-semibold text-white hover:bg-yellow-600"
    >

      Move to In Progress

    </button>

  )}

  {column.title === "In Progress" && (
      
    <button
      onClick={() => moveTask(task.id, "Done")}
      className="w-full rounded-xl bg-green-600 py-2 text-sm font-semibold text-white hover:bg-green-700"
    >

      Move to Done

    </button>
      )}
  {column.title === "Done" && (

    <button
      onClick={() => moveTask(task.id, "Todo")}
      className="w-full rounded-xl bg-slate-700 py-2 text-sm font-semibold text-white hover:bg-slate-800"
    >
      Move to Todo
    </button>

  
  )}

</div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                    {task.priority}

                  </span>

                  <span className="text-xs text-slate-500">

                    {task.due_date}

                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      ))}

    </div>

  );

}