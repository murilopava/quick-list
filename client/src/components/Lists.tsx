import React, { SetStateAction } from "react";
import { Item, List } from "../types";

interface CreatePropList {
  list: List;
  listArray: List[];
  items: Item[];
  setListArray: React.Dispatch<SetStateAction<List[]>>;
}

const Lists = ({ list, listArray, items, setListArray }: CreatePropList) => {
  const removerLista = () => {
    const newList = [...listArray];
    const listUpdated = newList.filter((actualList) => {
      return actualList.shareId !== list.shareId;
    });

    setListArray(listUpdated);
  };

  const enterList = async () => {
    try {
      const response = await fetch(`http://localhost/lists/${list.shareId}`);
      const currentList = response.json();
    } catch (err) {}
  };

  console.log(list.shareId);
  return (
    <>
      <li
        className="flex cursor-pointer justify-between rounded-lg border border-neutral-200 bg-white p-6 font-medium transition-colors hover:border-neutral-300 hover:bg-gray-100"
        onClick={() => enterList()}
      >
        <div className="flex-col items-center">
          <h2 className="text-neutral-900">{list.name}</h2>
          <span>{items?.length ?? 0} itens </span>
        </div>
        <button
          className={`h-9 cursor-pointer rounded-md bg-red-600 px-2 text-white`}
          onClick={() => {
            removerLista();
          }}
        >
          Remover
        </button>
      </li>
    </>
  );
};

export default Lists;
