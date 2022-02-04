import { Routes, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { NotFound } from "./NotFound";
import { PlacesPage } from "./PlacesPage";
import { WorkoutsPage } from "./WorkoutsPage";

export function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/workouts" element={<WorkoutsPage />} />
      <Route path="/places" element={<PlacesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
