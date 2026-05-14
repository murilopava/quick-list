import React, { SetStateAction } from "react";
import { Item, List } from "../types";
import { useNavigate } from "react-router-dom";

interface CreatePropList {
  list: List;
  setError: React.Dispatch<SetStateAction<string>>;
  setShowModalDelete: React.Dispatch<SetStateAction<boolean>>;
  setListToDelete: React.Dispatch<SetStateAction<List | null>>;
}

const Lists = ({
  list,
  setError,
  setShowModalDelete,
  setListToDelete,
}: CreatePropList) => {
  const navigate = useNavigate();

  const formatDate = (dataISO: string) => {
    const date = new Date(dataISO);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const enterList = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/lists/${list.shareId}`,
      );
      if (response.status === 404) {
        setError("Lista não encontrada");
        return;
      }

      navigate(`${list.shareId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li
      className="block cursor-pointer rounded-lg border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300"
      onClick={() => enterList()}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-medium text-neutral-900">{list.name}</h2>
        <button
          className="cursor-pointer rounded-md bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-700"
          onClick={(e) => {
            e.stopPropagation();
            setShowModalDelete(true);
            setListToDelete(list);
          }}
        >
          Remover
        </button>
      </div>

      <div className="flex gap-4 text-sm text-neutral-400">
        <span>Criada: {formatDate(list.createdAt)}</span>
        <span>Atualizada: {formatDate(list.updatedAt)}</span>
      </div>
    </li>
  );
};

export default Lists;
