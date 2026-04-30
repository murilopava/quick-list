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

  console.log(list.name);
  return (
    <>
      <li className="align-items-center flex w-full gap-2">
        <p className="p-3">{list.name}</p>

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
