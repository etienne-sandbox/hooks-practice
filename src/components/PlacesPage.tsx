import { Fragment } from "react";
import { useQuery } from "../hooks/useQuery";
import { getPlaces } from "../logic/api";
import { Layout } from "./Layout";
import { ResourceHandler } from "./ResourceHandler";

export function PlacesPage(): JSX.Element {
  const placesResource = useQuery(() => getPlaces());

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
