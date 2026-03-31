import { useEffect, useRef, useState } from "react";
import ItemLista from "../components/ItemLista.jsx";

function Products() {

  const [listaMercado, setListaMercado] = useState(() => {
    return JSON.parse(localStorage.getItem("produtos"))
  });
  const [erro, setErro] = useState();
  const inputAdicionar = useRef();


  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(listaMercado));
  }, [listaMercado])
  
  const adicionarElementoNaLista = () => {
    const novaLista = JSON.parse(localStorage.getItem("produtos")) || [];
  
    const valorInput = inputAdicionar.current.value.trim();

    if (valorInput === "" ) {
      setErro("O campo não pode estar vazio");
      return;
    }
    else if (novaLista.some(item => item.toLowerCase() === valorInput.toLowerCase())) {
      setErro("Item já existe na lista")
      return;
    }
    
    setListaMercado([...listaMercado, valorInput]);

    inputAdicionar.current.value = "";
    return novaLista;
  }

  return (
    <form className="max-w-120 w-full flex flex-col items-center gap-4" onSubmit={(enter) => (enter.preventDefault())}>
      <h1 className="text-4xl font-bold">Lista de Mercado</h1>

      <div className="w-120 flex gap-2">
        <input className="w-full border border-gray-600 rounded-md px-2" ref={inputAdicionar} type="text"placeholder="Digite um item" onChange={() => (setErro(""))}/>
        <button className="rounded-md bg-gray-800 text-white px-2 cursor-pointer hover:bg-gray-500 transition" type="submit" onClick={() => adicionarElementoNaLista()}>Adicionar</button>
      </div>
          
      {listaMercado.length > 0 ? (
        <ul className="w-full flex flex-col gap-2">
          {listaMercado.map((itemLista, index) => (
          <ItemLista key={index} itemLista={itemLista} listaMercado={listaMercado} setListaMercado=   {setListaMercado} setErro={setErro}/>
          ))}
        </ul>
          ) : (
            <p className="text-xl">Sua lista esta vazia!</p>
          )}
          
          {erro && (
           <p className="text-red-500 w-full text-sm">{erro}</p>
      )}
    </form>
  )
}


export default Products