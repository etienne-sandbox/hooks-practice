import { Layout } from "./Layout";

export function NotFound() {
  return (
    <Layout
      title="Not Found"
      activePage={null}
      content={<p>Page not found.</p>}
    />
  );
}
