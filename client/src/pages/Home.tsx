import React, { useEffect, useRef, useState } from "react";
import Lists from "../components/Lists";
import validateLists from "../utils/validateLists";
import { ListLS } from "../types";
import { ArrowLeft, Plus } from "lucide-react";

function Home() {
  const [listArray, setListArray] = useState<ListLS[]>(() => {
    return JSON.parse(localStorage.getItem("lists") ?? "[]");
  });

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModelAdd, setShowModalAdd] = useState(false);
  const [error, setError] = useState<string>("");

  const inputValue = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(listArray));
  }, [listArray]);

  const addList = async () => {
    const error = validateLists(inputValue.current?.value ?? "");

    if (error) {
      setError(error);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3333/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: inputValue.current?.value }),
      });

      const { shareId, name, createdAt, updatedAt } = await response.json();
      console.log({ shareId, name, createdAt, updatedAt });

      setListArray([...listArray, { shareId, name, createdAt, updatedAt }]);

      if (inputValue.current) {
        inputValue.current.value = "";
      }

      setShowModalCreate(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-neutral-50">
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
            {listArray.map((list: ListLS) => (
              <Lists
                key={list.shareId}
                list={list}
                listArray={listArray}
                setListArray={setListArray}
              ></Lists>
            ))}
          </div>
        </div>
      </div>

      {showModalCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="mx-6 w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <button
              onClick={() => setShowModalCreate(false)}
              className="mb-6 text-neutral-600 transition-colors hover:text-neutral-900"
            >
              <ArrowLeft size={24} />
            </button>

            <h2 className="mb-6 text-neutral-900">Criar nova lista</h2>

            <input
              type="text"
              ref={inputValue}
              onKeyDown={(e) => e.key === "Enter" && addList()}
              placeholder="Nome da lista"
              autoFocus
              className="mb-6 w-full rounded-lg border border-neutral-200 px-4 py-3 focus:border-neutral-400 focus:outline-none"
              onChange={() => setError("")}
            />

            {error && <p className="font-medium text-red-600">{error}</p>}

            <button
              onClick={addList}
              className="w-full cursor-pointer rounded-lg bg-neutral-900 py-3 text-white transition-colors hover:bg-neutral-800"
            >
              Criar
            </button>
          </div>
        </div>
      )}

      {showModelAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="mx-6 w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <button
              onClick={() => setShowModalAdd(false)}
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
    </>
  );
}

export default Home;
