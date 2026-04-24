import { useEffect, useRef, useState } from "react";
import ItemLista from "../components/ItemLista.js";
import validateProducts from "../utils/validateProducts.js";
import { Product } from "../types/index.js";
import { useParams } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  const { shareId } = useParams<{ shareId: string | undefined }>();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`http://[::1]:3333/lists/${shareId}`);
      const data = await response.json();

      setProducts(data.products);
    };

    fetchProducts();
  }, [shareId]);

  const [erro, setErro] = useState<string>("");
  const inputAdicionar = useRef<string>();

  const adicionarElementoNaLista = () => {
    const inputValue = inputAdicionar.current.value.trim();
    const errorValidation = validateProducts(inputValue, []);
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
          {listaMercado.map((itemLista: string, index: number) => {
            return (
              <ItemLista
                key={index}
                itemLista={itemLista}
                listaMercado={listaMercado}
                setListaMercado={setListaMercado}
                setErro={setErro}
              />
            );
          })}
        </ul>
      ) : (
        <p className="text-xl">Sua lista esta vazia!</p>
      )}

      {erro && <p className="w-full text-sm text-red-500">{erro}</p>}
    </form>
  );
}

export default Products;
