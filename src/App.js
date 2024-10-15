import { json, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const App = () => {
  const [values, setValues] = useState({
    name: "",
    alive: "",
    race: "",
    episodes: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    episodes: "",
  });
  const [isValid, setIsValid] = useState({
    name: true,
    episodes: true,
  });
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const request = sessionStorage.getItem("request");

  useEffect(() => {
    const getData = async () => {
      const data = await fetch("https://rickandmortyapi.com/api/character");
      const json = await data.json();
      return json.results;
    };

    getData().then((data) => setPersons(data));
  }, []);

  const getEpisodes = (episodes) => {
    let data = [];
    const number = [];
    for (let i = 0; i < episodes.length; i++) {
      const arr = episodes[i].split("");
      let el = arr.pop();
      while (!isNaN(Number(el))) {
        number.push(el);
        el = arr.pop();
        continue;
      }
      data.push(number.reverse().join(""));
      number.length = 0;
    }

    return data.join(", ");
  };

  function getFilteredPersons() {
    const name = String(values.name).toLowerCase().trim();
    const race = String(values.race).toLowerCase().trim();
    const alive = String(values.alive).toLowerCase().trim();
    const episodes = String(values.episodes).toLowerCase().trim(); // получили значение из формы

    const filtered = persons
      .filter((person) => {
        if (values.name !== "") {
          const personName = String(person.name).toLowerCase().trim();
          const equalName = personName.indexOf(name) !== -1;
          return equalName;
        } else {
          return person;
        }
      })
      .filter((person) => {
        if (values.race !== "") {
          const personRace = String(person.species).toLowerCase();
          const equalRace = personRace === race;
          return equalRace;
        } else {
          return person;
        }
      })
      .filter((person) => {
        if (values.alive !== "") {
          const personAlive = String(person.status).toLowerCase();
          const equalAlive = personAlive === alive;
          return equalAlive;
        } else {
          return person;
        }
      })
      .filter((person) => {
        if (values.episodes !== "") {
          const personEpisodes = getEpisodes(person.episode).split(", "); //получили массив с эпизодами с сервера
          const equalEpisodes = personEpisodes.includes(episodes);
          return equalEpisodes;
        } else {
          return person;
        }
      });

    if (
      values.name === "" &&
      values.race === "" &&
      values.alive === "" &&
      values.episodes === ""
    ) {
      return setFilteredPersons([]);
    } else {
      setFilteredPersons(filtered);
    }
  }

  useEffect(() => {
    if (
      values.name === "" &&
      values.episodes === "" &&
      values.alive === "" &&
      values.race === "" &&
      request
    ) {
      setValues(JSON.parse(request));
    }
    if (
      JSON.stringify(request) !== values &&
      (values.name !== "" ||
        values.episodes !== "" ||
        values.alive !== "" ||
        values.race !== "")
    ) {
      sessionStorage.setItem("request", JSON.stringify(values));
    }
    getFilteredPersons();
  }, [values, request, persons]);

  const handleChange = (evt) => {
    const target = evt.target;
    const { name, value } = target;

    setValues({
      ...values,
      [name]: value,
    });

    if (target.validationMessage) {
      setErrors({
        ...errors,
        [name]: target.title,
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
    setIsValid(target.closest("form").checkValidity());
  };

  const handleClear = () => {
    setValues({
      name: "",
      alive: "",
      race: "",
      episodes: "",
    });

    setErrors({
      name: "",
      episodes: "",
    });

    sessionStorage.clear("request");
    setFilteredPersons([]);
  };

  return (
    <div className="w-[100%] min-h-[100vh] bg-black flex justify-center py-[50px] mx-auto text-white">
      <div className="max-w-[1280px] w-[90%] h-max flex flex-col border-[2px] border-white border-solid rounded-[50px] p-[50px]">
        <h1 className="text-[30px] sm:text-[40px] lg:text-[60px]">
          Вселенная Рик и Морти
        </h1>
        <form className="flex flex-col mt-[40px]">
          <label className="flex flex-col mb-[10px] text-[20px]">
            Имя персонажа
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              autoComplete="off"
              type="text"
              pattern="^[A-Za-z ]+$"
              title="Имя может содержать только латинские буквы"
              className="mt-[20px] bg-black border-[1px] border-white border-solid rounded-[10px] h-[40px] pl-[10px]"
            />
            <span
              className={`h-[20px]
              ${
                isValid.name
                  ? "opacity-0"
                  : "text-red-500 text-[10px] md:text-[20px]"
              }`}
            >
              {errors.name}
            </span>
          </label>
          <div className="flex flex-col md:flex-row justify-between">
            <label className="flex flex-col mb-[10px] text-[20px] md:w-[48%]">
              Жив?
              <select
                className="my-[20px] bg-black border-[1px] border-white border-solid rounded-[10px] h-[40px] pl-[10px]"
                autoComplete="off"
                name="alive"
                onChange={handleChange}
                value={values.alive}
              >
                <option value=""></option>
                <option value="Alive">Жив</option>
                <option value="Dead">Мертв</option>
                <option value="unknown">Неизвестно</option>
              </select>
            </label>
            <label className="flex flex-col mb-[10px] text-[20px] md:w-[48%]">
              Раса
              <select
                className="my-[20px] bg-black border-[1px] border-white border-solid rounded-[10px] h-[40px] pl-[10px]"
                autoComplete="off"
                name="race"
                onChange={handleChange}
                value={values.race}
              >
                <option value=""></option>
                <option value="Human">Человек</option>
                <option value="Alien">Инопланетянин</option>
              </select>
            </label>
          </div>
          <label className="flex flex-col mb-[20px] text-[20px]">
            Эпизод
            <input
              type="text"
              name="episodes"
              value={values.episodes}
              onChange={handleChange}
              autoComplete="off"
              className="mt-[20px] bg-black border-[1px] border-white border-solid rounded-[10px] h-[40px] pl-[10px]"
              pattern="^([1-9]|[1-4][\d]|5[0-1])$"
              title="Эпизод должен содержать цифры от 1 до 51"
            />
            <span
              className={`h-[20px]
                ${
                  isValid.episodes
                    ? "opacity-0"
                    : "text-red-500 text-[10px] md:text-[20px]"
                }`}
            >
              {errors.episodes}
            </span>
          </label>
        </form>

        <button
          type="reset"
          onClick={handleClear}
          className="cursor-pointer border-[1px] border-white border-solid rounded-[10px] min-w-[200px] self-end hover:opacity-70"
        >
          Очистить
        </button>
        {filteredPersons.length > 0 ? (
          <div className="flex flex-col">
            <h2 className="text-[30px] md:text-[40px] my-[10px]">Найдено</h2>
            {filteredPersons?.map((el) => (
              <Link
                key={el.id}
                to={"/" + el.id}
                className="hover:opacity-70 flex flex-col lg:grid lg:grid-cols-4 lg:text-center border-[1px] border-white border-solid rounded-[10px] lg:h-[70px] hover:min-h-[70px] hover:h-auto px-[10px] mt-[15px]"
              >
                <p className="text-[20px]">{el.name}</p>
                <p className="text-[20px]">
                  {el.status === "Alive"
                    ? "Жив"
                    : el.status === "Dead"
                    ? "Мертв"
                    : "Неизвестно"}
                </p>
                <p className="text-[20px]">
                  {el.species === "Human" ? "Человек" : "Инопланетянин"}
                </p>
                <p className="text-[20px] overflow-hidden">
                  Эпизоды с персонажем: {getEpisodes(el.episode)}
                </p>
              </Link>
            ))}
          </div>
        ) : 
        request !== null ? 
        (
          <p className="text-20px lg:text-[30px]">Ничего не найдено</p>
        ) : ''}
      </div>
    </div>
  );
};

export default App;
