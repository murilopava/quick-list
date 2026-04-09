import React, { useEffect, useRef, useState } from "react";
import List from "../components/List";

function Home() {
  const [listArray, setListArray] = useState(() => {
    return JSON.parse(localStorage.getItem("lists")) || [];
  });
  const valor = useRef();

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(listArray));
  }, [listArray]);

  const adicionarLista = () => {
    const valorAtual = valor.current.value.trim();
    setListArray([...listArray, valorAtual]);

    valor.current.value = "";

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
          ref={valor}
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
          {listArray.map((list, index) => {
            return (
              <List
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
