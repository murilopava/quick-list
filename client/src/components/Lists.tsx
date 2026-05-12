import React, { SetStateAction } from "react";
import { Item, List } from "../types";
import { useNavigate } from "react-router-dom";

interface CreatePropList {
  list: List;
  items: Item[];
  setError: React.Dispatch<SetStateAction<string>>;
  setShowModalDelete: React.Dispatch<SetStateAction<boolean>>;
  setListToDelete: React.Dispatch<SetStateAction<List | null>>;
}

const Lists = ({
  list,
  items,
  setError,
  setShowModalDelete,
  setListToDelete,
}: CreatePropList) => {
  const navigate = useNavigate();

  const enterList = async () => {
    try {
      const response =
        (await fetch(`http://localhost:3333/lists/${list.shareId}`)) ??
        undefined;
      if (response.status == 404) {
        setError("Lista não encontrada");
        return;
      }

      navigate(`${list.shareId}`);
    } catch (err) {
      console.log(err);
    }
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
          className={`h-9 cursor-pointer rounded-md bg-red-600 px-2 text-white transition group-hover:bg-red-600 hover:bg-red-700!`}
          onClick={(e) => {
            e.stopPropagation();
            setShowModalDelete(true);
            setListToDelete(list);
          }}
        >
          Remover
        </button>
      </li>
    </>
  );
};

export default Lists;
