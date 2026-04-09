import React from "react";

const List = ({ list, listArray, setListArray }) => {
  const removerLista = () => {
    const newList = [...listArray];
    const listUpdated = newList.filter((actualList) => {
      return actualList !== list;
    });

    setListArray(listUpdated);
  };

  return (
    <>
      <li className="align-items-center flex w-full gap-2">
        <p>{list}</p>

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

export default List;
