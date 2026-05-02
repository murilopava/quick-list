import React, { useEffect, useRef, useState } from "react";
import Lists from "../components/Lists";
import validateLists from "../utils/validateLists";
import { ListLS } from "../types";
import { ArrowLeft, Plus } from 'lucide-react';

function Home() {
  const [listArray, setListArray] = useState<ListLS[]>(() => {
    return JSON.parse(localStorage.getItem("lists") ?? "[]");
  });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [error, setError] = useState<string>("");

  const inputValue = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(listArray));
  }, [listArray]);

  const adicionarLista = async () => {
    const error = validateLists(inputValue.current?.value ?? "", listArray);

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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-neutral-900 mb-6">Listas</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMostrarModal(true)}
                className="bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Criar Lista
              </button>
              <button
                onClick={() => setMostrarModal(true)}
                className="bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-2"
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

      {mostrarModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md mx-6 shadow-lg">
            <button
              onClick={() => setMostrarModal(false)}
              className="mb-6 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>

            <h2 className="mb-6 text-neutral-900">Nova Lista</h2>

            <input
              type="text"
              onKeyDown={(e) => e.key === 'Enter' && adicionarLista()}
              placeholder="Nome da lista"
              autoFocus
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-400 mb-6"
            />

            <button
              onClick={adicionarLista}
              className="w-full bg-neutral-900 text-white py-3 rounded-lg hover:bg-neutral-800 transition-colors"
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
