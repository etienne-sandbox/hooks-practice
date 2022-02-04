import { Fragment, useState } from "react";
import { useQuery } from "../hooks/useQuery";
import { Layout } from "./Layout";
import { ResourceHandler } from "./ResourceHandler";
import { getWorkouts } from "../logic/api";

export function WorkoutsPage(): JSX.Element {
  const [page, setPage] = useState(0);

  const workoutsResource = useQuery(() => getWorkouts({ offset: page }));

  return (
    <Layout
      title="Workouts"
      activePage="workouts"
      content={
        <Fragment>
          <button onClick={() => setPage((p) => p + 1)}>Page: {page}</button>
          <ResourceHandler
            resource={workoutsResource}
            renderResolved={(data, { updating, update }) => (
              <div>
                <button onClick={() => update()}>
                  {updating ? "..." : "Update"}
                </button>
                <ul>
                  {data.results.map((workout) => (
                    <li key={workout.id}>
                      {workout.userName} - {workout.distance}m -{" "}
                      {workout.duration}
                      min
                    </li>
                  ))}
                </ul>
              </div>
            )}
          />
        </Fragment>
      }
    />
  );
}
