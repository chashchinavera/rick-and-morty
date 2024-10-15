import { useEffect, useState } from "react";

const Person = () => {
  const id = window.location.pathname.split("/").pop();
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch("https://rickandmortyapi.com/api/character");
      const json = await data.json();
      return json.results;
    };

    getData().then((data) => setPersons(data));
  }, []);

  const person = persons.find((item) => item.id == id);

  console.log(person);

  return (
    <div className="bg-black text-white w-[100%] min-h-[100vh] flex flex-col items-center py-[50px]">
      <h1 className="text-[30px] md:text-[40px] mt-[15px] text-center">Вселенная Рика и Морти</h1>
      <div className="flex flex-col items-start mt-[50px]">
        <p className="text-[20px] md:text-[30px] mt-[15px]">Имя: {person?.name}</p>
        <p className="text-[20px] md:text-[30px] mt-[15px]">
          Жив: {person?.status === "Dead" ? "Нет" : "Да"}
        </p>
        <p className="text-[20px] md:text-[30px] mt-[15px]">
          Раса:
          {person?.species === "Human"
            ? "Человек"
            : person?.species === "Alien"
            ? "Инопланетянин"
            : "Неизвестно"}
        </p>
        <p className="text-[20px] md:text-[30px] mt-[15px]">
          Пол:
          {person?.gender === "Male"
            ? "Мужской"
            : person?.gender === "Female"
            ? "Женский"
            : "Неизвестно"}
        </p>
        <p className="text-[20px] md:text-[30px] mt-[15px]">
          Количество эпизодов: {person?.episode.length}
        </p>
      </div>
      <a
        href="/rick-and-morty/"
        className="text-[20px] md:text-[30px] mt-[100px] item-start hover:text-red-500 cursor-pointer"
      >
        Назад
      </a>
    </div>
  );
};

export default Person;
