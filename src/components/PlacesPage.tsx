import { Fragment } from "react";
import { useQuery } from "../hooks/useQuery";
import { Layout } from "./Layout";
import { ResourceHandler } from "./ResourceHandler";

interface Place {
  image: string;
  name: string;
  slug: string;
  workoutCount: number;
}

interface PlacesResponse {
  results: Array<Place>;
  total: number;
}

export function PlacesPage(): JSX.Element {
  const placesResource = useQuery(async () => {
    const res = await fetch(`http://localhost:3001/places`);
    const data = await res.json();
    return data as PlacesResponse;
  });

  return (
    <Layout
      activePage="places"
      title="Places"
      content={
        <Fragment>
          <ResourceHandler
            resource={placesResource}
            renderResolved={(data, { updating, update }) => (
              <div>
                <button onClick={() => update()}>
                  {updating ? "..." : "Update"}
                </button>
                <ul>
                  {data.results.map((place) => (
                    <li key={place.slug}>{place.name}</li>
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
