import { useEffect, useRef, useState } from "react";
import ListItem from "../components/ListItem.js";
import validateProducts from "../utils/validateProducts.js";
import { Product } from "../types/index.js";
import { useParams } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [erro, setError] = useState<string>("");

  const { shareId } = useParams<{ shareId: string }>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3333/lists/${shareId}`);
        const data = await response.json();

        setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [shareId]);

  const inputAdicionar = useRef<HTMLInputElement>(null);

  const adicionarElementoNaLista = () => {};

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
          onChange={() => setError("")}
        />

        <button
          className="cursor-pointer rounded-md bg-gray-800 px-2 text-white transition hover:bg-gray-500"
          type="submit"
          onClick={() => adicionarElementoNaLista()}
        >
          Adicionar
        </button>
      </div>

      {products.length > 0 ? (
        <ul className="flex w-full flex-col gap-2">
          {products.map((product) => {
            return (
              <ListItem
                key={product.id}
                product={product}
                setProducts={setProducts}
                shareId={shareId}
                setError={setError}
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
