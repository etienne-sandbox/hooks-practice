import { useState } from "react";
import { useQuery } from "../hooks/useQuery";

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

type Page = "home" | "workouts";

export function App(): JSX.Element {
  const [page, setPage] = useState<Page>("home");

  return (
    <div>
      <nav>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("workouts")}>Workouts</button>
      </nav>
      {page === "home" && <div>Home</div>}
      {page === "workouts" && <Workouts />}
    </div>
  );
}

function Workouts(): JSX.Element {
  const [page, setPage] = useState(0);

  const workoutsResource = useQuery(async () => {
    const res = await fetch(`http://localhost:3001/workouts?offset=${page}`);
    const data = await res.json();
    return data as WorkoutsResponse;
  });

  console.log(workoutsResource);

  return (
    <div>
      <h1>Workouts</h1>
      <button onClick={() => setPage((p) => p + 1)}>Page: {page}</button>
      {(() => {
        if (workoutsResource.status === "rejected") {
          return <div>Error: {String(workoutsResource.error)}</div>;
        }
        if (workoutsResource.status === "pending") {
          return <div>Loading...</div>;
        }
        return (
          <div>
            <button onClick={() => workoutsResource.update()}>
              {workoutsResource.updating ? "..." : "Update"}
            </button>
            <ul>
              {workoutsResource.data.results.map((workout) => (
                <li key={workout.id}>
                  {workout.userName} - {workout.distance}m - {workout.duration}
                  min
                </li>
              ))}
            </ul>
          </div>
        );
      })()}
    </div>
  );
}
