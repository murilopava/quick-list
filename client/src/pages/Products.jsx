import { useEffect, useRef, useState } from "react";
import ItemLista from "../components/ItemLista.jsx";
import validateProducts from "../utils/validateProducts.js";

function Products() {
  const [listaMercado, setListaMercado] = useState(() => {
    return JSON.parse(localStorage.getItem("produtos")) || [];
  });
  const [erro, setErro] = useState();
  const inputAdicionar = useRef();

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(listaMercado));
  }, [listaMercado]);

  const adicionarElementoNaLista = () => {
    const inputValue = inputAdicionar.current.value.trim();
    const errorValidation = validateProducts(inputValue, listaMercado);
    setErro(errorValidation);

    if (errorValidation) return;

    setListaMercado([...listaMercado, inputValue]);

    inputAdicionar.current.value = "";
    return listaMercado;
  };

  return (
    <form
      className="flex w-full max-w-120 flex-col items-center gap-4"
      onSubmit={(enter) => enter.preventDefault()}
    >
      <h1 className="text-4xl font-bold">Lista de Mercado</h1>

      <div className="flex w-120 gap-2">
        <input
          className="w-full rounded-md border border-gray-600 px-2"
          ref={inputAdicionar}
          type="text"
          placeholder="Digite um item"
          onChange={() => setErro("")}
        />

        <button
          className="cursor-pointer rounded-md bg-gray-800 px-2 text-white transition hover:bg-gray-500"
          type="submit"
          onClick={() => adicionarElementoNaLista()}
        >
          Adicionar
        </button>
      </div>

      {listaMercado.length > 0 ? (
        <ul className="flex w-full flex-col gap-2">
          {listaMercado.map((itemLista, index) => (
            <ItemLista
              key={index}
              itemLista={itemLista}
              listaMercado={listaMercado}
              setListaMercado={setListaMercado}
              setErro={setErro}
            />
          ))}
        </ul>
      ) : (
        <p className="text-xl">Sua lista esta vazia!</p>
      )}

      {erro && <p className="w-full text-sm text-red-500">{erro}</p>}
    </form>
  );
}

export default Products;
