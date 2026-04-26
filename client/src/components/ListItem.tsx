import React, { useState } from "react";
import { Product } from "../types";

interface ListItemProps {
  product: Product;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  shareId: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const ListItem = ({
  product,
  setProducts,
  shareId,
  setError,
}: ListItemProps) => {
  const removerItemDaLista = () => {};

  return (
    <>
      <li className="align-items-center flex w-full gap-2">
        <label htmlFor="quant" className="flex w-full min-w-0 items-center">
          <p
            className={`max-w-65 px-2 text-xl wrap-break-word ${itemComprado ? "text-gray-500 line-through decoration-4" : ""}`}
          >
            {listItem}
          </p>
        </label>

        <div className="flex items-center gap-2">
          <button
            className={`h-6 w-6 rounded-full transition-colors ${itemComprado ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} cursor-pointer`}
            onClick={() => setItemComprado((c) => (c === false ? true : false))}
          >
            {listItem ? "✔️" : "❌"}
          </button>

          <button
            className={`rounded-md ${itemComprado ? "cursor-pointer bg-red-600 transition hover:bg-red-500" : "cursor-not-allowed bg-gray-500"} px-2 text-white`}
            disabled={!listItem}
            onClick={() => {
              setErro("");
              removerItemDaLista();
            }}
          >
            Remover
          </button>

          <input
            className="align-center w-10 rounded-sm border border-gray-300 p-0 text-center"
            type="number"
            value={quant}
            onChange={(e) => setQuant(Number(e.target.value))}
            max={20}
            min={0}
            name="quant"
            id="quantidade"
            onKeyDown={(e) => e.preventDefault()}
          />

          <button
            className="cursor-pointer rounded-md bg-blue-600 px-2 font-bold text-white transition hover:bg-blue-500"
            onClick={() => setQuant((q) => (q < 20 ? q + 1 : q))}
          >
            +
          </button>
          <button
            className="cursor-pointer rounded-md bg-blue-600 px-2 font-bold text-white transition hover:bg-blue-500"
            onClick={() => setQuant((q) => (q > 0 ? q - 1 : 0))}
          >
            -
          </button>
        </div>
      </li>
    </>
  );
};

export default ListItem;
