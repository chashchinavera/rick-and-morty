import { Routes, Route } from "react-router-dom";
import App from "./App";
import Person from "./Person";

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<Person />} />
    </Routes>
  );
};

export default AppRouter;
