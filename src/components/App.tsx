import { Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { NotFound } from "./NotFound";
import { PlacesPage } from "./PlacesPage";
import { WorkoutsPage } from "./WorkoutsPage";
import { SessionContext, Session } from "../hooks/useSession";
import { useMemo } from "react";

export function App(): JSX.Element {
  const { user, setToken } = useAuth();

  const session = useMemo((): Session => {
    if (user === null) {
      return { user: null, setToken };
    }
    return { user, logout: () => setToken(null) };
  }, [setToken, user]);

  return (
    <SessionContext.Provider value={session}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workouts" element={<WorkoutsPage />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SessionContext.Provider>
  );
}
