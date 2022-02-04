import React, { Fragment, useState } from "react";
import { Layout } from "./Layout";

export function LoginPage(): JSX.Element {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(username, password);
    event.preventDefault();
  };

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
