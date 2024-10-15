import { Routes, Route } from "react-router-dom";
import App from "./App";
import Person from "./Person";
import NotFound from "./NotFound";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="rick-and-morty/" element={<App />} />
      <Route path="rick-and-morty/:id" element={<Person />} />
      <Route path="rick-and-morty/*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
