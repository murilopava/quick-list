import React, { useState } from 'react'

const ItemLista = ({itemLista, listaMercado, setListaMercado, setErro}) => {

  const [quant, setQuant] = useState(1);
  
  const removerItemDaLista = () => {
    const novaLista = [...listaMercado];
    const novaListaFiltrada = novaLista.filter(itemAtual => itemAtual !== itemLista);
    setListaMercado(novaListaFiltrada);
  }

  return (
    <>
    <li className='flex gap-2 justify-center items-center w-full'>
        <label htmlFor="quant" className='flex w-80 items-center'>
          <p className='text-xl px-2'>{itemLista}</p>
        </label>
      <button className="rounded-md bg-red-600 text-white px-2 cursor-pointer hover:bg-red-500 transition" onClick={() => {setErro(""); removerItemDaLista()}}>Remover</button>
      <div className='flex gap-2 items-center'>
        <input className='p-0 border border-gray-300 rounded-sm w-10 align-center text-center' type="number" value={quant} onChange={(e) => setQuant(Number(e.target.value))} max={20} min={0} name="quant" id="quantidade" onKeyDown={(e) => e.preventDefault()} />

        <button className="rounded-md bg-blue-600 text-white font-bold px-2 cursor-pointer hover:bg-blue-500 transition" onClick={() => setQuant((q) => q < 20 ? q + 1 : q)}>+</button>
        <button className="rounded-md bg-blue-600 text-white font-bold px-2 cursor-pointer hover:bg-blue-500 transition" onClick={() => setQuant((q) => q > 0 ? q - 1 : 0)}>-</button>
        </div>
    </li>
    </>
  )
}

export default ItemLista