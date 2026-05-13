import { useEffect, useRef, useState } from "react";
import ListItem from "../components/ListItem.js";
import validateItems from "../utils/validateItems.js";
import { Item } from "../types/index.js";
import { useParams, Link } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [erro, setError] = useState<string>("");
  const [listName, setListName] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const { shareId } = useParams<{ shareId: string }>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3333/lists/${shareId}`);
        const data = await response.json();

        setListName(data.name);
        setItems(data.items);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [shareId]);

  const inputAdicionar = useRef<HTMLInputElement>(null);

  const addItem = async () => {
    const error = validateItems(inputAdicionar.current?.value ?? "", items);

    if (error) {
      setError(error);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3333/lists/${shareId}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: inputAdicionar.current?.value }),
        },
      );

      const newItem = await response.json();

      setItems((prev) => [...prev, newItem]);

      if (inputAdicionar.current) {
        inputAdicionar.current.value = "";
      }

      setShowModal(false);
      setError("");
    } catch (err) {
      console.log(err);
    }
  };

  const copyShareId = async () => {
    try {
      await navigator.clipboard.writeText(shareId ?? "");
      toast.success("Código de lista copiado!");
    } catch (err) {
      toast.error("Não foi possível copiar o código!");
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-neutral-50">
        <div className="mx-auto max-w-2xl justify-between px-6 py-12">
          <div className="flex justify-between">
            <Link
              to="/lists"
              className="mb-6 inline-block text-neutral-600 transition-colors hover:text-neutral-900"
            >
              ← Voltar
            </Link>

            <button
              className="mb-2 cursor-pointer rounded-lg bg-green-600 px-4 font-medium text-white transition-colors hover:bg-green-700"
              onClick={() => copyShareId()}
            >
              Copiar Código da lista
            </button>
          </div>
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-medium text-neutral-900">
              {listName}
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-white transition-colors hover:bg-neutral-800"
            >
              <Plus size={20} />
              Adicionar Item
            </button>
          </div>

          <div className="space-y-2">
            {items.length > 0 ? (
              items.map((item) => (
                <ListItem
                  key={item.id}
                  item={item}
                  setProducts={setItems}
                  shareId={shareId}
                  setError={setError}
                />
              ))
            ) : (
              <p className="text-neutral-500">Sua lista está vazia!</p>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="mx-6 w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <button
              onClick={() => {
                setShowModal(false);
                setError("");
              }}
              className="mb-6 text-neutral-600 transition-colors hover:text-neutral-900"
            >
              <ArrowLeft size={24} />
            </button>

            <h2 className="mb-6 text-neutral-900">Novo Item</h2>

            <input
              type="text"
              ref={inputAdicionar}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder="Nome do item"
              autoFocus
              className="mb-6 w-full rounded-lg border border-neutral-200 px-4 py-3 focus:border-neutral-400 focus:outline-none"
              onChange={() => setError("")}
            />

            {erro && <p className="mb-4 font-medium text-red-600">{erro}</p>}

            <button
              onClick={addItem}
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

export default Items;
