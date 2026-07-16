import useActivity from "../../hooks/useActivity";

export default function RecentActivity() {

  const { activity, loading } = useActivity();

  if (loading) {

    return (

      <div className="rounded-3xl bg-white p-8 shadow-sm">

        Loading Recent Activity...

      </div>

    );

  }

  return (

    <div className="grid gap-8 lg:grid-cols-2">

      <div className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">

          Recent Projects

        </h2>

        <div className="space-y-4">

          {activity?.projects?.length ? (

            activity.projects.map((project) => (

              <div
                key={project.id}
                className="rounded-xl border p-4"
              >

                <h3 className="font-semibold">

                  {project.name}

                </h3>

              </div>

            ))

          ) : (

            <p>No Recent Projects</p>

          )}

        </div>

      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">

          Recent Tasks

        </h2>

        <div className="space-y-4">

          {activity?.tasks?.length ? (

            activity.tasks.map((task) => (

              <div
                key={task.id}
                className="rounded-xl border p-4"
              >

                <h3 className="font-semibold">

                  {task.title}

                </h3>

                <p className="text-sm text-slate-500">

                  {task.status}

                </p>

              </div>

            ))

          ) : (

            <p>No Recent Tasks</p>

          )}

        </div>

      </div>

    </div>

  );

}