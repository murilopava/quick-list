import React, { useEffect, useRef, useState } from "react";
import Lists from "../components/Lists";
import { List } from "../types";
import validateLists from "../utils/validateLists";

function Home() {
  const [listArray, setListArray] = useState(() => {
    return JSON.parse(localStorage.getItem("lists") || "");
  });

  const [error, setError] = useState<string>("");

  const inputValue = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(listArray));
  }, [listArray]);

  const adicionarLista = async () => {
    const error = validateLists(inputValue.current?.value ?? "", listArray);

    if (error) {
      setError(error);
      return;
    }

    try {
      await fetch(`http://localhost/home`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ list: inputValue.current?.value }),
      });
    } catch (err) {
      console.log(err);
    }

    setListArray([...listArray, inputValue.current?.value]);

    if (inputValue.current) {
      inputValue.current.value = "";
    }

    return listArray;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex max-w-140 flex-col items-center gap-4"
    >
      <h1 className="text-3xl font-bold"> Listas salvas pelo usuário </h1>
      <div className="flex gap-2">
        <input
          className="rounded-md border px-1 text-center"
          placeholder="Digite o código da lista"
          type="text"
          ref={inputValue}
        />

        <button
          className="w-30 cursor-pointer rounded-md border bg-green-600 p-1 px-1 text-white"
          type="submit"
          onClick={() => adicionarLista()}
        >
          Adicionar Lista
        </button>
      </div>

      {listArray.length > 0 ? (
        <ul className="flex w-full flex-col gap-2">
          {listArray.map((list: List, index: number) => {
            return (
              <Lists
                key={index}
                listArray={listArray}
                list={list}
                setListArray={setListArray}
              />
            );
          })}
        </ul>
      ) : (
        <p>Nenhuma lista registrada!</p>
      )}
    </form>
  );
}

export default Home;
