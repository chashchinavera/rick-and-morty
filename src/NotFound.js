import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center w-[100%] min-h-[100vh] bg-black text-white">
      <h1 className="text-[30px] md:text-[40px] mt-[15px] mx-[30px] text-center">
        Страница не найдена
      </h1>
      <button className="text-[20px] md:text-[30px] mt-[150px] hover:text-red-500">
        <Link to="/rick-and-morty">Вернуться на главную</Link>
      </button>
    </div>
  );
};

export default NotFound;
