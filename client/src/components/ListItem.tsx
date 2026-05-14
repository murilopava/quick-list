import React from "react";
import { Item } from "../types";
import { Minus, Plus, Trash2 } from "lucide-react";

interface ListItemProps {
  item: Item;
  setProducts: React.Dispatch<React.SetStateAction<Item[]>>;
  shareId: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const ListItem = ({
  item,
  setProducts: setItems,
  shareId,
  setError,
}: ListItemProps) => {
  const removeItemList = async () => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/lists/${shareId}/items/${item.id}`,
        {
          method: "DELETE",
        },
      );

      setItems((prev) => prev.filter((p) => p.id !== item.id));
    } catch (err) {
      console.log(err);
    }
  };

  const updateQuant = async (newQuant: number) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/lists/${shareId}/items/${item.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quant: newQuant }),
        },
      );

      setItems((prev) =>
        prev.map((p) => (p.id === item.id ? { ...p, quant: newQuant } : p)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const updateItemState = async (newState: boolean) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/lists/${shareId}/items/${item.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isPurchased: newState }),
        },
      );

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
    <li className="flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-4">
      <input
        type="checkbox"
        checked={item.isPurchased}
        onChange={() => updateItemState(!item.isPurchased)}
        className="h-5 w-5 shrink-0 cursor-pointer rounded border-neutral-300"
      />

      <span
        className={`min-w-0 flex-1 break-all ${item.isPurchased ? "text-neutral-400 line-through" : "text-neutral-900"}`}
      >
        {item.name}
      </span>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuant(item.quant - 1)}
          disabled={item.quant <= 1}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-neutral-100 transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed"
        >
          <Minus
            size={16}
            className={
              item.quant <= 1 ? "text-neutral-300" : "text-neutral-700"
            }
          />
        </button>

        <span className="w-8 text-center text-neutral-900">{item.quant}</span>

        <button
          onClick={() => updateQuant(item.quant + 1)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-neutral-100 transition-colors hover:bg-neutral-200"
        >
          <Plus size={16} className="text-neutral-700" />
        </button>

        <button
          onClick={() => {
            setError("");
            removeItemList();
          }}
          disabled={!item.isPurchased}
          className="ml-2 flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
        >
          <Trash2
            size={16}
            className={item.isPurchased ? "text-red-600" : "text-neutral-300"}
          />
        </button>
      </div>
    </li>
  );
};

export default ListItem;
