import { Link } from "react-router-dom";
import clsx from "clsx";

type Props = {
  activePage: null | "home" | "login" | "places" | "workouts";
  content: React.ReactNode;
  title: string;
};

export function Layout({ activePage, content, title }: Props): JSX.Element {
  return (
    <div className="Layout">
      <h1 className="Layout-title">{title}</h1>
      <nav className="Layout-nav">
        <NavItem to="/" active={activePage === "home"}>
          Home
        </NavItem>
        <NavItem to="/login" active={activePage === "login"}>
          Login
        </NavItem>
        <NavItem to="/places" active={activePage === "places"}>
          Places
        </NavItem>
        <NavItem to="/workouts" active={activePage === "workouts"}>
          Workouts
        </NavItem>
      </nav>
      <div className="Layout-content">{content}</div>
    </div>
  );
}

type NavItemProps = {
  to: string;
  active: boolean;
  children: React.ReactNode;
};

function NavItem({ to, active, children }: NavItemProps): JSX.Element {
  return (
    <Link
      to={to}
      className={clsx("Layout-NavItem", { "Layout-NavItem--active": active })}
    >
      {children}
    </Link>
  );
}
