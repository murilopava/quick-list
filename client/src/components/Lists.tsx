import React, { SetStateAction } from "react";
import { ListLS } from "../types";

interface CreatePropList {
  list: ListLS;
  listArray: ListLS[];
  setListArray: React.Dispatch<SetStateAction<ListLS[]>>;
}

const Lists = ({ list, listArray, setListArray }: CreatePropList) => {
  const removerLista = () => {
    const newList = [...listArray];
    const listUpdated = newList.filter((actualList) => {
      return actualList.shareId !== list.shareId;
    });

    setListArray(listUpdated);
  };

  console.log(list.shareId);
  return (
    <>
      <li className="block bg-white p-6 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors">
        <div className="flex items-center justify-between">
          <h2 className="text-neutral-900">{list.name}</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            className={`cursor-pointer rounded-md bg-red-600 px-2 text-white`}
            onClick={() => {
              removerLista();
            }}
          >
            Remover
          </button>
        </div>
      </li>
    </>
  );
};

export default Lists;
