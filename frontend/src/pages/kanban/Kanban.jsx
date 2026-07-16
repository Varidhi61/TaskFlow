import DashboardLayout from "@/components/layout/DashboardLayout";
import KanbanBoard from "../../components/kanban/KanbanBoard";

export default function Kanban() {

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h1 className="text-4xl font-bold text-slate-800">

                Kanban Board

              </h1>

              <p className="mt-2 text-slate-500">

                Track your tasks by status

              </p>

            </div>

          </div>

        </div>

        <KanbanBoard />

      </div>

    </DashboardLayout>

  );

}