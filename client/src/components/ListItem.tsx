import React from "react";
import { Item } from "../types";

interface ListItemProps {
  item: Item;
  setProducts: React.Dispatch<React.SetStateAction<Item[]>>;
  shareId: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const ListItem = ({
  item: item,
  setProducts: setItems,
  shareId,
  setError,
}: ListItemProps) => {
  const removeItemList = async () => {
    try {
      await fetch(`http://localhost:3333/lists/${shareId}/items/${item.id}`, {
        method: "DELETE",
      });

      setItems((prev) => prev.filter((p) => p.id !== item.id));
    } catch (err) {
      console.log(err);
    }
  };

  const updateQuant = async (newQuant: number) => {
    try {
      await fetch(`http://localhost:3333/lists/${shareId}/items/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quant: newQuant }),
      });

      setItems((prev) =>
        prev.map((p) => (p.id === item.id ? { ...p, quant: newQuant } : p)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const updateItemState = async (newState: boolean) => {
    try {
      await fetch(`http://localhost:3333/lists/${shareId}/items/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPurchased: newState }),
      });

      setItems((prev) =>
        prev.map((p) =>
          p.id === item.id ? { ...p, isPurchased: newState } : p,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <li className="align-items-center flex w-full gap-2">
        <label htmlFor="quant" className="flex w-full min-w-0 items-center">
          <p
            className={`max-w-65 px-2 text-xl wrap-break-word ${item.isPurchased ? "text-gray-500 line-through decoration-4" : ""}`}
          >
            {item.name}
          </p>
        </label>

        <div className="flex items-center gap-2">
          <button
            className={`h-6 w-6 rounded-full transition-colors ${item.isPurchased ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} cursor-pointer`}
            onClick={
              item.isPurchased
                ? async () => await updateItemState(false)
                : async () => await updateItemState(true)
            }
          >
            {item.isPurchased ? "✔️" : "❌"}
          </button>

          <button
            className={`rounded-md ${item.isPurchased ? "cursor-pointer bg-red-600 transition hover:bg-red-500" : "cursor-not-allowed bg-gray-500"} px-2 text-white`}
            disabled={!item.isPurchased}
            onClick={() => {
              setError("");
              removeItemList();
            }}
          >
            Remover
          </button>

          <input
            className="align-center w-10 rounded-sm border border-gray-300 p-0 text-center"
            type="number"
            value={item.quant}
            onChange={(e) => updateQuant(Number(e.target.value))}
            max={20}
            min={0}
            name="quant"
            id="quantidade"
            onKeyDown={(e) => e.preventDefault()}
          />

          <button
            className="cursor-pointer rounded-md bg-blue-600 px-2 font-bold text-white transition hover:bg-blue-500"
            onClick={() => updateQuant(item.quant + 1)}
          >
            +
          </button>
          <button
            className="cursor-pointer rounded-md bg-blue-600 px-2 font-bold text-white transition hover:bg-blue-500"
            onClick={() => updateQuant(item.quant - 1)}
          >
            -
          </button>
        </div>
      </li>
    </>
  );
};

export default ListItem;
