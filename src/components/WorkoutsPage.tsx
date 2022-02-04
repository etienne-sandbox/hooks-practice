import { Fragment, useState } from "react";
import { useQuery } from "../hooks/useQuery";
import { Layout } from "./Layout";
import { ResourceHandler } from "./ResourceHandler";

interface Workout {
  id: string;
  date: string;
  place: string;
  user: string;
  placeName: string;
  userName: string;
  distance: number;
  duration: number;
  speed: number;
}

interface WorkoutsResponse {
  results: Array<Workout>;
  total: number;
}

export function WorkoutsPage(): JSX.Element {
  const [page, setPage] = useState(0);

  const workoutsResource = useQuery(async () => {
    const res = await fetch(`http://localhost:3001/workouts?offset=${page}`);
    const data = await res.json();
    return data as WorkoutsResponse;
  });

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
