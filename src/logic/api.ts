export interface Workout {
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

export interface WorkoutsResponse {
  results: Array<Workout>;
  total: number;
}

type GetWorkoutsOptions = { offset?: number };

export function getWorkouts({ offset = 0 }: GetWorkoutsOptions = {}) {
  return get<WorkoutsResponse>(
    `http://localhost:3001/workouts?offset=${offset}`
  );
}

export interface Place {
  image: string;
  name: string;
  slug: string;
  workoutCount: number;
}

export interface PlacesResponse {
  results: Array<Place>;
  total: number;
}

export type GetPlacesOptions = { offset?: number };

export function getPlaces({ offset = 0 }: GetPlacesOptions = {}) {
  return get<PlacesResponse>(`http://localhost:3001/workouts?offset=${offset}`);
}

export function postActionLogin(username: string, password: string) {
  return post<{ token: string }>("http://localhost:3001/action/login", {
    username,
    password,
  });
}

export type Me = {
  username: string;
  token: string;
  firstName: string;
  lastName: string;
};

export function getMe(token: string) {
  return get<Me>("http://localhost:3001/me", { token });
}

/**
 * Utils
 */

type Options = {
  token?: string;
};

async function get<T>(path: string, { token }: Options = {}): Promise<T> {
  const res = await fetch(path, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  const data = await res.json();
  return data as T;
}

async function post<Res>(
  path: string,
  body: unknown,
  { token }: Options = {}
): Promise<Res> {
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data as Res;
}
