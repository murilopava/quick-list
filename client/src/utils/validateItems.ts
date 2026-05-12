import { Item } from "../types";

export default function validateItems(valorInput: string, items: Item[]) {
  if (valorInput === "") {
    return "O campo não pode estar vazio";
  } else if (valorInput.length > 35) {
    return "Nome do item é muito grande";
  } else if (
    items.some((item) => item.name.toLowerCase() === valorInput.toLowerCase())
  ) {
    return "Item já existe na lista";
  }

  return "";
}
