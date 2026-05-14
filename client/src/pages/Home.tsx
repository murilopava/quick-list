import React, { useEffect, useRef, useState } from "react";
import Lists from "../components/Lists";
import validateLists from "../utils/validateLists";
import { List } from "../types";
import { ArrowLeft, Plus } from "lucide-react";
import toast from "react-hot-toast";

function Home() {
  const [listArray, setListArray] = useState<List[]>(() => {
    return JSON.parse(localStorage.getItem("lists") ?? "[]");
  });

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [listToDelete, setListToDelete] = useState<List | null>(null);
  const [error, setError] = useState<string>("");

  const inputValue = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(listArray));
  }, [listArray]);

  const createList = async () => {
    const error = await validateLists(
      inputValue.current?.value ?? "",
      listArray,
    );

    if (error) {
      setError(error);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: inputValue.current?.value }),
      });

      const { shareId, name, createdAt, updatedAt } = await response.json();

      setListArray([...listArray, { shareId, name, createdAt, updatedAt }]);

      toast.success("Lista criada com sucesso!");

      if (inputValue.current) {
        inputValue.current.value = "";
      }

      setShowModalCreate(false);
    } catch (err) {
      console.log(err);
    }
  };

  const addList = async () => {
    const error = await validateLists(
      inputValue.current?.value ?? "",
      listArray,
    );

    if (error) {
      setError(error);
      return;
    }

    try {
      console.log(inputValue.current?.value);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/lists/${inputValue.current?.value}`,
      );

      const { name, shareId, createdAt, updatedAt } = await response.json();

      if (shareId === undefined) {
        throw "Lista não encontrada";
      }

      setListArray([...listArray, { shareId, name, createdAt, updatedAt }]);

      toast.success("Lista adicionada com sucesso!");

      if (inputValue.current) {
        inputValue.current.value = "";
      }

      setShowModalAdd(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteList = () => {
    setListArray((prev) =>
      prev.filter((list) => list.shareId !== listToDelete?.shareId),
    );
    setShowModalDelete(false);
    setListToDelete(null);
  };

  return (
    <>
      <div className="min-h-screen w-full bg-neutral-50">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <div className="mb-8">
            <h1 className="mb-6 text-2xl font-medium text-neutral-900">
              Listas
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowModalCreate(true)}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-white transition-colors hover:bg-neutral-800"
              >
                <Plus size={20} />
                Criar Lista
              </button>
              <button
                onClick={() => setShowModalAdd(true)}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-white transition-colors hover:bg-neutral-800"
              >
                <Plus size={20} />
                Adicionar Lista
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {listArray.map((list: List) => (
              <Lists
                key={list.shareId}
                list={list}
                setError={setError}
                setShowModalDelete={setShowModalDelete}
                setListToDelete={setListToDelete}
              ></Lists>
            ))}
          </div>
        </div>
      </div>

      {showModalCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="mx-6 w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <button
              onClick={() => (setShowModalCreate(false), setError(""))}
              className="mb-6 text-neutral-600 transition-colors hover:text-neutral-900"
            >
              <ArrowLeft size={24} />
            </button>

            <h2 className="mb-6 text-neutral-900">Criar nova lista</h2>

            <input
              type="text"
              ref={inputValue}
              onKeyDown={(e) => e.key === "Enter" && createList()}
              placeholder="Nome da lista"
              autoFocus
              className="mb-6 w-full rounded-lg border border-neutral-200 px-4 py-3 focus:border-neutral-400 focus:outline-none"
              onChange={() => setError("")}
            />

            {error && <p className="font-medium text-red-600">{error}</p>}

            <button
              onClick={createList}
              className="w-full cursor-pointer rounded-lg bg-neutral-900 py-3 text-white transition-colors hover:bg-neutral-800"
            >
              Criar
            </button>
          </div>
        </div>
      )}

      {showModalAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="mx-6 w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <button
              onClick={() => (setShowModalAdd(false), setError(""))}
              className="mb-6 text-neutral-600 transition-colors hover:text-neutral-900"
            >
              <ArrowLeft size={24} />
            </button>

            <h2 className="mb-6 text-neutral-900">Adicionar lista existente</h2>

            <input
              type="text"
              ref={inputValue}
              onKeyDown={(e) => e.key === "Enter" && addList()}
              placeholder="Código da Lista"
              autoFocus
              className="mb-6 w-full rounded-lg border border-neutral-200 px-4 py-3 focus:border-neutral-400 focus:outline-none"
              onChange={() => setError("")}
            />

            {error && <p className="font-medium text-red-600">{error}</p>}

            <button
              onClick={addList}
              className="w-full cursor-pointer rounded-lg bg-neutral-900 py-3 text-white transition-colors hover:bg-neutral-800"
            >
              Adicionar
            </button>
          </div>
        </div>
      )}
      {showModalDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="mx-6 w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <button
              onClick={() => (setShowModalDelete(false), setError(""))}
              className="mb-6 text-neutral-600 transition-colors hover:text-neutral-900"
            >
              <ArrowLeft size={24} />
            </button>

            <h2 className="mb-6 font-bold text-neutral-900">
              Deseja mesmo deletar esta lista das suas listas?
            </h2>

            <div className="flex gap-4">
              <button
                onClick={() => deleteList()}
                className="w-full cursor-pointer rounded-lg bg-red-500 py-3 text-white transition-colors hover:bg-red-700"
              >
                Sim
              </button>

              <button
                onClick={() => {
                  (setShowModalDelete(false), setListToDelete(null));
                }}
                className="w-full cursor-pointer rounded-lg bg-neutral-100 py-3 text-black transition-colors hover:bg-neutral-300"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
