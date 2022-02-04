import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { Layout } from "./Layout";

export function HomePage(): JSX.Element {
  const session = useSession();

  return (
    <Layout
      title="Home"
      activePage="home"
      content={
        session.user === null ? (
          <p>
            You can <Link to="/login">login here</Link>
          </p>
        ) : (
          <Fragment>
            <p>Hello {session.user.firstName} </p>
            <button onClick={() => session.logout()}>Logout</button>
          </Fragment>
        )
      }
    />
  );
}
