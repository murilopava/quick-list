import React, { useEffect, useRef, useState } from "react";
import Lists from "../components/Lists";
import validateLists from "../utils/validateLists";
import { ListLS } from "../types";

function Home() {
  const [listArray, setListArray] = useState<ListLS[]>(() => {
    return JSON.parse(localStorage.getItem("lists") ?? "[]");
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
      const response = await fetch(`http://localhost:3333/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: inputValue.current?.value }),
      });

      const { shareId, name, createdAt, updatedAt } = await response.json();
      console.log({ shareId, name, createdAt, updatedAt });

      setListArray([...listArray, { shareId, name, createdAt, updatedAt }]);

      if (inputValue.current) {
        inputValue.current.value = "";
      }
    } catch (err) {
      console.log(err);
    }
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
          {listArray.map((list: ListLS) => {
            return (
              <Lists
                key={list.shareId}
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
