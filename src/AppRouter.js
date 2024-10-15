import { Routes, Route } from "react-router-dom";
import App from "./App";
import Person from "./Person";

const AppRouter = () => {
  return (
    <Routes>
        <Route path="rick-and-morty/" element={<App />} />
        <Route path="rick-and-morty/:id" element={<Person />} />
    </Routes>
  );
};

export default AppRouter;
