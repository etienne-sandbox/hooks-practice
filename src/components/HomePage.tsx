import { Layout } from "./Layout";

export function HomePage(): JSX.Element {
  return <Layout title="Home" activePage="home" content={<p>Hello</p>} />;
}
