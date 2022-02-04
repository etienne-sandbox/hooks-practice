import React, { Fragment, useState } from "react";
import { useSession } from "../hooks/useSession";
import { postActionLogin } from "../logic/api";
import { Layout } from "./Layout";
import { Navigate } from "react-router-dom";

export function LoginPage(): JSX.Element {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(username, password);
    event.preventDefault();
    postActionLogin(username, password).then((response) => {
      if (session.user) {
        return;
      }
      session.setToken(response.token);
      setPassword("");
      setUserName("");
    });
  };

  if (session.user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout
      title="Login"
      activePage="login"
      content={
        <Fragment>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Username</label>
              <input
                value={username}
                onChange={(e) => setUserName(e.currentTarget.value)}
                required
                type="text"
                name="username"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
                type="password"
                name="password"
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </Fragment>
      }
    />
  );
}
