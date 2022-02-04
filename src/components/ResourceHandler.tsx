import { Fragment } from "react";
import { Resource } from "../hooks/useQuery";

type Props<T> = {
  resource: Resource<T>;
  renderResolved?: (
    data: T,
    utils: { updating: boolean; update: () => void }
  ) => React.ReactNode;
  renderPending?: () => React.ReactNode;
  renderRejected?: (error: unknown) => React.ReactNode;
};

export function ResourceHandler<T>({
  resource,
  renderPending = () => <p>Loading...</p>,
  renderRejected = (error) => <p>Error: {String(error)}</p>,
  renderResolved = (data) => <pre>{JSON.stringify(data, null, 2)}</pre>,
}: Props<T>): JSX.Element {
  if (resource.status === "rejected") {
    return <Fragment>{renderRejected(resource.error)}</Fragment>;
  }
  if (resource.status === "pending") {
    return <Fragment>{renderPending()}</Fragment>;
  }
  return (
    <Fragment>
      {renderResolved(resource.data, {
        updating: resource.updating,
        update: resource.update,
      })}
    </Fragment>
  );
}
