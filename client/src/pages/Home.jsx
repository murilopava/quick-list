import React, { useRef, useState } from "react";

function Home() {
  const [listas, setListas] = useState([]);

  const valor = useRef();

  const adicionarLista = () => {
    const valorAtual = valor.current.value;
    setListas([...listas, valorAtual]);
  };

  return (
    <>
      <form className="flex max-w-100 flex-col items-center gap-4">
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
      </form>
    </>
  );
}

export default Home;
