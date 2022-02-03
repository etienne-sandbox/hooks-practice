import { useState, useEffect } from "react";

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

export function App(): JSX.Element {
  const [workouts, setWorkouts] = useState<WorkoutsResponse | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/workouts")
      .then((res) => res.json())
      .then((data) => setWorkouts(data));
  }, []);

  return (
    <div>
      <h1>Workouts</h1>
      {workouts === null ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {workouts.results.map((workout) => (
            <li key={workout.id}>
              {workout.userName} - {workout.distance}m - {workout.duration}min
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
